"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Globe, Cpu, ChevronRight } from 'lucide-react';
import { translations } from './i18n';

export default function Home() {
  const [lang, setLang] = useState<'es' | 'de' | 'en'>('en');
  const t = translations[lang];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#7000ff] opacity-10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00f2ff] opacity-10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation / Language Selector */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-black text-xl tracking-tighter flex items-center gap-2">
          <Cpu className="text-[#00f2ff] w-6 h-6" />
          KAI SYSTEMS
        </div>
        <div className="flex gap-4 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest">
          {(['es', 'de', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`hover:text-[#00f2ff] transition-colors ${lang === l ? 'text-[#00f2ff]' : 'text-gray-500'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#00f2ff] font-bold text-sm tracking-[0.3em] uppercase mb-6"
        >
          {t.hero.subtitle}
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.h1
            key={lang}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-tight max-w-4xl"
          >
            {t.hero.title}
          </motion.h1>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 group relative px-10 py-5 bg-gradient-to-r from-[#00f2ff] to-[#7000ff] text-black font-black rounded-2xl flex items-center gap-3 overflow-hidden"
        >
          <span className="relative z-10">{t.hero.cta}</span>
          <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </motion.button>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-32">
        {[
          { icon: Shield, title: t.services.seo, color: "#00f2ff" },
          { icon: Zap, title: t.services.design, color: "#7000ff" },
          { icon: Globe, title: t.services.automation, color: "#00ffaa" },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:border-white/20 transition-all group"
          >
            <item.icon className="w-10 h-10 mb-6 transition-transform group-hover:scale-110" style={{ color: item.color }} />
            <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
            <div className="w-12 h-1 bg-gradient-to-r from-[#00f2ff] to-transparent rounded-full opacity-50 group-hover:w-full transition-all duration-500"></div>
          </motion.div>
        ))}
      </section>

      {/* Footer Branding */}
      <footer className="py-20 border-t border-white/5 text-center text-gray-600 text-xs tracking-widest uppercase font-bold">
        Powered by KAI Systems // Strategically Designed by Adrian Gomez // Zürich 2026
      </footer>
    </main>
  );
}
