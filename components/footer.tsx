'use client';

import { motion } from 'motion/react';

export default function Footer() {
  return (
    <footer className="bg-black-main pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center mb-16 text-center">
          <h2 className="text-4xl font-playfair tracking-[0.2em] mb-4 text-gradient-gold">ATHAR</h2>
          <p className="text-gold-light font-light tracking-[0.3em] uppercase text-xs mb-8">اترك أثرك</p>
          
          <div className="flex gap-8 mb-12">
            {['Instagram', 'Facebook', 'TikTok'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-gray-400 hover:text-gold transition-colors duration-300 text-sm font-light uppercase tracking-widest relative group"
              >
                {social}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs font-light text-gray-500 gap-4">
          <p>© 2026 ATHAR Perfumes</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
