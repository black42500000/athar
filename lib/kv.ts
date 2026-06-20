import { Redis } from '@upstash/redis';
import { Product } from './products';
import { DEFAULT_PRODUCTS } from './default-products';

const KEY = 'products';

function getRedis(): Redis | null {
  // Upstash REST API vars (set by Vercel Marketplace)
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    return new Redis({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
  }
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return Redis.fromEnv();
  }
  // KV_URL only (redis:// protocol) — extract host and construct REST URL
  if (process.env.KV_URL && process.env.KV_URL.startsWith('redis://')) {
    try {
      const url = new URL(process.env.KV_URL);
      const token = url.password ? decodeURIComponent(url.password) : '';
      const restUrl = `https://${url.hostname}`;
      return new Redis({ url: restUrl, token });
    } catch {
      return null;
    }
  }
  return null;
}

export async function getAllFromKv(): Promise<Product[]> {
  const redis = getRedis();
  if (!redis) {
    const { readData } = await import('./products-json');
    return readData();
  }
  let data: Product[] | null = null;
  try {
    data = await redis.get<Product[]>(KEY);
  } catch {
    // Redis not available (e.g., during build)
  }
  if (!data || !Array.isArray(data) || data.length === 0) {
    try { await redis.set(KEY, DEFAULT_PRODUCTS); } catch {}
    return DEFAULT_PRODUCTS;
  }
  return data;
}

export async function saveToKv(products: Product[]): Promise<void> {
  const redis = getRedis();
  if (redis) {
    try { await redis.set(KEY, products); } catch {}
  } else {
    const { writeData } = await import('./products-json');
    writeData(products);
  }
}
