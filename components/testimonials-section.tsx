'use client';

import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'أحمد محمود',
    text: 'أفضل نسخة من Erba Pura جربتها. الثبات يتجاوز 24 ساعة والفوحان يملأ المكان بمجرد دخولي.',
    rating: 5,
  },
  {
    id: 2,
    name: 'سارة خالد',
    text: 'ثبات ممتاز وفوحان رائع. عطر Pacific Chill أخذني لعالم ثاني من الانتعاش، تجربة لا تنسى صراحة.',
    rating: 5,
  },
  {
    id: 3,
    name: 'محمد عبدالكريم',
    text: 'التغليف فاخر والعطر يستحق كل ريال. وصلتني الطلبية في وقت قياسي والريحة مطابقة للوصف تماماً.',
    rating: 5,
  },
  {
    id: 4,
    name: 'نورة عبدالله',
    text: 'جودة الزيوت العطرية واضحة جداً. لا يوجد أي رائحة كحول مزعجة، فقط نقاء وثبات مذهل.',
    rating: 5,
  }
];

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="py-16 md:py-24 bg-black-main relative overflow-hidden">
      <div className="container mx-auto px-0 md:px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-10 md:mb-16 px-4"
        >
          <span className="text-gold uppercase tracking-widest text-xs mb-4 block">آراء عملائنا</span>
          <h2 className="text-3xl md:text-5xl font-playfair mb-6">قالوا عن <span className="text-gradient-gold">أثر</span></h2>
        </motion.div>

        <div className="relative">
          {/* Fading Edges */}
          <div className="absolute top-0 bottom-0 left-0 w-12 md:w-24 bg-gradient-to-r from-black-main to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-12 md:w-24 bg-gradient-to-l from-black-main to-transparent z-10 pointer-events-none" />
          
          <div 
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-4 md:px-24"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {testimonials.map((t, index) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="snap-center shrink-0 w-[85vw] sm:w-[350px] md:w-[400px] glass-panel p-6 md:p-8 rounded-xl md:rounded-sm relative"
              >
                <Quote className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-12 md:h-12 text-gold/10" />
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-gray-300 font-light leading-relaxed mb-8 relative z-10 min-h-[100px]">
                  &quot;{t.text}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-playfair border border-gold/30">
                    {t.name.charAt(0)}
                  </div>
                  <span className="text-white text-sm tracking-wide">{t.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
