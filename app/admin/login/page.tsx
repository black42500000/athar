'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        setError('كلمة المرور غير صحيحة');
      }
    } catch {
      setError('حدث خطأ. حاول مرة أخرى');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair text-[#D4AF37] mb-2">ATHAR</h1>
          <p className="text-gray-400 text-sm">لوحة التحكم</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1A1A1A] rounded-xl p-6 space-y-5 border border-white/5">
          <div>
            <label className="block text-sm text-gray-400 mb-2">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pr-10 pl-10 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="أدخل كلمة المرور"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#D4AF37] hover:bg-[#c5a233] disabled:opacity-50 text-black font-medium py-3 rounded-lg transition-all text-sm"
          >
            {loading ? 'جاري تسجيل الدخول...' : 'دخول'}
          </button>

          <a href="/" className="block text-center text-gray-500 hover:text-gray-300 text-xs transition-colors">
            العودة إلى الموقع
          </a>
        </form>
      </div>
    </div>
  );
}
