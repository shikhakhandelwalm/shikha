import tls from "node:tls";

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

function encodeHeader(value: string) {
  return `=?UTF-8?B?${Buffer.from(value).toString("base64")}?=`;
}

function createMessage({
  from,
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const boundary = `halfpurple-${crypto.randomUUID()}`;
  const headers = [
    `From: HalfPurple <${from}>`,
    `To: ${to}`,
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];

  if (replyTo) headers.push(`Reply-To: ${replyTo}`);

  return [
    ...headers,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    text,
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    html,
    `--${boundary}--`,
    "",
  ].join("\r\n");
}

async function sendWithGmail({
  gmailUser,
  gmailAppPassword,
  to,
  subject,
  text,
  html,
  replyTo,
}: {
  gmailUser: string;
  gmailAppPassword: string;
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const socket = tls.connect({
    host: "smtp.gmail.com",
    port: 465,
    servername: "smtp.gmail.com",
    rejectUnauthorized: true,
  });

  socket.setEncoding("utf8");
  socket.setTimeout(12_000);

  let buffer = "";
  const waiters: Array<{
    resolve: (response: string) => void;
    reject: (error: Error) => void;
  }> = [];

  socket.on("data", (chunk: string) => {
    buffer += chunk;
    const lines = buffer.split("\r\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (/^\d{3} /.test(line)) waiters.shift()?.resolve(line);
    }
  });

  socket.on("error", (error) => {
    waiters.shift()?.reject(error);
  });

  socket.on("timeout", () => {
    socket.destroy(new Error("Gmail SMTP connection timed out"));
  });

  const response = () =>
    new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Gmail SMTP timed out")), 12_000);
      waiters.push({
        resolve: (line) => {
          clearTimeout(timeout);
          resolve(line);
        },
        reject: (error) => {
          clearTimeout(timeout);
          reject(error);
        },
      });
    });

  const command = async (value: string, expected: number[]) => {
    const nextResponse = response();
    socket.write(`${value}\r\n`);
    const result = await nextResponse;
    const code = Number(result.slice(0, 3));
    if (!expected.includes(code)) throw new Error(`Gmail SMTP rejected the message (${code})`);
  };

  try {
    const greeting = await response();
    if (!greeting.startsWith("220")) throw new Error("Gmail SMTP was unavailable");

    await command("EHLO halfpurple.app", [250]);
    await command("AUTH LOGIN", [334]);
    await command(Buffer.from(gmailUser).toString("base64"), [334]);
    await command(Buffer.from(gmailAppPassword.replace(/\s/g, "")).toString("base64"), [235]);
    await command(`MAIL FROM:<${gmailUser}>`, [250]);
    await command(`RCPT TO:<${to}>`, [250, 251]);
    await command("DATA", [354]);

    const message = createMessage({
      from: gmailUser,
      to,
      subject,
      text,
      html,
      replyTo,
    }).replace(/\r\n\./g, "\r\n..");

    await command(`${message}\r\n.`, [250]);
    await command("QUIT", [221]);
  } finally {
    socket.end();
  }
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

    const safeEmail = escapeHtml(email);

    await sendWithGmail({
      gmailUser,
      gmailAppPassword,
      to: gmailUser,
      replyTo: email,
      subject: "New HalfPurple waitlist signup",
      text: `${email} joined the HalfPurple early access waitlist.`,
      html: `<p><strong>${safeEmail}</strong> joined the HalfPurple early access waitlist.</p>`,
    });

    await sendWithGmail({
      gmailUser,
      gmailAppPassword,
      to: email,
      subject: "You’re on the HalfPurple early access list 💜",
      text:
        "You’re on the HalfPurple early access list. Early access begins Friday, October 16, 2026, at 12:00 p.m. Pacific. We’ll email you with access details. You’ll be able to explore the app, try the early experience and report anything that feels unclear, broken or missing. Your feedback will help shape HalfPurple.",
      html: `
        <div style="margin:0;background:#f2ecff;padding:32px 16px;font-family:Arial,sans-serif;color:#292231">
          <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:24px;padding:32px;border:1px solid #ded3f5">
            <div style="font-size:14px;font-weight:700;color:#7c6fe8">HALFPURPLE</div>
            <h1 style="font-size:28px;line-height:1.2;margin:20px 0 16px">You’re on the early access list 💜</h1>
            <p style="font-size:16px;line-height:1.65;color:#655d6d">Early access begins Friday, October 16, 2026, at 12:00 p.m. Pacific. We’ll email you with access details. You’ll be able to explore the app, try the early experience and report anything that feels unclear, broken or missing.</p>
            <p style="font-size:16px;line-height:1.65;font-weight:700;color:#40354d">Your feedback will help shape HalfPurple.</p>
            <div style="margin-top:28px;padding-top:20px;border-top:1px solid #ece7f2;font-size:14px;color:#7c7185">I’m here for you.</div>
          </div>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error(
      "HalfPurple waitlist delivery failed:",
      error instanceof Error ? error.message : "Unknown email delivery error",
    );
    return Response.json({ ok: false }, { status: 500 });
  }
}
