import { Product } from './products';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'products.json');

export function readData(): Product[] {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

export function writeData(products: Product[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
}
