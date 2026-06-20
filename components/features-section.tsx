'use client';

import { motion } from 'motion/react';
import { Clock, Wind, Gem, Tags } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'ثبات يدوم طويلًا',
    description: 'تركيبة مركزة تضمن بقاء العطر معك طوال اليوم.'
  },
  {
    icon: Wind,
    title: 'فوحان قوي',
    description: 'انتشار استثنائي يترك أثراً في كل مكان تذهب إليه.'
  },
  {
    icon: Gem,
    title: 'خامات فرنسية',
    description: 'مزيج من أجود الزيوت العطرية المستوردة من فرنسا.'
  },
  {
    icon: Tags,
    title: 'أسعار مناسبة',
    description: 'فخامة عالمية وجودة استثنائية بأسعار في متناول يديك.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-black-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-gold uppercase tracking-widest text-xs mb-4 block">التميز والجودة</span>
          <h2 className="text-3xl md:text-5xl font-playfair mb-6">لماذا <span className="text-gradient-gold">ATHAR</span>؟</h2>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="glass-panel p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mb-6 text-gold group-hover:bg-gold group-hover:text-black-main transition-colors duration-500">
                <feature.icon className="w-8 h-8 font-light" />
              </div>
              <h3 className="text-xl font-playfair mb-3 text-white">{feature.title}</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
