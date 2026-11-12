"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Script from "next/script";
import { ShieldCheck, CreditCard, AlertCircle } from "lucide-react";
import { HouseRulesAcceptance, saveHouseRulesConsent } from "@/components/booking/house-rules-acceptance";
import {
  CANCELLATION_POLICY,
  emptyHouseRulesAcceptance,
  isHouseRulesAcceptanceComplete,
  type ConsentPurpose,
  type HouseRulesAcceptanceValue,
} from "@/lib/house-rules";

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
  const [bookingPurpose, setBookingPurpose] = useState<ConsentPurpose>("STAY");
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [holdExpired, setHoldExpired] = useState(false);
  const [houseRules, setHouseRules] = useState<HouseRulesAcceptanceValue>(emptyHouseRulesAcceptance());
  const [houseRulesOpen, setHouseRulesOpen] = useState(false);
  const houseRulesDialogRef = useRef<HTMLDivElement>(null);
  const [consentId, setConsentId] = useState<string | null>(null);
  const houseRulesRef = useRef(houseRules);
  const consentIdRef = useRef<string | null>(null);
  houseRulesRef.current = houseRules;
  consentIdRef.current = consentId;
  const [additionalActivities, setAdditionalActivities] = useState<
    Array<{ id: string; name: string; price: number }>
  >([]);
  const [additionalActivitiesTotal, setAdditionalActivitiesTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [convenienceFee, setConvenienceFee] = useState(0);
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
        setBookingPurpose(bill?.bookingType === "VISIT" ? "VISIT" : "STAY");
        setExpiresAt(typeof bill?.expiresAt === "string" ? bill.expiresAt : null);
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
        setConvenienceFee(Number(bill?.convenienceFeeAmount || 0));
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

  useEffect(() => {
    if (!expiresAt) {
      setHoldExpired(false);
      return;
    }
    const remaining = new Date(expiresAt).getTime() - Date.now();
    if (remaining <= 0) {
      setHoldExpired(true);
      return;
    }
    setHoldExpired(false);
    const timer = window.setTimeout(() => setHoldExpired(true), remaining);
    return () => window.clearTimeout(timer);
  }, [expiresAt]);

  useEffect(() => {
    if (!houseRulesOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setHouseRulesOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    houseRulesDialogRef.current?.focus();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [houseRulesOpen]);

  const partialOptionalGuests = useMemo(() => {
    return guestDetails.flatMap((guest, index) => {
      const hasName = Boolean(guest.name.trim());
      const hasPhone = Boolean(guest.phone.trim());
      if (hasName === hasPhone) return [];
      return [`Guest ${index + 2}'s name and mobile, or leave both blank`];
    });
  }, [guestDetails]);

  const houseRulesComplete = isHouseRulesAcceptanceComplete(houseRules);

  const canPay = useMemo(() => {
    return Boolean(fullName.trim() && email.trim() && phone.trim() && houseRulesComplete && partialOptionalGuests.length === 0 && !holdExpired);
  }, [fullName, email, phone, houseRulesComplete, partialOptionalGuests.length, holdExpired]);

  const missingPaymentDetails = useMemo(() => {
    const missing: string[] = [];
    if (!fullName.trim()) missing.push("your full name");
    if (!email.trim()) missing.push("your email");
    if (!phone.trim()) missing.push("your mobile number");
    if (!houseRulesComplete) missing.push("the house rules");
    return [...missing, ...partialOptionalGuests];
  }, [fullName, email, phone, houseRulesComplete, partialOptionalGuests]);

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
        ...guestDetails
          .map((guest) => ({
            name: guest.name.trim(),
            phone: guest.phone.trim(),
          }))
          .filter((guest) => guest.name && guest.phone),
      ];

      let nextConsentId = consentIdRef.current;
      if (!nextConsentId) {
        nextConsentId = await saveHouseRulesConsent(bookingPurpose, houseRulesRef.current);
        consentIdRef.current = nextConsentId;
        setConsentId(nextConsentId);
      }

      const orderRes = await fetch(`/api/bookings/${bookingId}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          specialRequest: finalSpecialRequest,
          guestList,
          consentId: nextConsentId,
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
          color: "#1f3d2e",
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
    <main className="min-h-screen bg-[#f6f1e6] px-4 pb-20 pt-24 text-stone-800 sm:px-6 lg:px-10">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="mx-auto max-w-6xl">
        <Link href="/booking" className="text-sm text-stone-600 underline decoration-stone-400 underline-offset-4 hover:text-[#1f3d2e]">
          Back to booking
        </Link>
        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6d5a38]">Land&apos;s End · The Last Resort</p>
          <h1 className="mt-3 font-serif text-4xl font-medium tracking-tight text-[#1f3d2e] sm:text-5xl">
            Guest details and bill
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-700">
            Fill in your details, review the charges, and complete payment securely.
          </p>
          {expiresAt && !holdExpired && (
            <p className="mt-3 text-sm text-stone-700">This room is held for 15 minutes while you pay.</p>
          )}
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <section className="border border-[#e4d7c3] bg-[#fffdf8] p-5 sm:p-7">
            <h2 className="mb-4 font-serif text-2xl text-[#1f3d2e]">
              Guest form
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-stone-700">
                  Full Name
                </label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full border border-[#e4d7c3] bg-white px-3 py-2.5 text-stone-900 outline-none ring-[#1f3d2e] focus:ring-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-stone-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full border border-[#e4d7c3] bg-white px-3 py-2.5 text-stone-900 outline-none ring-[#1f3d2e] focus:ring-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-stone-700">
                  Mobile
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter mobile number"
                  className="w-full border border-[#e4d7c3] bg-white px-3 py-2.5 text-stone-900 outline-none ring-[#1f3d2e] focus:ring-2"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-stone-700">
                  City
                </label>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                  className="w-full border border-[#e4d7c3] bg-white px-3 py-2.5 text-stone-900 outline-none ring-[#1f3d2e] focus:ring-2"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm text-stone-700">
                  Special Request
                </label>
                <textarea
                  value={specialRequest}
                  onChange={(e) => setSpecialRequest(e.target.value)}
                  placeholder="Add any special request"
                  className="min-h-24 w-full border border-[#e4d7c3] bg-white px-3 py-2.5 text-stone-900 outline-none ring-[#1f3d2e] focus:ring-2"
                />
              </div>

              <p className="sm:col-span-2 text-sm text-stone-600">
                Only the lead guest&apos;s name, email, and mobile are needed before payment.
                {guestsCount > 1 ? ` This booking is for ${guestsCount} guests${roomsBooked > 1 ? ` in ${roomsBooked} rooms` : ""}.` : ""}
              </p>

              {guestsCount > 1 && (
              <div className="border border-[#e4d7c3] bg-[#f6f1e6] p-4 sm:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-stone-800">Other guests (optional)</p>
                  <p className="text-xs text-stone-600">
                    {guestsCount} guests{roomsBooked > 1 ? ` • ${roomsBooked} rooms` : ""}
                  </p>
                </div>
                <p className="mt-1 text-xs text-stone-600">
                  Add the other names if you have them. You can pay without this list.
                </p>

                <div className="mt-4 space-y-3">
                  {guestDetails.map((guest, index) => {
                    const guestIndex = index + 2;
                    return (
                      <div key={`guest-${guestIndex}`} className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs text-stone-600">Guest {guestIndex} name</label>
                          <input
                            value={guest.name}
                            onChange={(e) =>
                              setGuestDetails((prev) => {
                                const next = [...prev];
                                next[index] = { ...next[index], name: e.target.value };
                                return next;
                              })
                            }
                            placeholder="Optional"
                            className="w-full border border-[#e4d7c3] bg-white px-3 py-2 text-sm text-stone-900 outline-none ring-[#1f3d2e] focus:ring-2"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs text-stone-600">Guest {guestIndex} mobile</label>
                          <input
                            value={guest.phone}
                            onChange={(e) =>
                              setGuestDetails((prev) => {
                                const next = [...prev];
                                next[index] = { ...next[index], phone: e.target.value };
                                return next;
                              })
                            }
                            placeholder="Optional"
                            className="w-full border border-[#e4d7c3] bg-white px-3 py-2 text-sm text-stone-900 outline-none ring-[#1f3d2e] focus:ring-2"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              )}
            </div>
          </section>

          <section className="border border-[#e4d7c3] bg-[#fffdf8] p-5 sm:p-7">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">Charges</p>
              <h2 className="mt-2 font-serif text-2xl text-[#1f3d2e]">Final bill</h2>
            </div>

            {loadingBill ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 w-2/3 rounded bg-[#e4d7c3]" />
                <div className="h-4 w-full rounded bg-[#e4d7c3]" />
                <div className="h-4 w-5/6 rounded bg-[#e4d7c3]" />
                <div className="h-4 w-full rounded bg-[#e4d7c3]" />
                <div className="h-4 w-3/4 rounded bg-[#e4d7c3]" />
                <div className="h-10 w-full rounded bg-[#e4d7c3]" />
              </div>
            ) : billError ? (
              <p className="border border-red-200 bg-red-50 p-3 text-red-700">
                {billError}
              </p>
            ) : (
              <div className="space-y-3">
                {payError && <p className="border border-red-200 bg-red-50 p-3 text-sm text-red-700">{payError}</p>}
                {paySuccess && (
                  <p className="border border-[#e4d7c3] bg-[#f6f1e6] p-3 text-sm text-[#1f3d2e]">{paySuccess}</p>
                )}

                <div className="flex items-center justify-between text-stone-700">
                  <span>
                    Room Charges{roomsBooked > 1 ? ` (${roomsBooked} rooms)` : ""}
                  </span>
                  <span>{formatInr(roomCharges)}</span>
                </div>

                {packageCharges > 0 && (
                  <div className="flex items-center justify-between text-stone-700">
                    <span>Package Charges</span>
                    <span>{formatInr(packageCharges)}</span>
                  </div>
                )}

                {mealPlanAmount > 0 && (
                  <div className="flex items-center justify-between text-stone-700">
                    <span>Meal Plan{mealPlanName ? ` (${mealPlanName})` : ""}</span>
                    <span>{formatInr(mealPlanAmount)}</span>
                  </div>
                )}

                {extraGuestAmount > 0 && (
                  <div className="flex items-center justify-between text-stone-700">
                    <span>Extra mattresses/Bed</span>
                    <span>{formatInr(extraGuestAmount)}</span>
                  </div>
                )}

                <div className="pt-1 text-sm font-medium text-stone-700">
                  Additional Activities
                </div>

                {additionalActivities.length === 0 ? (
                  <p className="text-sm text-stone-500">No additional activities selected.</p>
                ) : (
                  additionalActivities.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm text-stone-700"
                    >
                      <span>{item.name}</span>
                      <span>{formatInr(item.price)}</span>
                    </div>
                  ))
                )}

                <div className="flex items-center justify-between text-stone-700">
                  <span>Additional Activities Total</span>
                  <span>{formatInr(additionalActivitiesTotal)}</span>
                </div>

                <div className="flex items-center justify-between text-stone-700">
                  <span>Subtotal</span>
                  <span>{formatInr(subTotal)}</span>
                </div>

                <div className="flex items-center justify-between text-stone-700">
                  <span>GST(5%)</span>
                  <span>{formatInr(tax)}</span>
                </div>

                <div className="flex items-center justify-between text-stone-700">
                  <span>Convenience Fee (3%)</span>
                  <span>{formatInr(convenienceFee)}</span>
                </div>

                <div className="mt-3 flex items-end justify-between border-t border-[#e4d7c3] pt-4 text-stone-900">
                  <span className="text-sm uppercase tracking-[0.16em] text-[#6d5a38]">Total</span>
                  <span className="font-serif text-3xl">{formatInr(finalTotal)}</span>
                </div>

                <p className="mt-4 text-sm leading-6 text-stone-700">{CANCELLATION_POLICY}</p>

                <div className="mt-4 border-t border-[#e4d7c3] pt-4">
                  <div className="flex items-center justify-between gap-4 border border-[#e4d7c3] bg-[#fffdf8] p-4">
                    <div>
                      <p className="text-sm font-medium text-[#1f3d2e]">House rules</p>
                      <p className="mt-1 text-sm text-stone-600">
                        {houseRulesComplete ? "Accepted" : "Not accepted yet"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setHouseRulesOpen(true)}
                      className="shrink-0 bg-[#1f3d2e] px-4 py-2.5 text-sm font-semibold text-[#f6f1e6] hover:bg-[#173026]"
                    >
                      {houseRulesComplete ? "Review" : "Read and accept"}
                    </button>
                  </div>
                </div>

                {holdExpired && (
                  <div className="mt-4 border border-[#e4d7c3] bg-[#f6f1e6] p-3 text-sm text-stone-800" role="alert">
                    This room hold has expired.{" "}
                    <Link href="/booking/stay" className="font-medium text-[#1f3d2e] underline decoration-stone-400 underline-offset-4">
                      Choose your dates again.
                    </Link>
                  </div>
                )}

                {!canPay && !holdExpired && (
                  <div
                    className="mt-4 flex items-start gap-2 border border-[#e4d7c3] bg-[#f6f1e6] p-3 text-sm text-stone-800"
                    role="alert"
                    aria-live="polite"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>Please complete {missingPaymentDetails.join(", ")} before making the payment.</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={startCheckout}
                  disabled={!canPay || paying || isFinalizingPayment}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-[#1f3d2e] py-3 text-sm font-semibold text-[#f6f1e6] hover:bg-[#173026] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <CreditCard className="h-4 w-4" />
                  {isFinalizingPayment ? "Finalizing Payment..." : paying ? "Processing..." : "Pay Securely"}
                </button>

                <div className="mt-4 border border-[#e4d7c3] bg-[#f6f1e6] p-3 text-xs text-stone-700">
                  <p className="inline-flex items-center gap-2 font-medium text-[#1f3d2e]">
                    <ShieldCheck className="h-4 w-4" />
                    Your payment is encrypted and securely processed.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {houseRulesOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f3d2e]/40 px-4 py-6"
          onClick={() => setHouseRulesOpen(false)}
        >
          <div
            ref={houseRulesDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bill-house-rules-title"
            tabIndex={-1}
            className="flex max-h-full w-full max-w-xl flex-col border border-[#e4d7c3] bg-[#fffdf8] outline-none"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-end border-b border-[#e4d7c3] px-4 py-3">
              <button
                type="button"
                onClick={() => setHouseRulesOpen(false)}
                className="text-sm font-medium text-[#1f3d2e] underline decoration-stone-400 underline-offset-4 hover:text-[#173026]"
              >
                Close
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <HouseRulesAcceptance idPrefix="bill-house-rules" value={houseRules} onChange={setHouseRules} />
            </div>
            <div className="border-t border-[#e4d7c3] px-5 py-4">
              <button
                type="button"
                disabled={!houseRulesComplete}
                onClick={() => {
                  if (!houseRulesComplete) return;
                  setHouseRulesOpen(false);
                }}
                className="inline-flex w-full items-center justify-center bg-[#1f3d2e] py-3 text-sm font-semibold text-[#f6f1e6] hover:bg-[#173026] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      {isFinalizingPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f3d2e]/40 px-4">
          <div className="w-full max-w-md border border-[#e4d7c3] bg-[#fffdf8] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6d5a38]">
              Payment completed
            </p>
            <h3 className="mt-3 font-serif text-2xl text-[#1f3d2e]">Please wait while we confirm your booking</h3>
            <p className="mt-2 text-sm leading-6 text-stone-600">We are verifying your payment and redirecting you to your booked page.</p>

            <div className="mt-4 space-y-2 animate-pulse">
              <div className="h-2 w-full bg-[#e4d7c3]" />
              <div className="h-2 w-5/6 bg-[#e4d7c3]" />
              <div className="h-2 w-2/3 bg-[#e4d7c3]" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
