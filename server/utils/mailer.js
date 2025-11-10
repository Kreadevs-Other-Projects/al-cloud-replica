import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

export async function sendContactEmail(payload) {
  const { name, email, phone, subject, message } = payload;
  const to = process.env.CONTACT_INBOX || "support@cloudcare.com";
  const html = `
    <h3>New Contact Submission</h3>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Phone:</b> ${phone || "-"}</p>
    <p><b>Subject:</b> ${subject || "-"}</p>
    <p><b>Message:</b><br/>${message.replace(/\n/g, "<br/>")}</p>
  `;
  await mailer.sendMail({
    to,
    from: `"CloudCare Website" <no-reply@cloudcare.com>`,
    subject: `Contact: ${subject || "New message"} — ${name}`,
    html,
    replyTo: email,
  });
}
