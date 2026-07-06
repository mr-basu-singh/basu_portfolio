import { useRef } from 'react';
import useReveal from '../../hooks/useReveal';
import { certifications } from '../../data/content';

export default function Certifications() {
  const ref = useRef();
  useReveal(ref, []);

  return (
    <section id="certifications" ref={ref} className="section-shell tight cert-section">
      <div className="section-head">
        <span className="section-num mono">08</span>
        <h2 className="section-title reveal">Certifications &amp; Training</h2>
        <div className="section-line" />
      </div>
      <p className="section-sub reveal">Formal training behind the hands-on work.</p>

      <div className="cert-shelf">
        {certifications.map((c, i) => (
          <div key={c.title} className={`cert-plaque liquid-card reveal d${i + 1}`}>
            <div className="cert-seal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="cert-body">
              <h3 className="display">{c.title}</h3>
              <p className="cert-meta mono">{c.issuer} · {c.date}</p>
              <p className="cert-desc">{c.desc}</p>
              <div className="cert-row">
                <span className="cert-row-label mono">Skills covered</span>
                <div className="cert-chips">{c.skills.map((s) => <span key={s} className="chip">{s}</span>)}</div>
              </div>
              {c.tools.length > 0 && (
                <div className="cert-row">
                  <span className="cert-row-label mono">Tools used</span>
                  <div className="cert-chips">{c.tools.map((s) => <span key={s} className="chip">{s}</span>)}</div>
                </div>
              )}
              {c.link && (
                <a href={c.link} target="_blank" rel="noopener noreferrer" className="btn ghost cert-btn">
                  View Certificate ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .cert-shelf{ display:flex; flex-direction:column; gap:20px; }
        .cert-plaque{ display:grid; grid-template-columns:auto 1fr; gap:28px; padding:32px; border-radius:18px; }
        .cert-seal{
          width:56px; height:56px; border-radius:50%; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:var(--accent-soft); color:var(--accent-2);
        }
        .cert-seal svg{ width:28px; height:28px; }
        .cert-body h3{ font-size:20px; font-weight:600; }
        .cert-meta{ font-size:11px; color:var(--accent-2); margin-top:6px; }
        .cert-desc{ font-size:14px; color:var(--text-dim); line-height:1.7; margin-top:14px; max-width:640px; }
        .cert-row{ margin-top:16px; }
        .cert-row-label{ font-size:10px; letter-spacing:1.5px; color:var(--text-dim); display:block; margin-bottom:8px; }
        .cert-chips{ display:flex; flex-wrap:wrap; gap:8px; }
        .cert-btn{ margin-top:22px; padding:12px 22px; font-size:11px; }

        @media (max-width:640px){
          .cert-plaque{ grid-template-columns:1fr; text-align:left; }
        }
      `}</style>
    </section>
  );
}
