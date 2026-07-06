import { useRef } from 'react';
import useReveal from '../../hooks/useReveal';
import { whyBuilt } from '../../data/content';

export default function WhyBuilt() {
  const ref = useRef();
  useReveal(ref, []);

  return (
    <section id="why-built" ref={ref} className="section-shell why-section">
      <div className="section-head">
        <span className="section-num mono">05</span>
        <h2 className="section-title reveal">Why I Built These Projects</h2>
        <div className="section-line" />
      </div>
      <p className="section-sub reveal">The problems I solve and the impact I create.</p>

      <div className="why-grid">
        {whyBuilt.map((w, i) => (
          <div key={w.id} className={`why-card liquid-card reveal d${(i % 5) + 1}`}>
            <h3 className="why-title">{w.title}</h3>
            <div className="why-row">
              <span className="why-tag problem mono">PROBLEM</span>
              <p>{w.problem}</p>
            </div>
            <div className="why-row">
              <span className="why-tag solution mono">SOLUTION</span>
              <p>{w.solution}</p>
            </div>
            <div className="why-row">
              <span className="why-tag impact mono">IMPACT</span>
              <p>{w.impact}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .why-grid{ display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px; }
        .why-card{ padding:26px; border-radius:16px; transition:transform .3s ease, box-shadow .3s ease; }
        .why-card:hover{ transform:translateY(-4px); box-shadow:0 14px 34px rgba(21,23,30,0.08); }
        .why-title{ font-family:var(--font-display); font-size:17px; font-weight:600; color:var(--text); margin-bottom:16px; }
        .why-row{ margin-bottom:12px; }
        .why-row:last-child{ margin-bottom:0; }
        .why-row p{ font-size:13px; color:var(--text-dim); line-height:1.55; margin-top:4px; }
        .why-tag{ font-size:9.5px; letter-spacing:1.4px; }
        .why-tag.problem{ color:#c25a5a; }
        .why-tag.solution{ color:var(--accent); }
        .why-tag.impact{ color:#3f9e6d; }
      `}</style>
    </section>
  );
}
