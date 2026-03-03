
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gem, ArrowRight, ArrowLeft, ShieldCheck, Zap, Globe, BarChart3, Lock, FileText, Sparkles, Scale, Target, ChevronRight, Quote, TrendingUp, Layers, Cpu, Microscope, DatabaseZap, Shield, Compass, Printer } from 'lucide-react';

interface SlideProps {
  children: React.ReactNode;
  isActive: boolean;
  isPrint?: boolean;
}

const Slide: React.FC<SlideProps> = ({ children, isActive, isPrint }) => {
  if (isPrint) {
    return (
      <div className="w-full h-screen flex flex-col justify-center px-24 bg-slate-950 text-white border-b border-white/10 relative overflow-hidden" style={{ pageBreakAfter: 'always' }}>
        {/* Background Atmosphere for Print */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(198,141,65,0.05),transparent_70%)]"></div>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex flex-col justify-center px-12 lg:px-24"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PitchDeck: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrint = () => {
    window.print();
  };

  const slides = [
    // 1. Title
    (
      <div className="space-y-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded border border-gold-500/20 bg-gold-500/5 text-gold-400 text-[10px] font-black uppercase tracking-widest"
        >
          <Gem size={14} /> Institutional Trust Intelligence
        </motion.div>
        <h1 className="text-8xl lg:text-[10rem] font-serif leading-[0.85] tracking-tighter text-white">
          Audit <br />
          <span className="italic text-gold-400">Crystal.</span>
        </h1>
        <p className="text-2xl text-slate-400 max-w-2xl font-light leading-relaxed">
          The world's first deterministic AI engine for <span className="text-white font-medium">CSRD Pre-Audit Assurance.</span>
        </p>
      </div>
    ),
    // 2. The Problem
    (
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-8">
          <div className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">The Problem</div>
          <h2 className="text-7xl font-serif text-white leading-none tracking-tight">The CSRD <br/><span className="italic text-red-500">Nightmare.</span></h2>
          <p className="text-xl text-slate-400 font-light leading-relaxed">
            50,000+ companies are now legally mandated to report 1,200+ ESG data points. Traditional audits are slow, expensive, and prone to "Assurance Friction."
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-slate-500">
               <div className="w-12 h-[1px] bg-red-500/50"></div>
               <span className="text-xs font-black uppercase tracking-widest">€100B+ Compliance Risk</span>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
               <div className="w-12 h-[1px] bg-red-500/50"></div>
               <span className="text-xs font-black uppercase tracking-widest">400% Increase in Audit Fees</span>
            </div>
          </div>
        </div>
        <div className="relative aspect-square bg-white/5 border border-white/10 rounded-full flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0 bg-red-500/5 blur-[100px]"></div>
           <div className="text-center space-y-2">
              <div className="text-8xl font-serif text-white">1,200+</div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mandatory Data Points</div>
           </div>
        </div>
      </div>
    ),
    // 3. The Solution
    (
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="relative aspect-square bg-gold-500/5 border border-gold-500/20 rounded-2xl flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0 bg-gold-500/10 blur-[100px]"></div>
           <Gem size={120} className="text-gold-500 animate-pulse" />
        </div>
        <div className="space-y-8">
          <div className="text-[10px] font-black text-gold-500 uppercase tracking-[0.4em]">The Solution</div>
          <h2 className="text-7xl font-serif text-white leading-none tracking-tight">Deterministic <br/><span className="italic text-gold-400">Assurance.</span></h2>
          <p className="text-xl text-slate-400 font-light leading-relaxed">
            Audit Crystal uses proprietary LLM logic to cross-examine corporate data against ESRS standards. We don't just aggregate; we <span className="text-white font-medium">verify.</span>
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <ShieldCheck className="text-gold-500" size={18} /> Sub-second Gap Analysis
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <ShieldCheck className="text-gold-500" size={18} /> Automated Policy Remediation
            </li>
            <li className="flex items-center gap-3 text-sm text-slate-300">
              <ShieldCheck className="text-gold-500" size={18} /> Auditor-Ready Evidence Vault
            </li>
          </ul>
        </div>
      </div>
    ),
    // 4. Product Deep Dive
    (
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <div className="text-[10px] font-black text-gold-500 uppercase tracking-[0.4em]">The Product</div>
          <h2 className="text-6xl font-serif text-white leading-none tracking-tight italic">Built for the Boardroom.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-8 bg-white/5 border border-white/10 rounded-xl space-y-4 hover:bg-white/10 transition-colors">
              <Microscope className="text-gold-500" size={32} />
              <h4 className="text-sm font-black uppercase tracking-widest">Evidence Explorer</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Direct links from compliance claims to source PDF quotes. No hallucinations.</p>
           </div>
           <div className="p-8 bg-white/5 border border-white/10 rounded-xl space-y-4 hover:bg-white/10 transition-colors">
              <Cpu className="text-gold-500" size={32} />
              <h4 className="text-sm font-black uppercase tracking-widest">Policy Architect</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Instantly draft missing ESG policies based on institutional best practices.</p>
           </div>
           <div className="p-8 bg-white/5 border border-white/10 rounded-xl space-y-4 hover:bg-white/10 transition-colors">
              <Globe className="text-gold-500" size={32} />
              <h4 className="text-sm font-black uppercase tracking-widest">Veo Briefing</h4>
              <p className="text-xs text-slate-500 leading-relaxed">AI-generated video summaries for executive committees and board members.</p>
           </div>
        </div>
      </div>
    ),
    // 5. Market Opportunity
    (
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-8">
          <div className="text-[10px] font-black text-gold-500 uppercase tracking-[0.4em]">Market Opportunity</div>
          <h2 className="text-7xl font-serif text-white leading-none tracking-tight">A Global <br/><span className="italic text-gold-400">Mandate.</span></h2>
          <p className="text-xl text-slate-400 font-light leading-relaxed">
            The CSRD mandate affects 50,000+ companies in the EU alone, with global interoperability (ISSB/SEC) expanding the TAM to $25B+ by 2028.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-4">
             <div>
                <div className="text-4xl font-serif text-white">50k+</div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">EU Companies</div>
             </div>
             <div>
                <div className="text-4xl font-serif text-white">$25B</div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Compliance TAM</div>
             </div>
          </div>
        </div>
        <div className="relative">
           <div className="absolute inset-0 bg-gold-500/10 blur-[120px]"></div>
           <div className="relative bg-slate-900 border border-white/10 p-10 rounded-2xl shadow-2xl">
              <TrendingUp size={48} className="text-gold-500 mb-6" />
              <div className="space-y-4">
                 <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '80%' }}
                      transition={{ duration: 2, delay: 0.5 }}
                      className="h-full bg-gold-500"
                    />
                 </div>
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <span>2024</span>
                    <span>2028 Projection</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    ),
    // 6. Business Model
    (
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <div className="text-[10px] font-black text-gold-500 uppercase tracking-[0.4em]">Business Model</div>
          <h2 className="text-6xl font-serif text-white leading-none tracking-tight italic">Scalable Assurance.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
           <div className="p-10 bg-white/5 border border-white/10 rounded-2xl space-y-6">
              <h4 className="text-xl font-serif text-white italic">SaaS Subscription</h4>
              <p className="text-sm text-slate-400 leading-relaxed">Continuous monitoring and gap analysis for enterprise-level sustainability teams.</p>
              <div className="text-3xl font-serif text-gold-400">€2,500 <span className="text-sm text-slate-600">/ month</span></div>
           </div>
           <div className="p-10 bg-gold-500 rounded-2xl space-y-6 text-slate-950">
              <h4 className="text-xl font-serif italic">Per-Report Audit</h4>
              <p className="text-sm font-medium leading-relaxed">One-time deep-dive assurance reports for SMEs and subsidiaries.</p>
              <div className="text-3xl font-serif">€450 <span className="text-sm opacity-60">/ report</span></div>
           </div>
        </div>
      </div>
    ),
    // 7. The Ask
    (
      <div className="text-center space-y-12">
        <div className="text-[10px] font-black text-gold-500 uppercase tracking-[0.4em]">The Ask</div>
        <h2 className="text-8xl lg:text-9xl font-serif text-white leading-none tracking-tighter">Join the <br/><span className="italic text-gold-400">Assurance Era.</span></h2>
        <p className="text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          We are seeking <span className="text-white font-medium">€2.5M Seed</span> to scale our deterministic logic engine and expand into the US market.
        </p>
        <div className="pt-12">
           <button 
             onClick={onClose}
             className="h-20 px-16 bg-gold-500 hover:bg-gold-400 text-slate-950 text-sm font-black uppercase tracking-[0.2em] rounded transition-all shadow-[0_20px_50px_rgba(198,141,65,0.4)]"
           >
             Contact Founders
           </button>
        </div>
      </div>
    )
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col overflow-hidden no-print-override">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(198,141,65,0.05),transparent_70%)]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-12 py-8 flex justify-between items-center print:hidden print-hidden">
        <div className="flex items-center gap-3">
          <Gem className="text-gold-500" size={24} />
          <span className="font-serif italic text-2xl text-white">Audit Crystal</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors"
          >
            <Printer size={14} /> Download PDF
          </button>
          <button 
            onClick={onClose}
            className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
          >
            Close Deck
          </button>
        </div>
      </header>

      {/* Main Content (Interactive) */}
      <main className="relative flex-1 print:hidden print-hidden">
        {slides.map((slide, index) => (
          <Slide key={index} isActive={currentSlide === index}>
            {slide}
          </Slide>
        ))}
      </main>

      {/* Print View (Hidden in UI, visible in Print) */}
      <div className="hidden print:block">
        {slides.map((slide, index) => (
          <Slide key={`print-${index}`} isActive={true} isPrint={true}>
            {slide}
          </Slide>
        ))}
      </div>

      {/* Footer Controls */}
      <footer className="relative z-10 px-12 py-12 flex justify-between items-center print:hidden print-hidden">
        <div className="flex gap-4">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/30 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/30 transition-all"
          >
            <ArrowRight size={20} />
          </button>
        </div>
        
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <div 
              key={index}
              className={`h-1 transition-all duration-500 rounded-full ${currentSlide === index ? 'w-8 bg-gold-500' : 'w-2 bg-slate-800'}`}
            />
          ))}
        </div>

        <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">
          Slide {currentSlide + 1} / {slides.length}
        </div>
      </footer>
    </div>
  );
};

export default PitchDeck;
