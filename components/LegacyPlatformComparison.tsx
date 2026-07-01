import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Database, 
  Fingerprint, 
  TrendingUp, 
  Sparkles, 
  Layers, 
  Scale, 
  Lock, 
  Cpu, 
  Zap,
  Info,
  ArrowRight,
  RefreshCw,
  Plus
} from 'lucide-react';

interface ComparisonFeature {
  id: string;
  category: string;
  title: string;
  description: string;
  recordRole: string;
  recordSub: string;
  crystalRole: string;
  crystalSub: string;
}

const FEATURES: ComparisonFeature[] = [
  {
    id: 'evidence_verification',
    category: 'The Symbiotic Stack',
    title: 'Evidence-Lock™ Proofs',
    description: 'Every carbon and ESG data point collected must be verifiable to exact sentences, footnotes, and receipts.',
    recordRole: 'System of Record',
    recordSub: 'Gathers raw utility bills, scope 3 activities, and self-reported spreadsheets from worldwide suppliers.',
    crystalRole: 'System of Proof (Complement)',
    crystalSub: 'Indexes raw utility/ESG datasets, matching them automatically to deterministic SHA-256 evidence logs and cryptographic anchors.'
  },
  {
    id: 'privacy_model',
    category: 'Data Sovereignty',
    title: 'Client-Side ZK Sandboxing',
    description: 'Handling highly confidential operational records (e.g. biohazard waste metrics or precise supplier payrolls) securely.',
    recordRole: 'Centralized SaaS Aggregation',
    recordSub: 'Sucks operational data into a central cloud dashboard to perform complex carbon equivalent conversions.',
    crystalRole: 'Zero-Knowledge Auditing',
    crystalSub: 'Decrypts and verifies confidential operational files completely inside your local browser. No raw PII ever leaves your node.'
  },
  {
    id: 'audit_lifecycle',
    category: 'ISSA 5000 / CSRD',
    title: 'Audit-Readiness Gateways',
    description: 'Transitioning raw environmental estimates into officially certified corporate disclosures.',
    recordRole: 'Internal Draft & Planning',
    recordSub: 'Provides tracking charts, decarbonization simulation scenarios, and exportable data spreadsheets for team review.',
    crystalRole: 'Readiness Attestation Portal',
    crystalSub: 'An interactive simulation workspace matching the CSO with planned external auditors to co-sign and issue simulated Certificates of Audit-Readiness.'
  },
  {
    id: 'financial_mapping',
    category: 'CFO Value Creation',
    title: 'Revenue Alpha & Green Premiums',
    description: 'Converting compliance metrics and decarbonization targets into actual EBITDA impact and capital savings.',
    recordRole: 'Environmental Metrics Tracker',
    recordSub: 'Monitors progress against Science Based Targets initiative (SBTi) plans and physical carbon footprints.',
    crystalRole: 'Capital Discount Engine',
    crystalSub: 'Translates collected raw metrics into green interest rate discount models, enterprise valuations, and pricing power indexes.'
  },
  {
    id: 'live_integration',
    category: 'Seamless Pipeline',
    title: 'Direct API Synchronicity',
    description: 'Connecting the data collection stack with the cryptographic validation engine.',
    recordRole: 'Data Pipeline Exporter',
    recordSub: 'Publishes standard reports and provides standard JSON/CSV exports of emissions inventories.',
    crystalRole: 'Real-time Seals Gateway',
    crystalSub: 'Hooks directly into environmental reporting APIs via secure middleware, stamping raw metrics with instant verification logs.'
  }
];

