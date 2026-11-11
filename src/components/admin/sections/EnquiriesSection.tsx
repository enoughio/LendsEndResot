"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { EXIT_POLICY_TEXT, ruleText } from "@/lib/house-rules";

type EnquiryListItem = {
  id: string;
  kind: string;
  contactName: string;
  email: string;
  phone: string;
  preferredDate: string;
  natureOfRetreat?: string | null;
  expectedParticipants?: number | null;
  groupType?: string | null;
  organization?: string | null;
  status: string;
  emailSent: boolean;
  createdAt: string;
};

type EnquiryDetail = EnquiryListItem & {
  consent?: {
    signerName: string;
    signatureData: string;
    acceptedRuleIds: string[];
    exitPolicyAccepted: boolean;
    purpose: string;
  } | null;
};

function adminHeaders() {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const adminKey = process.env.NEXT_PUBLIC_ADMIN_API_KEY;
  if (adminKey) headers["x-admin-key"] = adminKey;
  return headers;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" });
}

export function EnquiriesSection() {
  const [enquiries, setEnquiries] = useState<EnquiryListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<EnquiryDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/enquiries", { headers: adminHeaders() });
      const json = await response.json();
      if (!response.ok) throw new Error(json?.error?.message || "Unable to load enquiries.");
      setEnquiries(json.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load enquiries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const openDetail = async (id: string) => {
    setDetailLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/admin/enquiries/${id}`, { headers: adminHeaders() });
      const json = await response.json();
      if (!response.ok) throw new Error(json?.error?.message || "Unable to load this enquiry.");
      setDetail(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load this enquiry.");
    } finally {
      setDetailLoading(false);
    }
  };

  const markReviewed = async () => {
    if (!detail) return;
    const response = await fetch(`/api/admin/enquiries/${detail.id}`, {
      method: "PATCH",
      headers: adminHeaders(),
      body: JSON.stringify({ status: "REVIEWED" }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json?.error?.message || "Unable to update this enquiry.");
      return;
    }
    setDetail({ ...detail, status: "REVIEWED" });
    setEnquiries((current) => current.map((item) => (item.id === detail.id ? { ...item, status: "REVIEWED" } : item)));
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-stone-400">{loading ? "Loading enquiries..." : `${enquiries.length} enquiries`}</p>
      {error && <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
      <div className="space-y-3">
        {enquiries.map((enquiry) => (
          <button
            key={enquiry.id}
            type="button"
            onClick={() => void openDetail(enquiry.id)}
            className="w-full rounded-2xl border border-white/5 bg-[#151a15] p-4 text-left transition-colors hover:border-white/15"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-300">{enquiry.kind}</span>
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-stone-300">{enquiry.status}</span>
              <span className="text-xs text-stone-500">{enquiry.emailSent ? "Email sent" : "Email not sent"}</span>
            </div>
            <p className="mt-2 text-white">{enquiry.contactName}</p>
            <p className="text-sm text-stone-400">{enquiry.email} · {enquiry.phone}</p>
            <p className="mt-1 text-xs text-stone-500">Preferred {formatDate(enquiry.preferredDate)} · Received {formatDate(enquiry.createdAt)}</p>
          </button>
        ))}
        {!loading && enquiries.length === 0 && <p className="text-sm text-stone-500">No enquiries yet.</p>}
      </div>

      {(detail || detailLoading) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#1a1f1a] shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 p-6">
              <div>
                <h2 className="text-white">{detail?.contactName || "Enquiry"}</h2>
                <p className="mt-1 text-sm text-stone-400">{detail ? `${detail.kind} · ${detail.status}` : "Loading..."}</p>
              </div>
              <button type="button" onClick={() => setDetail(null)} className="rounded-lg p-2 text-stone-400 hover:bg-white/5 hover:text-white" aria-label="Close enquiry">
                <X size={20} />
              </button>
            </div>
            {detail && (
              <div className="space-y-4 p-6 text-sm text-stone-300">
                <div className="grid gap-3 sm:grid-cols-2">
                  <p><span className="text-stone-500">Email</span><br />{detail.email}</p>
                  <p><span className="text-stone-500">Mobile</span><br />{detail.phone}</p>
                  <p><span className="text-stone-500">Preferred date</span><br />{formatDate(detail.preferredDate)}</p>
                  <p><span className="text-stone-500">Email to resort</span><br />{detail.emailSent ? "Sent" : "Not sent"}</p>
                  {detail.kind === "RETREAT" ? (
                    <>
                      <p className="sm:col-span-2"><span className="text-stone-500">Nature of retreat</span><br />{detail.natureOfRetreat}</p>
                      <p><span className="text-stone-500">Expected participants</span><br />{detail.expectedParticipants}</p>
                    </>
                  ) : (
                    <>
                      <p><span className="text-stone-500">Group type</span><br />{detail.groupType === "STAY" ? "Stay with us" : "Day visit"}</p>
                      <p><span className="text-stone-500">Organization</span><br />{detail.organization || "—"}</p>
                    </>
                  )}
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-stone-400">Accepted by {detail.consent?.signerName || "—"}</p>
                  <ul className="mt-3 space-y-1">
                    {(detail.consent?.acceptedRuleIds || []).map((id) => (
                      <li key={id}>· {ruleText(id)}</li>
                    ))}
                  </ul>
                  {detail.consent?.exitPolicyAccepted && <p className="mt-3 text-emerald-200">{EXIT_POLICY_TEXT}</p>}
                  {detail.consent?.signatureData && (
                    <img src={detail.consent.signatureData} alt={`Signature of ${detail.consent.signerName}`} className="mt-4 max-h-40 rounded-lg bg-white p-2" />
                  )}
                </div>
                {detail.status !== "REVIEWED" && (
                  <button type="button" onClick={() => void markReviewed()} className="rounded-xl bg-[#4a8f3f] px-4 py-2 text-white">
                    Mark reviewed
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
