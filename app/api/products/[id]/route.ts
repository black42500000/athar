import { NextRequest, NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/products-api';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return NextResponse.json({ error: 'المنتج غير موجود' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const product = await updateProduct(id, body);
  if (!product) {
    return NextResponse.json({ error: 'المنتج غير موجود' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = await deleteProduct(id);
  if (!deleted) {
    return NextResponse.json({ error: 'المنتج غير موجود' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
