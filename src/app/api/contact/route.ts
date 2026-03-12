import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const missingConfigResponse = NextResponse.json(
  { error: "Email service is not configured." },
  { status: 500 }
);

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim();
    const phone = (body?.phone || "").trim();
    const message = (body?.message || "").trim();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const fromEmail = process.env.SMTP_FROM || user;
    const toEmail = process.env.SMTP_TO || fromEmail;
    const secure = port === 465;
    const baseUrl = getBaseUrl();
    const logoUrl = `${baseUrl}/landsend.svg`;
    const termsUrl = `${baseUrl}/terms-and-conditions`;
    const privacyUrl = `${baseUrl}/privacy-policy`;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

    if (!host || !port || !user || !pass || !fromEmail || !toEmail) {
      return missingConfigResponse;
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `Land's End Resort Website <${fromEmail}>`,
      to: toEmail,
      subject: `New Contact Inquiry | ${name}`,
      replyTo: email,
      text: `New contact inquiry received

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}

Submitted via website contact form.
Terms: ${termsUrl}
Privacy: ${privacyUrl}`,
      html: `
        <div style="margin:0;padding:0;background:#f3f7f5;font-family:Arial,sans-serif;color:#0f172a;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
            <tr>
              <td align="center">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border:1px solid #d7e4dd;border-radius:14px;overflow:hidden;">
                  <tr>
                    <td style="padding:20px 24px;background:linear-gradient(135deg,#14532d 0%,#166534 100%);color:#ffffff;">
                      <img src="${logoUrl}" alt="Land's End Resort" width="120" style="display:block;height:auto;max-width:120px;margin-bottom:12px;" />
                      <p style="margin:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.9;">Website Contact Form</p>
                      <h2 style="margin:8px 0 0 0;font-size:22px;line-height:1.3;font-weight:700;">New contact inquiry received</h2>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:24px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#f8fafc;margin-bottom:16px;">
                        <tr>
                          <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b;">Name</td>
                          <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#0f172a;font-weight:600;" align="right">${safeName}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b;">Email</td>
                          <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;font-size:14px;color:#0f172a;" align="right">${safeEmail}</td>
                        </tr>
                        <tr>
                          <td style="padding:12px 14px;font-size:13px;color:#64748b;">Phone</td>
                          <td style="padding:12px 14px;font-size:14px;color:#0f172a;" align="right">${safePhone}</td>
                        </tr>
                      </table>

                      <p style="margin:0 0 8px 0;font-size:13px;color:#64748b;">Message</p>
                      <div style="padding:14px;border:1px solid #e2e8f0;border-radius:12px;background:#ffffff;font-size:14px;line-height:1.7;color:#334155;">
                        ${safeMessage}
                      </div>

                      <p style="margin:14px 0 0 0;font-size:12px;color:#94a3b8;">Submitted via Land&apos;s End website contact form.</p>
                      <p style="margin:6px 0 0 0;font-size:12px;color:#94a3b8;">
                        <a href="${termsUrl}" style="color:#166534;text-decoration:none;">Terms &amp; Conditions</a> |
                        <a href="${privacyUrl}" style="color:#166534;text-decoration:none;"> Privacy Policy</a>
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form send error", error);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again." },
      { status: 500 }
    );
  }
}
