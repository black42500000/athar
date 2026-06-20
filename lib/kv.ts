import { Redis } from '@upstash/redis';
import { Product } from './products';
import { DEFAULT_PRODUCTS } from './default-products';

const USE_KV = !!process.env.KV_URL || !!process.env.UPSTASH_REDIS_REST_URL;

const KEY = 'products';

function getRedis(): Redis | null {
  if (process.env.KV_URL) {
    return new Redis({ url: process.env.KV_URL, token: '' });
  }
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return Redis.fromEnv();
  }
  return null;
}

export async function getAllFromKv(): Promise<Product[]> {
  const redis = getRedis();
  if (!redis) {
    const { readData } = await import('./products-json');
    return readData();
  }
  const data = await redis.get<Product[]>(KEY);
  if (!data || !Array.isArray(data) || data.length === 0) {
    await redis.set(KEY, DEFAULT_PRODUCTS);
    return DEFAULT_PRODUCTS;
  }
  return data;
}

export async function saveToKv(products: Product[]): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(KEY, products);
  } else {
    const { writeData } = await import('./products-json');
    writeData(products);
  }
}
