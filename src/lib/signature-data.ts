/** A drawn signature is stored as a data URL. New consents keep this empty. */
export function signatureImageSrc(value?: string | null) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!/^data:image\/[a-z0-9.+-]+(?:;[^,]*)?,/i.test(trimmed)) return null;
  return trimmed;
}
