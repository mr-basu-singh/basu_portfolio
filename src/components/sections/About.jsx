import { useRef } from 'react';
import useReveal from '../../hooks/useReveal';
import { about } from '../../data/content';

export default function About() {
  const ref = useRef();
  useReveal(ref, []);

  return (
    <section id="about" ref={ref} className="section-shell about-section">
      <div className="section-head">
        <span className="section-num mono">02</span>
        <h2 className="section-title reveal">{about.title}</h2>
        <div className="section-line" />
      </div>

      <div className="about-grid">
        <div className="about-photo-wrap reveal">
          <div className="about-photo-frame">
            <div className="about-photo-inner">
              <img src="/images/basu-photo-opt.webp" alt="Kumar Basu Singh" className="about-photo" loading="lazy" decoding="async" />
              <span className="about-photo-glow" />
            </div>
          </div>
        </div>

        <div className="about-text">
          {about.paragraphs.map((p, i) => (
            <p key={i} className={`reveal d${i + 1}`}>{p}</p>
          ))}
        </div>
      </div>

      <style>{`
        @property --border-angle{
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }
        .about-grid{ display:grid; grid-template-columns:0.8fr 1.2fr; gap:70px; align-items:center; }
        .about-photo-wrap{ display:flex; justify-content:center; }

        .about-photo-frame{
          width:min(100%, 340px); aspect-ratio:4/5; border-radius:26px;
          padding:4px; border:1px solid transparent;
          background:
            linear-gradient(135deg, var(--bg), var(--surface-2) 50%, var(--bg)) padding-box,
            conic-gradient(from var(--border-angle), var(--glass-border) 80%, var(--accent) 86%, var(--accent-2) 90%, var(--accent) 94%, var(--glass-border)) border-box;
          animation: spinBorderAngle 5s linear infinite;
        }
        @keyframes spinBorderAngle{
          to{ --border-angle: 360deg; }
        }
        .about-photo-inner{
          position:relative; width:100%; height:100%; border-radius:22px; overflow:hidden;
        }
        .about-photo{
          width:100%; height:100%; object-fit:cover; object-position:top center;
          filter:saturate(1.05);
          transition:transform .6s cubic-bezier(.16,.8,.24,1);
        }
        .about-photo-frame:hover .about-photo{ transform:scale(1.04); }
        .about-photo-glow{
          position:absolute; inset:0; pointer-events:none;
          background:linear-gradient(160deg, transparent 60%, rgba(229,209,178,0.15));
          mix-blend-mode:overlay;
        }
        .about-text p{ color:var(--text); font-size:17px; line-height:1.9; margin-bottom:22px; max-width:560px; }

        @media (prefers-reduced-motion: reduce){
          .about-photo-frame{ animation:none; }
        }
        @media (max-width:900px){
          .about-grid{ grid-template-columns:1fr; gap:36px; }
          .about-photo-frame{ max-width:260px; margin:0 auto; }
        }
      `}</style>
    </section>
  );
}