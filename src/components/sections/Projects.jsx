import { useRef } from 'react';
import useReveal from '../../hooks/useReveal';
import { projects } from '../../data/content';

function ResumeIllustration() {
  return (
    <svg viewBox="0 0 300 220" className="proj-illust">
      <g transform="translate(60,60)">
        <rect x="20" y="20" width="130" height="150" rx="10" fill="none" stroke="var(--line)" strokeWidth="2" />
        <rect x="10" y="10" width="130" height="150" rx="10" fill="var(--surface)" stroke="var(--accent-2)" strokeWidth="2" />
        <line x1="30" y1="45" x2="115" y2="45" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
        <line x1="30" y1="65" x2="100" y2="65" stroke="var(--line)" strokeWidth="3" strokeLinecap="round" />
        <line x1="30" y1="82" x2="90" y2="82" stroke="var(--line)" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className="proj-score-a">
        <circle cx="220" cy="60" r="30" fill="var(--surface)" stroke="var(--accent-2)" strokeWidth="2.5" />
        <text x="220" y="66" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--accent-2)">95</text>
      </g>
      <g className="proj-score-b">
        <circle cx="255" cy="115" r="24" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2.5" />
        <text x="255" y="120" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--accent)">82</text>
      </g>
    </svg>
  );
}

function MentorIllustration() {
  return (
    <svg viewBox="0 0 300 220" className="proj-illust">
      <path d="M40 170 Q90 90 150 110 T260 50" fill="none" stroke="var(--line)" strokeWidth="2.5" strokeDasharray="6 6" className="proj-dash" />
      <circle cx="40" cy="170" r="14" fill="var(--accent)" />
      <path d="M34 170 l4 5 l9 -11" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="128" cy="118" r="14" fill="var(--accent)" className="proj-pulse-a" />
      <path d="M122 118 l4 5 l9 -11" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="195" cy="80" r="14" fill="var(--surface)" stroke="var(--accent-2)" strokeWidth="2.5" />
      <circle cx="260" cy="50" r="16" fill="var(--surface)" stroke="var(--accent-2)" strokeWidth="2.5" className="proj-pulse-b" />
    </svg>
  );
}

function TourIllustration() {
  return (
    <svg viewBox="0 0 300 220" className="proj-illust">
      <path d="M40 170 Q100 130 150 145 T230 90" fill="none" stroke="var(--accent)" strokeWidth="3" strokeDasharray="8 8" className="proj-dash" strokeLinecap="round" />
      <circle cx="40" cy="170" r="8" fill="var(--accent)" />
      <circle cx="150" cy="145" r="8" fill="var(--accent)" className="proj-pulse-a" />
      <g className="proj-pin">
        <path d="M230 40 a30 30 0 1 1 -0.1 0 Z M230 40 c-16 0 -28 12 -28 28 c0 21 28 52 28 52 s28 -31 28 -52 c0 -16 -12 -28 -28 -28Z" fill="none" stroke="var(--accent-2)" strokeWidth="3" />
        <circle cx="230" cy="68" r="10" fill="var(--accent-2)" />
      </g>
    </svg>
  );
}

function ForgeIllustration() {
  const bars = [40, 70, 100, 60, 85];
  return (
    <svg viewBox="0 0 300 220" className="proj-illust">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={50 + i * 42}
          y={170 - h}
          width="24"
          height={h}
          rx="4"
          fill={i === 2 ? 'var(--accent-2)' : 'var(--surface)'}
          stroke="var(--accent)"
          strokeWidth="2"
          className={`proj-bar proj-bar-${i}`}
        />
      ))}
      <line x1="40" y1="172" x2="270" y2="172" stroke="var(--line)" strokeWidth="2" />
    </svg>
  );
}

