'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, LogOut, ArrowRight } from 'lucide-react';

const links = [
  { href: '/admin', label: 'الرئيسية', icon: LayoutDashboard },
  { href: '/admin/products', label: 'المنتجات', icon: Package },
];

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex">
      <aside className="w-56 bg-[#1A1A1A] border-l border-white/5 min-h-screen flex flex-col shrink-0">
        <div className="p-5 border-b border-white/5">
          <Link href="/admin" className="text-xl font-playfair text-[#D4AF37]">ATHAR</Link>
          <p className="text-xs text-gray-500 mt-1">لوحة التحكم</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/5">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-500 hover:text-gray-300 transition-all"
          >
            <ArrowRight className="w-4 h-4" />
            الموقع
          </a>
          <a
            href="/admin/api/logout"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:text-red-300 transition-all"
          >
            <LogOut className="w-4 h-4" />
            تسجيل خروج
          </a>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
