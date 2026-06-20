import { Product } from './products';
import { getSupabase } from './supabase';

const USE_DB = !!process.env.NEXT_PUBLIC_SUPABASE_URL;

interface DbProduct {
  id: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
  notes: any[];
  features: any[];
  prices: any[];
  active: boolean;
  created_at: string;
  updated_at: string;
}

const sb = () => getSupabase();

function toProduct(db: DbProduct): Product {
  return {
    id: db.id,
    name: db.name,
    tagline: db.tagline,
    image: db.image,
    description: db.description,
    notes: db.notes || [],
    features: db.features || [],
    prices: db.prices || [],
    active: db.active,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
  };
}

function fromProduct(p: Partial<Product & { id?: string }>) {
  return {
    id: p.id,
    name: p.name,
    tagline: p.tagline,
    image: p.image,
    description: p.description,
    notes: p.notes || undefined,
    features: p.features || undefined,
    prices: p.prices || undefined,
    active: p.active,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  if (!USE_DB) {
    const { readData } = await import('./products-json');
    return readData();
  }
  const { data, error } = await sb().from('products').select('*').order('created_at', { ascending: true });
  if (error) throw error;
  return (data || []).map(toProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!USE_DB) {
    const { readData } = await import('./products-json');
    return readData().find((p) => p.id === id) || null;
  }
  const { data, error } = await sb().from('products').select('*').eq('id', id).single();
  if (error) return null;
  return data ? toProduct(data) : null;
}

export async function createProduct(input: Partial<Product> & { id?: string }): Promise<Product> {
  const id = input.id || input.name!.toLowerCase().replace(/\s+/g, '-');
  if (!USE_DB) {
    const { readData, writeData } = await import('./products-json');
    const products = readData();
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
    writeData(products);
    return product;
  }
  const { data, error } = await sb()
    .from('products')
    .insert(fromProduct({ ...input, id } as any))
    .select()
    .single();
  if (error) throw error;
  return toProduct(data);
}

export async function updateProduct(id: string, input: Partial<Product>): Promise<Product | null> {
  if (!USE_DB) {
    const { readData, writeData } = await import('./products-json');
    const products = readData();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    products[index] = { ...products[index], ...input, id, updatedAt: new Date().toISOString() };
    writeData(products);
    return products[index];
  }
  const { data, error } = await sb()
    .from('products')
    .update(fromProduct(input))
    .eq('id', id)
    .select()
    .single();
  if (error) return null;
  return data ? toProduct(data) : null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!USE_DB) {
    const { readData, writeData } = await import('./products-json');
    const products = readData();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    products.splice(index, 1);
    writeData(products);
    return true;
  }
  const { error } = await sb().from('products').delete().eq('id', id);
  return !error;
}
