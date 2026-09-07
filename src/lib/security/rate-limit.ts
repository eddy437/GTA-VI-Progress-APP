interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function rateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

export function clearRateLimit(key: string): void {
  rateLimitStore.delete(key);
}

export function getRateLimitRemaining(
  key: string,
  maxRequests: number
): number {
  const entry = rateLimitStore.get(key);
  if (!entry) return maxRequests;

  const now = Date.now();
  if (now > entry.resetTime) {
    return maxRequests;
  }

  return Math.max(0, maxRequests - entry.count);
}