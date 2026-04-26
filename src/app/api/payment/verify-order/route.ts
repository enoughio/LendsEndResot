import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyRazorpaySignature } from "@/lib/payments";
import { sendBookingConfirmationEmail } from "@/lib/booking-email";

function normalizeGuestList(value: unknown): Array<{ name: string; phone: string }> | undefined {
	if (!Array.isArray(value)) return undefined;

	const guests = value
		.map((item) => {
			if (!item || typeof item !== "object") return null;
			const maybeGuest = item as { name?: unknown; phone?: unknown };
			const name = typeof maybeGuest.name === "string" ? maybeGuest.name.trim() : "";
			const phone = typeof maybeGuest.phone === "string" ? maybeGuest.phone.trim() : "";
			if (!name || !phone) return null;
			return { name, phone };
		})
		.filter((guest): guest is { name: string; phone: string } => Boolean(guest));

	return guests.length > 0 ? guests : undefined;
}

export async function POST(request: Request) {
	try {
		const body = await request.json();

		// Values returned by Razorpay checkout handler on successful payment.
		const bookingId = String(body?.bookingId || "").trim();
		const razorpayOrderId = String(body?.razorpay_order_id || "").trim();
		const razorpayPaymentId = String(body?.razorpay_payment_id || "").trim();
		const razorpaySignature = String(body?.razorpay_signature || "").trim();

		if (!bookingId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
			return NextResponse.json(
				{ error: { code: "BAD_REQUEST", message: "Missing payment verification fields, Contact Support." } },
				{ status: 400 }
			);
		}

		// Fetch booking and only the fields required for verification + confirmation email.
		const booking = await prisma.booking.findFirst({
			where: { id: bookingId, deletedAt: null },
			select: {
				id: true,
				status: true,
				paymentStatus: true,
				razorPayOrderId: true,
				razorPayPaymentId: true,
				guestName: true,
				guestEmail: true,
				bookingType: true,
				totalAmount: true,
				currency: true,
				checkIn: true,
				checkOut: true,
				visitDate: true,
				roomsBooked: true,
				guestList: true,
				room: {
					select: {
						roomType: {
							select: { name: true },
						},
					},
				},
				visitPackage: {
					select: { name: true },
				},
			},
		});

		if (!booking) {
			return NextResponse.json(
				{ error: { code: "NOT_FOUND", message: "Booking not found." } },
				{ status: 404 }
			);
		}

		// Protect against cross-booking payment tampering.
		if (!booking.razorPayOrderId || booking.razorPayOrderId !== razorpayOrderId) {
			return NextResponse.json(
				{ error: { code: "BAD_REQUEST", message: "Order id does not match booking." } },
				{ status: 400 }
			);
		}

		// Idempotency: return success when already verified.
		if (booking.paymentStatus === "PAID" && booking.razorPayPaymentId === razorpayPaymentId) {
			return NextResponse.json({ data: { verified: true, alreadyVerified: true, bookingId } });
		}

		const isValid = verifyRazorpaySignature({
			orderId: razorpayOrderId,
			paymentId: razorpayPaymentId,
			signature: razorpaySignature,
		});

		if (!isValid) {
			return NextResponse.json(
				{ error: { code: "BAD_REQUEST", message: "Invalid payment signature." } },
				{ status: 400 }
			);
		}

		// Payment is authentic; persist gateway refs and mark booking confirmed.
		await prisma.booking.update({
			where: { id: bookingId },
			data: {
				razorPayPaymentId: razorpayPaymentId,
				razorPaySignature: razorpaySignature,
				paymentStatus: "PAID",
				status: "CONFIRMED",
			},
		});

		// Confirmation email is best-effort and must not fail the verified payment response.
		if (booking.guestEmail) {
			try {
				const guestList = normalizeGuestList(booking.guestList);
				await sendBookingConfirmationEmail({
					to: booking.guestEmail,
					guestName: booking.guestName || "Guest",
					bookingId,
					bookingType: booking.bookingType,
					totalAmount: Number(booking.totalAmount),
					currency: booking.currency || "INR",
					roomTypeName: booking.room?.roomType?.name,
					packageName: booking.visitPackage?.name,
					checkIn: booking.checkIn,
					checkOut: booking.checkOut,
					visitDate: booking.visitDate,
					roomsBooked: booking.roomsBooked,
					guestList,
				});
			} catch (mailError) {
				// Email failure should not block successful payment verification.
				console.error("Booking confirmation email failed", mailError);
			}
		}

		const internalEmail = process.env.SMTP_TO;
		if (internalEmail) {
			try {
				const guestList = normalizeGuestList(booking.guestList);
				await sendBookingConfirmationEmail({
					to: internalEmail,
					guestName: booking.guestName || "Guest",
					bookingId,
					bookingType: booking.bookingType,
					totalAmount: Number(booking.totalAmount),
					currency: booking.currency || "INR",
					roomTypeName: booking.room?.roomType?.name,
					packageName: booking.visitPackage?.name,
					checkIn: booking.checkIn,
					checkOut: booking.checkOut,
					visitDate: booking.visitDate,
					roomsBooked: booking.roomsBooked,
					guestList,
					internalCopy: true,
				});
			} catch (mailError) {
				console.error("Internal booking email failed", mailError);
			}
		}

        

		return NextResponse.json({ data: { verified: true, bookingId } });
	} catch (error) {
		console.error("POST /api/payment/verify-order failed", error);
		return NextResponse.json(
			{ error: { code: "INTERNAL_ERROR", message: "Unable to verify payment." } },
			{ status: 500 }
		);
	}
}

