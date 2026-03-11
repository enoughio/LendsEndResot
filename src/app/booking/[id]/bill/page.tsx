"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Script from "next/script";

function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

type RazorpayOrderResponse = {
  data: {
    bookingId: string;
    payment: {
      keyId: string;
      name: string;
      orderId: string;
      amount: number;
      currency: string;
      guest: {
        name: string;
        email: string;
        phone: string;
      };
    };
  };
};

type RazorpaySuccessPayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayFailurePayload = {
  error?: {
    code?: string;
    description?: string;
  };
};

// Type declaration for global Razorpay object injected by checkout.js.
declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, callback: (payload: RazorpayFailurePayload) => void) => void;
    };
  }
}

export default function BookingDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const bookingId = params?.id;



  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [loadingBill, setLoadingBill] = useState(true);
  const [billError, setBillError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [paySuccess, setPaySuccess] = useState<string | null>(null);

  const [roomCharges, setRoomCharges] = useState(0);
  const [packageCharges, setPackageCharges] = useState(0);
  const [additionalActivities, setAdditionalActivities] = useState<
    Array<{ id: string; name: string; price: number }>
  >([]);
  const [additionalActivitiesTotal, setAdditionalActivitiesTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    if (!bookingId) return;

    const loadBill = async () => {
      try {
        setLoadingBill(true);
        setBillError(null);

        const res = await fetch(`/api/bookings/${bookingId}/bill`);
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.error?.message || "Failed to load bill");
        }
        const bill = json?.data;
        setRoomCharges(Number(bill?.roomCharges || 0));
        setPackageCharges(Number(bill?.packageCharges || 0));
        setAdditionalActivities(
          (bill?.additionalActivities || []).map(
            (item: { id: string; name: string; price: number }) => ({
              id: item.id,
              name: item.name,
              price: Number(item.price || 0),
            }),
          ),
        );
        setAdditionalActivitiesTotal(
          Number(bill?.additionalActivitiesAmount || 0),
        );
        setSubTotal(Number(bill?.subTotal || 0));
        setTax(Number(bill?.taxAmount || 0));
        setFinalTotal(Number(bill?.totalAmount || 0));
      } catch (error) {
        setBillError(
          error instanceof Error ? error.message : "Failed to load bill",
        );
      } finally {
        setLoadingBill(false);
      }
    };

    void loadBill();
  }, [bookingId]);

  const canPay = useMemo(() => {
    return Boolean(fullName.trim() && email.trim() && phone.trim());
  }, [fullName, email, phone]);

  // Checkout flow:
  // 1) Ask backend to create order and save guest details.
  // 2) Open Razorpay modal with server-provided order data.
  // 3) Verify payment signature on backend before marking booking confirmed.
  const startCheckout = async () => {
    if (!bookingId || !canPay) return;

    try {
      setPaying(true);
      setPayError(null);
      setPaySuccess(null);

      const finalSpecialRequest = [
        city.trim() ? `City: ${city.trim()}` : "",
        specialRequest.trim(),
      ]
        .filter(Boolean)
        .join(" | ");

      const orderRes = await fetch(`/api/bookings/${bookingId}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          specialRequest: finalSpecialRequest,
        }),
      });


    // Read order payload returned by /api/bookings/:id/pay.
	  const orderJson = (await orderRes.json()) as RazorpayOrderResponse & {
        error?: { message?: string };
      };
      if (!orderRes.ok) {
        throw new Error(orderJson?.error?.message || "Unable to initiate payment");
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK failed to load.");
      }

      const payment = orderJson.data.payment;

      const razorpay = new window.Razorpay({
        key: payment.keyId,
        amount: payment.amount,
        currency: payment.currency,
        name: payment.name,
        description: `Booking ${bookingId}`,
        order_id: payment.orderId,
        prefill: {
          name: payment.guest.name,
          email: payment.guest.email,
          contact: payment.guest.phone,
        },
        notes: {
          bookingId,
        },
        theme: {
          color: "#16a34a",
        },

    // Handler runs after successful payment in Razorpay modal.
        handler: async (response: RazorpaySuccessPayload) => {
          try {
            const verifyRes = await fetch("/api/payment/verify-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                bookingId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyJson = await verifyRes.json();
            if (!verifyRes.ok) {
              throw new Error(verifyJson?.error?.message || "Payment verification failed");
            }

            setPaySuccess("Payment verified successfully.");
            router.push(`/booking/${bookingId}/booked?id=${bookingId}`);
          } catch (error) {
            setPayError(
              error instanceof Error ? error.message : "Payment verification failed"
            );
          }
        },
      });

      // Surface a readable payment failure message to the user.
      razorpay.on("payment.failed", (response: RazorpayFailurePayload) => {
        const message =
          response?.error?.description || response?.error?.code || "Payment failed.";
        setPayError(message);
      });

      razorpay.open();

      setPaySuccess("Payment request created successfully.");
    } catch (error) {
      setPayError(
        error instanceof Error ? error.message : "Unable to initiate payment",
      );
    } finally {
      setPaying(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 mt-10">
     {/* Loads Razorpay checkout SDK and attaches window.Razorpay */}
  <Script src="https://checkout.razorpay.com/v1/checkout.js"  />
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-semibold text-slate-900">
          Guest Details & Final Bill
        </h1>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-medium text-slate-900">
              Guest Form
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-slate-700">
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-700">
                  Phone
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-700">
                  City
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-700">
                  Special Request
                </label>
                <textarea
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="Add any special request"
                  className="min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-green-600"
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-medium text-slate-900">
              Final Bill
            </h2>

            {loadingBill ? (
              <p className="text-slate-600">Loading bill...</p>
            ) : billError ? (
              <p className="text-red-600">{billError}</p>
            ) : (
              <div className="space-y-3">
                {payError && <p className="text-sm text-red-600">{payError}</p>}
                {paySuccess && (
                  <p className="text-sm text-green-700">{paySuccess}</p>
                )}

                <div className="flex items-center justify-between text-slate-700">
                  <span>Room Charges</span>
                  <span>{formatInr(roomCharges)}</span>
                </div>

                {packageCharges > 0 && (
                  <div className="flex items-center justify-between text-slate-700">
                    <span>Package Charges</span>
                    <span>{formatInr(packageCharges)}</span>
                  </div>
                )}

                <div className="pt-1 text-sm text-slate-600">
                  Additional Activities
                </div>
                {additionalActivities.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between text-sm text-slate-700"
                  >
                    <span>{item.name}</span>
                    <span>{formatInr(item.price)}</span>
                  </div>
                ))}

                <div className="flex items-center justify-between text-slate-700">
                  <span>Additional Activities Total</span>
                  <span>{formatInr(additionalActivitiesTotal)}</span>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <span>Subtotal</span>
                  <span>{formatInr(subTotal)}</span>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <span>Tax (18%)</span>
                  <span>{formatInr(tax)}</span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-lg font-semibold text-slate-900">
                  <span>Total</span>
                  <span>{formatInr(finalTotal)}</span>
                </div>

                <button
                  type="button"
                  onClick={startCheckout}
                  disabled={!canPay || paying}
                  className="mt-4 w-full rounded-md bg-green-600 py-3 text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {paying ? "Processing..." : "Pay"}
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
