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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://landsend.bharatstorytellers.com"
  ).replace(/\/$/, "");
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

  const baseUrl = getBaseUrl();
  const logoUrl = `${baseUrl}/landsend.svg`;
  const bookingDetailsUrl = `${baseUrl}/booking/${input.bookingId}/booked`;
  const termsUrl = `${baseUrl}/terms-and-conditions`;
  const privacyUrl = `${baseUrl}/privacy-policy`;
  const mapUrl = "https://maps.app.goo.gl/BNvC131L8wwmBHbi8";

  const safeGuestName = escapeHtml(input.guestName || "Guest");
  const safeBookingId = escapeHtml(input.bookingId);
  const safeBookingLine = escapeHtml(bookingLine);
  const amountPaid = formatAmount(input.totalAmount, input.currency);
  const safeAmountPaid = escapeHtml(amountPaid);
  const bookingTypeLabel = input.bookingType === "STAY" ? "Stay" : "Visit";

  await transporter.sendMail({
    from: fromEmail,
    to: input.to,
    subject: `Booking Confirmed - ${input.bookingId}`,
    text: `Hi ${input.guestName},

Your booking has been confirmed.

Booking Reference: ${input.bookingId}
${bookingTypeLabel} Details: ${bookingLine}
Amount Paid: ${amountPaid}

View booking details: ${bookingDetailsUrl}

Resort Contact:
Phone: +91 8871317382
Email: landsend.sumiran@gmail.com
Location: Land's End Resort at Sumiran Ecological Foundation, Sagoni, Bilkisganj, Madhya Pradesh 466115
Map: ${mapUrl}

Terms & Conditions: ${termsUrl}
Privacy Policy: ${privacyUrl}

Thank you for choosing Land's End Resort at Sumiran.
`,
    html: `
      <div style="margin:0;padding:0;background:#f3f7f5;font-family:Arial,sans-serif;color:#0f172a;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #d7e4dd;border-radius:14px;overflow:hidden;">
                <tr>
                  <td style="padding:20px 24px;background:linear-gradient(135deg,#14532d 0%,#166534 100%);color:#ffffff;">
                    <img src="${logoUrl}" alt="Land's End Resort" width="120" style="display:block;height:auto;max-width:120px;margin-bottom:12px;" />
                    <p style="margin:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.9;">Booking Confirmation</p>
                    <h1 style="margin:8px 0 0 0;font-size:22px;line-height:1.3;font-weight:700;">Your booking is confirmed</h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;">Hi ${safeGuestName},</p>
                    <p style="margin:0 0 18px 0;font-size:15px;line-height:1.6;color:#334155;">
                      Thank you for choosing <strong>Land's End Resort at Sumiran</strong>. Your booking has been successfully confirmed.
                    </p>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#f8fafc;margin-bottom:18px;">
                      <tr>
                        <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#475569;">Booking Reference</td>
                        <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;font-weight:700;color:#0f172a;" align="right">${safeBookingId}</td>
                      </tr>
                      <tr>
                        <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#475569;">${bookingTypeLabel} Details</td>
                        <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#0f172a;" align="right">${safeBookingLine}</td>
                      </tr>
                      <tr>
                        <td style="padding:14px 16px;font-size:14px;color:#475569;">Amount Paid</td>
                        <td style="padding:14px 16px;font-size:16px;font-weight:700;color:#166534;" align="right">${safeAmountPaid}</td>
                      </tr>
                    </table>

                    <p style="margin:0 0 18px 0;">
                      <a href="${bookingDetailsUrl}" style="display:inline-block;background:#16a34a;color:#ffffff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:600;font-size:14px;">View Booking Details</a>
                    </p>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#ffffff;margin-bottom:18px;">
                      <tr>
                        <td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#0f172a;font-weight:600;">Resort Contact</td>
                      </tr>
                      <tr>
                        <td style="padding:12px 16px;font-size:14px;line-height:1.7;color:#334155;">
                          Phone: +91 8871317382<br />
                          Email: landsend.sumiran@gmail.com<br />
                          Address: Land's End Resort at Sumiran Ecological Foundation, Sagoni, Bilkisganj, Madhya Pradesh 466115<br />
                          Map: <a href="${mapUrl}" style="color:#166534;text-decoration:none;">Open location</a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0;font-size:12px;line-height:1.7;color:#64748b;">
                      By continuing with this booking, you agree to our
                      <a href="${termsUrl}" style="color:#166534;text-decoration:none;"> Terms &amp; Conditions</a>
                      and
                      <a href="${privacyUrl}" style="color:#166534;text-decoration:none;"> Privacy Policy</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    `,
  });
}
