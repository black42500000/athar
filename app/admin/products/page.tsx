'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import AdminSidebar from '@/components/admin-sidebar';
import { Product } from '@/lib/products';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch {
      console.error('فشل في جلب المنتجات');
    } finally {
      setLoading(false);
    }
  }

  async function toggleActive(product: Product) {
    const res = await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !product.active }),
    });
    if (res.ok) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, active: !p.active } : p))
      );
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
    setDeleteConfirm(null);
  }

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-6 h-6 border-2 border-[#D4AF37] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <AdminSidebar><div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-playfair">المنتجات</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c5a233] text-black px-5 py-2.5 rounded-lg text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          إضافة منتج
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="بحث..."
          className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg py-3 pr-10 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
        />
      </div>

      <div className="bg-[#1A1A1A] rounded-xl border border-white/5 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p>لا توجد منتجات</p>
          </div>
        ) : (
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-white/5 text-sm text-gray-400">
                <th className="py-4 px-4 font-medium">المنتج</th>
                <th className="py-4 px-4 font-medium">الأسعار</th>
                <th className="py-4 px-4 font-medium">الحالة</th>
                <th className="py-4 px-4 font-medium">تاريخ الإضافة</th>
                <th className="py-4 px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-white/5 last:border-none hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-sm font-bold text-[#D4AF37] shrink-0">
                        {product.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1.5">
                      {product.prices.map((p) => (
                        <span key={p.size} className="text-xs bg-white/5 px-2.5 py-1 rounded-full text-gray-300">
                          {p.size}: {p.price} ج
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => toggleActive(product)}
                      className={`text-xs px-3 py-1 rounded-full transition-colors ${
                        product.active
                          ? 'bg-green-400/10 text-green-400 hover:bg-green-400/20'
                          : 'bg-red-400/10 text-red-400 hover:bg-red-400/20'
                      }`}
                    >
                      {product.active ? 'نشط' : 'غير نشط'}
                    </button>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-xs text-gray-500">
                      {new Date(product.createdAt).toLocaleDateString('ar-EG')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4 text-gray-400" />
                      </Link>
                      <button
                        onClick={() => toggleActive(product)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        {product.active ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                      </button>
                      {deleteConfirm === product.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg"
                          >
                            تأكيد
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-xs bg-white/10 text-gray-300 px-3 py-1.5 rounded-lg"
                          >
                            إلغاء
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div></AdminSidebar>
  );
}