function BlogIllustration() {
  return (
    <svg viewBox="0 0 300 220" className="proj-illust">
      <rect x="80" y="40" width="140" height="140" rx="12" fill="var(--surface)" stroke="var(--accent-2)" strokeWidth="2.5" />
      <line x1="100" y1="70" x2="200" y2="70" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" />
      <line x1="100" y1="92" x2="185" y2="92" stroke="var(--line)" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="110" x2="190" y2="110" stroke="var(--line)" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="128" x2="160" y2="128" stroke="var(--line)" strokeWidth="3" strokeLinecap="round" />
      <g className="proj-pen">
        <path d="M175 155 l30 -30 l14 14 l-30 30 l-18 4 Z" fill="var(--accent)" />
      </g>
    </svg>
  );
}

function ChatIllustration() {
  return (
    <svg viewBox="0 0 300 220" className="proj-illust">
      <rect x="50" y="50" width="130" height="80" rx="18" fill="var(--surface)" stroke="var(--accent-2)" strokeWidth="2.5" />
      <path d="M75 130 l0 22 l24 -22 Z" fill="var(--surface)" stroke="var(--accent-2)" strokeWidth="2.5" />
      <circle cx="85" cy="90" r="5" fill="var(--accent)" className="proj-pulse-a" />
      <circle cx="115" cy="90" r="5" fill="var(--accent)" className="proj-pulse-b" />
      <circle cx="145" cy="90" r="5" fill="var(--accent)" className="proj-pulse-a" />
      <rect x="150" y="105" width="110" height="70" rx="18" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
      <path d="M225 175 l0 20 l-22 -20 Z" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  );
}

const ILLUSTRATIONS = {
  'resume-agent': ResumeIllustration,
  'career-mentor': MentorIllustration,
  'tour-guide': TourIllustration,
  aiforge: ForgeIllustration,
  'blog-agent': BlogIllustration,
  'agentic-chatbot': ChatIllustration,
};

// Optimized WebP filenames for each project card image, in order. Filenames
// are inconsistent (some have a "-opt" suffix) because a couple of the plain
// project-N.webp names got stuck in a broken state on this machine's sync —
// likely antivirus/file-lock grabbing them right after creation — so those
// specific ones were re-saved under alternate names as a workaround.
const PROJECT_IMAGE_FILES = [
  'project-1-opt.webp',
  'project-2-opt.webp',
  'project-3-opt.webp',
  'project-4-opt.webp',
  'project-5.webp',
  'project-6-opt.webp',
];

/**
 * TiltCard — cursor-tracked 3D tilt wrapper (plain React/CSS port of the
 * "3D card" hover effect: the card rotates toward the cursor via
 * perspective + rotateX/rotateY, and children marked with a translateZ
 * (via the .proj-depth-* utility classes below) appear to float at
 * different heights above the card surface as it tilts.
 */
