/** Shared email sender (Resend). Returns true only if actually sent. */
export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.LEAD_FROM_EMAIL);
}

export function esc(s: string): string {
  return s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c]!);
}

export async function sendEmail(payload: {
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  if (!key || !from) return false;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ from, to: payload.to, subject: payload.subject, html: payload.html }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
