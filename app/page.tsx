"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, ChevronRight, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { translations } from './i18n';

export default function Home() {
  const [lang, setLang] = useState<'es' | 'de' | 'en'>('en');
  const [isLoading, setIsLoading] = useState(true);
  const container = useRef(null);
  const t = translations[lang];

  // GSAP: Animación de Entrada "Cine"
  useGSAP(() => {
    if (!isLoading) {
      const tl = gsap.timeline();
      tl.from(".char", {
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "expo.out"
      })
      .from(".reveal-item", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.5");
    }
  }, [isLoading, lang]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="char inline-block whitespace-pre">
        {char}
      </span>
    ));
  };

  return (
    <div ref={container} className="bg-[#050505] text-[#E5E5E5] font-sans selection:bg-[#C5A059] selection:text-black min-h-screen">
      
      {/* 1. INTRO LOADER: El Legado de KAI */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-24 h-24"
            >
              <div className="absolute inset-0 border-2 border-[#C5A059]/20 rounded-full animate-ping"></div>
              <Cpu className="w-full h-full text-[#C5A059] relative z-10" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 font-black tracking-[0.5em] text-[10px] text-[#C5A059] uppercase"
            >
              Assembling Intelligence
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. BACKGROUND: Lujo Atmosférico */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-radial-gold opacity-[0.08] blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-radial-plat opacity-[0.03] blur-[150px]"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* 3. NAV: Navegación Flotante */}
      <nav className="fixed top-0 w-full z-50 px-10 py-10 flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-4 reveal-item">
          <div className="w-8 h-8 bg-gradient-to-br from-[#C5A059] to-[#8E6E37] rounded-sm rotate-45"></div>
          <span className="font-black text-xl tracking-tighter uppercase italic">KAI Systems</span>
        </div>
        
        <div className="flex gap-8 bg-white/5 backdrop-blur-3xl px-8 py-3 rounded-full border border-white/10 reveal-item">
          {(['es', 'de', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`text-[10px] font-black uppercase tracking-widest transition-all ${lang === l ? 'text-[#C5A059] scale-110' : 'text-gray-600 hover:text-gray-300'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </nav>

      {/* 4. HERO: Experiencia Cinematográfica */}
      {!isLoading && (
        <section className="relative h-screen flex flex-col justify-center px-10 md:px-32">
          <div className="inline-block border-l-2 border-[#C5A059] pl-6 mb-10 reveal-item">
            <div className="text-[#C5A059] text-[10px] font-bold tracking-[0.4em] uppercase mb-2">
              Boutique Agency // {new Date().getFullYear()}
            </div>
            <div className="text-gray-500 text-xs font-light tracking-wide italic">
              {t.hero.subtitle}
            </div>
          </div>

          <h1 className="text-7xl md:text-[160px] font-black leading-[0.8] tracking-[-0.07em] uppercase perspective-text">
            <div className="overflow-hidden h-[0.9em] flex items-center">
              {lang === 'en' ? splitText("INTELLIGENCE") : lang === 'es' ? splitText("EVOLUCIÓN") : splitText("DIGITALE")}
            </div>
            <div className="overflow-hidden h-[0.9em] flex items-center text-transparent -webkit-text-stroke-1 border-[#C5A059] opacity-40">
              {lang === 'en' ? splitText("EVOLVED") : lang === 'es' ? splitText("COGNITIVA") : splitText("EVOLUTION")}
            </div>
          </h1>

          <div className="mt-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
            <p className="text-gray-500 max-w-sm text-sm font-medium leading-relaxed reveal-item">
              {t.hero.title}
            </p>
            
            <motion.button
              whileHover={{ x: 10 }}
              className="reveal-item flex items-center gap-10 bg-[#C5A059] text-black pr-4 pl-12 py-4 rounded-full font-black group transition-all"
            >
              <span className="uppercase tracking-[0.3em] text-[10px]">{t.hero.cta}</span>
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white">
                <ArrowRight size={20} />
              </div>
            </motion.button>
          </div>
        </section>
      )}

      {/* Custom Global Styles for Cine Effect */}
      <style jsx global>{`
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.12; transform: scale(1.05); }
        }
        .bg-radial-gold {
          background: radial-gradient(circle, #C5A059 0%, transparent 70%);
          animation: subtle-pulse 10s infinite;
        }
        .bg-radial-plat {
          background: radial-gradient(circle, #E5E5E5 0%, transparent 70%);
        }
        .-webkit-text-stroke-1 {
          -webkit-text-stroke: 1px #C5A059;
        }
        .perspective-text {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
