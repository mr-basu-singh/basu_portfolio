import { useEffect, useRef } from 'react';
import { education } from '../../data/content';

const ICONS = {
  cap: <path d="m12 2 11 6-11 6L1 8l11-6Zm0 8.5 7.5-4.1V13c0 .5 0 3-7.5 6.5C4.5 16 4.5 13.5 4.5 13V6.4L12 10.5Z" />,
  book: <path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H12v18H5.5A1.5 1.5 0 0 1 4 19.5v-15ZM12 3h6.5A1.5 1.5 0 0 1 20 4.5v15a1.5 1.5 0 0 1-1.5 1.5H12V3Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  school: <path d="M12 3 2 8l10 5 8-4v6h2V8L12 3Zm-6 9.2V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-3.8l-6 3-6-3Z" />,
};

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function Education() {
  const ref = useRef();
  const trackRef = useRef();
  const lineRef = useRef();
  const cardRefs = useRef([]);

  useEffect(() => {
    const onScroll = () => {
      if (!trackRef.current) return;
      const vh = window.innerHeight;
      const trigger = vh * 0.8;

      const trackRect = trackRef.current.getBoundingClientRect();
      const trackProgress = clamp((trigger - trackRect.top) / trackRect.height, 0, 1);
      if (lineRef.current) {
        lineRef.current.style.transform = `scaleY(${trackProgress})`;
      }

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const elCenter = r.top + r.height / 2;
        const raw = (trigger - elCenter) / (vh * 0.35) + 0.5;
        const p = clamp(raw, 0, 1);
        const dir = i % 2 === 0 ? 1 : -1;
        const translate = (1 - p) * 50 * dir;
        el.style.transform = `translateX(${translate}px)`;
        el.style.opacity = String(p);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="education" ref={ref} className="section-shell tight edu-section">
      <div className="section-head">
        <span className="section-num mono">09</span>
        <h2 className="section-title reveal in">Education</h2>
        <div className="section-line" />
      </div>
      <p className="section-sub reveal in">The academic path behind the self-taught AI work.</p>

      <div className="edu-track" ref={trackRef}>
        <div className="edu-line-bg" />
        <div className="edu-line-fill" ref={lineRef} />

        {education.map((e, i) => {
          const icon = i === 0 ? 'cap' : i === 1 ? 'book' : 'school';
          const side = i % 2 === 0 ? 'left' : 'right';
          return (
            <div
              key={e.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`edu-waypoint ${side} ${e.emphasize ? 'emphasize' : ''}`}
              style={{ opacity: 0 }}
            >
              <span className="edu-dot" />
              <div className="edu-info liquid-card">
                <div className="edu-info-head">
                  <span className="edu-year mono">{e.year}</span>
                  <span className="edu-icon"><svg viewBox="0 0 24 24" fill="currentColor">{ICONS[icon]}</svg></span>
                </div>
                <h3>{e.title}</h3>
                <p>{e.institution}</p>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .edu-track{ position:relative; max-width:900px; margin:0 auto; width:100%; padding:20px 0; }
        .edu-line-bg{ position:absolute; left:50%; top:0; bottom:0; width:1.5px; background:var(--line); transform:translateX(-50%); }
        .edu-line-fill{
          position:absolute; left:50%; top:0; bottom:0; width:1.5px; background:linear-gradient(var(--accent-2), var(--accent));
          transform-origin:top center; transform:translateX(-50%) scaleY(0);
        }
        .edu-waypoint{ position:relative; width:46%; margin-bottom:56px; will-change:transform, opacity; }
        .edu-waypoint.left{ margin-right:auto; text-align:right; }
        .edu-waypoint.right{ margin-left:auto; }
        .edu-dot{
          position:absolute; top:24px; width:11px; height:11px; border-radius:50%;
          background:var(--bg); border:2px solid var(--text-dim); z-index:2;
        }
        .edu-waypoint.left .edu-dot{ right:-30px; }
        .edu-waypoint.right .edu-dot{ left:-30px; }
        .edu-waypoint.emphasize .edu-dot{ border-color:var(--accent); box-shadow:0 0 0 4px var(--accent-soft); }

        /* All three cards share identical fixed dimensions and typography — no card
           is visually bigger or smaller than another, only the timeline dot marks emphasis. */
        .edu-info{
          padding:20px 22px; border-radius:16px;
          min-height:132px; display:flex; flex-direction:column; justify-content:center;
        }
        .edu-info-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; }
        .edu-waypoint.left .edu-info-head{ flex-direction:row-reverse; }
        .edu-year{ font-size:12px; color:var(--text-dim); }
        .edu-icon{
          width:32px; height:32px; border-radius:9px; background:var(--accent-soft); color:var(--accent);
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .edu-icon svg{ width:16px; height:16px; }
        .edu-info h3{ font-family:var(--font-display); font-size:18px; font-weight:600; color:var(--heading); line-height:1.3; }
        .edu-info p{ font-size:13px; color:var(--text-dim); margin-top:6px; }

        @media (max-width:820px){
          .edu-line-bg, .edu-line-fill{ left:16px; transform-origin:top center; }
          .edu-line-bg{ transform:none; }
          .edu-line-fill{ transform:scaleY(0); }
          .edu-waypoint, .edu-waypoint.left, .edu-waypoint.right{ width:100%; margin-left:40px !important; margin-right:0 !important; text-align:left; }
          .edu-waypoint.left .edu-dot, .edu-waypoint.right .edu-dot{ left:-30px; right:auto; }
          .edu-waypoint.left .edu-info-head{ flex-direction:row; }
          .edu-info{ min-height:0; padding:16px 18px; }
          .edu-info h3{ font-size:16px; }
        }
      `}</style>
    </section>
  );
}
