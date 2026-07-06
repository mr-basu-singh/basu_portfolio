import { useEffect, useRef, useState } from 'react';
import { profile, loaderExplore } from '../data/content';

// Every real asset the site needs visually settled before we consider it "ready" —
// missing/not-yet-added project images resolve as failures rather than hanging,
// so an incomplete images folder never blocks the loader indefinitely.
const ASSET_URLS = [
  '/images/kai-face.webp',
  '/images/basu-photo.png',
  '/images/project-1.png',
  '/images/project-2.png',
  '/images/project-3.png',
  '/images/project-4.png',
  '/images/project-5.png',
  '/images/project-6.png',
];

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

const MIN_DISPLAY_MS = 1800; // never flashes for an instant even on a fast connection
const SAFETY_TIMEOUT_MS = 8000; // hard ceiling so a stalled asset can never hang the site open

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const readyRef = useRef({ assets: false, minTime: false });

  // Real readiness: web fonts actually rendered + every image the site displays
  // has either loaded or definitively failed (not left pending).
  useEffect(() => {
    let cancelled = false;
    const fontsPromise = document.fonts?.ready ?? Promise.resolve();
    const imagePromises = ASSET_URLS.map(preloadImage);

    Promise.allSettled([fontsPromise, ...imagePromises]).then(() => {
      if (!cancelled) readyRef.current.assets = true;
    });

    const safety = setTimeout(() => {
      if (!cancelled) readyRef.current.assets = true;
    }, SAFETY_TIMEOUT_MS);

    const minTimer = setTimeout(() => {
      if (!cancelled) readyRef.current.minTime = true;
    }, MIN_DISPLAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(safety);
      clearTimeout(minTimer);
    };
  }, []);

  // Smoothly animates toward real completion — climbs on its own up to ~88%
  // right away for perceived motion, then holds there until assets are
  // actually ready, only reaching 100% once both conditions are genuinely true.
  useEffect(() => {
    let raf;
    const start = performance.now();
    const current = { value: 0 };

    const loop = () => {
      const elapsed = performance.now() - start;
      const timeBased = Math.min(88, (elapsed / MIN_DISPLAY_MS) * 88);
      const bothReady = readyRef.current.assets && readyRef.current.minTime;
      const target = bothReady ? 100 : timeBased;

      current.value += (target - current.value) * 0.12;
      if (bothReady && current.value > 99) current.value = 100;

      setProgress(Math.round(current.value));

      if (current.value < 100) {
        raf = requestAnimationFrame(loop);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setExiting(true);
      const t = setTimeout(() => onDone?.(), 550);
      return () => clearTimeout(t);
    }
  }, [progress, onDone]);

  return (
    <div className={`loader ${exiting ? 'exit' : ''}`} role="status" aria-live="polite">
      <div className="loader-face-col">
        <img src="/images/kai-face.webp" alt="Kai, AI assistant" className="loader-face-img" />
        <div className="loader-face-fade" />
        <div className="loader-brand">
          <span className="loader-mark">BS</span>
          <span className="loader-brand-text">
            <strong>{profile.name}</strong>
            <small>{profile.title}</small>
          </span>
        </div>
      </div>

      <div className="loader-content-col">
        <div className="loader-card">
          <div className="eyebrow loader-eyebrow"><span className="pulse-dot" />INITIALIZING AI AGENT</div>
          <h1 className="loader-kai display">Hello, I'm Kai<span className="dot-accent">.</span></h1>
          <p className="loader-role">Your AI Portfolio Assistant</p>
          <p className="loader-p">
            Built to represent the work, projects, and skills of <span className="hl">{profile.fullName}</span> — an AI Agent Engineer.
          </p>

          <div className="loader-explore">
            <span className="loader-explore-label">Explore:</span>
            <div className="loader-explore-grid">
              {loaderExplore.map((item) => (
                <span key={item} className="loader-explore-item"><span className="dot" />{item}</span>
              ))}
            </div>
          </div>

          <div className="loader-bar-wrap">
            <div className="loader-bar-head">
              <span className="mono">LOADING PORTFOLIO</span>
              <span className="mono loader-pct">{progress}%</span>
            </div>
            <div className="loader-bar-track">
              <div className="loader-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .loader{
          position:fixed; inset:0; z-index:1000;
          background:var(--bg);
          display:grid;
          grid-template-columns:42% 58%;
          transition:opacity .55s ease, visibility .55s ease;
          overflow:hidden;
        }
        .loader.exit{opacity:0; visibility:hidden; pointer-events:none;}

        /* ---- Left: full-bleed Kai face, edge to edge ---- */
        .loader-face-col{ position:relative; height:100%; overflow:hidden; background:#0a0a0d; }
        .loader-face-img{
          position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center 28%;
          filter:brightness(1.05) saturate(1.05);
        }
        .loader-face-fade{
          position:absolute; inset:0;
          background:linear-gradient(to right, transparent 60%, var(--bg));
        }
        .loader-brand{
          position:absolute; top:clamp(14px,2.4vh,28px); left:clamp(16px,3vw,32px);
          z-index:2; display:flex; align-items:center; gap:12px;
        }
        .loader-mark{
          width:34px; height:34px; border-radius:10px; display:flex; align-items:center; justify-content:center;
          font-family:var(--font-display); font-weight:700; font-size:13px;
          background:linear-gradient(135deg, var(--accent), var(--accent-2)); color:var(--on-accent);
        }
        .loader-brand-text{ display:flex; flex-direction:column; line-height:1.2; }
        .loader-brand-text strong{ font-family:var(--font-display); font-size:14px; color:var(--heading); }
        .loader-brand-text small{ font-family:var(--font-mono); font-size:9.5px; color:var(--accent); }

        /* ---- Right: content card, vertically centered ---- */
        .loader-content-col{
          display:flex; align-items:center; justify-content:center;
          padding:clamp(16px,3vh,40px) clamp(20px,4vw,56px);
          min-height:0; min-width:0; overflow:hidden;
        }
        .loader-card{
          width:100%; max-width:520px; min-width:0;
          background:var(--glass-bg);
          backdrop-filter:blur(20px) saturate(140%);
          -webkit-backdrop-filter:blur(20px) saturate(140%);
          border:1px solid var(--glass-border);
          border-radius:24px;
          padding:clamp(16px,2.6vh,32px) clamp(18px,2.6vw,32px);
          box-shadow:0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
          max-height:92vh; overflow:auto;
        }
        .loader-eyebrow{ justify-content:flex-start; margin-bottom:clamp(6px,1.2vh,14px); }
        .pulse-dot{ width:6px; height:6px; border-radius:50%; background:var(--accent); animation:pulseDot 1.6s infinite; }
        @keyframes pulseDot{ 0%,100%{ opacity:1; } 50%{ opacity:.3; } }
        .loader-kai{ font-size:clamp(20px,3.2vh,32px); font-weight:700; color:var(--heading); line-height:1.05; }
        .dot-accent{ color:var(--accent); }
        .loader-role{ font-size:clamp(12px,1.6vh,15px); color:var(--text-dim); margin-top:5px; margin-bottom:clamp(6px,1.4vh,14px); }
        .loader-p{ font-size:clamp(11.5px,1.5vh,13.5px); line-height:1.55; color:var(--text); }
        .loader-p .hl{ color:var(--accent); font-weight:600; }

        .loader-explore{ margin-top:clamp(8px,1.6vh,18px); display:flex; align-items:baseline; gap:14px; flex-wrap:wrap; }
        .loader-explore-label{ font-size:10.5px; color:var(--text-dim); flex-shrink:0; }
        .loader-explore-grid{ display:flex; flex-wrap:wrap; gap:6px 14px; }
        .loader-explore-item{ display:flex; align-items:center; gap:6px; font-size:11px; color:var(--text); white-space:nowrap; }
        .loader-explore-item .dot{ width:4px; height:4px; border-radius:50%; background:var(--accent); flex-shrink:0; }

        .loader-bar-wrap{ width:100%; padding-top:clamp(10px,2vh,20px); margin-top:clamp(8px,1.6vh,16px); border-top:1px solid var(--line); }
        .loader-bar-head{ display:flex; justify-content:space-between; font-size:10px; letter-spacing:1.5px; color:var(--text-dim); margin-bottom:6px; }
        .loader-pct{ color:var(--heading); font-weight:600; }
        .loader-bar-track{ height:3px; background:var(--line); border-radius:3px; overflow:hidden; }
        .loader-bar{ height:100%; background:linear-gradient(90deg, var(--accent-2), var(--accent)); border-radius:3px; transition:width .1s linear; }

        /* Stacking only kicks in for genuinely narrow (mobile-width) screens —
           never triggered by short-but-wide desktop windows. */
        @media (max-width:700px){
          .loader{ grid-template-columns:1fr; grid-template-rows:38vh 62vh; }
          .loader-face-fade{ background:linear-gradient(to bottom, transparent 55%, var(--bg)); }
          .loader-content-col{ padding:clamp(10px,2vh,20px) clamp(16px,4vw,28px); }
          .loader-card{ max-height:100%; padding:clamp(14px,2.4vh,24px) clamp(16px,4vw,24px); }
          .loader-eyebrow{ justify-content:center; }
          .loader-explore{ justify-content:center; }
          .loader-explore-grid{ justify-content:center; }
        }
      `}</style>
    </div>
  );
}