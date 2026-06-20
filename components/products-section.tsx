'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { Product, ProductFeature } from '@/lib/products';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles: LucideIcons.Sparkles,
  Wind: LucideIcons.Wind,
  Droplets: LucideIcons.Droplets,
  Sun: LucideIcons.Sun,
  Leaf: LucideIcons.Leaf,
  Waves: LucideIcons.Waves,
  Clock: LucideIcons.Clock,
  Gem: LucideIcons.Gem,
  Tags: LucideIcons.Tags,
  Star: LucideIcons.Star,
  Flame: LucideIcons.Flame,
  Moon: LucideIcons.Moon,
};

function FeatureBadge({ feature }: { feature: ProductFeature }) {
  const Icon = iconMap[feature.icon] || LucideIcons.Sparkles;
  return (
    <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full text-xs uppercase tracking-wider text-white">
      <Icon className="w-4 h-4 text-gold" />
      <span>{feature.name}</span>
    </div>
  );
}

export default function ProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.filter((p: Product) => p.active)))
      .catch(() => {});
  }, []);

  if (products.length === 0) return null;

  return (
    <section id="products" className="py-16 md:py-32 bg-black-main relative z-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-gold uppercase tracking-widest text-xs md:text-sm mb-3 md:mb-4 block">مجموعتنا الحصرية</span>
          <h2 className="text-3xl md:text-5xl font-playfair mb-4 md:mb-6">تحف <span className="text-gradient-gold">عطرية</span></h2>
          <div className="w-16 md:w-24 h-[1px] bg-gold mx-auto opacity-50" />
        </motion.div>

        <div className="flex flex-col gap-20 md:gap-32">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 md:gap-12 lg:gap-24 items-center`}
            >
              <div className="w-full lg:w-1/2 relative">
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto group">
                   <div className="absolute inset-0 bg-gold/20 translate-x-4 translate-y-4 rounded-t-full rounded-b-md transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                   <div className="absolute inset-0 border border-gold/30 rounded-t-full rounded-b-md z-10 pointer-events-none" />
                   <div className="relative h-full w-full overflow-hidden rounded-t-full rounded-b-md">
                     <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                     />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
                   </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 px-2 md:px-0 text-center lg:text-right">
                <div>
                  <h3 className="text-3xl sm:text-4xl lg:text-6xl font-playfair mb-2 md:mb-3">{product.name}</h3>
                  <p className="text-gold-light text-lg md:text-xl font-light">{product.tagline}</p>
                </div>
                
                <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                  {product.description}
                </p>

                <div className="space-y-4 py-4 md:py-6 border-y border-white/10 text-right">
                  {product.notes.map((note, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="text-2xl mt-1">{note.icon}</span>
                      <div>
                        <span className="text-gold block text-sm font-medium mb-1">{note.label}</span>
                        <span className="text-sm text-gray-300">{note.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  {product.features.map((feat, i) => (
                    <FeatureBadge key={i} feature={feat} />
                  ))}
                  <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-full text-xs uppercase tracking-wider text-white">
                     <LucideIcons.Sparkles className="w-4 h-4 text-gold" />
                     <span>Luxury</span>
                  </div>
                </div>

                <div className="pt-6">
                  <a href="#order" className="group relative inline-flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-gold hover:text-black-main border border-gold/50 transition-all duration-300 w-full sm:w-auto uppercase tracking-widest text-sm text-gold">
                    اطلب الآن
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
