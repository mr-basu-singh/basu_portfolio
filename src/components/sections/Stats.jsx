import { useRef } from 'react';
import useReveal from '../../hooks/useReveal';
import { stats } from '../../data/content';

const ICONS = {
  shield: <path d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Zm0 2.2 6 2.25v4.55c0 3.9-2.6 7.1-6 8.75-3.4-1.65-6-4.85-6-8.75V6.45l6-2.25Zm-1 9.6-2.3-2.3-1.4 1.4L11 17l6-6-1.4-1.4L11 13.8Z"/>,
  box: <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.3 6.2 3.44L12 11.18 5.8 7.74 12 4.3ZM5 9.6l6 3.34v7.3L5 16.9V9.6Zm8 10.64v-7.3l6-3.34v7.3l-6 3.34Z"/>,
  github: <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.9-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"/>,
  network: <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM4 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm16 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM11 7.8v4.7l-5.6 3.2.99 1.74L12 14.2l5.6 3.24.99-1.74L13 12.5V7.8h-2Z"/>,
  wrench: <path d="M22.7 15.6 17.1 10a5 5 0 0 0-6.1-6.1L14 6.9l-.7 2.4-2.4.7-3-3a5 5 0 0 0 6.1 6.1l5.6 5.6a1.5 1.5 0 0 0 2.1 0l1-1a1.5 1.5 0 0 0 0-2.1Z"/>,
  link: <path d="M10.6 13.4a1 1 0 0 1 0-1.4l3-3a1 1 0 1 1 1.4 1.4l-3 3a1 1 0 0 1-1.4 0Zm-3.1 3.1a3.5 3.5 0 0 1 0-4.95l2.1-2.1a1 1 0 1 1 1.4 1.4l-2.1 2.1a1.5 1.5 0 0 0 2.12 2.12l2.1-2.1a1 1 0 1 1 1.4 1.4l-2.1 2.1a3.5 3.5 0 0 1-4.92.03Zm9.9-3.1 2.1-2.1a3.5 3.5 0 1 0-4.95-4.95l-2.1 2.1a1 1 0 1 0 1.4 1.4l2.1-2.1a1.5 1.5 0 0 1 2.12 2.12l-2.1 2.1a1 1 0 1 0 1.43 1.43Z"/>,
};

export default function Stats() {
  const ref = useRef();
  useReveal(ref, []);

  return (
    <section id="stats" ref={ref} className="section-shell tight stats-section">
      <div className="stats-bridge">
        <div className="bridge-line" />
        {stats.map((s, i) => (
          <div key={s.label} className={`stats-node ${i % 2 === 0 ? 'up' : 'down'} reveal d${(i % 5) + 1}`}>
            <div className="stats-card liquid-card">
              <div className="stats-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">{ICONS[s.icon]}</svg>
              </div>
              <div className="stats-value display">{s.value}</div>
              <div className="stats-label mono">{s.label}</div>
            </div>
            <span className="stats-dot" />
          </div>
        ))}
      </div>

      <style>{`
        .stats-section{ min-height:auto; padding-top:60px; padding-bottom:60px; }
        .stats-bridge{
          position:relative;
          display:grid;
          grid-template-columns:repeat(6, 1fr);
          column-gap:18px;
          padding:100px 0;
        }
        .bridge-line{
          position:absolute; left:0; right:0; top:50%; height:1px;
          background:linear-gradient(90deg, transparent, var(--text-dim) 8%, var(--text-dim) 92%, transparent);
        }
        .stats-node{
          position:relative;
          display:flex;
          flex-direction:column;
          align-items:center;
        }
        .stats-node.up .stats-card{ margin-bottom:56px; }
        .stats-node.down{ margin-top:56px; }
        .stats-node.down .stats-card{ margin-top:56px; order:2; }
        .stats-node.down{ flex-direction:column-reverse; }
        .stats-dot{
          position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
          width:9px; height:9px; border-radius:50%;
          background:var(--accent); box-shadow:0 0 14px 2px var(--accent-soft);
        }
        .stats-card{
          padding:22px 16px; border-radius:14px; text-align:center;
          min-width:0; min-height:148px; width:100%;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          transition:transform .4s cubic-bezier(.16,.8,.24,1), border-color .4s ease, box-shadow .4s ease;
        }
        .stats-card:hover{
          transform:translateY(-6px);
          border-color:var(--text-dim);
          box-shadow:0 16px 40px rgba(0,0,0,0.35);
        }
        .stats-icon{
          width:36px; height:36px; margin:0 auto 14px; flex-shrink:0;
          color:var(--accent);
        }
        .stats-icon svg{width:100%; height:100%;}
        .stats-value{ font-size:28px; font-weight:700; color:var(--heading); }
        .stats-label{ font-size:10.5px; color:var(--text-dim); margin-top:8px; letter-spacing:0.5px; line-height:1.4; min-height:29px; display:flex; align-items:center; }

        @media (max-width:900px){
          .stats-bridge{ grid-template-columns:repeat(2, 1fr); row-gap:34px; column-gap:14px; padding:40px 0; }
          .bridge-line{ display:none; }
          .stats-node, .stats-node.down{ flex-direction:column; margin:0!important; }
          .stats-node .stats-card{ margin:0!important; min-height:130px; }
          .stats-dot{ display:none; }
        }
      `}</style>
    </section>
  );
}
