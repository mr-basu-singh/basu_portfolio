import { useEffect, useRef, useState } from 'react';
import { heroContent, profile } from '../../data/content';
import GalaxyButton from '../buttons/GalaxyButton';
import LiquidResumeButton from '../buttons/LiquidResumeButton';

export default function Hero() {
  const [phase, setPhase] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const t = setTimeout(() => setPhase(1), 3400);
    return () => clearTimeout(t);
  }, []);

  const download = (e) => {
    e.preventDefault();
    const a = document.createElement('a');
    a.href = profile.resumeFile;
    a.download = profile.resumeDownloadName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <section id="hero" ref={ref} className="hero section-shell">
      <div className={`hero-inner ${phase >= 1 ? 'show' : ''}`}>
        <div className="eyebrow">{heroContent.kaiIntro}</div>

        <h1 className="hero-title display">
          {heroContent.headlinePre}
          <span className="hero-highlight">{heroContent.headlineHighlight}</span>
          {heroContent.headlinePost}
        </h1>

        <p className="hero-sub">{heroContent.sub}</p>

        <div className="hero-ctas">
          <GalaxyButton
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            {heroContent.ctaPrimary} →
          </GalaxyButton>
          <LiquidResumeButton
            label={heroContent.ctaSecondary}
            sublabel="Get PDF"
            href={profile.resumeFile}
            download={profile.resumeDownloadName}
            onClick={download}
          />
        </div>
      </div>

      <div className={`hero-cue ${phase >= 1 ? 'show' : ''}`}>
        <span className="hero-cue-bar" />
        <span className="mono">{heroContent.scrollCue}</span>
      </div>

      <style>{`
        .hero{ align-items:center; padding-top:var(--header-h); text-align:center; }
        .hero-inner{
          max-width:900px;
          margin:0 auto;
          display:flex; flex-direction:column; align-items:center;
          opacity:0; transform:translateY(24px);
          transition:opacity 1s cubic-bezier(.16,.8,.24,1), transform 1s cubic-bezier(.16,.8,.24,1);
        }
        .hero-inner.show{opacity:1; transform:translateY(0);}
        .hero-title{
          margin-top:26px;
          font-size:clamp(32px, 5vw, 58px);
          line-height:1.18;
          font-weight:600;
          letter-spacing:-0.5px;
          color:var(--heading);
          max-width:820px;
        }
        .hero-highlight{ color:var(--accent); }
        .hero-sub{
          margin-top:24px; max-width:560px; color:var(--text-dim);
          font-size:17px; line-height:1.75;
        }
        .hero-ctas{display:flex; gap:16px; margin-top:40px; flex-wrap:wrap; justify-content:center; align-items:center;}
        .hero-cue{
          position:absolute; left:50%; bottom:44px; transform:translateX(-50%);
          display:flex; flex-direction:column; align-items:center; gap:12px;
          font-size:11px; letter-spacing:2px; text-transform:uppercase; color:var(--text-dim);
          opacity:0; transition:opacity 1s ease 0.3s;
        }
        .hero-cue.show{opacity:1;}
        .hero-cue-bar{width:1px; height:34px; background:linear-gradient(var(--accent), transparent); animation:cuepulse 1.8s infinite;}
        @keyframes cuepulse{0%{opacity:.2;}50%{opacity:1;}100%{opacity:.2;}}

        @media (max-width:820px){
          .hero-cue{bottom:28px;}
        }
      `}</style>
    </section>
  );
}
