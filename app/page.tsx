"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Cpu, ChevronRight, Menu, X, ArrowRight } from 'lucide-react';
import { translations } from './i18n';

export default function Home() {
  const [lang, setLang] = useState<'es' | 'de' | 'en'>('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-[200vh] bg-[#050505] text-[#E5E5E5] font-sans selection:bg-[#C5A059] selection:text-black">
      {/* Cinematic Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8E6E37] via-[#C5A059] to-[#E5E5E5] origin-left z-50" style={{ scaleX }} />

      {/* Luxury Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#8E6E37] opacity-[0.07] blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#E5E5E5] opacity-[0.03] blur-[150px] rounded-full"></div>
        {/* Fine Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* High-End Navigation */}
      <nav className="fixed top-0 w-full z-40 px-6 py-8 mix-blend-difference">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 border border-[#C5A059]/30 rounded-full flex items-center justify-center group-hover:border-[#C5A059] transition-all duration-500">
                <Cpu className="text-[#C5A059] w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-[#E5E5E5]">KAI SYSTEMS</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-[#A0A0A0]">
            {Object.entries(t.nav).map(([key, value]) => (
              <a key={key} href={`#${key}`} className="hover:text-[#C5A059] transition-colors duration-300">{value}</a>
            ))}
            <div className="h-4 w-[1px] bg-white/10 mx-2"></div>
            <div className="flex gap-4 border border-white/10 px-4 py-2 rounded-full backdrop-blur-xl">
              {(['es', 'de', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`hover:text-[#C5A059] transition-colors ${lang === l ? 'text-[#C5A059]' : 'text-gray-500'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <button className="md:hidden text-[#C5A059]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section - The Factor WOW */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center z-10"
        >
          <div className="inline-block px-4 py-1 border border-[#C5A059]/20 rounded-full bg-[#C5A059]/5 text-[#C5A059] text-[10px] font-bold tracking-[0.4em] uppercase mb-10">
            {t.hero.subtitle}
          </div>
          
          <h1 className="text-7xl md:text-[140px] font-black leading-[0.85] tracking-[-0.06em] text-white italic">
            {lang === 'en' ? (
              <>INTELLIGENCE<br/><span className="text-transparent border-text-gold">EVOLVED</span></>
            ) : lang === 'es' ? (
              <>EVOLUCIÓN<br/><span className="text-transparent border-text-gold">COGNITIVA</span></>
            ) : (
              <>DIGITALE<br/><span className="text-transparent border-text-gold">EVOLUTION</span></>
            )}
          </h1>

          <p className="mt-12 text-[#A0A0A0] max-w-xl mx-auto text-lg font-light leading-relaxed tracking-wide">
            {t.hero.title}
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            className="mt-16 group flex items-center gap-6 bg-white text-black px-12 py-6 rounded-full font-bold transition-all hover:bg-[#C5A059]"
          >
            <span className="uppercase tracking-[0.2em] text-xs">{t.hero.cta}</span>
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white group-hover:translate-x-2 transition-transform">
                <ArrowRight size={16} />
            </div>
          </motion.button>
        </motion.div>

        {/* Ambient Large Logo in background */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-[0.02] pointer-events-none">
            <h2 className="text-[40vw] font-black leading-none select-none">KAI</h2>
        </div>
      </section>

      {/* Styled Inline Styles for Custom Gold Effects */}
      <style jsx>{`
        .border-text-gold {
          -webkit-text-stroke: 1px #C5A059;
          opacity: 0.8;
        }
      `}</style>
    </main>
  );
}
