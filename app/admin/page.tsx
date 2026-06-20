import { getAllProducts } from '@/lib/products-api';
import { Package, DollarSign } from 'lucide-react';
import Link from 'next/link';
import AdminSidebar from '@/components/admin-sidebar';

export default async function AdminDashboardPage() {
  const products = await getAllProducts();
  const activeProducts = products.filter((p) => p.active);
  const totalProducts = products.length;
  const minPrice = Math.min(...products.flatMap((p) => p.prices.map((pr) => pr.price)));

  return (
    <AdminSidebar><div className="space-y-6">
      <h1 className="text-2xl font-playfair">لوحة التحكم</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <Package className="w-8 h-8 text-[#D4AF37]" />
            <span className="text-2xl font-bold">{totalProducts}</span>
          </div>
          <p className="text-sm text-gray-400">إجمالي المنتجات</p>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <Package className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold">{activeProducts.length}</span>
          </div>
          <p className="text-sm text-gray-400">المنتجات النشطة</p>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold">{minPrice}+</span>
          </div>
          <p className="text-sm text-gray-400">أقل سعر (جنيه)</p>
        </div>
      </div>

      <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5">
        <h2 className="text-lg font-playfair mb-4">المنتجات الحالية</h2>
        <div className="space-y-3">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between bg-black/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center text-sm font-bold text-[#D4AF37]">
                  {product.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-gray-500">
                    {product.prices.map((p) => `${p.size}: ${p.price} ج`).join(' | ')}
                  </p>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${product.active ? 'bg-green-400/10 text-green-400' : 'bg-red-400/10 text-red-400'}`}>
                {product.active ? 'نشط' : 'غير نشط'}
              </span>
            </div>
          ))}
        </div>

        <Link
          href="/admin/products"
          className="block text-center text-sm text-[#D4AF37] hover:text-[#c5a233] mt-4 transition-colors"
        >
          إدارة المنتجات
        </Link>
      </div>
    </div></AdminSidebar>
  );
}
