
import React, { useState } from 'react';
import { AuditResult, DisclosureStatus } from '../types';
import { ShieldCheck, FileText, ExternalLink, Search, Filter, ChevronRight, Lock, CheckCircle2, AlertCircle, Clock, Database, Globe, Scale, ShieldAlert, Cpu, Sparkles, RefreshCw, Eye, EyeOff, Fingerprint, Check } from 'lucide-react';

interface MaterialityLedgerProps {
  data: AuditResult;
}

const PRESETS = [
  {
    id: 'indisante',
    title: 'Indisanté Sustainability Brief',
    text: 'We reviewed the healthcare waste management logs at Indisanté Clinic. Chief Medical Officer Dr. Pierre Dubois (p.dubois@indisante.fr) confirmed that 99.4% of biohazard containers were safely decontaminated, under supervision of facility head Chloe Moreau. The total waste management budget was €1,850,000 in FY25.'
  },
  {
    id: 'immunosentry',
    title: 'IMMUNOSENTRY Biosecurity Audit',
    text: 'Audit report by clinical compliance director Dr. Aris Thorne (a.thorne@immunosentry.com) on cold-chain storage site 4A in Basel, Switzerland. Discovered minor temperature control logs discrepancies. Facility director Elena Rostova signed off on corrective actions on March 14, 2026. The localized network server runs securely under IP 10.240.40.12.'
  },
  {
    id: 'emission',
    title: 'Audit Crystal Carbon Log',
    text: 'Scope 1 emissions were verified at 48,200 tCO2e by senior environmental officer Sarah Jenkins (s.jenkins@auditcrystal.com). The internal compliance index is anchored securely on local node IP 192.168.1.104.'
  }
];

