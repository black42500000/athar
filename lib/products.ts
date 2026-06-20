export interface ProductNote {
  label: string;
  desc: string;
  icon: string;
}

export interface ProductFeature {
  name: string;
  icon: string;
}

export interface ProductPrice {
  size: string;
  price: number;
  unit: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  image: string;
  description: string;
  notes: ProductNote[];
  features: ProductFeature[];
  prices: ProductPrice[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
