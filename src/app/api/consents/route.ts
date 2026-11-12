import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  HOUSE_RULES,
  isConsentPurpose,
} from "@/lib/house-rules";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const signerName = String(body?.signerName || "").trim();
    const purpose = String(body?.purpose || "").trim();
    const acceptedRuleIds = Array.isArray(body?.acceptedRuleIds)
      ? body.acceptedRuleIds.map((item: unknown) => String(item))
      : [];
    const exitPolicyAccepted = body?.exitPolicyAccepted === true;

    if (signerName.length < 2 || signerName.length > 80) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Please type the name of the person accepting the house rules." } },
        { status: 400 },
      );
    }

    if (!isConsentPurpose(purpose)) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "A valid consent purpose is required." } },
        { status: 400 },
      );
    }

    const requiredIds = HOUSE_RULES.map((rule) => rule.id);
    const missingRule = requiredIds.some((id) => !acceptedRuleIds.includes(id));
    if (missingRule || !exitPolicyAccepted) {
      return NextResponse.json(
        { error: { code: "BAD_REQUEST", message: "Every house rule and the exit policy must be accepted." } },
        { status: 400 },
      );
    }

    const consent = await prisma.houseRulesConsent.create({
      data: {
        signerName,
        signatureData: "",
        acceptedRuleIds: requiredIds,
        exitPolicyAccepted: true,
        purpose,
      },
      select: { id: true, purpose: true },
    });

    return NextResponse.json({ data: consent }, { status: 201 });
  } catch (error) {
    console.error("POST /api/consents failed", error);
    return NextResponse.json(
      { error: { code: "INTERNAL_ERROR", message: "Unable to save house rules consent." } },
      { status: 500 },
    );
  }
}
