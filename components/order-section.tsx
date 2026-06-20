'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Send, Wallet, ShieldCheck } from 'lucide-react';
import { Product } from '@/lib/products';

export default function OrderSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.filter((p: Product) => p.active)))
      .catch(() => {});
  }, []);

  const VODAFONE_NUMBER = '01012214542';

  const getPrice = () => {
    if (!selectedPerfume || !selectedSize) return 0;

    if (selectedPerfume === 'both') {
      const basePrice = products.reduce((max, p) => {
        const sizePrice = p.prices.find((pr) => pr.size === selectedSize);
        return Math.max(max, sizePrice?.price || 0);
      }, 0);
      return basePrice * 2;
    }

    const product = products.find((p) => p.id === selectedPerfume);
    if (!product) return 0;
    const sizePrice = product.prices.find((p) => p.size === selectedSize);
    return sizePrice?.price || 0;
  };

  const price = getPrice();

  const getPerfumeName = (id: string) => {
    const p = products.find((pr) => pr.id === id);
    return p ? `${p.name} (${p.name})` : id;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const walletNumber = formData.get('walletNumber');

    const perfumeName =
      selectedPerfume === 'both'
        ? 'المجموعة الكاملة (العطرين معاً)'
        : getPerfumeName(selectedPerfume);

    const message = `*طلب جديد من موقع أثر (ATHAR)* 🌟
    
*بيانات العميل:*
👤 الاسم: ${name}
📞 رقم الهاتف: ${phone}
📍 العنوان: ${address}

*تفاصيل الطلب:*
🛍️ العطر: ${perfumeName}
📏 الحجم: ${selectedSize}
💰 الإجمالي: ${price} ج.م

*تفاصيل الدفع (فودافون كاش):*
📱 رقم المحفظة المحول منها: ${walletNumber}

يرجى تأكيد استلام الطلب متضمناً صورة إيصال التحويل (إن أمكن).`;

    const whatsappUrl = `https://wa.me/201012214542?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
      setSelectedPerfume('');
      setSelectedSize('');
      setTimeout(() => setIsSuccess(false), 5000);
    }, 800);
  };

  return (
    <section id="order" className="py-16 md:py-24 bg-black-light relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-gold uppercase tracking-widest text-xs mb-3 block">طريقة آمنة وسريعة</span>
          <h2 className="text-3xl md:text-5xl font-playfair mb-4 md:mb-6">الدفع عبر <span className="text-[#E60000]">فودافون كاش</span></h2>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="glass-panel p-5 md:p-12 border-t-2 border-t-[#E60000]/70 flex flex-col gap-6 md:gap-8 rounded-xl shadow-2xl">
            
            <div className="bg-[#E60000]/10 border border-[#E60000]/30 rounded-xl p-5 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#E60000]/20 rounded-full flex items-center justify-center shrink-0">
                <Wallet className="w-7 h-7 md:w-8 md:h-8 text-[#E60000]" />
              </div>
              <div className="flex-1 space-y-2 text-center md:text-right w-full">
                <h3 className="text-white font-medium text-base md:text-lg">خطوات الدفع:</h3>
                <div className="text-gray-300 text-xs md:text-sm font-light leading-relaxed flex flex-col gap-2">
                  <span>1. قم باختيار العطر والحجم لتحديد المبلغ.</span>
                  <span className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <span>2. حوّل المبلغ إلى رقم فودافون كاش:</span>
                    <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded" dir="ltr">{VODAFONE_NUMBER}</span>
                  </span>
                  <span>3. أدخل بياناتك ورقم المحفظة التي حولت منها بالأسفل لإتمام الطلب.</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs md:text-sm font-light text-gray-400">الاسم الكريم</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  className="bg-black-main/60 border border-white/10 p-3.5 md:p-4 text-white text-sm md:text-base focus:outline-none focus:border-[#E60000]/50 transition-colors rounded-lg w-full placeholder:text-gray-600"
                  placeholder="محمد أحمد..."
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs md:text-sm font-light text-gray-400">رقم الهاتف للتواصل</label>
                <input 
                  type="tel" 
                  name="phone"
                  required
                  dir="ltr"
                  className="bg-black-main/60 border border-white/10 p-3.5 md:p-4 text-white text-sm md:text-base focus:outline-none focus:border-[#E60000]/50 transition-colors text-right rounded-lg w-full placeholder:text-gray-600"
                  placeholder="01xxxxxxxxx"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs md:text-sm font-light text-gray-400">عنوان التوصيل بالكامل</label>
              <textarea 
                name="address"
                required
                rows={3}
                className="bg-black-main/60 border border-white/10 p-3.5 md:p-4 text-white text-sm md:text-base focus:outline-none focus:border-[#E60000]/50 transition-colors resize-none rounded-lg w-full placeholder:text-gray-600"
                placeholder="المدينة، الحي، الشارع، رَقَم المبنى..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 border-t border-white/10 pt-6 md:pt-8">
              <div className="flex flex-col gap-2">
               <label className="text-xs md:text-sm font-light text-gray-400">اختيار العطر</label>
                <select 
                  required
                  value={selectedPerfume}
                  onChange={(e) => setSelectedPerfume(e.target.value)}
                  className="bg-black-main/60 border border-white/10 p-3.5 md:p-4 text-white text-sm md:text-base focus:outline-none focus:border-[#E60000]/50 transition-colors appearance-none rounded-lg w-full"
                >
                  <option value="" disabled>يرجى اختيار العطر...</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                  <option value="both">المجموعة الكاملة (العطرين معاً)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
               <label className="text-xs md:text-sm font-light text-gray-400">اختيار الحجم</label>
                <select 
                  required
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="bg-black-main/60 border border-white/10 p-3.5 md:p-4 text-white text-sm md:text-base focus:outline-none focus:border-[#E60000]/50 transition-colors appearance-none rounded-lg w-full"
                >
                  <option value="" disabled>يرجى اختيار الحجم...</option>
                  {selectedPerfume && selectedPerfume !== 'both' ? (
                    products
                      .find((p) => p.id === selectedPerfume)
                      ?.prices.map((pr) => (
                        <option key={pr.size} value={pr.size}>
                          {pr.size} - {pr.price} ج.م
                        </option>
                      ))
                  ) : (
                    <>
                      <option value="30ml">30 مل</option>
                      <option value="50ml">50 مل</option>
                      <option value="100ml">100 مل</option>
                    </>
                  )}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs md:text-sm font-light text-gray-400">رقم المحفظة المحول منها</label>
                <input 
                  type="tel" 
                  name="walletNumber"
                  required
                  dir="ltr"
                  className="bg-black-main/60 border border-[#E60000]/30 p-3.5 md:p-4 text-[#E60000] font-medium text-sm md:text-base focus:outline-none focus:border-[#E60000] focus:bg-[#E60000]/5 transition-colors text-right rounded-lg w-full placeholder:text-gray-600/50"
                  placeholder="رقم فودافون كاش الخاص بك"
                />
              </div>
            </div>

            <AnimatePresence>
              {price > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-black-main/80 p-5 md:p-6 rounded-lg flex items-center justify-between border border-gold/20 mt-2"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
                    <span className="text-white font-medium text-xs md:text-sm">إجمالي المبلغ المطلوب:</span>
                  </div>
                  <span className="text-xl md:text-2xl font-playfair text-gold font-bold">{price} <span className="text-xs md:text-sm font-light">ج.م</span></span>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit" 
              disabled={isSubmitting || isSuccess || price === 0}
              className="mt-2 md:mt-4 bg-[#E60000] hover:bg-[#CC0000] text-white font-medium py-3.5 md:py-4 rounded-lg flex items-center justify-center gap-2 md:gap-3 transition-colors duration-300 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed w-full shadow-lg shadow-[#E60000]/20"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isSuccess ? (
                <span className="text-sm md:text-base">تم تأكيد الطلب بنجاح</span>
              ) : (
                <>
                  <span className="text-sm md:text-base">تأكيد الطلب والدفع</span>
                  <Send className="w-4 h-4 ml-1 md:ml-2 rtl:rotate-180" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
