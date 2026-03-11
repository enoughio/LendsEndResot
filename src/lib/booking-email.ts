import "server-only";
import nodemailer from "nodemailer";

type BookingConfirmationInput = {
  to: string;
  guestName: string;
  bookingId: string;
  bookingType: "STAY" | "VISIT";
  totalAmount: number;
  currency: string;
  roomTypeName?: string | null;
  packageName?: string | null;
  checkIn?: Date | null;
  checkOut?: Date | null;
  visitDate?: Date | null;
};

function formatAmount(value: number, currency: string) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value?: Date | null) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function sendBookingConfirmationEmail(input: BookingConfirmationInput) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const fromEmail = process.env.SMTP_FROM || user;

  if (!host || !user || !pass || !fromEmail) {
    throw new Error("SMTP configuration is missing.");
  }

  const secure = port === 465;
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const bookingLine =
    input.bookingType === "STAY"
      ? `Stay: ${input.roomTypeName || "Room"} (${formatDate(input.checkIn)} to ${formatDate(input.checkOut)})`
      : `Visit: ${input.packageName || "Package"} on ${formatDate(input.visitDate)}`;

  await transporter.sendMail({
    from: fromEmail,
    to: input.to,
    subject: `Booking Confirmed - ${input.bookingId}`,
    text: `Hi ${input.guestName},\n\nYour booking is confirmed.\nReference: ${input.bookingId}\n${bookingLine}\nAmount Paid: ${formatAmount(input.totalAmount, input.currency)}\n\nThank you for booking with us.`,
    html: `
      <h2>Booking Confirmed</h2>
      <p>Hi ${input.guestName},</p>
      <p>Your booking has been successfully confirmed.</p>
      <p><strong>Reference:</strong> ${input.bookingId}</p>
      <p><strong>${input.bookingType === "STAY" ? "Stay" : "Visit"} Details:</strong> ${bookingLine}</p>
      <p><strong>Amount Paid:</strong> ${formatAmount(input.totalAmount, input.currency)}</p>
      <p>Thank you for booking with us.</p>
    `,
  });
}
