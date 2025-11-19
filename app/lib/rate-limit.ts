/**
 * Simple in-memory rate limiter to prevent abuse
 * For production, consider using Redis for distributed rate limiting
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Rate limit configuration
 */
export const RATE_LIMIT_CONFIG = {
  // Quote form: 10 requests per hour per IP
  quote: {
    maxRequests: 10,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  // Contact form: 5 requests per hour per IP
  contact: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  // General API: 30 requests per minute
  api: {
    maxRequests: 30,
    windowMs: 60 * 1000, // 1 minute
  },
};

/**
 * Get client IP from request headers
 */
export function getClientIP(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const xRealIp = headers.get('x-real-ip');
  if (xRealIp) {
    return xRealIp;
  }

  return 'unknown';
}

/**
 * Check if a client has exceeded rate limit
 */
export function checkRateLimit(
  identifier: string,
  config: { maxRequests: number; windowMs: number }
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  let entry = rateLimitStore.get(identifier);

  // Clean up expired entries
  if (entry && now > entry.resetTime) {
    rateLimitStore.delete(identifier);
    entry = undefined;
  }

  // Create new entry if doesn't exist
  if (!entry) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(identifier, newEntry);

    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: newEntry.resetTime,
    };
  }

  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Increment and allow
  entry.count += 1;

  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
  };
}

/**
 * Reset rate limit for a specific identifier (admin function)
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}

/**
 * Clear all rate limit entries (admin function)
 */
export function clearRateLimits(): void {
  rateLimitStore.clear();
}

/**
 * Get rate limit stats (for monitoring)
 */
export function getRateLimitStats() {
  return {
    totalEntries: rateLimitStore.size,
    entries: Array.from(rateLimitStore.entries()).map(([key, value]) => ({
      identifier: key,
      count: value.count,
      resetTime: new Date(value.resetTime).toISOString(),
    })),
  };
}
