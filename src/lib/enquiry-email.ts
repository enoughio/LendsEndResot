import nodemailer from "nodemailer";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export type EnquiryEmailInput = {
  kind: "RETREAT" | "GROUP";
  contactName: string;
  email: string;
  phone: string;
  preferredDate: Date;
  natureOfRetreat?: string | null;
  expectedParticipants?: number | null;
  groupType?: string | null;
  organization?: string | null;
};

export async function sendBookingEnquiryEmail(input: EnquiryEmailInput): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const fromEmail = process.env.SMTP_FROM || user;
  const toEmail = process.env.SMTP_TO || fromEmail;

  if (!host || !port || !user || !pass || !fromEmail || !toEmail) {
    return false;
  }

  const dateLabel = input.preferredDate.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const kindLabel = input.kind === "RETREAT" ? "Retreat" : "Group";
  const rows: Array<[string, string]> = [
    ["Type", kindLabel],
    ["Name", input.contactName],
    ["Email", input.email],
    ["Mobile", input.phone],
    ["Preferred date", dateLabel],
  ];

  if (input.kind === "RETREAT") {
    rows.push(["Nature of retreat", input.natureOfRetreat || "—"]);
    rows.push(["Expected participants", String(input.expectedParticipants || "—")]);
  } else {
    rows.push(["Group type", input.groupType === "STAY" ? "Stay with us" : "Day visit"]);
    rows.push(["Organization", input.organization || "—"]);
  }

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b;">${escapeHtml(label)}</td>
          <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#0f172a;font-weight:600;" align="right">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `Land's End Resort Website <${fromEmail}>`,
      to: toEmail,
      replyTo: input.email,
      subject: `New ${kindLabel} enquiry | ${input.contactName}`,
      text: `New ${kindLabel.toLowerCase()} enquiry\n\n${text}`,
      html: `
        <div style="margin:0;padding:0;background:#f3f7f5;font-family:Arial,sans-serif;color:#0f172a;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #d7e4dd;border-radius:14px;overflow:hidden;">
                  <tr>
                    <td style="padding:20px 24px;background:linear-gradient(135deg,#14532d 0%,#166534 100%);color:#ffffff;">
                      <p style="margin:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.9;">Land's End booking enquiry</p>
                      <h2 style="margin:8px 0 0 0;font-size:22px;line-height:1.3;font-weight:700;">New ${escapeHtml(kindLabel.toLowerCase())} enquiry</h2>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#f8fafc;">
                        ${htmlRows}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("Booking enquiry email failed", error);
    return false;
  }
}
