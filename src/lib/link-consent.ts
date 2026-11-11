import type { Prisma } from "@/generated/prisma/client";
import type { ConsentPurpose } from "@/lib/house-rules";

export class ConsentLinkError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export async function linkHouseRulesConsent(
  tx: Prisma.TransactionClient,
  input: { consentId: string; purpose: ConsentPurpose; bookingId?: string; enquiryId?: string },
) {
  const id = input.consentId.trim();
  if (!id) {
    throw new ConsentLinkError(400, "BAD_REQUEST", "Please accept the house rules before continuing.");
  }

  const consent = await tx.houseRulesConsent.findUnique({ where: { id } });
  if (!consent) {
    throw new ConsentLinkError(400, "BAD_REQUEST", "A valid house rules consent is required.");
  }
  if (consent.purpose !== input.purpose) {
    throw new ConsentLinkError(400, "BAD_REQUEST", "House rules consent does not match this request.");
  }
  if (consent.bookingId || consent.enquiryId) {
    throw new ConsentLinkError(409, "CONFLICT", "This house rules consent has already been used.");
  }

  const updated = await tx.houseRulesConsent.updateMany({
    where: {
      id,
      purpose: input.purpose,
      bookingId: null,
      enquiryId: null,
    },
    data: {
      bookingId: input.bookingId ?? null,
      enquiryId: input.enquiryId ?? null,
    },
  });

  if (updated.count !== 1) {
    throw new ConsentLinkError(409, "CONFLICT", "This house rules consent has already been used.");
  }
}
