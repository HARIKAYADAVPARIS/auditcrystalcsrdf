
import React, { useState } from 'react';
import { Gem, ShieldAlert, Plus, RefreshCw } from 'lucide-react';
import FileUpload from './components/FileUpload';
import Report from './components/Report';
import LandingPage from './components/LandingPage';
import AnalysisTerminal from './components/AnalysisTerminal';
import { analyzeDocument } from './services/gemini';
import { AnalysisState, ReadinessStatus, AuditResult } from './types';

const SAMPLE_RESULT: AuditResult = {
  companyName: "GlobalLogistics Group",
  readinessScore: ReadinessStatus.PARTIALLY_READY,
  scoreValue: 78,
  sectorPeerAverage: 65,
  scoreBreakdown: {
    doubleMateriality: 22,
    valueChain: 14,
    dataGranularity: 18,
    strategyGovernance: 16,
    frameworkAlignment: 8
  },
  executiveSummary: "GlobalLogistics Group exhibits a robust alignment with ESRS E1 Climate standards but shows significant gaps in Governance (G1). Transition plan quantification for 2.0°C scenarios is currently incomplete, representing a 4.2% revenue exposure.",
  timestamp: new Date().toISOString(),
  doubleMaterialityMatrix: [
    { topic: "Climate Change Adaptation", financialScore: 9, impactScore: 8, category: "Environment", reasoning: "High physical risk to logistics hubs." },
    { topic: "Labor Practices", financialScore: 5, impactScore: 9, category: "Social", reasoning: "Critical for retention." },
    { topic: "Business Conduct", financialScore: 7, impactScore: 6, category: "Governance", reasoning: "Cross-border compliance." }
  ],
  financialImpact: {
    totalRevenue: 584000000,
    revenueAtRiskPercentage: 4.2,
    currency: "EUR",
    estimatedRevenueAtRisk: "€24.5M",
    compliancePenaltyExposure: "5% of Global Turnover",
    marketValuationRisk: "10% Multiple Discount",
    costOfCapitalImpactBps: 42,
    taxonomy: { aligned: 18.5, eligible: 32.2, nonEligible: 49.3 },
    scope1And2Tonnage: 184500,
    carbonIntensityMetric: "316 tCO2e/€M",
    scenarios: [],
    climateScenarios: [
      { temp: '1.5°C', riskLevel: 'Low', revenueImpactMultiplier: 1.0, valuationImpactMultiplier: 1.0, keyRiskDriver: "Carbon pricing transition" },
      { temp: '2.0°C', riskLevel: 'Moderate', revenueImpactMultiplier: 1.12, valuationImpactMultiplier: 1.05, keyRiskDriver: "Resource scarcity" },
      { temp: '4.0°C', riskLevel: 'Catastrophic', revenueImpactMultiplier: 1.35, valuationImpactMultiplier: 1.25, keyRiskDriver: "Global supply chain collapse" }
    ]
  },
  detailedFrameworks: [
    { name: 'ESRS', alignmentScore: 88, status: 'High', missingCriticals: ['E1-1', 'G1-2'], evidenceCount: 14 },
    { name: 'GRI', alignmentScore: 72, status: 'Medium', missingCriticals: ['GRI 302-1'], evidenceCount: 8 },
    { name: 'SASB', alignmentScore: 94, status: 'High', missingCriticals: [], evidenceCount: 22 },
    { name: 'TCFD', alignmentScore: 45, status: 'Low', missingCriticals: ['Scenario Analysis'], evidenceCount: 3 },
    { name: 'ISSB', alignmentScore: 68, status: 'Medium', missingCriticals: ['S1 Core'], evidenceCount: 9 }
  ],
  mandatoryDisclosures: [
    { code: "G1-1", description: "Role of board in sustainability oversight", status: "Missing", fixRecommendation: "Draft formal charter." },
    { code: "E1-6", description: "Gross Scope 1, 2, 3 GHG emissions", status: "Present", evidence: { quote: "Total GHG emissions were 184,500 tCO2e.", page: 47 } }
  ],
  roadmap: [
    { phase: "Q1 2025", action: "Formalize Board Oversight", details: "Establish ESG committee.", impactOnScore: 12, financialSavingEstimate: "€10M Protection" },
    { phase: "Q2 2025", action: "Value Chain Mapping", details: "Connect suppliers via API.", impactOnScore: 18, financialSavingEstimate: "€45M Recovery" }
  ],
  esrsTopics: [
    { code: "E1", name: "Climate Change", score: 88, status: "Ready" },
    { code: "S1", name: "Own Workforce", score: 72, status: "Progress" },
    { code: "G1", name: "Business Conduct", score: 45, status: "Gap" }
  ],
  subsidiaries: [
    { name: "GlobalLogistics EU", region: "Europe", readinessScore: 92, status: "Compliant", topGap: "None" },
    { name: "GL Asia Pacific", region: "APAC", readinessScore: 54, status: "In Progress", topGap: "S1 Labor" },
    { name: "GL Americas", region: "USA", readinessScore: 41, status: "At Risk", topGap: "E1 Disclosure" }
  ],
  peerBenchmarks: []
};

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'app'>('landing');
  
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    isLoading: false,
    isStreaming: false,
    streamText: "",
    error: null,
    result: null,
    pdfUrl: null
  });

  const handleReset = () => {
    setAnalysisState({
      isLoading: false,
      isStreaming: false,
      streamText: "",
      error: null,
      result: null,
      pdfUrl: null
    });
    setView('landing');
  };

  const handleAnalyze = async (file: File | null, url: string | null, useSample: boolean = false) => {
    if (useSample) {
      setAnalysisState({ isLoading: true, isStreaming: false, streamText: "", error: null, result: null, pdfUrl: null });
      setTimeout(() => {
        setAnalysisState(prev => ({ ...prev, isLoading: false, result: SAMPLE_RESULT }));
        setView('app');
      }, 1500);
      return;
    }

    let pdfUrl = null;
    if (file) pdfUrl = URL.createObjectURL(file);
    
    setAnalysisState({ isLoading: true, isStreaming: true, streamText: "", error: null, result: null, pdfUrl: pdfUrl });

    try {
      let fileBase64: string | null = null;
      let mimeType: string | null = null;

      if (file) {
        const reader = new FileReader();
        fileBase64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve((reader.result as string).split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        mimeType = file.type;
      }

      const textInput = url ? `Analyze CSRD for: ${url}` : null;
      const result = await analyzeDocument(fileBase64, mimeType, textInput, (chunk) => {
        setAnalysisState(prev => ({ ...prev, streamText: prev.streamText + (chunk || "") }));
      });

      setAnalysisState(prev => ({ ...prev, isLoading: false, isStreaming: false, result }));
    } catch (err: any) {
      setAnalysisState(prev => ({ ...prev, isLoading: false, isStreaming: false, error: err.message || "Audit interrupted." }));
    }
  };

  const startApp = (useSample: boolean = false) => {
    if (useSample) handleAnalyze(null, null, true);
    else setView('app');
  };

  if (view === 'landing' && !analysisState.isLoading && !analysisState.result) {
    return (
      <>
        <LandingPage onStart={startApp} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 overflow-x-hidden">
      <nav className="bg-slate-900 border-b border-white/5 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleReset}>
            <div className="p-1.5 bg-gold-500 rounded-lg shadow-xl"><Gem className="text-white" size={20} /></div>
            <span className="text-xl font-serif italic text-white tracking-tight">Audit Crystal</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleReset} className="text-[9px] font-black px-4 py-2 bg-white/5 text-slate-400 hover:text-white border border-white/10 rounded-full uppercase tracking-widest transition-all">
              New Report
            </button>
            <span className="hidden md:inline-block text-[9px] font-black px-3 py-1 bg-white/5 text-gold-400 border border-white/10 rounded-full uppercase tracking-widest">
              Institutional Mode v4.1 • auditcrystal.com
            </span>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        {analysisState.error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4">
            <ShieldAlert size={20} className="text-red-600 shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-black text-red-900 uppercase mb-1">Audit Connection Error</h3>
              <p className="text-sm text-red-700 leading-relaxed">{analysisState.error}</p>
            </div>
          </div>
        )}

        {analysisState.isLoading && analysisState.isStreaming && <AnalysisTerminal streamText={analysisState.streamText} />}
        {analysisState.isLoading && !analysisState.isStreaming && (
           <div className="flex flex-col items-center justify-center py-24 space-y-6">
              <Gem size={64} className="text-gold-500 animate-pulse" />
              <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-sm">Initializing Pre-Audit Engine...</p>
           </div>
        )}

        {!analysisState.isLoading && analysisState.result ? (
          <Report data={analysisState.result} pdfUrl={analysisState.pdfUrl} onReset={handleReset} />
        ) : (
          !analysisState.isLoading && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="text-center mb-12 space-y-4">
                 <h1 className="text-5xl font-serif text-slate-900 tracking-tight leading-none italic">Institutional <br/><span className="not-italic font-black text-6xl">Pre-Audit Engine</span></h1>
                 <p className="text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                  Analyze your report against global ESRS standards on <span className="text-indigo-600 font-black">auditcrystal.com</span>.
                </p>
              </div>
              <FileUpload onAnalyze={handleAnalyze} isLoading={analysisState.isLoading} />
            </div>
          )
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
          © MMXXVI Audit Crystal AI • auditcrystal.com
        </div>
      </footer>
    </div>
  );
};

export default App;
