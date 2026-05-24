import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const CACHE_TTL = {
  trending: 60 * 60,        // 1 hour
  category: 60 * 10,        // 10 minutes
  prompt: 60 * 60,          // 1 hour
  search: 60 * 5,           // 5 minutes
} as const;

export function cacheKey(prefix: string, ...parts: string[]) {
  return `prompty:${prefix}:${parts.join(":")}`;
}
