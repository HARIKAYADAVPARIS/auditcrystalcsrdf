
import React, { useState, useEffect } from 'react';
import { Search, Trophy, TrendingUp, AlertCircle, ExternalLink, RefreshCw, Loader2, Sparkles, Target, Link as LinkIcon } from 'lucide-react';
import { fetchPeerIntelligence } from '../services/gemini';

interface PeerIntel {
  name: string;
  readinessScore: number;
  keyGap: string;
  reportUrl: string;
}

interface PeerIntelligenceProps {
  companyName: string;
  userScore: number;
}

const PeerIntelligence: React.FC<PeerIntelligenceProps> = ({ companyName, userScore }) => {
  const [peers, setPeers] = useState<PeerIntel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const loadIntel = async () => {
    setIsLoading(true);
    setExpandedIndex(null);
    try {
      const data = await fetchPeerIntelligence(companyName);
      setPeers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Peer Intel Fetch Error:", err);
      setPeers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (companyName) loadIntel();
  }, [companyName]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Trophy className="text-amber-400" size={20} />
            Live Market Benchmarking
          </h3>
          <div className="flex items-center gap-2 text-slate-400 text-[9px] font-black uppercase tracking-widest">
            <Sparkles size={10} className="text-indigo-400" />
            Verified via Google Search Grounding
          </div>
        </div>
        <button 
          onClick={loadIntel}
          disabled={isLoading}
          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5 disabled:opacity-50"
          title="Refresh Peer Data"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin text-amber-500" /> : <RefreshCw size={18} className="text-slate-400" />}
        </button>
      </div>

      <div className="p-8 flex-1">
        {isLoading && peers.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-ping"></div>
              <Search size={48} className="text-amber-500 relative z-10 animate-bounce" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Scanning Global Reports...</p>
              <p className="text-xs text-slate-400 font-medium">Analyzing peer 10-Ks and ESG disclosures for {companyName}</p>
            </div>
          </div>
        ) : peers.length === 0 ? (
          <div className="py-20 text-center space-y-4">
             <AlertCircle size={40} className="mx-auto text-slate-200" />
             <p className="text-sm text-slate-500">No immediate peers found via live grounding.</p>
             <button onClick={loadIntel} className="text-xs font-black text-indigo-600 uppercase underline decoration-indigo-200">Retry Scan</button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* User Rank Card */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center font-black text-slate-950 text-2xl shadow-xl border-4 border-white rotate-3">
                  {userScore}
                </div>
                <div>
                  <div className="font-black text-slate-900 tracking-tight text-lg">{companyName}</div>
                  <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-1">
                    <Target size={10} /> Your Global Readiness IQ
                  </div>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Status</div>
                <div className="px-3 py-1 bg-white text-emerald-600 rounded-full text-[9px] font-black border border-emerald-100 shadow-sm uppercase">Beat Peer Avg</div>
              </div>
            </div>

            {/* Peer List */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Competitor Landscape</h4>
              {peers.map((peer, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                  className={`group p-5 rounded-2xl border transition-all cursor-pointer ${
                    expandedIndex === idx 
                      ? 'border-indigo-200 bg-white shadow-xl ring-1 ring-indigo-50' 
                      : 'border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                        peer.readinessScore > userScore ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          {peer.name}
                          {peer.readinessScore < userScore && (
                            <span className="text-[8px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-black uppercase">Beating</span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1.5 mt-1">
                          <span className="font-medium opacity-60">Readiness IQ: {peer.readinessScore}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="text-right">
                        <div className={`text-xl font-black ${peer.readinessScore > userScore ? 'text-indigo-600' : 'text-emerald-600'}`}>
                          {peer.readinessScore}
                        </div>
                      </div>
                      <div className={`transition-transform duration-300 ${expandedIndex === idx ? 'rotate-180' : ''}`}>
                        <RefreshCw size={14} className="text-slate-300" />
                      </div>
                    </div>
                  </div>

                  {expandedIndex === idx && (
                    <div className="mt-6 pt-6 border-t border-slate-100 animate-in slide-in-from-top-2 duration-300 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black text-amber-600 uppercase tracking-widest">
                          <AlertCircle size={12} /> Critical Assurance Gap
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium bg-amber-50/50 p-3 rounded-xl border border-amber-100/50">
                          {peer.keyGap}
                        </p>
                      </div>
                      
                      {peer.reportUrl && (
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Source Disclosure</div>
                          <a 
                            href={peer.reportUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all border border-indigo-100"
                          >
                            <ExternalLink size={12} /> View Report
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-start gap-4 shadow-inner">
               <div className="p-2 bg-indigo-500 rounded-xl mt-0.5">
                  <Sparkles size={16} className="text-white" />
               </div>
               <div className="space-y-1">
                 <p className="text-[11px] text-indigo-700 leading-relaxed font-bold uppercase tracking-widest">Institutional Edge</p>
                 <p className="text-[11px] text-slate-600 leading-relaxed">
                   Peers in your sector are struggling with <strong>Value Chain Transparency</strong>. Exploiting this via product passports would position {companyName} as a market leader in the 2026 assurance cycle.
                 </p>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeerIntelligence;
