import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { appointmentSchema } from '@/src/lib/validation';
import { sanityClient } from '@/src/sanity/client';

export const runtime = 'nodejs';

// Very small in-memory rate limiter (per server instance). Not a
// substitute for a real WAF/edge rate limit, but stops trivial
// same-IP form spam without adding external dependencies.
const submissionLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

async function resolveLabel(type: 'service' | 'doctor', id?: string) {
  if (!id) return null;
  try {
    const doc = await sanityClient.fetch(
      /* groq */ `*[_type == $type && _id == $id][0]{ name }`,
      { type, id }
    );
    return doc?.name ?? null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: 'Too many requests. Please try again later, or contact us directly.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  const result = appointmentSchema.safeParse(body);

  if (!result.success) {
    // Honeypot silently "succeeds" from the bot's point of view so it
    // doesn't learn to adapt — but we don't actually process it.
    const flattenedErrors = result.error.flatten().fieldErrors;
    if (flattenedErrors.company) {
      return NextResponse.json({ ok: true });
    }

    const fieldErrors: Record<string, string> = {};
    for (const [key, messages] of Object.entries(flattenedErrors)) {
      if (messages && messages[0]) fieldErrors[key] = messages[0];
    }

    return NextResponse.json(
      { message: 'Please check the highlighted fields and try again.', fieldErrors },
      { status: 400 }
    );
  }

  const data = result.data;

  // Silently accept but do nothing further if the honeypot was filled.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const [serviceName, doctorName] = await Promise.all([
    resolveLabel('service', data.serviceId),
    resolveLabel('doctor', data.doctorId),
  ]);

  const emailConfigured =
    process.env.EMAIL_SERVER_HOST &&
    process.env.EMAIL_SERVER_USER &&
    process.env.EMAIL_SERVER_PASSWORD &&
    process.env.EMAIL_TO;

  let emailSent = false;

  if (emailConfigured) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT ?? 587),
        secure: Number(process.env.EMAIL_SERVER_PORT) === 465,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        replyTo: data.email || undefined,
        subject: `New Appointment Request — ${data.name}`,
        text: [
          `Name: ${data.name}`,
          `Phone: ${data.phone}`,
          `Email: ${data.email || 'Not provided'}`,
          `Service: ${serviceName ?? 'Not specified'}`,
          `Preferred Doctor: ${doctorName ?? 'No preference'}`,
          `Preferred Date: ${data.preferredDate}`,
          `Preferred Time: ${data.preferredTime}`,
          `Message: ${data.message || 'None'}`,
        ].join('\n'),
      });

      emailSent = true;
    } catch (error) {
      // Never claim success if sending actually failed. Log the
      // real cause server-side for the clinic's developer to see.
      console.error('[appointment] Failed to send email:', error);
      emailSent = false;
    }
  }

  // We never had a real appointments database (by design — see spec
  // section 14), so there is nothing else to "save". If email isn't
  // configured or fails, we still acknowledge the request so the
  // patient isn't blocked — but we're honest about it below.
  return NextResponse.json({
    ok: true,
    emailSent,
    message: emailSent
      ? 'Request received and emailed to the clinic.'
      : 'Request received. Please also confirm via WhatsApp or phone, as email delivery could not be verified.',
  });
}
