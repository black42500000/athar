import { Product } from './products';
import { DEFAULT_PRODUCTS } from './default-products';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'products.json');

let memoryCache: Product[] | null = null;

export function readData(): Product[] {
  if (memoryCache) return memoryCache;
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      memoryCache = JSON.parse(raw);
      return memoryCache!;
    } catch {
      // corrupted file, use defaults
    }
  }
  memoryCache = [...DEFAULT_PRODUCTS];
  return memoryCache;
}

export function writeData(products: Product[]): void {
  memoryCache = products;
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch {
    // Read-only filesystem (Vercel) — in-memory only
  }
}
