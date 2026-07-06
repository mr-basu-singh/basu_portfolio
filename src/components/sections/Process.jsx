import { useRef } from 'react';
import useReveal from '../../hooks/useReveal';
import useOpenSet from '../../hooks/useOpenSet';
import { process } from '../../data/content';

const ICONS = [
  <path key="1" d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0-2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm7.7 16.3-3.1-3.1 1.4-1.4 3.1 3.1-1.4 1.4Z"/>,
  <path key="2" fill="none" stroke="currentColor" strokeWidth="1.6" d="M12 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM5 15a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm14 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-6-8v3M12 10 5 15m7-5 7 5"/>,
  <path key="3" d="M4 4h16v3H4V4Zm0 6.5h9v3H4v-3ZM4 17h6v3H4v-3Z"/>,
  <path key="4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" d="m18.5 3.5-3 3 2 2 3-3-2-2ZM4 20l6-6M14.5 6.5 6 15l-1 3 3-1 8.5-8.5-2-2Z"/>,
  <path key="5" d="M10.6 13.4a1 1 0 0 1 0-1.4l3-3a1 1 0 1 1 1.4 1.4l-3 3a1 1 0 0 1-1.4 0Zm-3.1 3.1a3.5 3.5 0 0 1 0-4.95l2.1-2.1a1 1 0 1 1 1.4 1.4l-2.1 2.1a1.5 1.5 0 0 0 2.12 2.12l2.1-2.1a1 1 0 1 1 1.4 1.4l-2.1 2.1a3.5 3.5 0 0 1-4.92.03Z"/>,
  <path key="6" d="M12 2 4 5v6c0 5 3.4 9 8 11 4.6-2 8-6 8-11V5l-8-3Zm-1 13-3-3 1.4-1.4L11 12.2l3.6-3.6L16 10l-5 5Z"/>,
  <path key="7" d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>,
];

export default function Process() {
  const ref = useRef();
  const { isOpen, onEnter, onLeave, onClick } = useOpenSet([]);
  useReveal(ref, []);

  return (
    <section id="process" ref={ref} className="section-shell process-section">
      <div className="section-head">
        <span className="section-num mono">06</span>
        <h2 className="section-title reveal">How I Build Before I Deploy</h2>
        <div className="section-line" />
      </div>
      <p className="section-sub reveal">My real process, end to end — hover or tap a step to see what actually happens.</p>

      <div className="process-track">
        <div className="process-track-line" />
        {process.map((p, i) => {
          const open = isOpen(p.step);
          return (
            <div key={p.step} className={`process-stop reveal d${(i % 5) + 1} ${i % 2 === 0 ? 'up' : 'down'}`}>
              <div
                className={`process-card liquid-card ${open ? 'open' : ''}`}
                onMouseEnter={() => onEnter(p.step)}
                onMouseLeave={() => onLeave(p.step)}
                onClick={() => onClick(p.step)}
                role="button"
                tabIndex={0}
              >
                <div className="process-card-head">
                  <span className="process-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">{ICONS[i]}</svg>
                  </span>
                  <div>
                    <span className="process-step mono">STEP {p.step}</span>
                    <h3>{p.title}</h3>
                  </div>
                </div>
                <div className="process-detail" style={{ maxHeight: open ? '480px' : '0px' }}>
                  <p>{p.text}</p>
                </div>
              </div>
              <span className="process-node-dot" />
            </div>
          );
        })}
      </div>

      <style>{`
        .process-track{
          position:relative; display:flex; align-items:center; justify-content:space-between;
          max-width:1200px; margin:0 auto; width:100%; padding:100px 4px;
        }
        .process-track-line{ position:absolute; left:0; right:0; top:50%; height:1.5px; background:var(--line); }
        .process-stop{ position:relative; display:flex; flex-direction:column; align-items:center; z-index:2; width:15%; min-width:150px; }
        .process-stop.up{ margin-bottom:70px; }
        .process-stop.down{ margin-top:70px; flex-direction:column-reverse; }
        .process-stop:has(.process-card.open){ z-index:20; }

        .process-card{
          width:100%; border-radius:20px; padding:16px; cursor:pointer;
          display:flex; flex-direction:column; justify-content:flex-start;
          height:180px; overflow:hidden;
          transition:width .4s cubic-bezier(.16,.8,.24,1), height .4s cubic-bezier(.16,.8,.24,1), transform .4s ease, box-shadow .35s ease;
        }
        .process-card.open{
          transform:translateY(-3px);
          width:min(240px, 78vw);
          height:min(560px, 70vh);
        }
        .process-card-head{ display:flex; align-items:center; gap:10px; }
        .process-icon{
          width:34px; height:34px; flex-shrink:0; border-radius:10px;
          background:var(--accent-soft); color:var(--accent);
          display:flex; align-items:center; justify-content:center;
        }
        .process-icon svg{ width:16px; height:16px; }
        .process-step{ font-size:9px; color:var(--accent); letter-spacing:1.2px; }
        .process-card-head h3{
          font-family:var(--font-display); font-size:13px; font-weight:600; margin-top:2px;
          color:var(--heading); line-height:1.25;
          display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
        }
        .process-card.open .process-card-head h3{ -webkit-line-clamp:unset; overflow:visible; }
        .process-detail{ overflow:hidden; transition:max-height .4s cubic-bezier(.16,.8,.24,1); }
        .process-detail p{
          font-size:12px; line-height:1.6; color:var(--text); padding-top:12px; margin-top:10px;
          border-top:1px solid var(--line); word-wrap:break-word;
        }

        .process-node-dot{
          width:9px; height:9px; border-radius:50%; background:var(--accent); flex-shrink:0;
          box-shadow:0 0 0 4px var(--accent-soft);
        }
        .process-stop.up .process-node-dot{ margin-top:26px; }
        .process-stop.down .process-node-dot{ margin-bottom:26px; }

        @media (max-width:900px){
          .process-track{ flex-direction:column; align-items:stretch; gap:20px; padding:20px 0; }
          .process-track-line{ display:none; }
          .process-stop, .process-stop.down{ flex-direction:row; align-items:center; width:100%; margin:0 !important; gap:14px; }
          .process-node-dot{ display:none; }
          .process-card{ width:100%; height:auto; min-height:110px; }
          .process-card.open{ width:100%; height:auto; }
          .process-card-head h3{ -webkit-line-clamp:3; }
        }
      `}</style>
    </section>
  );
}
