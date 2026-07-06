import { useEffect, useRef } from 'react';

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function GalaxyButton({ children, onClick, href, className = '' }) {
  const starsRef = useRef([]);

  useEffect(() => {
    starsRef.current.forEach((el) => {
      if (!el) return;
      el.style.setProperty('--angle', rand(0, 360));
      el.style.setProperty('--duration', rand(6, 20));
      el.style.setProperty('--delay', rand(1, 10));
      el.style.setProperty('--alpha', rand(40, 90) / 100);
      el.style.setProperty('--size', rand(2, 6));
      el.style.setProperty('--distance', rand(40, 200));
    });
  }, []);

  const Tag = href ? 'a' : 'button';

  return (
    <div className="galaxy-btn-wrap">
      <Tag href={href} onClick={onClick} className={`galaxy-btn ${className}`}>
        <span className="galaxy-spark" />
        <span className="galaxy-backdrop" />
        <span className="galaxy-static">
          {[0, 1, 2, 3].map((i) => (
            <span key={`s-${i}`} className="galaxy-star galaxy-star--static" ref={(el) => (starsRef.current[i] = el)} />
          ))}
        </span>
        <span className="galaxy-orbit">
          <span className="galaxy-ring">
            {Array.from({ length: 16 }).map((_, i) => (
              <span key={`o-${i}`} className="galaxy-star" ref={(el) => (starsRef.current[i + 4] = el)} />
            ))}
          </span>
        </span>
        <span className="galaxy-text">{children}</span>
      </Tag>

      <style>{`
        @property --gb-active{
          syntax: '<number>';
          inherits: true;
          initial-value: 0;
        }
        .galaxy-btn-wrap{ --gb-transition:0.25s; position:relative; display:inline-block; overflow:hidden; border-radius:100px; max-width:100%; }
        .galaxy-btn{
          --cut:0.1em; --gb-active:0;
          font-family:var(--font-mono); font-size:13px; letter-spacing:1px; text-transform:uppercase;
          font-weight:600; border:0; cursor:pointer; padding:16px 30px;
          display:inline-flex; align-items:center; gap:10px; white-space:nowrap;
          border-radius:100px; position:relative; overflow:hidden;
          color:var(--on-accent); text-decoration:none;
          background:
            radial-gradient(120% 120% at 126% 126%, color-mix(in srgb, var(--accent) calc(var(--gb-active) * 90%), transparent) 40%, transparent 50%) calc(100px - (var(--gb-active) * 100px)) 0 / 100% 100% no-repeat,
            radial-gradient(120% 120% at 120% 120%, var(--accent-2) 30%, transparent 70%) calc(100px - (var(--gb-active) * 100px)) 0 / 100% 100% no-repeat,
            linear-gradient(100deg, var(--accent), var(--accent-2));
          box-shadow:
            0 0 calc(var(--gb-active) * 3em) calc(var(--gb-active) * 1.4em) color-mix(in srgb, var(--accent) 55%, transparent),
            0 0.05em 0 0 rgba(255,255,255,0.35) inset,
            0 -0.05em 0 0 rgba(0,0,0,0.15) inset;
          transition:box-shadow var(--gb-transition), scale var(--gb-transition), --gb-active var(--gb-transition);
          scale:calc(1 + (var(--gb-active) * 0.06));
          transform-style:preserve-3d;
        }
        .galaxy-btn:active{ scale:0.98; }
        .galaxy-btn:is(:hover, :focus-visible){ --gb-active:1; }

        .galaxy-star{
          height:calc(var(--size,3) * 1px); aspect-ratio:1; background:#fff; border-radius:50%;
          position:absolute; opacity:var(--alpha,0.6); top:50%; left:50%;
          transform:translate(-50%,-50%) rotate(10deg) translateY(calc(var(--distance,60) * 1px));
          animation:galaxyOrbit calc(var(--duration,10) * 1s) calc(var(--delay,1) * -1s) infinite linear;
        }
        @keyframes galaxyOrbit{ to{ transform:translate(-50%,-50%) rotate(370deg) translateY(calc(var(--distance,60) * 1px)); } }

        .galaxy-orbit{
          position:absolute; width:100%; aspect-ratio:1; top:50%; left:50%; translate:-50% -50%;
          overflow:hidden; opacity:var(--gb-active); transition:opacity var(--gb-transition);
        }
        .galaxy-ring{
          height:200%; width:200%; position:absolute; top:50%; left:50%; border-radius:50%;
          transform:translate(-28%,-40%) rotateX(-24deg) rotateY(-30deg) rotateX(90deg);
          transform-style:preserve-3d;
        }
        .galaxy-static{
          position:absolute; inset:0; opacity:var(--gb-active); transition:opacity var(--gb-transition);
          mask:radial-gradient(#fff, transparent);
        }
        .galaxy-star--static{
          animation:galaxyMoveX calc(var(--duration,10) * 0.1s) calc(var(--delay,1) * -0.1s) infinite linear,
                    galaxyMoveY calc(var(--duration,10) * 0.2s) calc(var(--delay,1) * -0.2s) infinite linear;
          max-height:4px; filter:brightness(3); opacity:0.9;
        }
        .galaxy-btn:hover .galaxy-star--static{ animation-play-state:paused; }
        @keyframes galaxyMoveX{ 0%{ translate:-60px 0; } 100%{ translate:60px 0; } }
        @keyframes galaxyMoveY{ 0%{ transform:translate(0,-30px); } 100%{ transform:translate(0,30px); } }

        .galaxy-spark{
          position:absolute; inset:0; border-radius:100px; overflow:hidden;
          mask:linear-gradient(#fff, transparent 50%);
          animation:galaxyFlip 3.6s infinite steps(2, end);
        }
        @keyframes galaxyFlip{ to{ rotate:360deg; } }
        .galaxy-spark::before{
          content:''; position:absolute; width:200%; aspect-ratio:1; top:0; left:50%; z-index:-1;
          translate:-50% -15%; transform:rotate(-90deg); opacity:calc(var(--gb-active) + 0.35);
          background:conic-gradient(from 0deg, transparent 0 340deg, #fff 360deg);
          transition:opacity var(--gb-transition); animation:galaxyRotate 1.8s linear infinite both;
        }
        @keyframes galaxyRotate{ to{ transform:rotate(90deg); } }
        .galaxy-backdrop{
          position:absolute; inset:var(--cut); border-radius:100px;
          background:linear-gradient(100deg, var(--accent), var(--accent-2));
        }
        .galaxy-text{ position:relative; z-index:1; }
      `}</style>
    </div>
  );
}