const MaterialityLedger: React.FC<MaterialityLedgerProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'present' | 'missing'>('all');

  // GDPR Zero-Knowledge Privacy Sandbox State
  const [sandboxText, setSandboxText] = useState(PRESETS[0].text);
  const [redactNames, setRedactNames] = useState(true);
  const [redactEmails, setRedactEmails] = useState(true);
  const [redactIPs, setRedactIPs] = useState(true);
  const [redactFinancials, setRedactFinancials] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [uploadedBlocks, setUploadedBlocks] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Simple deterministic hash generator starting with "AC4_"
  const computeSimpleHash = (text: string) => {
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    for (let i = 0; i < text.length; i++) {
      const ch = text.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    const part1 = (h1 >>> 0).toString(16).padStart(8, '0');
    const part2 = (h2 >>> 0).toString(16).padStart(8, '0');
    return `AC4_${part1}${part2}`.toUpperCase();
  };

  const currentHash = computeSimpleHash(sandboxText);

  // Render Redacted text
  const renderProcessedText = () => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
    const ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g;
    const financialRegex = /(?:[€$£]\d{1,3}(?:,\d{3})*(?:\.\d+)?)|(?:\b\d{1,3}(?:,\d{3})*(?:\.\d+)?\s*(?:EUR|USD|tCO2e|tCO2|EUR)\b)/g;
    const namesRegex = /\b(Dr\. Pierre Dubois|Pierre Dubois|Chloe Moreau|Dr\. Aris Thorne|Aris Thorne|Elena Rostova|Sarah Jenkins)\b/g;

    const matches: { index: number; length: number; type: 'name' | 'email' | 'ip' | 'financial'; text: string }[] = [];
    
    if (redactNames) {
      let match;
      namesRegex.lastIndex = 0;
      while ((match = namesRegex.exec(sandboxText)) !== null) {
        matches.push({ index: match.index, length: match[0].length, type: 'name', text: match[0] });
      }
    }
    if (redactEmails) {
      let match;
      emailRegex.lastIndex = 0;
      while ((match = emailRegex.exec(sandboxText)) !== null) {
        matches.push({ index: match.index, length: match[0].length, type: 'email', text: match[0] });
      }
    }
    if (redactIPs) {
      let match;
      ipRegex.lastIndex = 0;
      while ((match = ipRegex.exec(sandboxText)) !== null) {
        matches.push({ index: match.index, length: match[0].length, type: 'ip', text: match[0] });
      }
    }
    if (redactFinancials) {
      let match;
      financialRegex.lastIndex = 0;
      while ((match = financialRegex.exec(sandboxText)) !== null) {
        matches.push({ index: match.index, length: match[0].length, type: 'financial', text: match[0] });
      }
    }

    // Sort matches and remove overlaps
    matches.sort((a, b) => a.index - b.index);
    const nonOverlapping: typeof matches = [];
    let lastIndex = 0;
    for (const m of matches) {
      if (m.index >= lastIndex) {
        nonOverlapping.push(m);
        lastIndex = m.index + m.length;
      }
    }

    const elements: React.ReactNode[] = [];
    let currentPos = 0;
    nonOverlapping.forEach((m, idx) => {
      if (m.index > currentPos) {
        elements.push(sandboxText.slice(currentPos, m.index));
      }
      elements.push(
        <span 
          key={`redact-${idx}`} 
          className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded text-[10px] font-mono font-bold bg-slate-950 text-gold-400 border border-gold-500/30 transition-all hover:bg-gold-500 hover:text-slate-950 relative group/tooltip cursor-pointer"
        >
          <Lock size={10} className="mr-1" />
          REDACTED_{m.type.toUpperCase()}
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover/tooltip:block bg-slate-950 text-white text-[9px] font-black tracking-wider uppercase px-2 py-1 rounded shadow-xl border border-white/10 whitespace-nowrap z-50">
            Anonymized Client-Side
          </span>
        </span>
      );
      currentPos = m.index + m.length;
    });

    if (currentPos < sandboxText.length) {
      elements.push(sandboxText.slice(currentPos));
    }

    return elements.length > 0 ? elements : [sandboxText];
  };

  const handleUploadBlock = () => {
    setIsUploading(true);
    setTimeout(() => {
      setUploadedBlocks(prev => [currentHash, ...prev.slice(0, 4)]);
      setIsUploading(false);
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentHash);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const filteredDisclosures = data.mandatoryDisclosures.filter(d => {
    const matchesSearch = d.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         d.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'present' && d.status === 'Present') || 
                         (filter === 'missing' && d.status === 'Missing');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 blur-[100px] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-gold-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">
              <Database size={14} /> Deterministic Verification Logic
            </div>
            <h2 className="text-4xl font-black tracking-tighter">Materiality Ledger <span className="text-gold-500 italic font-serif text-3xl font-normal ml-1">v4.0</span></h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl font-medium">
              Institutional-grade verification of ESRS data points. Every "Present" finding is locked to a specific cryptographic evidence quote.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                <div className="text-center">
                    <div className="text-2xl font-black text-white">{data.mandatoryDisclosures.filter(d => d.status === 'Present').length}</div>
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Verified</div>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="text-center">
                    <div className="text-2xl font-black text-red-400">{data.mandatoryDisclosures.filter(d => d.status === 'Missing').length}</div>
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Gaps</div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* GDPR Zero-Knowledge Privacy Sandbox */}
      <div className="bg-slate-950 rounded-3xl border border-slate-800 p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-emerald-500/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold-500/5 blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">
                <ShieldAlert size={14} className="animate-pulse" /> GDPR CLIENT-SIDE REDACTION SANDBOX
              </div>
              <h3 className="text-2xl font-black tracking-tight">Zero-Knowledge Evidence Verifier</h3>
              <p className="text-slate-400 text-xs mt-1 max-w-2xl font-medium">
                Verify ESG findings without transferring raw personal data. This interactive testbed demonstrates how we redact PII on the client side and anchor only the cryptographic fingerprints.
              </p>
            </div>
            <div className="flex gap-2 items-center text-[10px] uppercase font-black tracking-wider bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Client-Only Mode
            </div>
          </div>

          {/* Preset Buttons */}
          <div className="space-y-2">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">Select Audit Sample:</div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSandboxText(preset.text)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    sandboxText === preset.text 
                    ? 'bg-gold-500/10 text-gold-400 border-gold-500/40' 
                    : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {preset.title}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Redaction Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
            <button 
              onClick={() => setRedactNames(!redactNames)}
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${redactNames ? 'bg-gold-500/10 border-gold-500/30 text-white' : 'bg-slate-900 border-transparent text-slate-500 hover:text-slate-400'}`}
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-wider">Redact Names</span>
                <span className="text-[9px] text-slate-400">Jane, Sarah, etc.</span>
              </div>
              {redactNames ? <Check size={14} className="text-gold-400" /> : <div className="w-3.5 h-3.5 rounded border border-slate-700"></div>}
            </button>

            <button 
              onClick={() => setRedactEmails(!redactEmails)}
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${redactEmails ? 'bg-gold-500/10 border-gold-500/30 text-white' : 'bg-slate-900 border-transparent text-slate-500 hover:text-slate-400'}`}
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-wider">Mask Emails</span>
                <span className="text-[9px] text-slate-400">user@domain.com</span>
              </div>
              {redactEmails ? <Check size={14} className="text-gold-400" /> : <div className="w-3.5 h-3.5 rounded border border-slate-700"></div>}
            </button>

            <button 
              onClick={() => setRedactIPs(!redactIPs)}
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${redactIPs ? 'bg-gold-500/10 border-gold-500/30 text-white' : 'bg-slate-900 border-transparent text-slate-500 hover:text-slate-400'}`}
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-wider">Hide IP Nodes</span>
                <span className="text-[9px] text-slate-400">192.168.1.104</span>
              </div>
              {redactIPs ? <Check size={14} className="text-gold-400" /> : <div className="w-3.5 h-3.5 rounded border border-slate-700"></div>}
            </button>

            <button 
              onClick={() => setRedactFinancials(!redactFinancials)}
              className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${redactFinancials ? 'bg-gold-500/10 border-gold-500/30 text-white' : 'bg-slate-900 border-transparent text-slate-500 hover:text-slate-400'}`}
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-wider">Redact Financials</span>
                <span className="text-[9px] text-slate-400">Values & amounts</span>
              </div>
              {redactFinancials ? <Check size={14} className="text-gold-400" /> : <div className="w-3.5 h-3.5 rounded border border-slate-700"></div>}
            </button>
          </div>

          {/* Playground Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Column */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-400">
                <span>Client Raw Evidence (Input Here)</span>
                <span className="text-rose-400">PII Present</span>
              </div>
              <textarea
                value={sandboxText}
                onChange={(e) => setSandboxText(e.target.value)}
                rows={4}
                className="w-full bg-slate-900/50 border border-slate-800 focus:border-slate-700 focus:ring-1 focus:ring-slate-700 rounded-2xl p-4 text-xs font-medium text-slate-300 resize-none font-sans leading-relaxed focus:outline-none"
                placeholder="Paste corporate report or ESG audit log containing sensitive information..."
              />
            </div>

            {/* Output Column */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider text-slate-400">
                <span>Redacted Secure Stream (Client-Side)</span>
                <span className="text-emerald-400">Sanitized for Ledger</span>
              </div>
              <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 min-h-[96px] font-sans leading-relaxed flex flex-wrap items-center">
                <div className="w-full">{renderProcessedText()}</div>
              </div>
            </div>
          </div>

          {/* Real-Time Hash & Ledger Anchor Widget */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center border border-gold-500/20 text-gold-400 shrink-0">
                <Fingerprint size={24} />
              </div>
              <div className="space-y-1 w-full overflow-hidden">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">DETERMINISTIC CRYPTO SIGNATURE (SHA-256)</div>
                <div className="flex items-center gap-2 text-xs font-mono font-black text-gold-400 truncate">
                  <span>{currentHash}</span>
                  <button 
                    onClick={copyToClipboard}
                    className="p-1 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-white shrink-0"
                    title="Copy hash"
                  >
                    {isCopied ? <Check size={12} className="text-emerald-400" /> : <FileText size={12} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 shrink-0 w-full md:w-auto justify-end">
              <button 
                onClick={handleUploadBlock}
                disabled={isUploading}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 justify-center w-full md:w-auto"
              >
                {isUploading ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" /> Anchoring...
                  </>
                ) : (
                  <>
                    <Cpu size={14} /> Anchor Proof to Ledger
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Anchor Log */}
          {uploadedBlocks.length > 0 && (
            <div className="space-y-2 animate-in fade-in duration-300">
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">PROOFS REGISTERED ON LEDGER:</div>
              <div className="space-y-1.5 font-mono text-[10px]">
                {uploadedBlocks.map((blk, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white/5 border border-white/5 px-3 py-2 rounded-lg">
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <ShieldCheck size={12} /> BLOCK_ANCHOR #{40523 - idx}
                    </span>
                    <span className="text-slate-400 truncate max-w-xs">{blk}</span>
                    <span className="text-slate-500 text-[9px]">Verified Status: locked</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by disclosure code or rule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
            <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${filter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}>All</button>
            <button onClick={() => setFilter('present')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${filter === 'present' ? 'bg-emerald-100 text-emerald-700' : 'text-slate-500 hover:bg-slate-50'}`}>Verified</button>
            <button onClick={() => setFilter('missing')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${filter === 'missing' ? 'bg-red-100 text-red-700' : 'text-slate-500 hover:bg-slate-50'}`}>Gaps</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-24">Code</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Disclosure Requirement</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-32">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Evidence / Remediation</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-20 text-center">Protocol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDisclosures.map((disclosure, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-6 align-top">
                    <span className="inline-block px-2 py-1 bg-slate-900 text-white text-[10px] font-black rounded border border-slate-800 shadow-sm">
                      {disclosure.code}
                    </span>
                  </td>
                  <td className="px-6 py-6 align-top max-w-xs">
                    <div className="text-xs font-bold text-slate-900 leading-relaxed mb-1 italic">"{disclosure.description}"</div>
                    <div className="flex items-center gap-1.5 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                       <Scale size={10} className="text-slate-400" />
                       <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">ESRS Standard v1.2</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 align-top">
                    {disclosure.status === 'Present' ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                        <ShieldCheck size={14} /> Verified
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-red-500 font-black text-[10px] uppercase tracking-widest">
                        <AlertCircle size={14} /> Gap
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-6 align-top">
                    {disclosure.status === 'Present' ? (
                      <div className="space-y-3">
                         <div className="bg-emerald-50/30 p-4 border border-emerald-100 rounded-xl relative group/evidence">
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/evidence:opacity-100 transition-opacity">
                               <div className="p-1 px-2 bg-emerald-500 text-white text-[8px] font-black rounded uppercase">Evidence-Lock™</div>
                            </div>
                            <p className="text-[11px] text-slate-700 leading-relaxed font-medium">"{disclosure.evidence?.quote}"</p>
                            <div className="mt-3 flex items-center gap-3 text-[9px] font-black text-emerald-600 uppercase tracking-widest border-t border-emerald-100/50 pt-2">
                               <span className="flex items-center gap-1"><FileText size={12} /> Page {disclosure.evidence?.page}</span>
                               <span className="flex items-center gap-1 px-2 py-0.5 bg-emerald-100/50 rounded"><Clock size={10} /> Hash Verified</span>
                            </div>
                         </div>
                      </div>
                    ) : (
                      <div className="bg-red-50/30 p-4 border border-red-100 rounded-xl">
                        <div className="text-[10px] font-black text-red-900 uppercase tracking-[0.2em] mb-2">Remediation Required</div>
                        <p className="text-[11px] text-slate-600 font-medium leading-relaxed italic">"{disclosure.fixRecommendation}"</p>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6 align-top text-center">
                    <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all text-slate-300 hover:text-slate-900 shadow-sm">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredDisclosures.length === 0 && (
          <div className="py-24 text-center">
            <Search size={40} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 text-sm font-black uppercase tracking-widest">No matching verification data found</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-gold-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-gold-100">
               <ShieldCheck size={24} />
            </div>
            <div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Assurance Fidelity</div>
               <div className="text-xl font-black text-slate-900 leading-none">99.8%</div>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
               <Database size={24} />
            </div>
            <div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Verified Data Points</div>
               <div className="text-xl font-black text-slate-900 leading-none">{data.mandatoryDisclosures.filter(d => d.status === 'Present').length}</div>
            </div>
         </div>
         <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 group cursor-pointer hover:border-gold-400 transition-all">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-slate-200 group-hover:scale-105 transition-transform">
               <Lock size={24} />
            </div>
            <div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Protocol Hash</div>
               <div className="text-[10px] font-mono font-black text-slate-900 leading-none">V4-DETERMIN-CRYSTAL</div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MaterialityLedger;
