'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X } from 'lucide-react';
import AdminSidebar from '@/components/admin-sidebar';

interface PriceEntry {
  size: string;
  price: number;
  unit: string;
}

interface NoteEntry {
  label: string;
  desc: string;
  icon: string;
}

interface FeatureEntry {
  name: string;
  icon: string;
}

const ICON_OPTIONS = [
  'Sparkles', 'Wind', 'Droplets', 'Sun', 'Leaf', 'Waves',
  'Clock', 'Gem', 'Tags', 'Star', 'Flame', 'Moon',
];

const NOTE_LABELS = ['الافتتاحية', 'القلب', 'القاعدة'];

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    tagline: '',
    description: '',
    image: '',
  });

  const [notes, setNotes] = useState<NoteEntry[]>([
    { label: 'الافتتاحية', desc: '', icon: '🍊' },
    { label: 'القلب', desc: '', icon: '🌹' },
    { label: 'القاعدة', desc: '', icon: '🤍' },
  ]);

  const [features, setFeatures] = useState<FeatureEntry[]>([
    { name: 'Unisex', icon: 'Sparkles' },
    { name: 'Long Lasting', icon: 'Wind' },
    { name: 'Strong Projection', icon: 'Droplets' },
  ]);

  const [prices, setPrices] = useState<PriceEntry[]>([
    { size: '30ml', price: 200, unit: 'ml' },
    { size: '50ml', price: 300, unit: 'ml' },
    { size: '100ml', price: 500, unit: 'ml' },
  ]);

  function updateNote(index: number, field: keyof NoteEntry, value: string) {
    setNotes((prev) => prev.map((n, i) => (i === index ? { ...n, [field]: value } : n)));
  }

  function updateFeature(index: number, field: keyof FeatureEntry, value: string) {
    setFeatures((prev) => prev.map((f, i) => (i === index ? { ...f, [field]: value } : f)));
  }

  function addFeature() {
    setFeatures((prev) => [...prev, { name: '', icon: 'Sparkles' }]);
  }

  function removeFeature(index: number) {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  }

  function updatePrice(index: number, field: keyof PriceEntry, value: string | number) {
    setPrices((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  }

  function addPrice() {
    setPrices((prev) => [...prev, { size: '', price: 0, unit: 'ml' }]);
  }

  function removePrice(index: number) {
    setPrices((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    if (!form.name.trim()) {
      setError('اسم المنتج مطلوب');
      setSaving(false);
      return;
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          notes: notes.filter((n) => n.desc.trim()),
          features: features.filter((f) => f.name.trim()),
          prices: prices.filter((p) => p.size.trim() && p.price > 0),
          active: true,
        }),
      });

      if (res.ok) {
        router.push('/admin/products');
      } else {
        const data = await res.json();
        setError(data.error || 'فشل في حفظ المنتج');
      }
    } catch {
      setError('حدث خطأ في الاتصال');
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminSidebar><div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-playfair">إضافة منتج جديد</h1>
        <button
          onClick={() => router.push('/admin/products')}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
          إلغاء
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5 space-y-5">
          <h2 className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider">معلومات المنتج</h2>

          <div>
            <label className="block text-sm text-gray-400 mb-2">اسم المنتج</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="مثال: Erba Pura"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">الشعار</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
              className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="مثال: انتعاش فاكهي يلتقي بالفخامة"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">الوصف</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
              placeholder="وصف العطر..."
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">صورة المنتج</label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-lg px-5 py-3 text-sm text-[#D4AF37] transition-colors">
                اختر صورة
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append('file', file);
                    try {
                      const res = await fetch('/api/upload', { method: 'POST', body: formData });
                      const data = await res.json();
                      if (data.url) setForm((p) => ({ ...p, image: data.url }));
                    } catch {}
                  }}
                />
              </label>
              {form.image && (
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, image: '' }))}
                  className="text-sm text-red-400 hover:text-red-300"
                >
                  إزالة
                </button>
              )}
            </div>
            {form.image && (
              <div className="mt-3 relative w-32 h-32 rounded-lg overflow-hidden border border-white/10">
                <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            {!form.image && (
              <p className="text-xs text-gray-500 mt-1.5">اختر صورة من جهازك لرفعها</p>
            )}
          </div>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5 space-y-5">
          <h2 className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider">الأسعار</h2>

          {prices.map((price, index) => (
            <div key={index} className="flex items-end gap-3">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1.5">الحجم</label>
                <input
                  type="text"
                  value={price.size}
                  onChange={(e) => updatePrice(index, 'size', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="30ml"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1.5">السعر (جنيه)</label>
                <input
                  type="number"
                  value={price.price}
                  onChange={(e) => updatePrice(index, 'price', parseInt(e.target.value) || 0)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="200"
                />
              </div>
              {prices.length > 1 && (
                <button type="button" onClick={() => removePrice(index)} className="p-2.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors mb-0.5">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addPrice} className="text-sm text-[#D4AF37] hover:text-[#c5a233] transition-colors">
            + إضافة حجم وسعر
          </button>
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5 space-y-5">
          <h2 className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider">الملاحظات العطرية</h2>

          {notes.map((note, index) => (
            <div key={index} className="space-y-3 p-4 bg-black/30 rounded-lg">
              <p className="text-xs text-gray-500 font-medium">{note.label}</p>
              <input
                type="text"
                value={note.desc}
                onChange={(e) => updateNote(index, 'desc', e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="وصف النوتة..."
              />
              <input
                type="text"
                value={note.icon}
                onChange={(e) => updateNote(index, 'icon', e.target.value)}
                className="w-20 bg-black/50 border border-white/10 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors text-center"
                placeholder="🍊"
              />
            </div>
          ))}
        </div>

        <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/5 space-y-5">
          <h2 className="text-sm font-medium text-[#D4AF37] uppercase tracking-wider">الميزات</h2>

          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="text"
                value={feature.name}
                onChange={(e) => updateFeature(index, 'name', e.target.value)}
                className="flex-1 bg-black/50 border border-white/10 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="اسم الميزة"
              />
              <select
                value={feature.icon}
                onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                className="bg-black/50 border border-white/10 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
              >
                {ICON_OPTIONS.map((ico) => (
                  <option key={ico} value={ico}>{ico}</option>
                ))}
              </select>
              {features.length > 1 && (
                <button type="button" onClick={() => removeFeature(index)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}

          <button type="button" onClick={addFeature} className="text-sm text-[#D4AF37] hover:text-[#c5a233] transition-colors">
            + إضافة ميزة
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c5a233] disabled:opacity-50 text-black font-medium px-6 py-3 rounded-lg transition-all text-sm"
          >
            <Save className="w-4 h-4" />
            {saving ? 'جاري الحفظ...' : 'حفظ المنتج'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="text-sm text-gray-400 hover:text-white px-4 py-3 transition-colors"
          >
            إلغاء
          </button>
        </div>
      </form>
      </div>
    </AdminSidebar>
  );
}
