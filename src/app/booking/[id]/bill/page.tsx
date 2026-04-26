"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Script from "next/script";
import { Sparkles, ShieldCheck, CreditCard, ReceiptText } from "lucide-react";

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

// this is complex understand it later
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
  const [isFinalizingPayment, setIsFinalizingPayment] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [paySuccess, setPaySuccess] = useState<string | null>(null);

  const [roomCharges, setRoomCharges] = useState(0);
  const [packageCharges, setPackageCharges] = useState(0);
  const [mealPlanName, setMealPlanName] = useState<string | null>(null);
  const [mealPlanAmount, setMealPlanAmount] = useState(0);
  const [extraGuestAmount, setExtraGuestAmount] = useState(0);
  const [guestsCount, setGuestsCount] = useState(1);
  const [roomsBooked, setRoomsBooked] = useState(1);
  const [guestDetails, setGuestDetails] = useState<Array<{ name: string; phone: string }>>([]);
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
        setMealPlanName(bill?.mealPlanName ?? null);
        setMealPlanAmount(Number(bill?.mealPlanAmount || 0));
        setExtraGuestAmount(Number(bill?.extraGuestAmount || 0));
        setGuestsCount(Number(bill?.guests || 1));
        setRoomsBooked(Number(bill?.roomsBooked || 1));
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

  useEffect(() => {
    setGuestDetails((prev) => {
      const next = [...prev];
      while (next.length < Math.max(guestsCount - 1, 0)) {
        next.push({ name: "", phone: "" });
      }
      return next.slice(0, Math.max(guestsCount - 1, 0));
    });
  }, [guestsCount]);

  const allGuestDetailsComplete = useMemo(() => {
    return guestDetails.every((guest) => guest.name.trim() && guest.phone.trim());
  }, [guestDetails]);

  const canPay = useMemo(() => {
    return Boolean(fullName.trim() && email.trim() && phone.trim() && allGuestDetailsComplete);
  }, [fullName, email, phone, allGuestDetailsComplete]);

  // Step 1: Create Razorpay order from backend, Step 2: open checkout, Step 3: verify signature.
  const startCheckout = async () => {
    if (!bookingId || !canPay) return;

    try {
      setPaying(true);
      setIsFinalizingPayment(false);
      setPayError(null);
      setPaySuccess(null);

      const finalSpecialRequest = [
        city.trim() ? `City: ${city.trim()}` : "",
        specialRequest.trim(),
      ]
        .filter(Boolean)
        .join(" | ");

      const guestList = [
        { name: fullName.trim(), phone: phone.trim() },
        ...guestDetails.map((guest) => ({
          name: guest.name.trim(),
          phone: guest.phone.trim(),
        })),
      ];

      const orderRes = await fetch(`/api/bookings/${bookingId}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          specialRequest: finalSpecialRequest,
          guestList,
        }),
      });

      
	 
	 // rethink this as well in better way
	//  step 2 
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

		//step 3
        handler: async (response: RazorpaySuccessPayload) => {
          try {
            setIsFinalizingPayment(true);
            setPayError(null);
            setPaySuccess("Payment received. Verifying and preparing your confirmation...");

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

            setPaySuccess("Payment verified successfully. Redirecting to your confirmation page...");
            router.push(`/booking/${bookingId}/booked?id=${bookingId}`);
          } catch (error) {
            setIsFinalizingPayment(false);
            setPayError(
              error instanceof Error ? error.message : "Payment verification failed"
            );
          }
        },
      });

      razorpay.on("payment.failed", (response: RazorpayFailurePayload) => {
        setIsFinalizingPayment(false);
        const message =
          response?.error?.description || response?.error?.code || "Payment failed.";
        setPayError(message);
      });

      razorpay.open();

      setPaySuccess("Payment request created successfully.");
    } catch (error) {
      setIsFinalizingPayment(false);
      setPayError(
        error instanceof Error ? error.message : "Unable to initiate payment",
      );
    } finally {
      setPaying(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-emerald-50/40 via-white to-sky-50/40 px-4 py-8 sm:px-6 sm:py-10">
      {/* loads razorpay script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-2xl border border-white/60 bg-white/90 p-5 shadow-sm backdrop-blur-sm sm:p-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" />
            Final step before confirmation
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-900 sm:text-3xl">
            Guest Details & Final Bill
          </h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Fill in your details, review the charges, and complete payment securely.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-lg font-medium text-slate-900">
              Guest Form
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-slate-700">
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-100"
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
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-100"
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
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-slate-700">
                  City
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-slate-700">
                  Special Request
                </label>
                <textarea
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="Add any special request"
                  className="min-h-24 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div className="sm:col-span-2 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-800">Guest list</p>
                  <p className="text-xs text-slate-600">
                    {guestsCount} guests{roomsBooked > 1 ? ` • ${roomsBooked} rooms` : ""}
                  </p>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Add the name and phone number for each guest traveling with you.
                </p>

                <div className="mt-4 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs text-slate-600">Guest 1 name</label>
                      <input
                        value={fullName}
                        disabled
                        className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-slate-600">Guest 1 phone</label>
                      <input
                        value={phone}
                        disabled
                        className="w-full rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-700"
                      />
                    </div>
                  </div>

                  {guestDetails.map((guest, index) => {
                    const guestIndex = index + 2;
                    return (
                      <div key={`guest-${guestIndex}`} className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs text-slate-600">Guest {guestIndex} name</label>
                          <input
                            value={guest.name}
                            onChange={(e) =>
                              setGuestDetails((prev) => {
                                const next = [...prev];
                                next[index] = { ...next[index], name: e.target.value };
                                return next;
                              })
                            }
                            placeholder="Enter guest name"
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-100"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs text-slate-600">Guest {guestIndex} phone</label>
                          <input
                            value={guest.phone}
                            onChange={(e) =>
                              setGuestDetails((prev) => {
                                const next = [...prev];
                                next[index] = { ...next[index], phone: e.target.value };
                                return next;
                              })
                            }
                            placeholder="Enter phone number"
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-100"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6 lg:h-fit">
            <div className="mb-4 flex items-center gap-2">
              <ReceiptText className="h-5 w-5 text-slate-700" />
              <h2 className="text-lg font-medium text-slate-900">Final Bill</h2>
            </div>

            {loadingBill ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 w-2/3 rounded bg-slate-100" />
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-5/6 rounded bg-slate-100" />
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-3/4 rounded bg-slate-100" />
                <div className="h-10 w-full rounded bg-slate-100" />
              </div>
            ) : billError ? (
              <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">
                {billError}
              </p>
            ) : (
              <div className="space-y-3">
                {payError && <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">{payError}</p>}
                {paySuccess && (
                  <p className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">{paySuccess}</p>
                )}

                <div className="flex items-center justify-between text-slate-700">
                  <span>
                    Room Charges{roomsBooked > 1 ? ` (${roomsBooked} rooms)` : ""}
                  </span>
                  <span>{formatInr(roomCharges)}</span>
                </div>

                {packageCharges > 0 && (
                  <div className="flex items-center justify-between text-slate-700">
                    <span>Package Charges</span>
                    <span>{formatInr(packageCharges)}</span>
                  </div>
                )}

                {mealPlanAmount > 0 && (
                  <div className="flex items-center justify-between text-slate-700">
                    <span>Meal Plan{mealPlanName ? ` (${mealPlanName})` : ""}</span>
                    <span>{formatInr(mealPlanAmount)}</span>
                  </div>
                )}

                {extraGuestAmount > 0 && (
                  <div className="flex items-center justify-between text-slate-700">
                    <span>Extra mattresses</span>
                    <span>{formatInr(extraGuestAmount)}</span>
                  </div>
                )}

                <div className="pt-1 text-sm font-medium text-slate-700">
                  Additional Activities
                </div>

                {additionalActivities.length === 0 ? (
                  <p className="text-sm text-slate-500">No additional activities selected.</p>
                ) : (
                  additionalActivities.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm text-slate-700"
                    >
                      <span>{item.name}</span>
                      <span>{formatInr(item.price)}</span>
                    </div>
                  ))
                )}

                <div className="flex items-center justify-between text-slate-700">
                  <span>Additional Activities Total</span>
                  <span>{formatInr(additionalActivitiesTotal)}</span>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <span>Subtotal</span>
                  <span>{formatInr(subTotal)}</span>
                </div>

                <div className="flex items-center justify-between text-slate-700">
                  <span>Tax (5%)</span>
                  <span>{formatInr(tax)}</span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-lg font-semibold text-slate-900">
                  <span>Total</span>
                  <span>{formatInr(finalTotal)}</span>
                </div>

                <button
                  type="button"
                  onClick={startCheckout}
                  disabled={!canPay || paying || isFinalizingPayment}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 py-3 font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <CreditCard className="h-4 w-4" />
                  {isFinalizingPayment ? "Finalizing Payment..." : paying ? "Processing..." : "Pay Securely"}
                </button>

                <div className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-3 text-xs text-emerald-800">
                  <p className="inline-flex items-center gap-2 font-medium">
                    <ShieldCheck className="h-4 w-4" />
                    Your payment is encrypted and securely processed.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {isFinalizingPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 px-4 backdrop-blur-[1px]">
          <div className="w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-5 shadow-xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Payment completed
            </p>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">Please wait while we confirm your booking</h3>
            <p className="mt-1 text-sm text-slate-600">We are verifying your payment and redirecting you to your booked page.</p>

            <div className="mt-4 space-y-2 animate-pulse">
              <div className="h-2 w-full rounded bg-emerald-100" />
              <div className="h-2 w-5/6 rounded bg-emerald-100" />
              <div className="h-2 w-2/3 rounded bg-emerald-100" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
