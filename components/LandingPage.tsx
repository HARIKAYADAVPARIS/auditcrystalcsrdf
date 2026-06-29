
import React from 'react';
import { Gem, ArrowRight, ShieldCheck, Zap, Globe, BarChart3, CheckCircle2, Lock, FileText, Linkedin, Twitter, Instagram, Mail, Fingerprint, Code2, Network, SearchCheck, Building2, Server, Quote, Sparkles, Gavel, AlertCircle, TrendingUp, Layers, Cpu, Microscope, DatabaseZap, Scale, Shield, Compass, Target, Presentation, Clock } from 'lucide-react';
import LegacyPlatformComparison from './LegacyPlatformComparison';

interface LandingPageProps {
  onStart: (useSample?: boolean) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-gold-500/30 overflow-x-hidden">
      
      {/* Editorial Gradients - Institutional Deep Night */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[50%] bg-indigo-950/20 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-950/10 rounded-full blur-[140px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5 bg-slate-950/40 backdrop-blur-2xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="p-1.5 bg-gradient-to-br from-gold-400 to-gold-600 rounded shadow-[0_0_20px_rgba(198,141,65,0.4)] group-hover:scale-105 transition-transform">
              <Gem className="text-white" size={20} />
            </div>
            <span className="font-serif italic text-2xl tracking-tight text-white">Audit Crystal</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <a href="#protocol" className="hover:text-gold-400 transition-colors">The Protocol</a>
            <a href="#advantage" className="hover:text-gold-400 transition-colors">The Advantage</a>
            <a href="#pricing" className="hover:text-gold-400 transition-colors">Integration Models</a>
            <button 
              onClick={() => onStart()}
              className="px-6 py-2.5 bg-white text-slate-950 rounded font-black hover:bg-gold-400 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.1)] active:scale-95"
            >
              Access Pre-Assurance Suite
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - The System of Proof */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-40 grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded border border-gold-500/20 bg-gold-500/5 text-gold-400 text-[10px] font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span> PRE-AUDIT / CONFORMITÉ CSRD
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white text-slate-950 text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <ShieldCheck size={12} className="text-emerald-600" /> Compliant & Verified
            </div>
          </div>

          <h1 className="text-7xl lg:text-8xl font-serif leading-[0.95] tracking-tighter text-white">
            Simple CSRD <br />
            <span className="italic text-gold-400">Pre-Assurance.</span> <br />
            Prêt pour l'audit.
          </h1>
          
          <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-light">
            Verify your sustainability metrics before the official audit begins. Audit Crystal links your carbon and ESG reports directly to source evidence, making third-party validation smooth and stress-free.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <button 
              onClick={() => onStart()}
              className="h-16 px-10 bg-gold-500 hover:bg-gold-400 text-slate-950 text-xs font-black uppercase tracking-widest rounded transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(198,141,65,0.3)] hover:-translate-y-1"
            >
              Start Readiness Audit <ArrowRight size={16} strokeWidth={3} />
            </button>
            <button 
              onClick={() => onStart(true)}
              className="h-16 px-10 bg-transparent border border-white/10 hover:border-gold-500/50 text-white text-xs font-black uppercase tracking-widest rounded transition-all flex items-center justify-center gap-3 group"
            >
              <Sparkles size={16} className="text-slate-500 group-hover:text-gold-400 animate-pulse" /> Explore Sample Report / Exemple
            </button>
          </div>

          <div className="pt-10 flex items-center gap-12 text-slate-600 text-[10px] font-black uppercase tracking-[0.25em]">
             <span className="flex items-center gap-2 transition-all cursor-default"><Scale size={14} /> ISSA 5000 Ready</span>
             <span className="flex items-center gap-2 transition-all cursor-default"><ShieldCheck size={14} /> Deterministic Evidence</span>
             <span className="flex items-center gap-2 transition-all cursor-default"><Network size={14} /> universal API link</span>
          </div>
        </div>

        {/* Hero Visual - Pre-Assurance Dashboard */}
        <div className="relative animate-in fade-in slide-in-from-right-12 duration-1000 delay-300 hidden lg:block">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] opacity-40"></div>
          
          <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-sm p-10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
             <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-500/60">Pre-Assurance Pipeline</div>
                <div className="font-serif italic text-gold-500/80 text-sm">Status: Interoperable_Sync</div>
             </div>
             
             <div className="space-y-10">
                <div className="flex justify-between items-end">
                    <div className="space-y-1">
                        <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Verified Disclosures</div>
                        <div className="text-7xl font-serif text-white leading-none">
                            100<span className="text-2xl text-gold-400 font-sans ml-1">%</span>
                        </div>
                    </div>
                    <div className="text-right">
                       <ShieldCheck size={48} className="text-gold-500 ml-auto" />
                    </div>
                </div>

                <div className="space-y-6 pt-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span>Verified Evidence (Preuves vérifiées)</span>
                            <span className="text-gold-400">100% OK</span>
                        </div>
                        <div className="h-0.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-gold-400"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span>Auditor-Ready Connection</span>
                            <span className="text-slate-200">Active</span>
                        </div>
                        <div className="h-0.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-white/40"></div>
                        </div>
                    </div>
                </div>
                
                <div className="pt-8 text-center space-y-4">
                    <div className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">
                        Direct connection to certified auditors / Raccordement auditeurs
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded text-[9px] font-bold tracking-wider text-slate-400">
                            SaaS/ERP DATA
                        </div>
                        <div className="text-slate-500">→</div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded text-[9px] font-bold tracking-wider text-gold-400">
                            AUDIT TRAILS (PREUVES)
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Subtle European Operator Reference Strip */}
      <section className="relative z-20 py-12 border-t border-b border-white/5 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <p className="text-slate-400 text-xs font-light leading-relaxed">
                Trusted in pre-assurance workflows by leading European operators, including <span className="text-white font-medium">Indisanté Clinics</span> and <span className="text-white font-medium">ImmunoSentry Logistics</span>.
              </p>
              <p className="text-[10px] text-slate-500 mt-1">
                Utilisé en toute discrétion par des acteurs de santé et de logistique européens pour leurs validations d'audit.
              </p>
            </div>
            <div className="flex items-center gap-8 text-[10px] font-mono text-slate-600 tracking-wider">
              <span>PROFILE: EUR-IND-2026</span>
              <span>•</span>
              <span>PROFILE: API-IMM-2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Methodology / Methodologie */}
      <section id="protocol" className="py-32 border-b border-white/5 bg-slate-900/20 relative z-20">
          <div className="max-w-7xl mx-auto px-6 space-y-16">
              <div className="max-w-3xl">
                <div className="text-[10px] font-black text-gold-500 uppercase tracking-[0.5em] mb-4">The Process // La Méthode</div>
                <h2 className="text-5xl font-serif text-white tracking-tight leading-tight">Clear Verification. <br /> <span className="italic text-gold-400">Total Transparency.</span></h2>
                <p className="text-slate-400 mt-6 text-lg font-light leading-relaxed">
                  Compliance should not be complicated. We help you map your reports directly to official CSRD disclosure requirements with complete, reliable evidence trails.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pt-12 border-t border-white/5">
                  <div className="space-y-6">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(198,141,65,0.1)]"><Fingerprint size={24} className="text-gold-500" /></div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-white">01. Connected Evidence</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Every ESG figure in your report is linked directly to its primary source document or invoice, ensuring zero guesswork during audit time.</p>
                  </div>
                  <div className="space-y-6">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(198,141,65,0.1)]"><Scale size={24} className="text-gold-500" /></div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-white">02. Direct CSRD Mapping</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">We map your emissions and social records to the exact European ESRS points, conforming strictly to EU regulatory standards.</p>
                  </div>
                  <div className="space-y-6">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(198,141,65,0.1)]"><ShieldCheck size={24} className="text-gold-500" /></div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-white">03. Secure Local Processing</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">All sensitive operational records are processed locally in your secure browser workspace. Your raw confidential documents never leave your server.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Strategic Advantage - Record vs Proof */}
      <section id="advantage" className="py-40 relative z-10 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="text-[10px] font-black text-gold-500 uppercase tracking-[0.4em]">Preparation // Accompagnement</div>
              <h2 className="text-6xl font-serif text-white leading-none tracking-tight">Data <span className="italic text-gold-400">meets Verification.</span></h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                While standard software gathers and calculates your raw carbon numbers, Audit Crystal ensures they are ready for external auditors. We help you build the precise evidence trails needed for official co-signatures.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center shrink-0 border-gold-500/30">
                    <CheckCircle2 size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-[10px] uppercase tracking-widest text-white mb-2">Evidence-Linked Disclosures</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Instantly check your emissions database. We help trace back any figure directly to its source receipt or invoice for auditor convenience.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center shrink-0 border-gold-500/30">
                    <CheckCircle2 size={18} className="text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-black text-[10px] uppercase tracking-widest text-white mb-2">Valuation Alignment</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Align your verified sustainability metrics with long-term cost-of-capital savings and compliance risk reduction across your group.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gold-500/10 blur-[100px] opacity-20"></div>
              <div className="bg-slate-950 border border-white/10 rounded-2xl p-10 relative shadow-2xl backdrop-blur-3xl">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-sm font-black uppercase tracking-widest text-white">System Integration Matrix</h3>
                  <div className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black uppercase text-gold-500 border border-white/5 tracking-widest">Interoperable Layer</div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: "SaaS Database Sync", val: "Continuous API" },
                    { label: "Verification Proof Sealing", val: "Local Evidence Link" },
                    { label: "External Auditor Readiness", val: "CSRD / ESRS Compliant" }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-xl">
                      <span className="text-xs font-bold text-slate-400">{item.label}</span>
                      <span className="text-xs font-black text-emerald-500 uppercase">{item.val}</span>
                    </div>
                  ))}
                  <div className="pt-6">
                    <div className="flex justify-between items-center mb-2">
                       <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Compliance Pre-Assurance Confidence</div>
                       <div className="text-[10px] font-black text-gold-500 uppercase tracking-widest">Verified Trail</div>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gold-500 w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Platform Comparison Section */}
      <section className="py-24 border-t border-white/5 bg-slate-950 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <div className="text-[10px] font-black text-gold-500 uppercase tracking-[0.4em] mb-2">Flexible Compatibility</div>
            <h2 className="text-4xl font-serif text-white tracking-tight">The Pre-Assurance Concept</h2>
            <p className="text-slate-400 text-xs max-w-xl mx-auto font-light leading-relaxed">
              We complement your existing sustainability tools. While reporting systems track and calculate emissions, Audit Crystal organizes those calculations into structured evidence records.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <LegacyPlatformComparison />
          </div>
        </div>
      </section>

      {/* Auditor Portal - The methodology in action */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="relative bg-slate-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl">
                <div className="bg-slate-800 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Auditor Portal // Automated Verification</span>
                  </div>
                  <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-[8px] font-black text-emerald-500 uppercase">Read-Only Secure Portal</div>
                </div>
                <div className="p-8 space-y-4">
                  {[
                    { label: "ESRS E1-1: Transition Plan", status: "verified" },
                    { label: "ESRS E1-6: Gross Scope 1 GHG", status: "verified" },
                    { label: "ESRS S1-4: Collective Bargaining", status: "gap" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'verified' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                        <div className="text-[10px] font-black text-white uppercase tracking-wider">{item.label}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[8px] font-black text-slate-500 uppercase">View Evidence Log</span>
                        <Lock size={12} className="text-gold-500/30" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-950/50 p-6 border-t border-white/5 text-center">
                  <p className="text-[9px] font-mono text-slate-700 uppercase tracking-[0.2em]">Accredited Auditor Co-Signature Protocol Enabled</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-10">
              <div className="text-[10px] font-black text-gold-500 uppercase tracking-[0.4em]">Collaborative Workspace</div>
              <h2 className="text-6xl font-serif text-white leading-none tracking-tight">Shared <span className="italic text-gold-400">Auditor Views.</span></h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                Offer your third-party validators an elegant, read-only dashboard. Every metric is displayed alongside its original document proof, cutting review times significantly.
              </p>
              <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-10">
                <div className="space-y-2">
                  <div className="text-xl font-serif text-white italic">Linked Verification</div>
                  <p className="text-xs text-slate-500 font-medium">Source documents remain secure on your server.</p>
                </div>
                <div className="space-y-2">
                  <div className="text-xl font-serif text-white italic">Time Saving</div>
                  <p className="text-xs text-slate-500 font-medium">Avoid manual searching. Auditors verify facts quickly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shadow Audit CTA */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-gold-500/20 rounded-2xl p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gold-500/5 blur-[120px] pointer-events-none"></div>
            <div className="relative z-10 max-w-3xl space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded bg-gold-500 text-slate-950 text-[10px] font-black uppercase tracking-widest">
                Complementary Assessment
              </div>
              <h2 className="text-6xl font-serif text-white leading-none tracking-tight">Pre-Audit <span className="italic text-gold-400">Gap Assessment.</span></h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed">
                Upload your latest environmental drafts or reports to our secure local sandbox. We will provide an instant gap analysis showing which CSRD disclosure fields are ready or need extra documentation.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 pt-4">
                <button 
                  onClick={() => onStart()}
                  className="h-16 px-10 bg-white text-slate-950 text-xs font-black uppercase tracking-widest rounded transition-all flex items-center justify-center gap-3 hover:bg-gold-400 shadow-2xl"
                >
                  Run Complementary Pre-Audit <Zap size={16} fill="currentColor" />
                </button>
                <div className="flex items-center gap-4 px-6 text-slate-500 text-[10px] font-black uppercase tracking-widest border-l border-white/10">
                  <Clock size={16} /> Instant Evidence Audit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Model / Trust-as-a-Service (TaaS) Monetization Section */}
      <section id="pricing" className="py-40 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-4">
            <div className="text-[10px] font-black text-gold-500 uppercase tracking-[0.3em]">Monetization Engine // Tarification</div>
            <h2 className="text-5xl font-serif text-white leading-tight">
              Trust-as-a-Service <br />
              <span className="italic text-gold-400">The System of Proof</span>
            </h2>
            <p className="text-slate-400 font-light text-base leading-relaxed">
              We sit on top of your existing ESG databases and carbon accounting systems (Systems of Record like Sweep, Watershed, or Persefoni). We do not compete for data entry budgets; we monetize the speed, safety, and legal clearance of accredited audit readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
            {/* Enterprise Tier Card */}
            <div className="bg-slate-900/60 border border-white/5 p-10 rounded-xl flex flex-col justify-between hover:border-gold-500/30 transition-all duration-300 relative">
              <div className="absolute top-4 right-4 text-[9px] font-black uppercase text-gold-500 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                Tier 1
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Enterprises</h4>
                  <h3 className="text-xl font-serif text-white font-bold">System of Proof</h3>
                  <p className="text-xs text-slate-500 mt-2 font-light">
                    SaaS subscription based on connected nodes, sealed data points, and generated financial-grade reports.
                  </p>
                </div>

                <div className="border-t border-b border-white/5 py-4 space-y-2">
                  <div className="text-xs text-slate-300">
                    <span className="font-bold text-white text-sm">Standard API Tier:</span> Flat annual SaaS fee + usage-based fee per 10k data points sealed. Connects directly to Sweep or Watershed.
                  </div>
                  <div className="text-xs text-slate-300 pt-2 border-t border-white/5">
                    <span className="font-bold text-gold-400 text-sm">CFO Alpha Tier:</span> Value-based pricing modeled as 15% of identified capital interest rate discount achieved.
                  </div>
                </div>

                <ul className="space-y-3">
                  <li className="flex gap-2.5 text-xs text-slate-400">
                    <CheckCircle2 size={14} className="text-gold-500 shrink-0 mt-0.5" />
                    Evidence-Lock™ Cryptographic Seals
                  </li>
                  <li className="flex gap-2.5 text-xs text-slate-400">
                    <CheckCircle2 size={14} className="text-gold-500 shrink-0 mt-0.5" />
                    Direct API Integration (Sweep/Watershed)
                  </li>
                  <li className="flex gap-2.5 text-xs text-slate-400">
                    <CheckCircle2 size={14} className="text-gold-500 shrink-0 mt-0.5" />
                    CFO Capital Discount Engine Access
                  </li>
                </ul>
              </div>
              <button onClick={() => onStart()} className="w-full mt-8 py-3.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/10 text-white transition-colors">
                Initialize System of Proof
              </button>
            </div>

            {/* Auditor Portal Tier Card */}
            <div className="bg-slate-900 border border-gold-500/30 p-10 rounded-xl flex flex-col justify-between shadow-[0_20px_50px_rgba(212,163,89,0.1)] transform md:scale-105 relative z-20 hover:border-gold-500/50 transition-all duration-300">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-500 text-slate-950 text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                Highly Recommended // Réseau
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-gold-400 uppercase tracking-widest mb-1">Auditing Firms</h4>
                  <h3 className="text-xl font-serif text-white font-bold">Auditor Seat License</h3>
                  <p className="text-xs text-slate-300 mt-2 font-light">
                    Seat-based licenses enabling accredited auditors (Big 4, ESG assurance firms) to co-sign disclosures in minutes.
                  </p>
                </div>

                <div className="border-t border-b border-white/5 py-4">
                  <div className="text-sm font-serif text-gold-400 font-bold mb-1">Cuts Audit Field-Work Time by 90%</div>
                  <p className="text-xs text-slate-400 font-light">
                    Firms gain specialized interactive dashboards to inspect cryptographic proof anchors and SHA-256 sentence-level links instantly.
                  </p>
                </div>

                <ul className="space-y-3">
                  <li className="flex gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 size={14} className="text-gold-500 shrink-0 mt-0.5" />
                    Interactive Co-Signature Gateway
                  </li>
                  <li className="flex gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 size={14} className="text-gold-500 shrink-0 mt-0.5" />
                    SHA-256 Link Inspection Panels
                  </li>
                  <li className="flex gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 size={14} className="text-gold-500 shrink-0 mt-0.5" />
                    Multi-Client Oversight Workspace
                  </li>
                </ul>
              </div>
              <button onClick={() => onStart()} className="w-full mt-8 py-3.5 bg-gold-500 text-slate-950 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-gold-400 transition-colors shadow-xl">
                Deploy Co-Signature Gateway
              </button>
            </div>

            {/* Certificate Issuance Card */}
            <div className="bg-slate-900/60 border border-white/5 p-10 rounded-xl flex flex-col justify-between hover:border-gold-500/30 transition-all duration-300 relative">
              <div className="absolute top-4 right-4 text-[9px] font-black uppercase text-gold-500 bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/20">
                Tier 3
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Transactional</h4>
                  <h3 className="text-xl font-serif text-white font-bold">Assurance Stamps</h3>
                  <p className="text-xs text-slate-500 mt-2 font-light">
                    On-demand flat-fee generation of officially signed, immutable PDF Certificates of Assurance.
                  </p>
                </div>

                <div className="border-t border-b border-white/5 py-4">
                  <div className="text-sm font-serif text-white font-bold mb-1">Pay-per-Published Report</div>
                  <p className="text-xs text-slate-400 font-light">
                    Priced as a flat fee per certified entity or published report registered permanently on the cryptographic evidence ledger.
                  </p>
                </div>

                <ul className="space-y-3">
                  <li className="flex gap-2.5 text-xs text-slate-400">
                    <CheckCircle2 size={14} className="text-gold-500 shrink-0 mt-0.5" />
                    Immutable PDF Ledger Registry
                  </li>
                  <li className="flex gap-2.5 text-xs text-slate-400">
                    <CheckCircle2 size={14} className="text-gold-500 shrink-0 mt-0.5" />
                    Public Investor Verification Link
                  </li>
                  <li className="flex gap-2.5 text-xs text-slate-400">
                    <CheckCircle2 size={14} className="text-gold-500 shrink-0 mt-0.5" />
                    Stamped Multi-Subsidiary Seals
                  </li>
                </ul>
              </div>
              <button onClick={() => onStart()} className="w-full mt-8 py-3.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/10 text-white transition-colors">
                Issue Assurance Stamp
              </button>
            </div>
          </div>

          {/* Strategic Advantages / Why This Wins */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-950/40 p-8 rounded-xl border border-white/5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-gold-500 text-[10px] font-black uppercase tracking-wider">
                <Layers size={12} /> Zero Migration Friction
              </div>
              <h4 className="text-lg font-serif text-white font-bold">Leverage Your Systems of Record</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                No need to migrate or replace your existing Sweep or Watershed data collectors. Keep your data collection stack intact. Audit Crystal connects in seconds, meaning sales cycles are <strong>10x faster</strong> than standard enterprise ESG software.
              </p>
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-gold-500 text-[10px] font-black uppercase tracking-wider">
                <TrendingUp size={12} /> Immediate ROI Realization
              </div>
              <h4 className="text-lg font-serif text-white font-bold">Squeeze Out Auditor Billable Hours</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Standard external ESG audits cost enterprises between <strong>€50,000 and €200,000</strong>. By automating evidence structuring and pre-assurance checks, Audit Crystal pays for itself in the very first month by drastically saving expensive auditor field hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visionary Footer Quote */}
      <section className="py-40 bg-slate-950 relative overflow-hidden border-t border-white/5">
         <div className="max-w-5xl mx-auto px-6 text-center">
            <Quote className="mx-auto text-gold-500/20 mb-12" size={80} />
            <p className="text-4xl lg:text-5xl font-serif italic text-slate-200 leading-snug">
               "Pour le reporting CSRD, <span className="text-gold-400 text-6xl">la clarté est essentielle.</span> Audit Crystal prépare vos données pour une validation d'audit sans mauvaise surprise."
            </p>
            <div className="mt-12 flex flex-col items-center">
               <div className="w-16 h-16 bg-slate-900 rounded-full mb-4 border border-white/10 overflow-hidden grayscale">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150" alt="Founder" className="w-full h-full object-cover" />
               </div>
               <div className="text-[10px] font-black uppercase text-gold-500 tracking-[0.3em]">Institutional Trust Office</div>
            </div>
         </div>
      </section>

      {/* Footer Editorial */}
      <footer id="security" className="py-32 border-t border-white/5 bg-slate-950 relative z-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <Gem className="text-gold-500" size={24} />
              <span className="font-serif italic text-2xl text-white">Audit Crystal</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-loose">
              Pré-assurance CSRD simple et raccordement aux auditeurs certifiés. Rendre vos rapports de durabilité clairs, structurés et vérifiables.
            </p>
            <div className="flex items-center gap-6 text-slate-600">
              <a href="#" className="hover:text-gold-500 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-gold-500 transition-colors"><Twitter size={20} /></a>
              <a href="https://instagram.com/auditcrystal1" target="_blank" className="hover:text-gold-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-gold-500 transition-colors"><Mail size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="font-black text-[10px] text-white uppercase tracking-[0.3em] mb-8">Ecosystem</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500">
              <li><a href="#protocol" className="hover:text-gold-400 transition-colors">The Protocol</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Security Audit</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Global Node</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-[10px] text-white uppercase tracking-[0.3em] mb-8">Compliance</h4>
            <ul className="space-y-4 text-xs font-bold text-slate-500">
              <li><a href="#" className="hover:text-gold-400 transition-colors">Global Privacy</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Terms of Trust</a></li>
              <li><a href="#" className="hover:text-gold-400 transition-colors">Ethics Ledger</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-32 pt-10 border-t border-white/5 text-center">
          <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em]">
            © MMXXVI Audit Crystal AI • Institutional Trust Intelligence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
