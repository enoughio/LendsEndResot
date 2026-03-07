import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const missingConfigResponse = NextResponse.json(
  { error: "Email service is not configured." },
  { status: 500 }
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = (body?.name || "").trim();
    const email = (body?.email || "").trim();
    const phone = (body?.phone || "").trim();
    const position = (body?.position || "").trim();
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
      from: fromEmail,
      to: toEmail,
      subject: "New Work With Us submission",
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPosition: ${position}\nMessage: ${message}`,
      html: `
        <h2>New work-with-us submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Work with us send error", error);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again." },
      { status: 500 }
    );
  }
}
