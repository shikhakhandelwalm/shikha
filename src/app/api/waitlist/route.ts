import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown; website?: unknown };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const website = typeof body.website === "string" ? body.website : "";

    if (website || !EMAIL_PATTERN.test(email) || email.length > 254) {
      return Response.json({ ok: false }, { status: 400 });
    }

    const gmailUser = process.env.WAITLIST_GMAIL_USER;
    const gmailAppPassword = process.env.WAITLIST_GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      return Response.json({ ok: false }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    const safeEmail = escapeHtml(email);

    await Promise.all([
      transporter.sendMail({
        from: `HalfPurple Waitlist <${gmailUser}>`,
        to: gmailUser,
        replyTo: email,
        subject: "New HalfPurple early-beta signup",
        text: `${email} joined the HalfPurple early-beta waitlist.`,
        html: `<p><strong>${safeEmail}</strong> joined the HalfPurple early-beta waitlist.</p>`,
      }),
      transporter.sendMail({
        from: `HalfPurple <${gmailUser}>`,
        to: email,
        subject: "You’re on the HalfPurple early-beta list 💜",
        text:
          "Congratulations—you’re on the HalfPurple early-beta list. We’ll email you when access is ready. You’ll be able to explore the app, try the early experience and report anything that feels unclear, broken or missing. Your feedback will help shape HalfPurple.",
        html: `
          <div style="margin:0;background:#f2ecff;padding:32px 16px;font-family:Arial,sans-serif;color:#292231">
            <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #ded3f5">
              <div style="font-size:14px;font-weight:700;color:#7c6fe8">HALFPURPLE</div>
              <h1 style="font-size:28px;line-height:1.2;margin:20px 0 16px">You’re on the early-beta list 💜</h1>
              <p style="font-size:16px;line-height:1.65;color:#655d6d">We’ll email you when access is ready. You’ll be able to explore the app, try the early experience and report anything that feels unclear, broken or missing.</p>
              <p style="font-size:16px;line-height:1.65;font-weight:700;color:#40354d">Your feedback will help shape HalfPurple.</p>
              <div style="margin-top:28px;padding-top:20px;border-top:1px solid #ece7f2;font-size:14px;color:#7c7185">I’m here for you.</div>
            </div>
          </div>
        `,
      }),
    ]);

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
