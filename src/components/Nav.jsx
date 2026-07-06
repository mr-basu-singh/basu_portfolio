import { useEffect, useRef, useState } from 'react';
import { navLinks, profile } from '../data/content';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('#hero');
  const [hoveredHref, setHoveredHref] = useState(null);
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });
  const linksWrapRef = useRef();
  const linkRefs = useRef({});
  const lastScrollY = useRef(0);

  // Hide the bar while scrolling down (once past the very top), reveal it again
  // the moment the user scrolls up — a standard "auto-hiding nav" pattern.
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      if (y < 80) {
        setHidden(false);
      } else if (y > lastScrollY.current + 4) {
        setHidden(true);
      } else if (y < lastScrollY.current - 4) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Never stay hidden while the mobile menu is open.
  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

  // Track which nav-linked section is currently in view using IntersectionObserver
  // (event-driven, not dependent on catching every scroll tick) — a thin band near
  // the top third of the viewport defines "current section".
  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return;

    const intersecting = new Map(); // id -> boundingClientRect.top

    const pickActive = () => {
      if (intersecting.size === 0) return;
      // Among sections currently crossing the trigger band, the one closest
      // to the top of the viewport is the "current" one.
      let bestId = null;
      let bestTop = Infinity;
      intersecting.forEach((top, id) => {
        if (top < bestTop) {
          bestTop = top;
          bestId = id;
        }
      });
      if (bestId) setActive(`#${bestId}`);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersecting.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            intersecting.delete(entry.target.id);
          }
        });
        pickActive();
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Morph the pill to sit behind whichever item is hovered, falling back to active.
  useEffect(() => {
    const target = hoveredHref || active;
    const el = linkRefs.current[target];
    const wrap = linksWrapRef.current;
    if (!el || !wrap) return;
    const wrapRect = wrap.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPill({ left: elRect.left - wrapRect.left, width: elRect.width, ready: true });
  }, [hoveredHref, active]);

  useEffect(() => {
    const onResize = () => setHoveredHref((h) => h); // trigger recalc via effect above
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLink = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className={`nav-wrap ${hidden ? 'nav-hidden' : ''}`}>
        <header className={`nav liquid-glass ${scrolled ? 'scrolled' : ''}`}>
          <div className="liquid-glass-filter" />
          <div className="liquid-glass-overlay" />
          <div className="liquid-glass-specular" />

          <div className="liquid-glass-content nav-content">
            <button className="nav-brand" onClick={() => handleLink('#hero')} aria-label="Go to top">
              <span className="nav-mark">
                <img
                  src="/images/site-logo.png"
                  alt="Basu Singh logo"
                  className="nav-mark-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
                <span className="nav-mark-fallback">BS</span>
              </span>
              <span className="nav-brand-text">
                <strong>{profile.name}</strong>
                <small>{profile.title}</small>
              </span>
            </button>

            <nav className="nav-links" aria-label="Primary" ref={linksWrapRef} onMouseLeave={() => setHoveredHref(null)}>
              {pill.ready && (
                <span
                  className="nav-pill"
                  style={{ transform: `translateX(${pill.left}px)`, width: `${pill.width}px` }}
                />
              )}
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  ref={(el) => (linkRefs.current[l.href] = el)}
                  href={l.href}
                  className={active === l.href ? 'active' : ''}
                  onMouseEnter={() => setHoveredHref(l.href)}
                  onClick={(e) => { e.preventDefault(); handleLink(l.href); }}
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="nav-right">
              <a href="#contact" className="btn primary nav-hire" onClick={(e) => { e.preventDefault(); handleLink('#contact'); }}>
                Hire Me →
              </a>
              <button
                className={`nav-burger ${open ? 'open' : ''}`}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span /><span /><span />
              </button>
            </div>
          </div>
        </header>
      </div>

      <div className={`nav-mobile liquid-glass ${open ? 'open' : ''}`}>
        <div className="liquid-glass-filter" />
        <div className="liquid-glass-overlay" />
        <div className="liquid-glass-specular" />
        <nav className="liquid-glass-content" aria-label="Mobile">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); handleLink(l.href); }}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn primary" onClick={(e) => { e.preventDefault(); handleLink('#contact'); }}>
            Hire Me →
          </a>
        </nav>
      </div>
      {open && <div className="nav-scrim" onClick={() => setOpen(false)} />}

      <style>{`
        .nav-wrap{
          position:fixed; top:0; left:0; right:0; z-index:200; pointer-events:none;
          max-width:1080px; margin:0 auto;
          padding:14px clamp(32px,9vw,90px);
          transform:translateY(0); transition:transform .35s cubic-bezier(.16,.8,.24,1);
        }
        .nav-wrap.nav-hidden{ transform:translateY(-130%); }
        .nav{
          pointer-events:auto;
          border-radius:100px;
          transition:border-radius .4s ease, box-shadow .4s ease, transform .3s ease;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.14) inset,
            0 -1px 0 rgba(0,0,0,0.3) inset,
            0 20px 50px rgba(0,0,0,0.45),
            0 2px 8px rgba(0,0,0,0.3);
        }
        .nav::before{
          content:''; position:absolute; top:0; left:8%; right:8%; height:1px; z-index:4;
          background:linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          border-radius:100px; pointer-events:none;
        }
        .nav.scrolled{
          box-shadow:
            0 1px 0 rgba(255,255,255,0.16) inset,
            0 -1px 0 rgba(0,0,0,0.35) inset,
            0 24px 60px rgba(0,0,0,0.5),
            0 2px 10px rgba(0,0,0,0.35);
        }
        .nav-content{
          display:flex; align-items:center; justify-content:space-between;
          padding:12px 22px;
        }
        .nav-brand{ display:flex; align-items:center; gap:12px; background:none; border:none; color:var(--heading); text-align:left; }
        .nav-mark{
          width:38px; height:38px; border-radius:12px;
          display:flex; align-items:center; justify-content:center;
          flex-shrink:0; overflow:hidden; position:relative;
        }
        .nav-mark-img{ width:100%; height:100%; object-fit:cover; display:block; }
        .nav-mark-fallback{
          display:none; align-items:center; justify-content:center;
          width:100%; height:100%;
          font-family:var(--font-display); font-weight:700; font-size:14px;
          background:linear-gradient(135deg, var(--accent), var(--accent-2));
          color:var(--on-accent);
        }
        .nav-brand-text{ display:flex; flex-direction:column; line-height:1.25; }
        .nav-brand-text strong{ font-family:var(--font-display); font-size:15.5px; font-weight:600; color:var(--heading); }
        .nav-brand-text small{ font-family:var(--font-mono); font-size:10.5px; color:var(--accent); letter-spacing:0.5px; }

        .nav-links{ display:flex; align-items:center; gap:28px; position:relative; }
        .nav-pill{
          position:absolute; top:-8px; bottom:-8px; left:0; border-radius:100px;
          background:var(--accent-soft); border:1px solid var(--accent-2);
          transition:
            transform .55s cubic-bezier(0.34, 1.56, 0.64, 1),
            width .55s cubic-bezier(0.34, 1.56, 0.64, 1),
            border-radius .3s ease;
          z-index:0; pointer-events:none;
          box-shadow:0 0 20px var(--accent-soft), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .nav-links a{
          font-size:14px; text-decoration:none; color:var(--text-dim);
          position:relative; padding:6px 4px; transition:color .3s ease;
          z-index:1;
        }
        .nav-links a:hover{ color:var(--heading); }
        .nav-links a.active{ color:var(--accent); }

        .nav-right{ display:flex; align-items:center; gap:12px; }
        .nav-hire{ padding:11px 20px; font-size:11px; }

        .nav-burger{
          display:none; flex-direction:column; justify-content:center; gap:5px;
          width:36px; height:36px; background:var(--surface-2);
          border:1px solid var(--glass-border); border-radius:10px;
        }
        .nav-burger span{ width:15px; height:1.5px; background:var(--text); margin:0 auto; transition:transform .3s ease, opacity .3s ease; }
        .nav-burger.open span:nth-child(1){ transform:translateY(6.5px) rotate(45deg); }
        .nav-burger.open span:nth-child(2){ opacity:0; }
        .nav-burger.open span:nth-child(3){ transform:translateY(-6.5px) rotate(-45deg); }

        .nav-mobile{
          position:fixed; top:82px; right:14px; width:min(78vw, 300px); z-index:250;
          border-radius:24px; overflow:hidden;
          background:rgba(10,11,15,0.96);
          backdrop-filter:blur(28px) saturate(140%);
          -webkit-backdrop-filter:blur(28px) saturate(140%);
          transform:translateY(-12px) scale(0.97); opacity:0; pointer-events:none;
          transition:transform .35s cubic-bezier(.16,.8,.24,1), opacity .3s ease;
          box-shadow:0 20px 60px rgba(21,23,30,0.18);
        }
        .nav-mobile.open{ transform:translateY(0) scale(1); opacity:1; pointer-events:auto; }
        .nav-mobile nav{ display:flex; flex-direction:column; gap:18px; padding:24px; }
        .nav-mobile nav a{
          font-family:var(--font-display); font-size:19px; text-decoration:none;
          color:var(--text-dim); transition:color .3s ease;
        }
        .nav-mobile nav a.active, .nav-mobile nav a:hover{ color:var(--accent); }
        .nav-mobile .btn{ margin-top:6px; justify-content:center; }

        .nav-scrim{ position:fixed; inset:0; z-index:220; background:rgba(21,23,30,0.25); }

        @media (max-width:900px){
          .nav-links{ display:none; }
          .nav-hire{ display:none; }
          .nav-burger{ display:flex; }
        }
        @media (min-width:901px){
          .nav-mobile, .nav-scrim{ display:none; }
        }
      `}</style>
    </>
  );
}
