
import React, { useState, useRef, useEffect } from 'react';
import { Play, Film, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { AuditResult } from '../types';
import { generateBoardVideo, isSandboxModeActive } from '../services/gemini';

const SandboxCanvas: React.FC<{ data: AuditResult }> = ({ data }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let angle = 0;
    let pulse = 0;
    let scanLineY = 0;

    const render = () => {
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      }

      const w = canvas.width;
      const h = canvas.height;

      // Draw dark digital space
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      // Draw subtle blueprint grids
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const cx = w / 2;
      const cy = h / 2;
      pulse += 0.02;
      const pulseScale = 1 + Math.sin(pulse) * 0.05;

      // Pulse rings
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.1)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 70 * pulseScale, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.beginPath();
      ctx.arc(cx, cy, 120 * pulseScale, 0, Math.PI * 2);
      ctx.stroke();

      // Spinning 3D Crystal nodes
      angle += 0.012;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);

      ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.55)';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 12;
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(0, -35);
      ctx.lineTo(30, 15);
      ctx.lineTo(-30, 15);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.rotate(Math.PI);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.55)';
      ctx.shadowColor = '#6366f1';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(0, -25);
      ctx.lineTo(20, 12);
      ctx.lineTo(-20, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.restore();
      ctx.shadowBlur = 0;

      // Scan scope line
      scanLineY = (scanLineY + 1.2) % h;
      ctx.fillStyle = 'rgba(245, 158, 11, 0.06)';
      ctx.fillRect(0, scanLineY - 2, w, 4);

      // HUD Text Info overlays
      ctx.fillStyle = '#64748b';
      ctx.font = '900 8px monospace';
      ctx.fillText('AUDIT CRYSTAL EXECUTIVE CONSOLE • MMXXVI', 20, 25);
      ctx.fillStyle = '#e2e8f0';
      ctx.fillText(`ISSUER: ${data.companyName.toUpperCase()}`, 20, 40);
      ctx.fillStyle = '#10b981';
      ctx.fillText('SECURITY STATUS: ENCRYPTED_PROOF_LOCK', 20, 55);

      ctx.fillStyle = '#64748b';
      ctx.fillText('ASSURANCE METHODOLOGY: ISSA 5000 READY', 20, h - 25);

      // Scores on top right
      ctx.fillStyle = '#f59e0b';
      ctx.font = '900 11px monospace';
      ctx.fillText(`READINESS: ${data.scoreValue}%`, w - 130, 30);
      ctx.fillStyle = '#6366f1';
      ctx.fillText(`SECTOR AVG: ${data.sectorPeerAverage}%`, w - 130, 48);

      // Mini dynamic scope
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const waveW = 110;
      const waveX = w - 130;
      const waveY = h - 35;
      for (let i = 0; i < waveW; i++) {
        const sinY = Math.sin(i * 0.12 + pulse * 5) * 12;
        if (i === 0) ctx.moveTo(waveX + i, waveY + sinY);
        else ctx.lineTo(waveX + i, waveY + sinY);
      }
      ctx.stroke();

      ctx.fillStyle = 'rgba(99, 102, 241, 0.5)';
      ctx.font = '900 7px monospace';
      ctx.fillText('REAL-TIME ASSURANCE PULSE', w - 130, h - 12);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [data]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

interface BoardVideoProps {
  data: AuditResult;
}

const BoardVideo: React.FC<BoardVideoProps> = ({ data }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    // Only perform API Key check if Sandbox is NOT active
    if (!isSandboxModeActive()) {
      const aistudio = (window as any).aistudio;
      if (aistudio) {
        const hasKey = await aistudio.hasSelectedApiKey();
        if (!hasKey) {
          await aistudio.openSelectKey();
        }
      }
    }

    setIsGenerating(true);
    setError(null);
    try {
      const url = await generateBoardVideo(data);
      setVideoUrl(url);
    } catch (err: any) {
      console.error(err);
      const aistudio = (window as any).aistudio;
      if (err.message?.includes("Requested entity was not found.") && aistudio) {
        await aistudio.openSelectKey();
      }
      setError(err.message || "Failed to generate video. Paid API key with Veo permissions required.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-slate-950 rounded-3xl border border-slate-800 p-10 text-white relative overflow-hidden group shadow-2xl">
      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={14} className="animate-pulse" /> Veo 3.1 Cinematic Protocol
          </div>
          <h3 className="text-4xl font-black tracking-tighter leading-none">
            Executive Briefing <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">Video Generator</span>
          </h3>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            Convert your data into a cinematic presentation for the Board. Perfect for ESG committee briefings and investor relations.
          </p>
          
          <div className="flex flex-col gap-4 pt-4">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-2 text-xs text-red-400">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="h-14 bg-white text-slate-950 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-amber-400 transition-all shadow-xl disabled:opacity-50 uppercase tracking-widest text-xs"
            >
              {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Play size={20} />}
              {isGenerating ? "Rendering Briefing..." : "Generate Briefing Video"}
            </button>
          </div>
        </div>

        <div className="w-full md:w-[480px] aspect-video bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden flex items-center justify-center relative shadow-inner">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-4 text-center">
               <Film size={48} className="text-amber-500 animate-pulse" />
               <p className="text-xs font-black text-white uppercase tracking-widest">Veo Processing...</p>
            </div>
          ) : videoUrl === "sandbox-video" ? (
            <div className="w-full h-full relative">
              <SandboxCanvas data={data} />
              <div className="absolute top-4 left-4 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur">
                Interactive digital twin active
              </div>
            </div>
          ) : videoUrl ? (
            <video src={videoUrl} className="w-full h-full object-cover" controls autoPlay />
          ) : (
            <div className="flex flex-col items-center gap-4 opacity-20 grayscale">
               <Film size={80} />
               <span className="text-[10px] font-black uppercase tracking-widest">Awaiting Protocol</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardVideo;
