import { profile } from '../data/content';

const icons = {
  github: (
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.9-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  ),
  linkedin: (
    <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3.2 8.75h3.5V21H3.2V8.75Zm6.28 0h3.36v1.68h.05c.47-.88 1.6-1.8 3.3-1.8 3.53 0 4.18 2.32 4.18 5.34V21h-3.5v-5.4c0-1.29-.02-2.94-1.79-2.94-1.8 0-2.08 1.4-2.08 2.85V21H9.48V8.75Z" />
  ),
  mail: (
    <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5v-13Zm2.2.5 6.8 5.44L18.8 6H5.2Zm13.3 1.53-6.09 4.87a1.5 1.5 0 0 1-1.87 0L4.5 7.53V18h15V7.53Z" />
  ),
};

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer liquid-glass chamfer">
      <div className="liquid-glass-filter" />
      <div className="liquid-glass-overlay" />
      <div className="liquid-glass-specular" />

      <div className="liquid-glass-content foot-inner">
        <p className="mono foot-copy">© {year} {profile.name}. All rights reserved.</p>

        <p className="foot-credit">
          This website is designed and made by <strong>{profile.fullName}</strong>
        </p>

        <div className="foot-social">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="foot-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">{icons.github}</svg>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="foot-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">{icons.linkedin}</svg>
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="foot-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">{icons.mail}</svg>
          </a>
        </div>
      </div>

      <style>{`
        .site-footer{
          position:relative; z-index:2;
          margin:0 clamp(12px,3vw,28px) 16px;
          padding:2px;
          background:linear-gradient(135deg, rgba(229,209,178,0.9), rgba(245,226,198,0.45) 50%, rgba(229,209,178,0.9));
          clip-path: polygon(22px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 22px), 0 22px);
          filter:
            drop-shadow(0 0 14px rgba(229,209,178,0.18))
            drop-shadow(0 16px 44px rgba(0,0,0,0.4));
        }
        .foot-inner{
          display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:20px;
          padding:28px clamp(16px,4vw,40px);
        }
        .foot-copy{font-size:12px; color:var(--text-dim);}
        .foot-credit{font-size:13px; color:var(--text-dim); text-align:center; flex:1;}
        .foot-credit strong{color:var(--accent-2);}
        .foot-social{display:flex; gap:14px;}
        .foot-icon{
          width:38px; height:38px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          border:1px solid var(--glass-border); color:var(--text-dim);
          transition:color .3s ease, border-color .3s ease, transform .35s cubic-bezier(.16,.8,.24,1), box-shadow .35s ease;
        }
        .foot-icon svg{width:17px; height:17px;}
        .foot-icon:hover{
          color:var(--text); border-color:var(--accent-2);
          transform:translateY(-4px) rotate(-6deg);
          box-shadow:0 8px 22px rgba(229,209,178,0.3);
        }
        @media (max-width:700px){
          .foot-inner{flex-direction:column; text-align:center;}
        }
      `}</style>
    </footer>
  );
}
