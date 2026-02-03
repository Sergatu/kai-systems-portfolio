"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useInView } from 'framer-motion';
import { Cpu, ChevronRight, ArrowRight, ShieldCheck, Zap, Globe, Layers, Beaker } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { translations } from './i18n';

export default function Home() {
  const [lang, setLang] = useState<'es' | 'de' | 'en'>('en');
  const [isLoading, setIsLoading] = useState(true);
  const container = useRef(null);
  const t = translations[lang];

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
    const timer = setTimeout(() => setIsLoading(false), 1500);
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
      
      {/* 1. INTRO LOADER */}
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
              KAI Systems
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. BACKGROUND GLOWS */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-radial-gold opacity-[0.08] blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-radial-plat opacity-[0.03] blur-[150px]"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* 3. NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-10 flex justify-between items-center">
        <div className="flex items-center gap-4 reveal-item">
          <div className="w-8 h-8 bg-gradient-to-br from-[#C5A059] to-[#8E6E37] rounded-sm rotate-45"></div>
          <span className="font-black text-xl tracking-tighter uppercase italic">KAI Systems</span>
        </div>
        
        <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
          <a href="#services" className="hover:text-[#C5A059] transition-colors">{t.nav.services}</a>
          <a href="#lab" className="hover:text-[#C5A059] transition-colors">{t.nav.lab}</a>
          <a href="#impact" className="hover:text-[#C5A059] transition-colors">{t.nav.cases}</a>
        </div>

        <div className="flex gap-4 bg-white/5 backdrop-blur-3xl px-6 py-2 rounded-full border border-white/10 reveal-item">
          {(['es', 'de', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`text-[9px] font-black uppercase tracking-widest transition-all ${lang === l ? 'text-[#C5A059] scale-110' : 'text-gray-600 hover:text-gray-300'}`}
            >
              {l}
            </button>
          ))}
        </div>
      </nav>

      {/* 4. HERO SECTION */}
      {!isLoading && (
        <>
          <section className="relative h-screen flex flex-col justify-center px-6 md:px-32">
            <div className="inline-block border-l-2 border-[#C5A059] pl-6 mb-10 reveal-item">
              <div className="text-[#C5A059] text-[10px] font-bold tracking-[0.4em] uppercase mb-2">
                Boutique Agency // {new Date().getFullYear()}
              </div>
              <div className="text-gray-500 text-xs font-light tracking-wide italic">
                {t.hero.subtitle}
              </div>
            </div>

            <h1 className="text-6xl md:text-[140px] font-black leading-[0.8] tracking-[-0.07em] uppercase perspective-text">
              <div className="overflow-hidden h-[0.9em] flex items-center">
                {lang === 'en' ? splitText("INTELLIGENCE") : lang === 'es' ? splitText("EVOLUCIÓN") : splitText("DIGITALE")}
              </div>
              <div className="overflow-hidden h-[0.9em] flex items-center text-transparent -webkit-text-stroke-1 border-[#C5A059] opacity-40">
                {lang === 'en' ? splitText("EVOLVED") : lang === 'es' ? splitText("COGNITIVA") : splitText("EVOLUTION")}
              </div>
            </h1>

            <div className="mt-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
              <p className="text-gray-500 max-w-sm text-sm font-medium leading-relaxed reveal-item uppercase tracking-wider">
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

          {/* 5. CAPABILITIES SECTION (FILL) */}
          <section id="services" className="px-6 md:px-32 py-40 border-t border-white/5">
            <h2 className="text-[10px] font-bold tracking-[0.5em] text-[#C5A059] uppercase mb-20">{t.capabilities.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <CapabilityCard icon={ShieldCheck} title={t.capabilities.seo.title} desc={t.capabilities.seo.desc} />
              <CapabilityCard icon={Zap} title={t.capabilities.redesign.title} desc={t.capabilities.redesign.desc} />
              <CapabilityCard icon={Globe} title={t.capabilities.automation.title} desc={t.capabilities.automation.desc} />
            </div>
          </section>

          {/* 6. LAB SECTION (KAI LAB) */}
          <section id="lab" className="px-6 md:px-32 py-40 bg-white/[0.01] rounded-[4rem] mx-4 md:mx-10 border border-white/5">
             <div className="flex flex-col md:flex-row gap-20 items-center">
                <div className="flex-1">
                  <Beaker className="text-[#C5A059] w-12 h-12 mb-8" />
                  <h2 className="text-5xl font-black tracking-tighter mb-8 italic uppercase">KAI Lab // <span className="text-gray-700">Internal Tools</span></h2>
                  <p className="text-gray-400 max-w-md leading-relaxed">
                    Desarrollamos motores propietarios para optimizar nuestra propia logística. Desde auditorías SEO-GEO hasta gestores autónomos de finanzas suizas.
                  </p>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                   <div className="h-40 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-8 text-center text-[10px] font-black tracking-widest uppercase text-gray-500">
                      SEO-GEO ENGINE v3.1
                   </div>
                   <div className="h-40 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-8 text-center text-[10px] font-black tracking-widest uppercase text-gray-500">
                      FINANCE AGENT
                   </div>
                   <div className="h-40 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-8 text-center text-[10px] font-black tracking-widest uppercase text-gray-500">
                      ROUTE OPS
                   </div>
                   <div className="h-40 bg-[#C5A059] rounded-3xl flex items-center justify-center p-8 text-center text-[10px] font-black tracking-widest uppercase text-black">
                      YOUR PROJECT NEXT
                   </div>
                </div>
             </div>
          </section>

          {/* 7. PHILOSOPHY / CONTACT */}
          <section id="contact" className="px-6 md:px-32 py-60 text-center">
             <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 max-w-3xl mx-auto italic uppercase">
                {t.philosophy.title}
             </h2>
             <p className="text-gray-500 text-lg max-w-xl mx-auto mb-20">
                {t.philosophy.desc}
             </p>
             <button className="text-[10px] font-black tracking-[0.5em] text-[#C5A059] hover:text-white transition-colors uppercase border-b-2 border-[#C5A059] pb-2">
                info@kaisystems.ch
             </button>
          </section>
        </>
      )}

      <footer className="py-20 border-t border-white/5 text-center text-gray-800 text-[9px] tracking-[0.5em] uppercase font-bold">
        KAI Systems // Designed by Adrian Gomez // Zürich 2026
      </footer>

      <style jsx global>{`
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50% { opacity: 0.12; transform: scale(1.05); }
        }
        .bg-radial-gold { background: radial-gradient(circle, #C5A059 0%, transparent 70%); animation: subtle-pulse 10s infinite; }
        .bg-radial-plat { background: radial-gradient(circle, #E5E5E5 0%, transparent 70%); }
        .-webkit-text-stroke-1 { -webkit-text-stroke: 1px #C5A059; }
        .perspective-text { perspective: 1000px; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}

function CapabilityCard({ icon: Icon, title, desc }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group"
    >
      <Icon className="text-[#C5A059] w-8 h-8 mb-8 opacity-50 group-hover:opacity-100 transition-opacity" />
      <h3 className="text-2xl font-black italic uppercase mb-4 tracking-tighter">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{desc}</p>
      <div className="mt-8 h-[1px] w-12 bg-[#C5A059]/30 group-hover:w-full transition-all duration-700"></div>
    </motion.div>
  )
}