function TiltCard({ className = '', children }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const rotateY = (e.clientX - left - width / 2) / 18;
    const rotateX = -((e.clientY - top - height / 2) / 18);
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const ref = useRef();
  useReveal(ref, []);

  return (
    <section id="projects" ref={ref} className="section-shell projects-section">
      <div className="section-head">
        <span className="section-num mono">04</span>
        <h2 className="section-title reveal">Projects</h2>
        <div className="section-line" />
      </div>
      <p className="section-sub reveal">A collection of agents and systems I've built.</p>

      <div className="proj-grid">
        {projects.map((p, i) => {
          const Illustration = ILLUSTRATIONS[p.id];
          return (
            <div key={p.id} className={`reveal d${(i % 5) + 1}`}>
              <TiltCard className="proj-card liquid-card">
                <span className="proj-flag mono proj-depth-2">FLAGSHIP</span>
                <h3 className="proj-card-title proj-depth-3">{p.title}</h3>

                <div className="proj-illust-wrap proj-depth-4">
                  <img
                    src={`/images/${PROJECT_IMAGE_FILES[i]}`}
                    alt={p.title}
                    className="proj-photo"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="proj-illust-fallback">
                    {Illustration && <Illustration />}
                  </div>
                </div>

                <p className="proj-card-desc proj-depth-1">{p.desc}</p>
                <div className="proj-card-stack proj-depth-1">
                  {p.stack.map((s) => <span key={s} className="chip">{s}</span>)}
                </div>
                <div className="proj-card-links proj-depth-2">
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="proj-link">
                      Live Demo <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13"><path d="M7 17 17 7M8 7h9v9"/></svg>
                    </a>
                  )}
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link">
                    GitHub
                    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.9-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"/></svg>
                  </a>
                </div>
              </TiltCard>
            </div>
          );
        })}
      </div>

      <style>{`
        .proj-grid{ display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:24px; }

        .tilt-card{
          transform-style: preserve-3d;
          transition: transform .3s cubic-bezier(.16,.8,.24,1), box-shadow .35s ease;
          will-change: transform;
        }
        .proj-card{ padding:26px; border-radius:20px; }
        .proj-card:hover{ box-shadow:0 24px 50px rgba(0,0,0,0.4); }
        .proj-depth-1{ transform: translateZ(10px); }
        .proj-depth-2{ transform: translateZ(20px); }
        .proj-depth-3{ transform: translateZ(30px); }
        .proj-depth-4{ transform: translateZ(40px); }

        .proj-flag{
          display:inline-block; font-size:10px; letter-spacing:1px; color:var(--accent-2);
          background:var(--accent-soft); padding:5px 12px; border-radius:100px; margin-bottom:14px;
        }
        .proj-card-title{ font-family:var(--font-display); font-size:19px; font-weight:600; color:var(--heading); margin-bottom:14px; }
        .proj-illust-wrap{
          position:relative; background:var(--surface-2); border-radius:14px; height:180px;
          display:flex; align-items:center; justify-content:center; overflow:hidden; margin-bottom:16px;
        }
        .proj-photo{ width:100%; height:100%; object-fit:cover; transition:transform .5s cubic-bezier(.16,.8,.24,1); }
        .proj-card:hover .proj-photo{ transform:scale(1.05); }
        .proj-illust-fallback{ display:none; align-items:center; justify-content:center; width:100%; height:100%; }
        .proj-illust{ width:90%; height:90%; }
        .proj-card-desc{
          font-size:13.5px; color:var(--text-dim); line-height:1.65; margin-bottom:16px;
          height:67px; overflow:hidden;
          display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical;
        }
        .proj-card-stack{ display:flex; flex-wrap:wrap; gap:6px; margin-bottom:18px; min-height:62px; align-content:flex-start; }
        .proj-card-links{ display:flex; gap:20px; padding-top:14px; border-top:1px solid var(--line); }
        .proj-link{
          display:flex; align-items:center; gap:6px; font-size:13px; font-weight:600; color:var(--accent-2);
          text-decoration:none; transition:opacity .3s ease;
        }
        .proj-link:hover{ opacity:0.7; }

        .proj-dash{ animation:dashFlow 3s linear infinite; }
        @keyframes dashFlow{ to{ stroke-dashoffset:-60; } }
        .proj-score-a, .proj-score-b, .proj-pulse-a, .proj-pulse-b{ animation:softPulse 2.6s ease-in-out infinite; transform-origin:center; }
        .proj-score-b, .proj-pulse-b{ animation-delay:0.6s; }
        @keyframes softPulse{ 0%,100%{ transform:scale(1); opacity:1;} 50%{ transform:scale(1.08); opacity:0.75;} }
        .proj-pin{ animation:pinBob 2.4s ease-in-out infinite; transform-origin:center 68px; }
        @keyframes pinBob{ 0%,100%{ transform:translateY(0);} 50%{ transform:translateY(-5px);} }
        .proj-bar{ animation:barGrow 2.2s ease-in-out infinite alternate; transform-origin:bottom; }
        .proj-bar-1{ animation-delay:0.15s; } .proj-bar-2{ animation-delay:0.3s; } .proj-bar-3{ animation-delay:0.45s; } .proj-bar-4{ animation-delay:0.6s; }
        @keyframes barGrow{ from{ transform:scaleY(0.9); } to{ transform:scaleY(1.05); } }
        .proj-pen{ animation:penWrite 2.6s ease-in-out infinite; }
        @keyframes penWrite{ 0%,100%{ transform:translate(0,0);} 50%{ transform:translate(-3px,3px);} }

        @media (prefers-reduced-motion: reduce){
          .tilt-card{ transition:none; }
        }
      `}</style>
    </section>
  );
}