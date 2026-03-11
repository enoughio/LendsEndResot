import "server-only";
import crypto from "node:crypto";
import Razorpay from "razorpay";

// Centralized key lookup so all routes fail consistently when config is missing.
export function getRazorpayKeys() {
	const keyId = process.env.RAZORPAY_KEY_ID;
	const keySecret = process.env.RAZORPAY_SECRET_KEY;

	if (!keyId || !keySecret) {
		throw new Error("Razorpay keys are not configured.");
	}

	return { keyId, keySecret };
}

// Create a shared Razorpay client instance for server routes.
export function getRazorpayClient() {
	const { keyId, keySecret } = getRazorpayKeys();
	return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

// Razorpay expects amount in paise.
export function toPaise(amountInRupees: number) {
	return Math.round(amountInRupees * 100);
}

// Server-side order creation keeps amount/currency source of truth on backend.
export async function createRazorpayOrder(input: {
	amountInRupees: number;
	currency?: string;
	receipt: string;
}) {
	const client = getRazorpayClient();
	const amount = toPaise(input.amountInRupees);

	return client.orders.create({
		amount,
		currency: input.currency || "INR",
		receipt: input.receipt,
	});
}

// Verify checkout signature using HMAC-SHA256(order_id|payment_id).
export function verifyRazorpaySignature(input: {
	orderId: string;
	paymentId: string;
	signature: string;
}) {
	const { keySecret } = getRazorpayKeys();

	const generatedSignature = crypto
		.createHmac("sha256", keySecret)
		.update(`${input.orderId}|${input.paymentId}`)
		.digest("hex");

	return generatedSignature === input.signature;
}

