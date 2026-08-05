import { useRef } from 'react';
import useReveal from '../../hooks/useReveal';
import { freelanceWork } from '../../data/content';

export default function FreelanceWork() {
  const ref = useRef();
  useReveal(ref, []);

  return (
    <section id="freelance" ref={ref} className="section-shell tight freelance-section">
      <div className="section-head">
        <span className="section-num mono">04</span>
        <h2 className="section-title reveal">Freelance Work (AI-Directed Delivery)</h2>
        <div className="section-line" />
      </div>
      <p className="section-sub reveal">Client work delivered by directing AI coding agents end to end.</p>

      <div className="freelance-shelf">
        {freelanceWork.map((f) => (
          <div key={f.title} className="freelance-plaque liquid-card reveal">
            <div className="freelance-media">
              <img src={f.image} alt={f.title} loading="lazy" decoding="async" />
            </div>
            <div className="freelance-body">
              <h3 className="display">{f.title}</h3>
              <p className="freelance-meta mono">{f.tools.join(' · ')} · {f.date}</p>
              <p className="freelance-desc">{f.desc}</p>
              <ul className="freelance-highlights">
                {f.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
              {f.link && (
                <a href={f.link} target="_blank" rel="noopener noreferrer" className="btn ghost freelance-btn">
                  Visit Site ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .freelance-shelf{ display:flex; flex-direction:column; gap:20px; }
        .freelance-plaque{ display:grid; grid-template-columns:280px 1fr; gap:28px; padding:28px; border-radius:18px; align-items:stretch; }
        .freelance-media{
          border-radius:14px; overflow:hidden; background:var(--surface-2);
          min-height:180px; display:flex; align-items:center; justify-content:center;
        }
        .freelance-media img{ width:100%; height:100%; object-fit:cover; display:block; }
        .freelance-body h3{ font-size:20px; font-weight:600; }
        .freelance-meta{ font-size:11px; color:var(--accent-2); margin-top:6px; }
        .freelance-desc{ font-size:14px; color:var(--text-dim); line-height:1.7; margin-top:14px; max-width:640px; }
        .freelance-highlights{ margin-top:14px; padding-left:18px; display:flex; flex-direction:column; gap:6px; }
        .freelance-highlights li{ font-size:13.5px; color:var(--text-dim); line-height:1.6; }
        .freelance-btn{ margin-top:20px; padding:12px 22px; font-size:11px; display:inline-block; }

        @media (max-width:900px){
          .freelance-plaque{ grid-template-columns:1fr; text-align:left; }
          .freelance-media{ min-height:220px; }
        }

        @media (max-width:640px){
          .freelance-plaque{ padding:20px; gap:18px; }
          .freelance-media{ min-height:180px; }
          .freelance-body h3{ font-size:17px; }
          .freelance-meta{ font-size:10px; line-height:1.6; }
          .freelance-desc{ font-size:13px; margin-top:12px; }
          .freelance-highlights{ padding-left:16px; }
          .freelance-highlights li{ font-size:12.5px; }
          .freelance-btn{ width:100%; text-align:center; }
        }
      `}</style>
    </section>
  );
}
