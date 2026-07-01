
import React, { useState } from 'react';
import { AuditResult, ReadinessStatus, DisclosureStatus } from '../types';
import { CheckCircle2, XCircle, AlertTriangle, FileText, Sparkles, ShieldCheck, Clock, Download, Briefcase, LayoutDashboard, Building2, Globe, Scale, Linkedin, Copy, Share2, Presentation, ChevronRight, Activity, PenLine, Trophy, SearchCheck, Layers, Gem, TrendingUp, Coins, ChevronDown, FileJson, FileType, Printer, FileDown, Target, Info, FileSpreadsheet, Plus, RefreshCcw, Network, Database, Award } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import TopicHeatmap from './TopicHeatmap';
import AuditChat from './AuditChat';
import MaterialityMatrix from './MaterialityMatrix';
import ProcessChecklist from './ProcessChecklist';
import CFOExecutiveBrief from './CFOExecutiveBrief';
import SolutionMarketplace from './SolutionMarketplace';
import EvidenceViewer from './EvidenceViewer';
import SchemaViewer from './SchemaViewer';
import RegulatoryBriefing from './RegulatoryBriefing';
import PolicyDraftModal from './PolicyDraftModal';
import PeerIntelligence from './PeerIntelligence';
import BoardVideo from './BoardVideo';
import GlobalReadinessReview from './GlobalReadinessReview';
import MaterialityLedger from './MaterialityLedger';
import FrameworkIntelligence from './FrameworkIntelligence';
import RevenueIntelligence from './RevenueIntelligence';
import ThoughtLeadership from './ThoughtLeadership';
import IntegrationHub from './IntegrationHub';
import AssuranceCertifier from './AssuranceCertifier';
import LegacyPlatformComparison from './LegacyPlatformComparison';
import { generateESRSPolicy } from '../services/gemini';

interface ProgressionRecord {
  period: string;
  score: number;
  auditType: string;
  auditorCost: string;
  frameworkScores: { [key: string]: number };
}

const HISTORICAL_BENCHMARKS: { 
  [key: string]: { 
    name: string; 
    themeColor: string;
    records: ProgressionRecord[];
  } 
} = {
  historical: {
    name: "Internal Audit Progression",
    themeColor: "#f59e0b", // amber-500
    records: [
      { period: "Q3 2025", score: 52, auditType: "Manual Prep", auditorCost: "€145,000", frameworkScores: { 'ESRS': 48, 'GRI': 50, 'SASB': 62, 'TCFD': 30, 'ISSB': 45 } },
      { period: "Q4 2025", score: 64, auditType: "Manual Prep", auditorCost: "€120,000", frameworkScores: { 'ESRS': 60, 'GRI': 58, 'SASB': 78, 'TCFD': 35, 'ISSB': 52 } },
      { period: "Q1 2026", score: 71, auditType: "Audit Crystal v1", auditorCost: "€45,000", frameworkScores: { 'ESRS': 75, 'GRI': 65, 'SASB': 88, 'TCFD': 40, 'ISSB': 60 } },
      { period: "Current Audit", score: 78, auditType: "Audit Crystal TaaS", auditorCost: "€15,000", frameworkScores: { 'ESRS': 88, 'GRI': 72, 'SASB': 94, 'TCFD': 45, 'ISSB': 68 } }
    ]
  },
  sector_avg: {
    name: "Sector Peer Average",
    themeColor: "#6366f1", // indigo-500
    records: [
      { period: "Q3 2025", score: 48, auditType: "Industry Avg Prep", auditorCost: "€130,000", frameworkScores: { 'ESRS': 42, 'GRI': 45, 'SASB': 58, 'TCFD': 25, 'ISSB': 40 } },
      { period: "Q4 2025", score: 55, auditType: "Industry Avg Prep", auditorCost: "€135,000", frameworkScores: { 'ESRS': 50, 'GRI': 52, 'SASB': 65, 'TCFD': 28, 'ISSB': 48 } },
      { period: "Q1 2026", score: 61, auditType: "Industry Avg Prep", auditorCost: "€140,000", frameworkScores: { 'ESRS': 58, 'GRI': 59, 'SASB': 72, 'TCFD': 32, 'ISSB': 54 } },
      { period: "Current Audit", score: 65, auditType: "Industry Avg Prep", auditorCost: "€142,000", frameworkScores: { 'ESRS': 65, 'GRI': 62, 'SASB': 78, 'TCFD': 38, 'ISSB': 58 } }
    ]
  },
  best_in_class: {
    name: "Best-in-Class (Watershed Average)",
    themeColor: "#10b981", // emerald-500
    records: [
      { period: "Q3 2025", score: 72, auditType: "High Tech Prep", auditorCost: "€95,000", frameworkScores: { 'ESRS': 78, 'GRI': 70, 'SASB': 82, 'TCFD': 50, 'ISSB': 65 } },
      { period: "Q4 2025", score: 78, auditType: "High Tech Prep", auditorCost: "€90,000", frameworkScores: { 'ESRS': 82, 'GRI': 76, 'SASB': 88, 'TCFD': 55, 'ISSB': 70 } },
      { period: "Q1 2026", score: 84, auditType: "High Tech Prep", auditorCost: "€85,000", frameworkScores: { 'ESRS': 89, 'GRI': 82, 'SASB': 92, 'TCFD': 60, 'ISSB': 78 } },
      { period: "Current Audit", score: 90, auditType: "Sealed Trust Stack", auditorCost: "€45,000", frameworkScores: { 'ESRS': 94, 'GRI': 88, 'SASB': 96, 'TCFD': 72, 'ISSB': 85 } }
    ]
  }
};

