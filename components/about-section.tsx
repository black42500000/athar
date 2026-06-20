'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-black-main relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 relative px-4 sm:px-8 lg:px-0"
          >
            <div className="aspect-[3/4] md:aspect-[4/5] relative w-full overflow-hidden">
              <Image
                 src="https://picsum.photos/seed/luxury-perfumer/800/1000"
                 alt="The Art of Perfumery"
                 fill
                 className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                 referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-main via-transparent to-transparent opacity-80" />
              
              {/* Decorative Frame */}
              <div className="absolute inset-4 border border-gold/20 z-10 m-4 pointer-events-none" />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full lg:w-1/2 text-center lg:text-right"
          >
            <span className="text-gold uppercase tracking-widest text-xs mb-4 md:mb-6 block">فن العطور الأصيلة</span>
            <h2 className="text-3xl md:text-5xl font-playfair mb-6 md:mb-8 leading-tight">
              أكثر من مجرد عطر، <br/>
              إنه <span className="text-gradient-gold">أثر</span> لا يُمحى.
            </h2>
            
            <div className="space-y-4 md:space-y-6 text-gray-300 font-light leading-relaxed mb-8 md:mb-10 text-sm md:text-base">
              <p>
                بدأت رحلة &quot;أثر&quot; من شغف عميق بالروائح الخالدة التي تصنع الذكريات. نحن لا نبيع مجرد عطور، بل نبتكر تجارب حسية تعكس هويتك وشخصيتك.
              </p>
              <p>
                نستورد أجود الخامات والزيوت العطرية من أعرق المزارع الفرنسية، لنمزجها ببراعة واحترافية عالية، لنقدم لك زجاجة تحمل بين طياتها فخامة العطور العالمية بلمسة فريدة وثبات يدوم طويلاً.
              </p>
            </div>

            <div className="flex gap-8 md:gap-12 justify-center lg:justify-start border-t border-white/10 pt-8 md:pt-10">
              <div>
                <p className="text-3xl font-playfair text-gold mb-2">+24<span className="text-sm font-poppins">h</span></p>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-light">ثبات العطر</p>
              </div>
               <div>
                <p className="text-3xl font-playfair text-gold mb-2">100<span className="text-sm font-poppins">%</span></p>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-light">زيوت نقية</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
