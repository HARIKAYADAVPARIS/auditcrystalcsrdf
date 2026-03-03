
import React, { useState, useMemo } from 'react';
import { AuditResult } from '../types';
import { Scale, Users, TrendingUp, ShieldCheck, AlertCircle, DollarSign, BarChart3, Info, ChevronRight, Zap, Target, ArrowUpRight, Gavel, Sparkles } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ReferenceLine } from 'recharts';

interface ComplianceBenchmarkingProps {
  data: AuditResult;
}

const ComplianceBenchmarking: React.FC<ComplianceBenchmarkingProps> = ({ data }) => {
  // Local state for interactive founder comp benchmarking
  const [founderSalary, setFounderSalary] = useState(185000);
  const [fundingStage, setFundingStage] = useState<'Seed' | 'Series A' | 'Series B+'>('Series A');

  // Benchmark logic for founder compensation (Market data simulation)
  const benchmarks = {
    'Seed': { min: 60000, avg: 85000, max: 120000 },
    'Series A': { min: 120000, avg: 165000, max: 210000 },
    'Series B+': { min: 180000, avg: 240000, max: 350000 }
  };

  const currentBenchmark = benchmarks[fundingStage];
  const compStatus = useMemo(() => {
    if (founderSalary > currentBenchmark.max) return { label: 'High Exposure', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200' };
    if (founderSalary < currentBenchmark.min) return { label: 'Audit Flag: Low Pay', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' };
    return { label: 'Market Compliant', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' };
  }, [founderSalary, currentBenchmark]);

  const chartData = [
    { name: 'Market Floor', value: currentBenchmark.min, fill: '#94a3b8' },
    { name: 'Market Avg', value: currentBenchmark.avg, fill: '#6366f1' },
    { name: 'Market Cap', value: currentBenchmark.max, fill: '#94a3b8' },
    { name: 'Your Selection', value: founderSalary, fill: '#f59e0b' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Module Header */}
      <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Scale size={240} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full">
              <Sparkles size={12} className="animate-pulse" /> Startup Growth Protocol
            </div>
            <h2 className="text-4xl font-black tracking-tighter">Founder & Executive <span className="text-indigo-400">Compensation Benchmarking</span></h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Automated audit of executive remuneration packages against local tax authority market rates (e.g., Swiss SIF/ESTV standards). Ensure your funding rounds aren't delayed by governance friction.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center min-w-[200px]">
            <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">Benchmarking Confidence</div>
            <div className="text-4xl font-black text-indigo-400">96.8%</div>
            <div className="text-[8px] text-emerald-400 font-black mt-1 uppercase">Institutional Grade</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Founder Comp Interactive Benchmarker */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Audit Readiness: Remuneration</h3>
              <p className="text-sm text-slate-500">Simulate compensation adjustments to identify tax & audit risk.</p>
            </div>
            <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase border ${compStatus.bg} ${compStatus.color} ${compStatus.border}`}>
              {compStatus.label}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Funding Stage</label>
                  <span className="text-xs font-bold text-indigo-600">{fundingStage}</span>
                </div>
                <div className="flex gap-2">
                  {(['Seed', 'Series A', 'Series B+'] as const).map(stage => (
                    <button
                      key={stage}
                      onClick={() => setFundingStage(stage)}
                      className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg border transition-all ${
                        fundingStage === stage ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-400'
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Base Salary (CHF/EUR)</label>
                  <span className="text-sm font-black text-slate-900">{new Intl.NumberFormat().format(founderSalary)}</span>
                </div>
                <input
                  type="range"
                  min="40000"
                  max="400000"
                  step="5000"
                  value={founderSalary}
                  onChange={(e) => setFounderSalary(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase">
                  <span>40k</span>
                  <span>Market Average</span>
                  <span>400k</span>
                </div>
              </div>
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 700, fill: '#94a3b8' }} />
                  <YAxis hide />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-start gap-4">
            <div className="p-2 bg-indigo-100 rounded-xl">
              <Gavel size={20} className="text-indigo-600" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Compliance Logic</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Swiss authorities (ESTV) mandate "Atrillsvergleich" for founder salaries. Salaries exceeding the Market Cap ({new Intl.NumberFormat().format(currentBenchmark.max)}) may be reclassified as hidden dividend distributions, triggering social security penalties.
              </p>
            </div>
          </div>
        </div>

        {/* Audit Readiness KPIs */}
        <div className="bg-slate-950 rounded-3xl p-8 border border-slate-800 text-white shadow-2xl flex flex-col">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
            <Target className="text-amber-400" size={18} />
            Readiness KPIs
          </h3>
          <div className="space-y-6 flex-1">
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase">Say on Pay Protocol</span>
                <span className="text-xs font-black text-emerald-400">PASSED</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[100%]"></div>
              </div>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase">ESOP Vesting Compliance</span>
                <span className="text-xs font-black text-amber-400">GAP DETECTED</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[65%]"></div>
              </div>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase">Social Contribution Delta</span>
                <span className="text-xs font-black text-red-400">AT RISK</span>
              </div>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 w-[22%]"></div>
              </div>
            </div>
          </div>
          <button className="mt-8 w-full py-3 bg-white text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg flex items-center justify-center gap-2">
             Generate Remuneration Report <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Group Benchmark Comparison */}
      <div className="bg-white rounded-3xl border border-slate-100 p-10 shadow-sm relative overflow-hidden">
        <h3 className="text-2xl font-black text-slate-900 mb-2">Institutional Comparison Matrix</h3>
        <p className="text-sm text-slate-500 mb-8">How your startup's audit readiness stacks against {fundingStage} industry peers.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center">
            <div className="text-[10px] font-black text-slate-400 uppercase mb-2">Peer Avg Score</div>
            <div className="text-4xl font-black text-slate-900">72%</div>
          </div>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col justify-center items-center text-center">
            <div className="text-[10px] font-black text-indigo-400 uppercase mb-2">Your Audit Score</div>
            <div className="text-4xl font-black text-indigo-600">{data.scoreValue}%</div>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col justify-center items-center text-center">
            <div className="text-[10px] font-black text-slate-400 uppercase mb-2">Governance Maturity</div>
            <div className="text-4xl font-black text-slate-900">T3</div>
          </div>
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col justify-center items-center text-center">
             <div className="text-[10px] font-black text-emerald-400 uppercase mb-2">Investor Confidence</div>
             <div className="text-4xl font-black text-emerald-600">HIGH</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceBenchmarking;
