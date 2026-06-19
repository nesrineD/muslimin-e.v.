// In-memory sliding-window rate limiter.
// Works per warm serverless instance — sufficient for burst protection on low-traffic
// community sites. Replace with Upstash Ratelimit for multi-instance deployments.

interface Entry {
  count: number;
  resetAt: number;
}

const store = new Map<string, Entry>();

// Purge expired entries periodically so the map doesn't grow unbounded.
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now > entry.resetAt) store.delete(key);
    }
  }, 60_000);
}

/**
 * Returns true (allowed) or false (rate-limited).
 * @param key      Unique key, e.g. `register:1.2.3.4`
 * @param limit    Max requests allowed in the window
 * @param windowMs Window length in milliseconds
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