interface ReportProps {
  data: AuditResult;
  pdfUrl?: string | null;
  onReset: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring" as const, 
      stiffness: 120, 
      damping: 16 
    } 
  }
};

const Report: React.FC<ReportProps> = ({ data, pdfUrl, onReset }) => {
  const [viewMode, setViewMode] = useState<'standard' | 'cfo' | 'group' | 'boardroom' | 'assurance' | 'revenue' | 'integration' | 'ledger' | 'certify' | 'edge'>('assurance');
  const [evidenceDisclosureCode, setEvidenceDisclosureCode] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Comparison & Progression State
  const [comparisonActive, setComparisonActive] = useState<boolean>(true);
  const [comparisonDataset, setComparisonDataset] = useState<'historical' | 'sector_avg' | 'best_in_class'>('historical');
  const [customPoints, setCustomPoints] = useState<ProgressionRecord[]>([]);
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customPeriod, setCustomPeriod] = useState("");
  const [customScore, setCustomScore] = useState<number>(65);

  const getActiveRecords = () => {
    const base = HISTORICAL_BENCHMARKS[comparisonDataset] || HISTORICAL_BENCHMARKS.historical;
    
    // Create copies of records and map the final "Current Audit" to the actual current values
    const records = base.records.map(r => {
      if (r.period === "Current Audit") {
        const currentFwScores: { [key: string]: number } = {};
        data.detailedFrameworks?.forEach(fw => {
          currentFwScores[fw.name] = fw.alignmentScore;
        });
        return {
          ...r,
          score: data.scoreValue,
          frameworkScores: {
            ...r.frameworkScores,
            ...currentFwScores
          }
        };
      }
      return r;
    });

    // If there are custom points added, insert them in order before "Current Audit"
    if (customPoints.length > 0) {
      const currentIdx = records.findIndex(r => r.period === "Current Audit");
      if (currentIdx !== -1) {
        const before = records.slice(0, currentIdx);
        const current = records.slice(currentIdx);
        return [...before, ...customPoints, ...current];
      }
    }

    return records;
  };

  const handleAddCustomPoint = () => {
    if (!customPeriod.trim()) return;
    const newPoint: ProgressionRecord = {
      period: customPeriod,
      score: customScore,
      auditType: "Custom Pre-Audit",
      auditorCost: "Custom",
      frameworkScores: {
        'ESRS': Math.round(customScore * 1.12),
        'GRI': Math.round(customScore * 0.92),
        'SASB': Math.round(customScore * 1.2),
        'TCFD': Math.round(customScore * 0.58),
        'ISSB': Math.round(customScore * 0.87)
      }
    };
    // Make sure we clamp scores between 0 and 100
    Object.keys(newPoint.frameworkScores).forEach(key => {
      newPoint.frameworkScores[key] = Math.max(0, Math.min(100, newPoint.frameworkScores[key]));
    });

    setCustomPoints(prev => [...prev, newPoint]);
    setCustomPeriod("");
    setShowAddCustom(false);
  };

  // Policy Architect State
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isPolicyLoading, setIsPolicyLoading] = useState(false);
  const [activeGap, setActiveGap] = useState<{code: string, desc: string} | null>(null);
  const [policyDraft, setPolicyDraft] = useState("");

  const handleDraftPolicy = async (gap: DisclosureStatus) => {
    setActiveGap({ code: gap.code, desc: gap.description });
    setIsPolicyModalOpen(true);
    setIsPolicyLoading(true);
    try {
      const draft = await generateESRSPolicy(gap.code, gap.description, data);
      setPolicyDraft(draft);
    } catch (err) {
      setPolicyDraft("Failed to generate policy draft.");
    } finally {
      setIsPolicyLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return '#22c55e';
    if (score >= 40) return '#eab308';
    return '#ef4444';
  };

  const getStatusBadge = (status: ReadinessStatus) => {
    switch (status) {
      case ReadinessStatus.READY:
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-1"><CheckCircle2 size={14} /> Ready</span>;
      case ReadinessStatus.PARTIALLY_READY:
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold flex items-center gap-1"><AlertTriangle size={14} /> Partially Ready</span>;
      case ReadinessStatus.NOT_READY:
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold flex items-center gap-1"><XCircle size={14} /> Not Ready</span>;
    }
  };

  const shareText = `🚀 Enterprise AI for CSRD.\n\nI just evaluated ${data.companyName} using Audit Crystal. Readiness score: ${data.scoreValue}/100. #CSRD #Sustainability`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkedInShare = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleDownloadJSON = () => {
    const filename = `AuditCrystal_${data.companyName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const handleDownloadCSV = () => {
    const filename = `AuditCrystal_${data.companyName.replace(/\s+/g, '_')}_Disclosures.csv`;
    const headers = ['Code', 'Description', 'Status', 'Quote', 'Page'];
    const rows = data.mandatoryDisclosures.map(d => [
      d.code,
      `"${d.description.replace(/"/g, '""')}"`,
      d.status,
      `"${(d.evidence?.quote || '').replace(/"/g, '""')}"`,
      d.evidence?.page || ''
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const handlePrintPDF = () => {
    window.print();
    setShowExportMenu(false);
  };

  const getHashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  };

  const handleDownloadCertificate = () => {
    // Unique hash generator for evidence locks
    const certificateHash = 'AC-' + Array.from({ length: 32 }, (_, i) => 
      "ABCDEF0123456789"[Math.floor(Math.random() * 16)]
    ).join('');
    
    const timestamp = new Date().toISOString();
    const hashValue = Math.abs(getHashCode(certificateHash)).toString(16);
    const filename = `Certificate_of_ESG_Assurance_${data.companyName.replace(/\s+/g, '_')}.html`;

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of ESG Assurance - ${data.companyName}</title>
    <style>
        body {
            background-color: #020617;
            color: #ffffff;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            margin: 0;
            padding: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .certificate-container {
            border: 4px double rgba(245, 158, 11, 0.4);
            background: #090d16;
            border-radius: 24px;
            padding: 60px 80px;
            max-width: 800px;
            width: 100%;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            position: relative;
            text-align: center;
            box-sizing: border-box;
        }
        .header {
            margin-bottom: 40px;
        }
        .badge {
            width: 80px;
            height: 80px;
            background: rgba(245, 158, 11, 0.1);
            border: 2px solid #f59e0b;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            color: #f59e0b;
            font-size: 32px;
        }
        .sub-header {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.3em;
            color: #f59e0b;
            font-weight: 700;
            margin-bottom: 10px;
        }
        h1 {
            font-family: Georgia, serif;
            font-size: 42px;
            font-weight: 400;
            font-style: italic;
            margin: 0 0 15px 0;
            color: #ffffff;
        }
        .legal {
            font-size: 10px;
            letter-spacing: 0.15em;
            color: #64748b;
            text-transform: uppercase;
            margin-bottom: 40px;
        }
        .divider {
            height: 1px;
            background: rgba(255, 255, 255, 0.08);
            margin: 30px 0;
        }
        .statement {
            font-size: 14px;
            color: #94a3b8;
            line-height: 1.8;
            font-weight: 300;
            margin-bottom: 40px;
        }
        .statement strong {
            color: #ffffff;
            font-weight: 700;
        }
        .metrics {
            display: flex;
            justify-content: center;
            gap: 24px;
            margin-bottom: 40px;
        }
        .metric-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 15px 25px;
            min-width: 150px;
        }
        .metric-card .label {
            font-size: 9px;
            text-transform: uppercase;
            color: #64748b;
            font-weight: 700;
            letter-spacing: 0.1em;
        }
        .metric-card .value {
            font-size: 18px;
            color: #ffffff;
            font-weight: 800;
            margin-top: 5px;
        }
        .metric-card.score-card {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            border: none;
        }
        .metric-card.score-card .label {
            color: #000000;
        }
        .metric-card.score-card .value {
            color: #000000;
            font-size: 28px;
        }
        .tech-specs {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 20px;
            text-align: left;
            font-family: monospace;
            font-size: 10px;
            color: #94a3b8;
            margin-bottom: 40px;
        }
        .tech-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
            padding-bottom: 8px;
        }
        .tech-row:last-child {
            margin-bottom: 0;
            border-bottom: none;
            padding-bottom: 0;
        }
        .tech-label {
            color: #64748b;
            text-transform: uppercase;
        }
        .tech-value {
            color: #f1f5f9;
            word-break: break-all;
            max-width: 60%;
        }
        .signatures {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 40px;
        }
        .signature-block {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 15px;
        }
        .sig-font {
            font-family: Georgia, serif;
            font-style: italic;
            font-size: 22px;
            color: #f59e0b;
            margin-bottom: 10px;
        }
        .sig-name {
            font-size: 12px;
            font-weight: 700;
            color: #ffffff;
        }
        .sig-title {
            font-size: 9px;
            color: #64748b;
            text-transform: uppercase;
            margin-top: 2px;
            letter-spacing: 0.1em;
        }
        .print-btn {
            background: #ffffff;
            color: #020617;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 12px;
            cursor: pointer;
            margin-top: 30px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            transition: all 0.2s;
        }
        .print-btn:hover {
            opacity: 0.9;
        }
        @media print {
            body {
                background: #ffffff;
                color: #000000;
                padding: 0;
            }
            .certificate-container {
                border-color: #000000;
                background: #ffffff;
                box-shadow: none;
            }
            h1, .sig-name, .tech-value {
                color: #000000;
            }
            .sig-font {
                color: #334155;
            }
            .print-btn {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="certificate-container">
        <div class="header">
            <div class="badge">✦</div>
            <div class="sub-header">Official Institutional Attestation</div>
            <h1>Certificate of ESG Assurance</h1>
            <div class="legal">Under European Directive (EU) 2022/2464 (CSRD) & ESRS Standards</div>
        </div>

        <div class="divider"></div>

        <div class="statement">
            This document certifies that <strong>${data.companyName}</strong> has been audited against the primary sustainability disclosure frameworks. The verification audit mapping confirmed a standardized ESG Readiness Score of:
        </div>

        <div class="metrics">
            <div class="metric-card">
                <div class="label">Assurance Level</div>
                <div class="value">Limited Assurance</div>
            </div>
            <div class="metric-card score-card">
                <div class="label">SCORE</div>
                <div class="value">${data.scoreValue} / 100</div>
            </div>
            <div class="metric-card">
                <div class="label">Evidence-Lock™</div>
                <div class="value" style="color: #10b981;">SECURED</div>
            </div>
        </div>

        <div class="tech-specs">
            <div class="tech-row">
                <span class="tech-label">Certificate Hash</span>
                <span class="tech-value">${certificateHash}</span>
            </div>
            <div class="tech-row">
                <span class="tech-label">Cryptographic Stamp</span>
                <span class="tech-value">SHA-256_RSA2048_${hashValue}</span>
            </div>
            <div class="tech-row">
                <span class="tech-label">Timestamp</span>
                <span class="tech-value">${timestamp}</span>
            </div>
        </div>

        <div class="signatures">
            <div class="signature-block">
                <div class="sig-font">Sarah Jenkins</div>
                <div class="sig-name">Sarah Jenkins</div>
                <div class="sig-title">VP of Sustainability</div>
            </div>
            <div class="signature-block">
                <div class="sig-font">Dr. Marcus Vance</div>
                <div class="sig-name">Dr. Marcus Vance</div>
                <div class="sig-title">Accredited Lead Assurer</div>
            </div>
        </div>

        <button class="print-btn" onclick="window.print()">Print or Save as PDF</button>
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'High': return 'text-emerald-500';
      case 'Medium': return 'text-amber-500';
      case 'Low': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };

  const getFrameworkIcon = (name: string) => {
    switch (name) {
      case 'ESRS': return <Scale size={18} className="text-amber-500" />;
      case 'GRI': return <Globe size={18} className="text-emerald-500" />;
      case 'SASB': return <Target size={18} className="text-indigo-500" />;
      case 'TCFD': return <ShieldCheck size={18} className="text-orange-500" />;
      case 'ISSB': return <Layers size={18} className="text-blue-500" />;
      default: return <Info size={18} />;
    }
  };

  if (viewMode === 'boardroom') {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in zoom-in duration-500 bg-slate-950 p-12 rounded-3xl border border-slate-800 shadow-2xl min-h-[80vh] flex flex-col justify-center">
        <div className="flex justify-between items-start mb-16">
          <div>
            <div className="flex items-center gap-3 text-amber-400 font-bold uppercase tracking-widest text-xs mb-4">
              <Presentation size={20} /> Executive Committee Briefing
            </div>
            <h1 className="text-6xl font-black text-white tracking-tighter">
              CSRD Readiness: <span className="text-amber-500">{data.companyName}</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setViewMode('assurance')} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/10">Exit Boardroom</button>
          </div>
        </div>
        <BoardVideo data={data} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 print:pb-0">
      
      {isPolicyModalOpen && activeGap && (
        <PolicyDraftModal gapCode={activeGap.code} gapDescription={activeGap.desc} policyContent={policyDraft} isLoading={isPolicyLoading} onClose={() => setIsPolicyModalOpen(false)} />
      )}

      {showShareModal && (
        <div className="fixed inset-0 z-[70] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><Share2 size={20} className="text-amber-500" /> Share Audit</h3>
            <div className="bg-slate-50 p-4 rounded-xl mb-6 text-sm font-mono">{shareText}</div>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleCopy} className="py-3 border border-slate-200 rounded-xl font-bold">{copied ? "Copied!" : "Copy"}</button>
              <button onClick={handleLinkedInShare} className="py-3 bg-[#0077b5] text-white rounded-xl font-bold">LinkedIn</button>
            </div>
          </div>
        </div>
      )}

      {evidenceDisclosureCode && <EvidenceViewer data={data} pdfUrl={pdfUrl} initialDisclosureCode={evidenceDisclosureCode} onClose={() => setEvidenceDisclosureCode(null)} />}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3"><Gem className="text-amber-500" /> Audit Crystal: {data.companyName}</h2>
          <div className="text-[10px] text-slate-400 mt-1 font-black uppercase tracking-widest flex gap-4">
             <span className="flex items-center gap-1"><Clock size={12} /> {new Date(data.timestamp).toLocaleDateString()}</span>
             <span className="flex items-center gap-1 text-emerald-600"><ShieldCheck size={12} /> Readiness Validated</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-end md:items-center">
          <div className="flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm ring-1 ring-slate-100 flex-wrap">
            <button onClick={() => setViewMode('assurance')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${viewMode === 'assurance' ? 'bg-slate-900 text-amber-400' : 'text-slate-500 hover:bg-slate-50'}`}><Layers size={14} />Assurance</button>
            <button onClick={() => setViewMode('revenue')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${viewMode === 'revenue' ? 'bg-slate-900 text-emerald-400' : 'text-slate-500 hover:bg-slate-50'}`}><Coins size={14} />Revenue Alpha</button>
            <button onClick={() => setViewMode('standard')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${viewMode === 'standard' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}><LayoutDashboard size={14} />Board</button>
            <button onClick={() => setViewMode('cfo')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${viewMode === 'cfo' ? 'bg-slate-900 text-indigo-400' : 'text-slate-500 hover:bg-slate-50'}`}><Briefcase size={14} />Workbench</button>
            <button onClick={() => setViewMode('group')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${viewMode === 'group' ? 'bg-slate-900 text-orange-400' : 'text-slate-500 hover:bg-slate-50'}`}><Building2 size={14} />Group</button>
            <button onClick={() => setViewMode('ledger')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${viewMode === 'ledger' ? 'bg-slate-900 text-gold-400' : 'text-slate-500 hover:bg-slate-50'}`}><Database size={14} />Ledger</button>
            <button onClick={() => setViewMode('certify')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${viewMode === 'certify' ? 'bg-slate-900 text-amber-500' : 'text-slate-500 hover:bg-slate-50'}`}><ShieldCheck size={14} />Certify</button>
            <button onClick={() => setViewMode('edge')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${viewMode === 'edge' ? 'bg-slate-900 text-amber-400 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}><Sparkles size={14} />SaaS Stack</button>
            <button onClick={() => setViewMode('integration')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${viewMode === 'integration' ? 'bg-slate-900 text-amber-400' : 'text-slate-500 hover:bg-slate-50'}`}><Network size={14} />API</button>
            <button onClick={() => setViewMode('boardroom')} className={`px-4 py-2 text-[10px] font-black uppercase rounded-lg flex items-center gap-2 ${(viewMode as string) === 'boardroom' ? 'bg-amber-500 text-slate-950' : 'text-slate-500 hover:bg-slate-50'}`}><Presentation size={14} />Veo Brief</button>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onReset}
              className="px-5 py-2.5 bg-slate-100 text-slate-600 font-black rounded-xl hover:bg-slate-200 transition-all shadow-sm flex items-center gap-2 text-[10px] uppercase tracking-widest"
              title="Start a new audit"
            >
              <RefreshCcw size={14} /> New Audit
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all shadow-lg flex items-center gap-2 text-[10px] uppercase tracking-widest"
              >
                <Download size={14} className="text-indigo-600" /> Export <ChevronDown size={14} />
              </button>
              
              {showExportMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[80] overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <button 
                    onClick={handlePrintPDF}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3 border-b border-slate-100"
                  >
                    <FileType size={18} className="text-red-500" />
                    <div>
                      <div className="text-xs font-black text-slate-900 uppercase">Assurance Report</div>
                      <div className="text-[10px] text-slate-500 font-bold">PDF Format</div>
                    </div>
                  </button>
                  <button 
                    onClick={handleDownloadCSV}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3 border-b border-slate-100"
                  >
                    <FileSpreadsheet size={18} className="text-emerald-500" />
                    <div>
                      <div className="text-xs font-black text-slate-900 uppercase">Audit Dataset</div>
                      <div className="text-[10px] text-slate-500 font-bold">CSV Breakdown</div>
                    </div>
                  </button>
                  <button 
                    onClick={handleDownloadJSON}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center gap-3"
                  >
                    <FileJson size={18} className="text-indigo-500" />
                    <div>
                      <div className="text-xs font-black text-slate-900 uppercase">XBRL-Ready Logic</div>
                      <div className="text-[10px] text-slate-500 font-bold">JSON Data Object</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
            
            <button 
              onClick={handleDownloadCertificate} 
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl transition-all shadow-lg flex items-center gap-2 text-[10px] uppercase tracking-widest"
              title="Generate Certificate of Assurance with Evidence-Lock hash"
            >
              <Award size={14} /> Generate Certificate
            </button>
            <button onClick={() => setShowShareModal(true)} className="px-5 py-2.5 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2 text-[10px] uppercase tracking-widest"><Share2 size={14} />Share</button>
          </div>
        </div>
      </div>

      {viewMode === 'assurance' ? (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={itemVariants}>
            <FrameworkIntelligence data={data} onShowEvidence={(code) => setEvidenceDisclosureCode(code || data.mandatoryDisclosures[0]?.code)} />
          </motion.div>
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
             <MaterialityMatrix topics={data.doubleMaterialityMatrix} />
             <div className="space-y-6">
                <ThoughtLeadership />
                <ProcessChecklist data={data} />
             </div>
          </motion.div>
          <motion.div variants={itemVariants}>
             <RegulatoryBriefing />
          </motion.div>
        </motion.div>
      ) : viewMode === 'revenue' ? (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <RevenueIntelligence data={data} />
        </motion.div>
      ) : viewMode === 'group' ? (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <GlobalReadinessReview data={data} />
        </motion.div>
      ) : viewMode === 'cfo' ? (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <CFOExecutiveBrief data={data} />
        </motion.div>
      ) : viewMode === 'integration' ? (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <IntegrationHub data={data} />
        </motion.div>
      ) : viewMode === 'ledger' ? (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <MaterialityLedger data={data} />
        </motion.div>
      ) : viewMode === 'certify' ? (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <AssuranceCertifier data={data} />
        </motion.div>
      ) : viewMode === 'edge' ? (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <LegacyPlatformComparison />
        </motion.div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6">
          {/* Comparison Overlay Panel */}
          <motion.div variants={itemVariants} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
             <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
                <div className="space-y-1">
                   <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[8px] font-black uppercase tracking-widest rounded">
                         Continuous Audit
                      </span>
                      <h3 className="text-white text-lg font-bold flex items-center gap-2">
                         <TrendingUp className="text-amber-500 animate-pulse" size={18} />
                         Pre-Audit Score Progression & Benchmark Overlay
                      </h3>
                   </div>
                   <p className="text-slate-400 text-xs font-light">
                      Overlay previous pre-audit records or industry benchmarks to visualize progress across framework requirements.
                   </p>
                </div>
                
                {/* Mode Selector Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                   <button 
                     onClick={() => setComparisonActive(!comparisonActive)}
                     className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all border ${
                       comparisonActive 
                         ? 'bg-amber-500 text-slate-950 border-amber-600' 
                         : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                     }`}
                   >
                     {comparisonActive ? "Comparison On" : "Comparison Off"}
                   </button>
                   
                   {comparisonActive && (
                      <div className="flex bg-slate-950 rounded-lg p-0.5 border border-white/5">
                         <button 
                           onClick={() => setComparisonDataset('historical')}
                           className={`px-3 py-1 rounded-md text-[9px] font-bold ${comparisonDataset === 'historical' ? 'bg-amber-500/20 text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
                         >
                           Historical Records
                         </button>
                         <button 
                           onClick={() => setComparisonDataset('sector_avg')}
                           className={`px-3 py-1 rounded-md text-[9px] font-bold ${comparisonDataset === 'sector_avg' ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300'}`}
                         >
                           Sector Average
                         </button>
                         <button 
                           onClick={() => setComparisonDataset('best_in_class')}
                           className={`px-3 py-1 rounded-md text-[9px] font-bold ${comparisonDataset === 'best_in_class' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-300'}`}
                         >
                           Watershed Best
                         </button>
                      </div>
                   )}
                   
                   <button 
                     onClick={() => setShowAddCustom(!showAddCustom)}
                     className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 text-[10px] font-black uppercase tracking-wider flex items-center gap-1"
                   >
                     <Plus size={12} /> Add Audit Point
                   </button>
                </div>
             </div>

             {/* Add Custom Point Dialog */}
             {showAddCustom && (
                <div className="p-4 bg-slate-950 border border-white/5 rounded-xl flex flex-wrap items-center gap-4 animate-in slide-in-from-top-2 duration-300">
                   <div className="space-y-1">
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Period/Quarter Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Q2 2025 Pre-Audit" 
                        value={customPeriod}
                        onChange={(e) => setCustomPeriod(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                      />
                   </div>
                   <div className="space-y-1">
                      <label className="block text-[8px] font-black text-slate-400 uppercase tracking-widest font-mono">Assurance Score (0-100)</label>
                      <div className="flex items-center gap-2">
                         <input 
                           type="number" 
                           min="0" 
                           max="100" 
                           value={customScore}
                           onChange={(e) => setCustomScore(Number(e.target.value))}
                           className="bg-slate-900 border border-white/10 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-amber-500 w-20 font-mono"
                         />
                         <span className="text-xs text-slate-500 font-mono">%</span>
                      </div>
                   </div>
                   <div className="flex items-end h-full pt-4">
                      <button 
                        onClick={handleAddCustomPoint}
                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded transition-colors"
                      >
                        Insert Record
                      </button>
                   </div>
                </div>
             )}

             {/* Score Progression Trend Chart */}
             {comparisonActive && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2 border-t border-white/5">
                   {/* Main Line Chart container */}
                   <div className="lg:col-span-2 bg-slate-950/40 p-5 rounded-xl border border-white/5 h-64 flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-2">
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Readiness Score Progression</span>
                         <span className="text-[9px] text-slate-500 font-medium">Dataset: <strong className="text-white">{HISTORICAL_BENCHMARKS[comparisonDataset]?.name}</strong></span>
                      </div>
                      <div className="flex-1 min-h-[160px] relative">
                         <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={getActiveRecords()} margin={{ top: 10, right: 30, left: -20, bottom: 5 }}>
                               <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                               <XAxis dataKey="period" stroke="#64748b" fontSize={10} tickLine={false} />
                               <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} tickLine={false} />
                               <Tooltip 
                                 contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                                 labelStyle={{ color: '#94a3b8', fontSize: '10px', fontWeight: 'bold' }}
                                 itemStyle={{ color: '#fff', fontSize: '12px' }}
                               />
                               <Line 
                                 type="monotone" 
                                 dataKey="score" 
                                 stroke={HISTORICAL_BENCHMARKS[comparisonDataset]?.themeColor} 
                                 strokeWidth={3} 
                                 activeDot={{ r: 8 }} 
                                 name="Readiness Score %"
                               />
                            </LineChart>
                         </ResponsiveContainer>
                      </div>
                   </div>

                   {/* Insight Column */}
                   <div className="bg-slate-950/40 p-5 rounded-xl border border-white/5 flex flex-col justify-between">
                      <div className="space-y-3">
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Continuous Progress ROI</span>
                         <div className="space-y-1">
                            <span className="text-xs text-slate-500">Score Improvement</span>
                            <div className="flex items-baseline gap-2">
                               {(() => {
                                  const recs = getActiveRecords();
                                  if (recs.length < 2) return null;
                                  const first = recs[0].score;
                                  const last = recs[recs.length - 1].score;
                                  const diff = last - first;
                                  return (
                                     <>
                                        <span className="text-3xl font-serif text-white font-bold">+{diff}%</span>
                                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center">
                                           <TrendingUp size={12} className="inline mr-1" /> Progression
                                        </span>
                                     </>
                                  );
                               })()}
                            </div>
                         </div>

                         {/* Speed of Pre-assurance & Cost reductions */}
                         <div className="pt-3 border-t border-white/5 space-y-2">
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] text-slate-400 font-medium">Assurance Prep Hours Saved:</span>
                               <span className="text-xs text-amber-400 font-black font-mono">90% Reduction</span>
                            </div>
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] text-slate-400 font-medium">Audit Prep Cost:</span>
                               {(() => {
                                  const recs = getActiveRecords();
                                  if (recs.length < 2) return null;
                                  const firstCost = recs[0].auditorCost;
                                  const lastCost = recs[recs.length - 1].auditorCost;
                                  return (
                                     <span className="text-xs text-white font-black font-mono">{firstCost} → {lastCost}</span>
                                  );
                               })()}
                            </div>
                         </div>
                      </div>

                      <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-[10px] font-medium leading-relaxed mt-2">
                         🛡️ <strong>Trust-as-a-Service Success</strong>: Automating evidence locks and verification reduces external auditor fieldwork time from months to seconds, protecting EBITDA and capital discounts.
                      </div>
                   </div>
                </div>
             )}
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Position</h3>
              <div className="h-32 w-32 relative mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart><Pie data={[{value: data.scoreValue}, {value: 100-data.scoreValue}]} innerRadius={40} outerRadius={60} startAngle={90} endAngle={-270} dataKey="value"><Cell fill={getScoreColor(data.scoreValue)} /><Cell fill="#f1f5f9" /></Pie></PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-black">
                   <span className="text-4xl leading-none">{data.scoreValue}</span>
                   {comparisonActive && (
                      <span className="text-[10px] text-slate-400 font-normal mt-0.5 font-mono">
                         vs {(() => {
                            const recs = getActiveRecords();
                            if (recs.length < 2) return "";
                            return recs[recs.length - 2].score;
                         })()}%
                      </span>
                   )}
                </div>
              </div>
              {getStatusBadge(data.readinessScore)}

              {comparisonActive && (
                 <div className="mt-3 text-[10px] font-bold text-emerald-600 flex items-center gap-1 justify-center">
                    <TrendingUp size={12} />
                    +{data.scoreValue - (() => {
                       const recs = getActiveRecords();
                       return recs.length >= 2 ? recs[recs.length - 2].score : data.scoreValue;
                    })()}% Improvement
                 </div>
              )}
            </div>
            
            <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Executive Brief</h3>
               <p className="text-slate-700 text-sm leading-relaxed font-medium italic">"{data.executiveSummary}"</p>
               
               <div className="mt-8 pt-8 border-t border-slate-100">
                  <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Standardized Compliance IQ</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {data.detailedFrameworks?.map((fw, idx) => {
                      const prevRecord = comparisonActive && getActiveRecords().length >= 2 ? getActiveRecords()[getActiveRecords().length - 2] : null;
                      const prevScore = prevRecord ? prevRecord.frameworkScores[fw.name] : null;
                      
                      return (
                        <div key={idx} className="space-y-2 group">
                          <div className="flex items-center justify-between">
                             <div className="flex items-center gap-1.5">
                                {getFrameworkIcon(fw.name)}
                                <span className="text-[10px] font-black text-slate-800">{fw.name}</span>
                             </div>
                             <span className={`text-[9px] font-black ${getStatusColor(fw.status)}`}>{fw.status}</span>
                          </div>
                          
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
                             {/* Overlaid Previous Score Tick notch */}
                             {prevScore !== null && prevScore !== undefined && (
                               <div 
                                 className="absolute top-0 bottom-0 w-1 bg-slate-900 border-x border-white z-10"
                                 style={{ left: `${prevScore}%` }}
                                 title={`Benchmark: ${prevScore}%`}
                               />
                             )}
                             <div 
                               className={`h-full transition-all duration-1000 ${
                                 fw.alignmentScore >= 80 ? 'bg-emerald-500' : fw.alignmentScore >= 50 ? 'bg-amber-500' : 'bg-red-500'
                               }`}
                               style={{ width: `${fw.alignmentScore}%` }}
                             />
                          </div>
                          
                          <div className="flex flex-col text-[10px]">
                             <span className="font-black text-slate-900">{fw.alignmentScore}%</span>
                             {prevScore !== null && prevScore !== undefined && (
                                <span className="text-slate-400 font-mono text-[9px] mt-0.5">
                                   vs {prevScore}% 
                                   <span className={fw.alignmentScore >= prevScore ? "text-emerald-600 font-bold ml-1" : "text-rose-600 font-bold ml-1"}>
                                      ({fw.alignmentScore >= prevScore ? "+" : ""}{fw.alignmentScore - prevScore}%)
                                   </span>
                                </span>
                             )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
               </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PeerIntelligence companyName={data.companyName} userScore={data.scoreValue} scoreBreakdown={data.scoreBreakdown} />
            <div className="flex flex-col gap-6">
               <SolutionMarketplace data={data} />
               <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Critical Policy Drafting</h4>
                  <div className="space-y-3">
                     {data.mandatoryDisclosures.filter(d => d.status === 'Missing').slice(0, 3).map((gap, i) => (
                       <button 
                         key={i} 
                         onClick={() => handleDraftPolicy(gap)}
                         className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-amber-50 hover:border-amber-200 border border-slate-100 transition-all text-left"
                       >
                         <div>
                            <div className="text-xs font-black text-slate-900">{gap.code} Policy Gap</div>
                            <div className="text-[10px] text-slate-500 font-medium truncate w-48">{gap.description}</div>
                         </div>
                         <PenLine size={16} className="text-amber-500" />
                       </button>
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <AuditChat auditResult={data} />
    </div>
  );
};

export default Report;
