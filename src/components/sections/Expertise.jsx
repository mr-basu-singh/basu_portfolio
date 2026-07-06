import { useRef } from 'react';
import useReveal from '../../hooks/useReveal';
import useOpenSet from '../../hooks/useOpenSet';
import { expertise } from '../../data/content';

const LABELS = {
  lang: 'CORE LANGUAGE',
  stack: 'PRIMARY STACK',
  models: 'MODELS USED',
  data: 'RETRIEVAL LAYER',
  tools: 'DAILY TOOLS',
};

function SkillCard({ e, index, label, open, onEnter, onLeave, onClick }) {
  const cardRef = useRef();

  const handleMouseMove = (ev) => {
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${ev.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${ev.clientY - rect.top}px`);
  };

  return (
    <div className="skill-item">
      <span className="skill-connector" />
      <div
        ref={cardRef}
        className={`skill-card liquid-card ${open ? 'open' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => onEnter(index)}
        onMouseLeave={() => onLeave(index)}
      >
        <span className="skill-glow" />
        <div className="skill-row" onClick={() => onClick(index)}>
          <div className="skill-row-left">
            <span className="skill-index mono">0{index + 1}</span>
            <div className="skill-text">
              <span className="skill-tag mono"><span className="skill-tag-dot" />{label}</span>
              <h3 className="skill-title">{e.title}</h3>
              <p className="skill-count mono">{e.items.length} skill{e.items.length > 1 ? 's' : ''}</p>
            </div>
          </div>
          <button className={`skill-toggle ${open ? 'open' : ''}`} aria-expanded={open} tabIndex={-1}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14" />
              <path className="skill-toggle-v" d="M12 5v14" />
            </svg>
          </button>
        </div>
        <div className="skill-detail" style={{ maxHeight: open ? '200px' : '0px' }}>
          <div className="skill-detail-inner">
            <span className="skill-detail-label mono">✦ SKILLS</span>
            <div className="skill-tags">
              {e.items.map((it) => <span key={it} className="chip">{it}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Expertise() {
  const ref = useRef();
  const { isOpen, onEnter, onLeave, onClick } = useOpenSet([]);
  useReveal(ref, []);

  const totalCategories = expertise.length;

  return (
    <section id="expertise" ref={ref} className="section-shell expertise-section">
      <div className="section-head">
        <span className="section-num mono">03</span>
        <h2 className="section-title reveal">Skills</h2>
        <div className="section-line" />
      </div>
      <p className="section-sub reveal">The stack behind the agents — hover or tap a category to explore.</p>

      <div className="exp-wrap">
        <div className="exp-badge">{totalCategories}+</div>
        <div className="exp-rail" />

        <div className="exp-list">
          {expertise.map((e, i) => (
            <div key={e.key} className={`reveal d${(i % 5) + 1}`}>
              <SkillCard
                e={e}
                index={i}
                label={LABELS[e.key]}
                open={isOpen(i)}
                onEnter={onEnter}
                onLeave={onLeave}
                onClick={onClick}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .exp-wrap{ position:relative; max-width:900px; margin:0 auto; width:100%; }
        .exp-badge{
          position:absolute; left:-56px; top:8px; width:64px; height:64px; border-radius:50%;
          background:var(--glass-bg); backdrop-filter:blur(12px); border:1px solid var(--glass-border);
          display:flex; align-items:center; justify-content:center;
          font-family:var(--font-mono); font-size:15px; font-weight:600; color:var(--heading);
          box-shadow:0 8px 24px rgba(0,0,0,0.3); z-index:2;
        }
        .exp-rail{ position:absolute; left:-25px; top:40px; bottom:40px; width:1px; background:var(--line); }
        .exp-list{ display:flex; flex-direction:column; gap:18px; }

        .skill-item{ position:relative; padding-left:40px; }
        .skill-connector{
          position:absolute; left:-25px; top:0; bottom:50%; width:41px;
          border-left:2px solid var(--line); border-bottom:2px solid var(--line);
          border-radius:0 0 0 24px;
        }

        .skill-card{ position:relative; overflow:hidden; border-radius:22px; cursor:pointer; }
        .skill-card:hover, .skill-card.open{ transform:translateY(-2px); }
        .skill-glow{
          position:absolute; inset:0; pointer-events:none; opacity:0; transition:opacity .5s ease; z-index:0;
          background:radial-gradient(400px circle at var(--mouse-x,50%) var(--mouse-y,50%), var(--accent-soft), transparent 45%);
        }
        .skill-card:hover .skill-glow{ opacity:1; }

        .skill-row{ position:relative; z-index:2; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:22px 24px; }
        .skill-row-left{ display:flex; align-items:center; gap:20px; flex:1; min-width:0; }
        .skill-index{ font-size:30px; font-weight:400; color:rgba(255,255,255,0.08); transition:color .5s ease; flex-shrink:0; }
        .skill-card:hover .skill-index, .skill-card.open .skill-index{ color:var(--accent-soft); }
        .skill-text{ min-width:0; }
        .skill-tag{ font-size:9px; letter-spacing:1.5px; color:var(--accent); display:flex; align-items:center; gap:6px; margin-bottom:6px; }
        .skill-tag-dot{ width:5px; height:5px; border-radius:50%; background:var(--accent); }
        .skill-title{ font-family:var(--font-display); font-size:19px; font-weight:600; color:var(--heading); text-transform:uppercase; letter-spacing:-0.2px; }
        .skill-count{ font-size:11px; color:var(--text-dim); margin-top:4px; }

        .skill-toggle{
          width:48px; height:48px; border-radius:50%; flex-shrink:0;
          background:transparent; border:1px solid var(--glass-border); color:var(--heading);
          display:flex; align-items:center; justify-content:center;
          transition:background-color .5s ease, color .5s ease;
        }
        .skill-toggle svg{ width:18px; height:18px; }
        .skill-toggle-v{ transition:transform .35s cubic-bezier(.16,.8,.24,1), opacity .35s ease; transform-origin:center; }
        .skill-card:hover .skill-toggle, .skill-card.open .skill-toggle{ background:var(--accent); color:var(--on-accent); }
        .skill-toggle.open .skill-toggle-v{ transform:scaleY(0); opacity:0; }

        .skill-detail{ position:relative; z-index:2; overflow:hidden; transition:max-height .45s cubic-bezier(.16,.8,.24,1); }
        .skill-detail-inner{ padding:0 24px 24px 68px; }
        .skill-detail-label{ font-size:10px; letter-spacing:1.5px; color:var(--accent); display:block; margin-bottom:12px; }
        .skill-tags{ display:flex; flex-wrap:wrap; gap:8px; }

        @media (max-width:640px){
          .exp-badge, .exp-rail{ display:none; }
          .skill-item{ padding-left:0; }
          .skill-connector{ display:none; }
          .skill-row{ padding:18px 16px; gap:10px; }
          .skill-row-left{ gap:12px; }
          .skill-index{ font-size:22px; }
          .skill-title{ font-size:15px; }
          .skill-toggle{ width:38px; height:38px; }
          .skill-detail-inner{ padding:0 16px 18px 16px; }
        }
      `}</style>
    </section>
  );
}
