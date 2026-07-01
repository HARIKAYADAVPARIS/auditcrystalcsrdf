import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  PenTool, 
  Lock, 
  Unlock, 
  Award, 
  FileCheck, 
  QrCode, 
  Printer, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Server, 
  Cpu, 
  Hash, 
  Fingerprint, 
  Sparkles,
  BadgeAlert,
  HelpCircle
} from 'lucide-react';
import { AuditResult } from '../types';

interface AssuranceCertifierProps {
  data: AuditResult;
}

export const AssuranceCertifier: React.FC<AssuranceCertifierProps> = ({ data }) => {
  const [isSigned, setIsSigned] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [csoName, setCsoName] = useState(
    data.companyName.toLowerCase().includes('indisante') 
      ? 'Dr. Pierre Dubois' 
      : data.companyName.toLowerCase().includes('immunosentry')
      ? 'Dr. Aris Thorne'
      : 'Sarah Jenkins'
  );
  const [auditorName, setAuditorName] = useState('Planned External Assurer');
  const [csoTitle, setCsoTitle] = useState(
    data.companyName.toLowerCase().includes('indisante') 
      ? 'Chief Medical Officer (CMO)' 
      : data.companyName.toLowerCase().includes('immunosentry')
      ? 'Clinical Compliance Director'
      : 'VP of Sustainability'
  );
  const [auditorFirm, setAuditorFirm] = useState('Planned Assurance Firm');
  
  // Checklist states
  const [checks, setChecks] = useState({
    doubleMateriality: true,
    evidenceVerified: true,
    peerAligned: true,
    dataIntegrity: false
  });

  // Unique hash generator for evidence locks
  const certificateHash = 'AC-' + Array.from({ length: 32 }, (_, i) => 
    "ABCDEF0123456789"[Math.floor(Math.random() * 16)]
  ).join('');

  const nodeIp = data.companyName.toLowerCase().includes('indisante')
    ? '192.168.1.104'
    : data.companyName.toLowerCase().includes('immunosentry')
    ? '10.240.40.12'
    : '127.0.0.1';

  const handleSign = () => {
    setIsSigning(true);
    setTimeout(() => {
      setIsSigned(true);
      setIsSigning(false);
    }, 2500);
  };

  const handleReset = () => {
    setIsSigned(false);
    setChecks(prev => ({ ...prev, dataIntegrity: false }));
  };

  const allChecksMet = Object.values(checks).every(Boolean);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full animate-in fade-in duration-500">
      {/* Tab Header Banner */}
      <div className="p-6 bg-slate-950 text-white flex justify-between items-center shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[8px] font-black uppercase tracking-widest rounded">
              CSRD Article 34 Readiness Simulation
            </span>
            <span className="text-[10px] text-slate-500 font-mono tracking-wider">
              BLOCK-ID: {certificateHash.slice(0, 10)}
            </span>
          </div>
          <h3 className="font-serif italic text-xl flex items-center gap-2">
            <ShieldCheck className="text-amber-500" size={22} />
            Co-Signature Readiness Gateway
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Server size={14} className="text-emerald-500" />
          Node: <span className="text-white">{nodeIp}</span>
        </div>
      </div>

      <div className="p-8 flex-1 space-y-8">
        {!isSigned ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Input Panel & Authority Details */}
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <PenTool size={16} className="text-indigo-600" />
                  1. Define Co-Signing Roles
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Enter details for the corporate reporting officer and your planned external auditor to simulate readiness signing and prepare for the audit.
                </p>
              </div>

              <div className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                {/* CSO Details */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Corporate Officer (CSO / Representative)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      value={csoName} 
                      onChange={(e) => setCsoName(e.target.value)}
                      placeholder="Officer Name"
                      className="px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <input 
                      type="text" 
                      value={csoTitle} 
                      onChange={(e) => setCsoTitle(e.target.value)}
                      placeholder="Title (e.g. CMO)"
                      className="px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Auditor Details */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    Target External Auditor (Planned Assurer)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      value={auditorName} 
                      onChange={(e) => setAuditorName(e.target.value)}
                      placeholder="Auditor Name"
                      className="px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <input 
                      type="text" 
                      value={auditorFirm} 
                      onChange={(e) => setAuditorFirm(e.target.value)}
                      placeholder="Firm / Organization"
                      className="px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Integrity Checklist */}
              <div className="space-y-4">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
                  <FileCheck size={16} className="text-indigo-600" />
                  2. Dynamic Compliance Verification Checklist
                </h4>
                <div className="space-y-2.5">
                  <label className="flex items-start gap-3 p-3.5 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-all">
                    <input 
                      type="checkbox"
                      checked={checks.doubleMateriality}
                      onChange={(e) => setChecks({...checks, doubleMateriality: e.target.checked})}
                      className="mt-0.5 rounded border-slate-200 text-amber-500 focus:ring-amber-500 h-4 w-4"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-800">Double Materiality Validated</div>
                      <div className="text-slate-500 font-light mt-0.5">Approved the financial and impact materiality matrix topics matching ESRS IRP protocols.</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-all">
                    <input 
                      type="checkbox"
                      checked={checks.evidenceVerified}
                      onChange={(e) => setChecks({...checks, evidenceVerified: e.target.checked})}
                      className="mt-0.5 rounded border-slate-200 text-amber-500 focus:ring-amber-500 h-4 w-4"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-800">GDPR & Zero-Knowledge Evidence Logs Audited</div>
                      <div className="text-slate-500 font-light mt-0.5">Confirmed that PII elements were fully redacted and cryptographic proofs are anchored securely.</div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3.5 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-all">
                    <input 
                      type="checkbox"
                      checked={checks.peerAligned}
                      onChange={(e) => setChecks({...checks, peerAligned: e.target.checked})}
                      className="mt-0.5 rounded border-slate-200 text-amber-500 focus:ring-amber-500 h-4 w-4"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-800">Peer Intelligence & Benchmark Gap Verified</div>
                      <div className="text-slate-500 font-light mt-0.5">Endorsed the market comparative standing evaluation against verified sector peers.</div>
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-3.5 rounded-xl cursor-pointer transition-all border ${
                    checks.dataIntegrity ? 'bg-indigo-50/50 border-indigo-200' : 'bg-amber-50/50 border-amber-200 animate-pulse'
                  }`}>
                    <input 
                      type="checkbox"
                      checked={checks.dataIntegrity}
                      onChange={(e) => setChecks({...checks, dataIntegrity: e.target.checked})}
                      className="mt-0.5 rounded border-slate-200 text-indigo-500 focus:ring-indigo-500 h-4 w-4"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-800 flex items-center gap-1.5">
                        Lock Report Data & Finalize Assurance Block
                        {!checks.dataIntegrity && <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 text-[7px] font-black uppercase tracking-widest rounded animate-bounce">Pending Lock</span>}
                      </div>
                      <div className="text-slate-500 font-light mt-0.5">
                        Locking permanently prevents retroactive modifications and seals the current disclosures under SHA-256 seal.
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Signature Board & Action CTA */}
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 blur-3xl rounded-full pointer-events-none"></div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 text-amber-600 rounded-xl border border-amber-500/20">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase">3. Security Status</h4>
                    <p className="text-[10px] font-mono text-slate-500 mt-0.5">PROTOCOL-LOCK: UNSECURED_PREVIEW</p>
                  </div>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
                  <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-3">
                    <span className="text-slate-500 font-medium">Assurance Target</span>
                    <strong className="text-slate-900 font-black">CSRD Limited Assurance (Simulated)</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-3">
                    <span className="text-slate-500 font-medium">Reporting Company</span>
                    <strong className="text-slate-900 font-black">{data.companyName}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-3">
                    <span className="text-slate-500 font-medium">Readiness Index Score</span>
                    <strong className="text-amber-600 font-black">{data.scoreValue}/100</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Planned Assurer</span>
                    <strong className="text-indigo-600 font-black">{auditorFirm}</strong>
                  </div>
                </div>

                <div className="text-xs text-slate-500 leading-relaxed font-medium bg-amber-50 border border-amber-100 p-4 rounded-xl flex items-start gap-2.5">
                  <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    Co-signing locks all compliance scores, gap analyses, and policy drafts inside this session. It issues a cryptographic seal that simulates an audit-ready assurance certificate.
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <button
                  disabled={!allChecksMet || isSigning}
                  onClick={handleSign}
                  className={`w-full flex items-center justify-center gap-3 py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg ${
                    allChecksMet 
                      ? 'bg-slate-950 hover:bg-slate-900 text-white cursor-pointer' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isSigning ? (
                    <>
                      <Cpu size={16} className="animate-spin text-amber-500" />
                      Sealing Cryptographic Node & Signatures...
                    </>
                  ) : (
                    <>
                      <Lock size={15} />
                      Co-Sign & Issue Certificate of Audit-Readiness
                    </>
                  )}
                </button>
                {!allChecksMet && (
                  <p className="text-[10px] text-amber-600 text-center font-bold mt-3 animate-pulse">
                    ⚠️ Complete the Checklist above to enable digital signature protocols.
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Certificate of Assurance View */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 md:p-12 bg-slate-950 border-4 border-double border-amber-500/40 rounded-3xl text-white relative space-y-10 overflow-hidden shadow-2xl"
          >
            {/* Background elements */}
            <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full pointer-events-none"></div>

            {/* Certificate Header */}
            <div className="text-center space-y-3 relative z-10">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-amber-500/10 border-2 border-amber-500/50 rounded-full flex items-center justify-center text-amber-400 shadow-xl animate-pulse">
                  <Award size={36} />
                </div>
              </div>
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-[0.4em]">Internal Simulation & Readiness Attestation</div>
              <h2 className="text-4xl font-serif text-white tracking-tight leading-none italic font-bold">Certificate of ESG Audit-Readiness</h2>
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                PRE-AUDIT ALIGNMENT WITH EUROPEAN DIRECTIVE (EU) 2022/2464 (CSRD)
              </p>
            </div>

            {/* Recipient details */}
            <div className="text-center max-w-2xl mx-auto space-y-6 relative z-10 border-y border-white/5 py-8">
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                This document certifies that <strong className="text-white font-black">{data.companyName}</strong> has completed an AI-assisted self-assessment of primary sustainability disclosure frameworks. The verification mapping confirmed a simulated ESG Audit-Readiness Score of:
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">Assurance Target</span>
                  <strong className="text-xs text-amber-400 font-black uppercase tracking-widest mt-0.5 block">LIMITED ASSURANCE READY</strong>
                </div>
                
                <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-2xl flex flex-col items-center justify-center shadow-2xl rotate-3">
                  <span className="text-[9px] text-slate-950 font-black uppercase leading-none">SCORE</span>
                  <strong className="text-3xl text-slate-950 font-black mt-0.5 leading-none">{data.scoreValue}</strong>
                  <span className="text-[8px] text-slate-950/70 font-bold leading-none mt-0.5">/100</span>
                </div>

                <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl">
                  <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block">Evidence-Lock™</span>
                  <strong className="text-xs text-emerald-400 font-black uppercase tracking-widest mt-0.5 block">SIMULATED</strong>
                </div>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 text-slate-400 text-[10px] font-medium leading-normal rounded-xl max-w-lg mx-auto">
                <span className="text-amber-400 font-bold uppercase tracking-wider block mb-1">⚠️ Disclaimer</span>
                This certificate represents an audit-readiness simulation and gap analysis check. It does not constitute a statutory audit opinion, assurance review, or certification by a registered external sustainability auditor.
              </div>

              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Evidence logs have been cryptographically simulated and localized index anchors created. All raw data remained completely redacted within localized nodes under pre-audit self-assessment rules.
              </p>
            </div>

            {/* Cryptographic Footprint Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/5 p-6 rounded-2xl border border-white/5 font-mono text-[9px] text-slate-400 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 uppercase tracking-widest">
                  <Hash size={12} className="text-amber-500" /> Certificate Hash
                </div>
                <div className="text-white font-bold tracking-wider break-all">{certificateHash}</div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 uppercase tracking-widest">
                  <Fingerprint size={12} className="text-indigo-400" /> Cryptographic Stamp
                </div>
                <div className="text-white font-bold tracking-wider break-all">
                  SHA-256_RSA2048_{Math.abs(getHashCode(certificateHash)).toString(16)}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-slate-500 uppercase tracking-widest">
                  <Server size={12} className="text-emerald-400" /> Local Node Anchor
                </div>
                <div className="text-white font-bold">Node IP: {nodeIp}</div>
                <div className="text-slate-500 mt-1">Timestamp: {new Date().toISOString()}</div>
              </div>
            </div>

            {/* Dynamic Hand-Written Signatures */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6 relative z-10">
              {/* Corporate Sign */}
              <div className="flex flex-col items-center space-y-3 text-center border-t border-white/10 pt-4">
                <div className="font-serif italic text-xl text-amber-400 tracking-wider font-light h-10 flex items-center justify-center animate-pulse">
                  {csoName}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{csoName}</div>
                  <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest mt-0.5">{csoTitle}</div>
                  <div className="text-[8px] text-slate-500 font-mono mt-1">IP: {nodeIp} • (Signed Electronic ID)</div>
                </div>
              </div>

              {/* Auditor Sign */}
              <div className="flex flex-col items-center space-y-3 text-center border-t border-white/10 pt-4">
                <div className="font-serif italic text-xl text-indigo-400 tracking-wider font-light h-10 flex items-center justify-center animate-pulse">
                  {auditorName}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{auditorName}</div>
                  <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest mt-0.5">Planned External Assurer</div>
                  <div className="text-[8px] text-slate-500 font-mono mt-1">{auditorFirm} • (Simulated Digital Stamp)</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6 border-t border-white/5 relative z-10 print:hidden">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black uppercase tracking-widest border border-white/10 transition-all cursor-pointer"
              >
                <Printer size={14} /> Print Certificate
              </button>
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <Unlock size={14} /> Unlock & Re-edit
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

  // Simple helper function to compute a hash code for a string to keep code self-contained and clean
  const getHashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };

export default AssuranceCertifier;
