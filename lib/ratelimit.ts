/**
 * Best-effort in-memory rate limiter. Serverless instances are ephemeral, so
 * this stops bursts within a warm instance; pair with the honeypot + time-trap
 * for broader spam protection, and add a durable limiter (e.g. Upstash) if the
 * endpoint ever faces real abuse.
 */
type Entry = { count: number; resetAt: number };
const buckets = new Map<string, Entry>();

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): { ok: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || entry.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterMs: 0 };
  }

  if (entry.count >= limit) {
    return { ok: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { ok: true, retryAfterMs: 0 };
}
