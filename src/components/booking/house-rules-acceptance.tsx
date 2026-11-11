"use client";

import { useEffect, useRef, useState } from "react";
import {
  EXIT_POLICY_TEXT,
  HOUSE_RULES,
  type ConsentPurpose,
  type HouseRulesAcceptanceValue,
} from "@/lib/house-rules";

type HouseRulesAcceptanceProps = {
  idPrefix?: string;
  onChange: (value: HouseRulesAcceptanceValue) => void;
};

function SignaturePad({ onChange }: { onChange: (value: string | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const hasInk = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prepare = () => {
      if (canvas.dataset.ready === "1" || hasInk.current) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      const context = canvas.getContext("2d");
      if (!context) return;
      context.scale(ratio, ratio);
      context.lineWidth = 2.2;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.strokeStyle = "#1c1917";
      canvas.dataset.ready = "1";
    };

    prepare();
    const observer = new ResizeObserver(prepare);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const publish = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasInk.current) {
      onChange(null);
      return;
    }
    onChange(canvas.toDataURL("image/png"));
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="h-36 w-full touch-none border border-[#e4d7c3] bg-[#fffdf8]"
        aria-label="Draw your signature"
        onPointerDown={(event) => {
          const canvas = canvasRef.current;
          const context = canvas?.getContext("2d");
          if (!canvas || !context) return;
          event.preventDefault();
          canvas.setPointerCapture(event.pointerId);
          drawing.current = true;
          const next = point(event);
          context.beginPath();
          context.moveTo(next.x, next.y);
        }}
        onPointerMove={(event) => {
          if (!drawing.current) return;
          const canvas = canvasRef.current;
          const context = canvas?.getContext("2d");
          if (!context) return;
          const next = point(event);
          context.lineTo(next.x, next.y);
          context.stroke();
          hasInk.current = true;
        }}
        onPointerUp={() => {
          drawing.current = false;
          publish();
        }}
        onPointerCancel={() => {
          drawing.current = false;
        }}
      />
      <button
        type="button"
        className="mt-2 text-sm text-stone-600 underline decoration-stone-400 underline-offset-4 hover:text-[#1f3d2e]"
        onClick={() => {
          const canvas = canvasRef.current;
          const context = canvas?.getContext("2d");
          if (!canvas || !context) return;
          context.save();
          context.setTransform(1, 0, 0, 1, 0, 0);
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.restore();
          hasInk.current = false;
          onChange(null);
        }}
      >
        Clear signature
      </button>
    </div>
  );
}

export async function saveHouseRulesConsent(purpose: ConsentPurpose, value: HouseRulesAcceptanceValue) {
  const response = await fetch("/api/consents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      signerName: value.signerName.trim(),
      signatureData: value.signatureData,
      acceptedRuleIds: value.acceptedRuleIds,
      exitPolicyAccepted: value.exitPolicyAccepted,
      purpose,
    }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json?.error?.message || "Unable to save house rules consent.");
  }
  return String(json.data.id);
}

export function HouseRulesAcceptance({ idPrefix = "house-rules", onChange }: HouseRulesAcceptanceProps) {
  const [accepted, setAccepted] = useState<Record<string, boolean>>({});
  const [exitAccepted, setExitAccepted] = useState(false);
  const [signerName, setSignerName] = useState("");
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    onChangeRef.current({
      acceptedRuleIds: HOUSE_RULES.filter((rule) => accepted[rule.id]).map((rule) => rule.id),
      exitPolicyAccepted: exitAccepted,
      signerName,
      signatureData,
    });
  }, [accepted, exitAccepted, signerName, signatureData]);

  return (
    <section aria-labelledby={`${idPrefix}-title`} className="space-y-3">
      <div>
        <h3 id={`${idPrefix}-title`} className="font-serif text-2xl font-medium text-[#1f3d2e]">
          House rules
        </h3>
        <p className="mt-1 text-sm text-stone-600">Every box, your name, and a signature are required.</p>
      </div>
      {HOUSE_RULES.map((rule) => (
        <label key={rule.id} className="flex items-start gap-3 border border-[#e4d7c3] bg-[#fffdf8] p-3 text-sm text-stone-800">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 accent-[#1f3d2e]"
            checked={Boolean(accepted[rule.id])}
            onChange={(event) => setAccepted((current) => ({ ...current, [rule.id]: event.target.checked }))}
          />
          <span>{rule.text}</span>
        </label>
      ))}
      <label className="flex items-start gap-3 border border-[#e4d7c3] bg-[#f6f1e6] p-3 text-sm font-medium text-stone-800">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-[#1f3d2e]"
          checked={exitAccepted}
          onChange={(event) => setExitAccepted(event.target.checked)}
        />
        <span>{EXIT_POLICY_TEXT}</span>
      </label>
      <div>
        <label htmlFor={`${idPrefix}-signer-name`} className="mb-1 block text-sm font-medium text-stone-800">
          Your name
        </label>
        <input
          id={`${idPrefix}-signer-name`}
          value={signerName}
          onChange={(event) => setSignerName(event.target.value)}
          className="w-full border border-[#e4d7c3] bg-white px-3 py-2.5 text-stone-900 outline-none ring-[#1f3d2e] focus:ring-2"
          placeholder="Type your full name"
          autoComplete="name"
        />
      </div>
      <div>
        <p className="mb-1 text-sm font-medium text-stone-800">Signature</p>
        <SignaturePad onChange={setSignatureData} />
      </div>
    </section>
  );
}
