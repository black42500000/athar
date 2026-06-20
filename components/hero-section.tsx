'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-[90vh] md:h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }} 
        className="absolute inset-0 z-0 h-[120%] w-full -top-[10%]"
      >
        <Image
          src="https://picsum.photos/seed/luxury-perfume/2600/1600"
          alt="Luxury Perfume"
          fill
          priority
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Cinematic Lighting & Smoke Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black-main via-black-main/60 to-black-main/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_50%)]" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 md:px-6 text-center flex flex-col items-center justify-center pt-16 md:pt-20"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.5, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair mb-4 md:mb-6 leading-tight"
        >
          اترك <span className="text-gradient-gold">أثرك</span>... <br className="hidden md:block" /> مع كل رشة.
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8, ease: "easeOut" }}
          className="text-base md:text-lg lg:text-xl text-gray-300 max-w-xl lg:max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed font-light px-4"
        >
          عطور مستوحاة من أشهر العطور العالمية، بجودة عالية، وثبات وفوحان يدومان طوال اليوم.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center w-full px-8 md:px-0"
        >
          <a href="#order" className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-3.5 md:py-4 bg-gold text-black-main font-semibold uppercase tracking-wider overflow-hidden hover:bg-gold-light transition-colors duration-300 text-sm md:text-base">
            <span className="relative z-10">اطلب الآن</span>
          </a>
          
          <a href="#products" className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-3.5 md:py-4 border border-gold/50 text-white hover:border-gold hover:bg-gold/10 transition-all duration-300 font-medium uppercase tracking-wider text-sm md:text-base">
            <span className="relative z-10">اكتشف المجموعة</span>
          </a>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-light">تمرير للأسفل</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
