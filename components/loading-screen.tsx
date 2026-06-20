'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black-main"
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-4xl md:text-6xl font-playfair tracking-widest text-gradient-gold uppercase"
            >
              ATHAR
            </motion.div>
            
            <motion.div 
              className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "200px", opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-sm font-light tracking-widest text-gold-light uppercase"
            >
              اترك أثرك
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