export const LegacyPlatformComparison: React.FC = () => {
  const [activeFeatureId, setActiveFeatureId] = useState<string>('evidence_verification');

  const selectedFeature = FEATURES.find(f => f.id === activeFeatureId) || FEATURES[0];

  return (
    <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      {/* Editorial Header */}
      <div className="p-8 bg-slate-950 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[8px] font-black uppercase tracking-widest rounded">
              Synergistic Architecture
            </span>
            <span className="text-[9px] text-slate-500 font-mono tracking-widest">
              SYSTEM OF RECORD + SYSTEM OF PROOF
            </span>
          </div>
          <h3 className="text-2xl font-serif text-white tracking-tight italic">
            Better Together: Symbiotic Pre-Assurance
          </h3>
          <p className="text-xs text-slate-400 font-light leading-relaxed max-w-md">
            Audit Crystal sits on top of your existing ESG database or carbon accounting SaaS, turning raw data into sealed, audit-proof evidence.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-indigo-500/10 rounded-full border border-indigo-500/20 text-[9px] font-black uppercase text-indigo-300 tracking-widest">
          <Database size={10} className="text-indigo-400 animate-pulse" /> 1-Click SaaS Integration Enabled
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
        {/* Feature Selector Tabs */}
        <div className="lg:col-span-5 p-6 space-y-3 bg-slate-950/40">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">
            The Multi-Layer Stack
          </div>
          <div className="space-y-1.5">
            {FEATURES.map((feat) => (
              <button
                key={feat.id}
                onClick={() => setActiveFeatureId(feat.id)}
                className={`w-full text-left p-4 rounded-xl transition-all border flex items-start gap-3.5 select-none cursor-pointer ${
                  activeFeatureId === feat.id 
                    ? 'bg-gradient-to-r from-amber-500/10 to-transparent border-amber-500/20 shadow-lg' 
                    : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
              >
                <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${
                  activeFeatureId === feat.id ? 'bg-amber-500/15 text-amber-400' : 'bg-white/5 text-slate-400'
                }`}>
                  {feat.id === 'evidence_verification' && <Fingerprint size={16} />}
                  {feat.id === 'privacy_model' && <Lock size={16} />}
                  {feat.id === 'audit_lifecycle' && <Scale size={16} />}
                  {feat.id === 'financial_mapping' && <TrendingUp size={16} />}
                  {feat.id === 'live_integration' && <Layers size={16} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                      {feat.category}
                    </span>
                  </div>
                  <div className={`text-xs font-black mt-0.5 ${activeFeatureId === feat.id ? 'text-white' : 'text-slate-300'}`}>
                    {feat.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Side-by-Side Symbiosis Visualization */}
        <div className="lg:col-span-7 p-8 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                Stack Integration Profile
              </span>
              <h4 className="text-xl font-serif text-white italic">
                {selectedFeature.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {selectedFeature.description}
              </p>
            </div>

            {/* Side-by-Side Complementary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
              {/* Record SaaS Card */}
              <div className="bg-slate-950/40 border border-white/5 rounded-2xl p-5 space-y-3 relative">
                <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Your Carbon/ERP SaaS
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-500/10 border border-slate-500/20 text-slate-300 text-[8px] font-black uppercase tracking-wider rounded">
                    System of Record
                  </span>
                </div>
                <div className="text-xs font-bold text-white mb-1">
                  {selectedFeature.recordRole}
                </div>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  {selectedFeature.recordSub}
                </p>
              </div>

              {/* Crystal Complement Card */}
              <div className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-2xl p-5 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-500/5 blur-xl rounded-full pointer-events-none"></div>
                <div className="flex items-center justify-between border-b border-indigo-500/15 pb-2.5">
                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles size={10} className="text-amber-400" /> Audit Crystal
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[8px] font-black uppercase tracking-wider rounded">
                    System of Proof
                  </span>
                </div>
                <div className="text-xs font-bold text-amber-300 mb-1">
                  {selectedFeature.crystalRole}
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {selectedFeature.crystalSub}
                </p>
              </div>
            </div>
          </div>

          {/* Workflow Connector Visual */}
          <div className="bg-slate-950 p-4 rounded-xl border border-white/5 space-y-3">
            <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
              Unified Workflow Chain
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-white/5 rounded flex items-center justify-center text-slate-300 font-black text-[9px]">1</div>
                <span>SaaS ERP: Data Aggregation</span>
              </div>
              <ArrowRight size={14} className="text-slate-600" />
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-amber-500/15 text-amber-400 rounded flex items-center justify-center font-black text-[9px]">2</div>
                <span>Crystal: Evidence Seals</span>
              </div>
              <ArrowRight size={14} className="text-slate-600" />
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-indigo-500/15 text-indigo-400 rounded flex items-center justify-center font-black text-[9px]">3</div>
                <span>Accredited Assurance</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
            <Cpu size={16} className="text-amber-400 shrink-0 mt-0.5 animate-pulse" />
            <p className="text-[10px] text-slate-400 leading-relaxed font-medium uppercase tracking-wider">
              <strong>Integration Premise:</strong> Existing systems handle the heavy lifting of collection and calculation. We turn those calculations into bulletproof evidence. This cuts external audit fees by up to 60% and secures instant compliance signatures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegacyPlatformComparison;
