export default function LiquidResumeButton({ label = 'Download Resume', sublabel = 'Get PDF', onClick, href, download }) {
  const Tag = href ? 'a' : 'button';

  return (
    <div className="lrb-wrap">
      <Tag href={href} download={download} onClick={onClick} className="lrb-btn">
        <span className="lrb-waves" aria-hidden="true">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L0,320Z" />
          </svg>
        </span>
        <span className="lrb-text-stack">
          <span className="lrb-line lrb-line-main">{label} ↓</span>
          <span className="lrb-line lrb-line-sub">{sublabel}</span>
        </span>
      </Tag>

      <style>{`
        .lrb-wrap{ display:inline-block; }
        .lrb-btn{
          -webkit-box-reflect: below 2px linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.25));
          position:relative; display:inline-flex; align-items:center; justify-content:center;
          padding:16px 30px; border-radius:100px; border:1px solid var(--glass-border);
          background:var(--glass-bg); backdrop-filter:blur(12px);
          overflow:hidden; cursor:pointer; text-decoration:none;
          transition:transform .35s cubic-bezier(.16,.8,.24,1), box-shadow .35s ease, border-color .35s ease, filter .35s ease;
        }
        .lrb-btn:hover{
          transform:translateY(-3px) scale(1.02);
          box-shadow:0 16px 40px rgba(229,209,178,0.2);
          border-color:var(--accent);
          filter:saturate(1.15);
        }
        .lrb-btn:active{ filter:saturate(1.35); transform:translateY(-1px) scale(0.99); }

        .lrb-waves{
          position:absolute; inset:0; opacity:0.16; color:var(--accent);
          transform:scaleX(1.2) translateY(35%);
          transition:transform .5s ease, opacity .5s ease;
          animation:lrbPulse 4s ease-in-out infinite;
        }
        .lrb-btn:hover .lrb-waves{ opacity:0.3; transform:scaleX(1.25) translateY(28%); animation-play-state:paused; }
        .lrb-waves svg{ width:100%; height:100%; fill:currentColor; }
        @keyframes lrbPulse{ 0%,100%{ transform:scaleX(1.2) translateY(35%);} 50%{ transform:scaleX(1.2) translateY(30%);} }

        .lrb-text-stack{
          position:relative; z-index:1; overflow:hidden; height:1.3em; display:flex; align-items:center;
        }
        .lrb-line{
          font-family:var(--font-mono); font-size:13px; letter-spacing:1px; text-transform:uppercase;
          color:var(--heading); white-space:nowrap; transition:transform .35s cubic-bezier(.16,.8,.24,1), opacity .35s ease;
        }
        .lrb-line-main{ transform:translateY(0); }
        .lrb-line-sub{
          position:absolute; top:0; left:0; transform:translateY(100%); opacity:0; color:var(--accent); font-weight:600;
        }
        .lrb-btn:hover .lrb-line-main{ transform:translateY(-100%); opacity:0; }
        .lrb-btn:hover .lrb-line-sub{ transform:translateY(0); opacity:1; }
      `}</style>
    </div>
  );
}
