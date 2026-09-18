import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Matrix rain canvas ────────────────────────────────────────────────────────
const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const fontSize = 13;
    const chars = 'アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%';
    let cols = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(cols).fill(1);
    const draw = () => {
      cols = Math.floor(canvas.width / fontSize);
      while (drops.length < cols) drops.push(Math.random() * canvas.height);
      ctx.fillStyle = 'rgba(0,0,0,0.045)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = i % 7 === 0 ? '#ffffff' : '#FDB931';
        ctx.font = `${fontSize}px "Courier New", monospace`;
        ctx.fillText(char, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };
    const interval = setInterval(draw, 40);
    return () => { clearInterval(interval); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.18, zIndex: 0 }} />;
};

// ── Terminal ──────────────────────────────────────────────────────────────────
type Step = 'typing' | 'done';

const WpAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const [step,  setStep]  = useState<Step>('typing');
  const [typed, setTyped] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const CMD = '/wp-admin';

  const startTyping = () => {
    setStep('typing');
    setTyped('');
    let i = 0;
    const type = () => {
      i++;
      setTyped(CMD.slice(0, i));
      if (i < CMD.length) timerRef.current = setTimeout(type, 85);
      else timerRef.current = setTimeout(() => setStep('done'), 500);
    };
    timerRef.current = setTimeout(type, 600);
  };

  useEffect(() => { startTyping(); return () => { if (timerRef.current) clearTimeout(timerRef.current); }; }, []);

  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#020c14' }}
    >
      <MatrixRain />

      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)' }} />

      <div className="relative z-10 flex flex-col items-center gap-10 w-full px-4 py-12">

        {/* ── TERMINAL ── */}
        <div
          className="w-full max-w-xl mx-auto rounded-2xl overflow-hidden"
          style={{
            background: '#05111c',
            border: '2px solid rgba(253,185,49,0.5)',
            boxShadow: '0 0 60px 6px rgba(253,185,49,0.15)',
            fontFamily: '"Courier New", Courier, monospace',
          }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[rgba(253,185,49,0.15)]"
            style={{ background: 'rgba(253,185,49,0.07)' }}>
            <span className="w-3 h-3 rounded-full bg-red-500 opacity-80 cursor-pointer" onClick={startTyping} title="Retry" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
            <span className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
            <span className="ml-2 text-[#FDB931] text-[11px] opacity-55 tracking-widest uppercase">terminal hacker.exe</span>
          </div>

          {/* Body */}
          <div className="px-5 py-5 min-h-[120px] flex flex-col gap-3">
            {/* Prompt */}
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-[#FDB931] font-bold">visitor@govindaniit.com</span>
              <span className="text-[#6B7B8D]">:</span>
              <span className="text-[#A8D8EA]">~</span>
              <span className="text-white opacity-60">$</span>
              <span className="text-white ml-1">
                <span className="text-[#FDB931]">curl </span>
                <span>https://govindaniit.com</span>
                <span className="text-[#A8D8EA]">{typed}</span>
                {step === 'typing' && (
                  <span className="inline-block w-2 h-[1em] bg-[#FDB931] ml-0.5 animate-pulse align-middle" />
                )}
              </span>
            </div>

            {/* Response */}
            {step === 'done' && (
              <div className="flex flex-col gap-2 border-l-2 border-red-500/40 pl-3 py-1" style={{ animation: 'fadeIn 0.35s ease both' }}>
                <div>
                  <span className="text-red-400 font-bold text-xs sm:text-sm">HTTP/1.1  403  Forbidden</span>
                </div>
                <div className="text-[#6B7B8D] text-[11px]">&gt; Security: Govindani Infotech Firewall v9.1 🛡️</div>
                <div className="text-[#6B7B8D] text-[11px]">&gt; Connection: closed</div>
                <button
                  onClick={startTyping}
                  className="self-start mt-1 text-[10px] uppercase tracking-widest text-[#FDB931] opacity-60 hover:opacity-100 transition-opacity border border-[rgba(253,185,49,0.3)] rounded px-3 py-1"
                >
                  ↩ try again
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── BIG MESSAGE ── */}
        {step === 'done' && (
          <div className="flex flex-col items-center gap-4 text-center" style={{ animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}>
            <p
              className="text-[#FDB931] font-black leading-tight"
              style={{
                fontFamily: '"Arial Black", sans-serif',
                fontSize: 'clamp(2.2rem, 8vw, 5rem)',
                textShadow: '0 0 30px rgba(253,185,49,0.5), 0 0 80px rgba(253,185,49,0.2)',
                animation: 'pulseGlow 2s ease-in-out infinite alternate',
              }}
            >
              Aapse Naa Ho Payega 😂
            </p>
            <button
              onClick={() => navigate(-1)}
              className="mt-2 text-[#6B8FAD] hover:text-[#FDB931] transition-colors text-xs uppercase tracking-widest flex items-center gap-2"
              style={{ fontFamily: '"Courier New", monospace', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <span>←</span><span>Go back</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseGlow {
          from { text-shadow: 0 0 20px rgba(253,185,49,0.4); }
          to   { text-shadow: 0 0 50px rgba(253,185,49,1), 0 0 100px rgba(253,185,49,0.4); }
        }
      `}</style>
    </div>
  );
};

export default WpAdminPage;