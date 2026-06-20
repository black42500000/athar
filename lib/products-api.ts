import { Product } from './products';
import { getAllFromKv, saveToKv } from './kv';

export async function getAllProducts(): Promise<Product[]> {
  return getAllFromKv();
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getAllFromKv();
  return products.find((p) => p.id === id) || null;
}

export async function createProduct(input: Partial<Product> & { id?: string }): Promise<Product> {
  const products = await getAllFromKv();
  const id = input.id || input.name!.toLowerCase().replace(/\s+/g, '-');
  const product: Product = {
    id,
    name: input.name || '',
    tagline: input.tagline || '',
    image: input.image || '',
    description: input.description || '',
    notes: input.notes || [],
    features: input.features || [],
    prices: input.prices || [],
    active: input.active ?? true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  products.push(product);
  await saveToKv(products);
  return product;
}

export async function updateProduct(id: string, input: Partial<Product>): Promise<Product | null> {
  const products = await getAllFromKv();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...input, id, updatedAt: new Date().toISOString() };
  await saveToKv(products);
  return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getAllFromKv();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  await saveToKv(products);
  return true;
}
