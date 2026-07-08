import { useEffect, useRef, useState } from 'react';
import useReveal from '../../hooks/useReveal';
import { profile, resumeDoc } from '../../data/content';
import LiquidResumeButton from '../buttons/LiquidResumeButton';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdardlon';
const RECAPTCHA_SITE_KEY = '6LcmO0ctAAAAAF4MtcdMHHqi_LI1mh7RBKS-QDfc';

function ResumeDocument({ compact = false }) {
  return (
    <div className={`resume-doc ${compact ? 'compact' : ''}`}>
      <h2 className="resume-doc-name">{profile.fullName}</h2>
      <p className="resume-doc-contact">
        {profile.email} <span>•</span> {profile.phone} <span>•</span> {profile.location} <span>•</span>{' '}
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">linkedin</a> <span>•</span>{' '}
        <a href={profile.github} target="_blank" rel="noopener noreferrer">github</a>
      </p>

      <h3 className="resume-doc-h">Skills</h3>
      {resumeDoc.skills.map((s) => (
        <p key={s.label} className="resume-doc-line"><strong>{s.label}</strong><br />{s.value}</p>
      ))}

      <h3 className="resume-doc-h">Projects</h3>
      {resumeDoc.projects.map((p) => (
        <div key={p.heading} className="resume-doc-proj">
          <div className="resume-doc-proj-head">
            <strong>{p.heading}</strong>
            <span>{p.date}</span>
          </div>
          {p.demo && <p className="resume-doc-demo">{p.demo}</p>}
          <ul>
            {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      ))}

      {!compact && (
        <>
          <h3 className="resume-doc-h">Certifications & Training</h3>
          {resumeDoc.certifications.map((c) => (
            <div key={c.title} className="resume-doc-proj">
              <div className="resume-doc-proj-head">
                <strong>{c.title}</strong>
              </div>
              <ul>
                <li>Date: {c.date}</li>
                <li>{c.desc}</li>
              </ul>
            </div>
          ))}

          <h3 className="resume-doc-h">Education</h3>
          {resumeDoc.education.map((e) => (
            <div key={e.title} className="resume-doc-proj resume-doc-edu">
              <div className="resume-doc-proj-head">
                <div><strong>{e.title}</strong>, <em>{e.place}</em></div>
                <span>{e.range}</span>
              </div>
            </div>
          ))}

          <h3 className="resume-doc-h">Languages</h3>
          <ul>
            {resumeDoc.languages.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </>
      )}
    </div>
  );
}

export default function ResumeContact() {
  const ref = useRef();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  // Load Google's reCAPTCHA v3 script once, scoped to this component's needs.
  useEffect(() => {
    if (document.querySelector('script[data-recaptcha]')) return;
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.dataset.recaptcha = 'true';
    document.head.appendChild(script);
  }, []);
  useReveal(ref, []);

  useEffect(() => {
    if (!previewOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setPreviewOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [previewOpen]);

  const download = (e) => {
    e.preventDefault();
    const a = document.createElement('a');
    a.href = profile.resumeFile;
    a.download = profile.resumeDownloadName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('empty');
      return;
    }
    setStatus('sending');
    try {
      const token = await new Promise((resolve, reject) => {
        if (!window.grecaptcha) {
          reject(new Error('reCAPTCHA not loaded'));
          return;
        }
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(RECAPTCHA_SITE_KEY, { action: 'submit' })
            .then(resolve)
            .catch(reject);
        });
      });

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, 'g-recaptcha-response': token }),
      });
      if (res.ok) {
        setStatus('sent');
        fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: form.name, email: form.email }),
        }).catch(() => {});
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="resume" ref={ref} className="section-shell tight resume-section">
      <div className="section-head">
        <span className="section-num mono">10</span>
        <h2 className="section-title reveal">Resume &amp; Contact</h2>
        <div className="section-line" />
      </div>

      <div className="rc-grid">
        <div className="rc-panel liquid-card reveal">
          <div className="resume-preview-frame" onClick={() => setPreviewOpen(true)}>
            <ResumeDocument compact />
            <div className="resume-preview-fade" />
            <div className="resume-preview-overlay">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="3"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"/></svg>
              <span>Click to preview</span>
            </div>
          </div>
          <p className="resume-preview-link" onClick={() => setPreviewOpen(true)}>Preview my resume</p>
          <div className="resume-meta">
            <h3 className="display">{profile.fullName}</h3>
            <p>{profile.title}</p>
            <p className="resume-degree">B.Tech, Electrical &amp; Electronics Engineering</p>
            <LiquidResumeButton
              label="Download Resume"
              sublabel="Get PDF"
              href={profile.resumeFile}
              download={profile.resumeDownloadName}
              onClick={download}
            />
          </div>
        </div>

        <div id="contact" className="rc-panel liquid-card reveal d2">
          <h3 className="display">Let's Build AI Systems Together</h3>
          <p className="contact-sub">Open to full-time and internship AI Agent Engineer roles, and exciting opportunities.</p>

          <div className="contact-info">
            <span>{profile.location}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone}`}>{profile.phone}</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">{profile.github.replace('https://', '')}</a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">{profile.linkedin.replace('https://www.', '')}</a>
          </div>

          <form className="contact-form" onSubmit={submit} noValidate>
            <div className="form-row">
              <input type="text" placeholder="Your Name" required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              <input type="email" placeholder="Your Email" required value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <textarea placeholder="Your Message" rows="5" required value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
            <button type="submit" className="btn primary contact-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message'} <span aria-hidden>→</span>
            </button>
            {status === 'sent' && <p className="form-status ok">Message sent — I'll get back to you soon.</p>}
            {status === 'empty' && <p className="form-status bad">Please fill in every field before sending.</p>}
            {status === 'error' && <p className="form-status bad">Couldn't send that — please try again, or email me directly at {profile.email}.</p>}
          </form>
        </div>
      </div>

      {previewOpen && (
        <div className="pdf-modal" onClick={() => setPreviewOpen(false)}>
          <div className="pdf-modal-inner" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-head">
              <h3>{profile.fullName} — Resume</h3>
              <div className="pdf-modal-actions">
                <a href={profile.resumeFile} onClick={download} download={profile.resumeDownloadName} className="btn primary pdf-modal-dl">Download ↓</a>
                <button className="pdf-modal-close" onClick={() => setPreviewOpen(false)} aria-label="Close preview">✕</button>
              </div>
            </div>
            <div className="pdf-modal-body">
              <ResumeDocument />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .rc-grid{ display:grid; grid-template-columns:1fr 1.2fr; gap:28px; align-items:start; }
        .rc-panel{ padding:32px; border-radius:20px; }

        .resume-preview-frame{
          position:relative; border-radius:14px; overflow:hidden; height:300px;
          background:var(--paper); cursor:pointer; border:1px solid var(--glass-border);
        }
        .resume-preview-fade{
          position:absolute; left:0; right:0; bottom:0; height:70px;
          background:linear-gradient(transparent, var(--paper));
        }
        .resume-preview-overlay{
          position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center;
          gap:10px; background:rgba(21,23,30,0.55); color:#fff; opacity:0; transition:opacity .3s ease;
          font-family:var(--font-mono); font-size:13px; pointer-events:none;
        }
        .resume-preview-frame:hover .resume-preview-overlay{ opacity:1; }
        .resume-preview-overlay svg{ width:26px; height:26px; }
        .resume-preview-link{ font-size:12.5px; color:var(--accent); margin-top:10px; cursor:pointer; text-decoration:underline; }
        .resume-meta{ margin-top:18px; }
        .resume-meta h3{ font-size:22px; font-weight:600; color:var(--text); }
        .resume-meta p{ color:var(--text-dim); font-size:14px; margin-top:6px; }
        .resume-degree{ margin-bottom:18px !important; }
        .resume-dl{ margin-top:6px; }

        .contact-sub{ color:var(--text-dim); font-size:14px; margin-top:10px; }
        .contact-info{ display:flex; flex-direction:column; gap:8px; margin:24px 0; font-size:13.5px; }
        .contact-info a{ color:var(--accent-2); text-decoration:none; }
        .contact-info a:hover{ text-decoration:underline; }
        .contact-info span{ color:var(--text-dim); }

        .contact-form{ display:flex; flex-direction:column; gap:14px; }
        .form-row{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .contact-form input, .contact-form textarea{
          background:rgba(21,23,30,0.03); border:1px solid var(--glass-border); border-radius:10px;
          padding:14px 16px; color:var(--text); font-family:var(--font-body); font-size:14px; resize:vertical;
        }
        .contact-form input::placeholder, .contact-form textarea::placeholder{ color:var(--text-dim); }
        .contact-form input:focus, .contact-form textarea:focus{ outline:none; border-color:var(--accent); }
        .contact-submit{ justify-content:center; margin-top:4px; }
        .contact-submit:disabled{ opacity:0.6; cursor:wait; }
        .form-status{ font-size:13px; margin-top:4px; }
        .form-status.ok{ color:#3f9e6d; }
        .form-status.bad{ color:#c4443f; }

        /* Resume document (shared by inline preview + modal) */
        .resume-doc{ font-family:var(--font-body); color:#1a1a1a; padding:16px 20px; font-size:11px; }
        .resume-doc.compact{ padding:14px 16px; transform:scale(0.9); transform-origin:top left; width:111%; }
        .resume-doc-name{ font-family:var(--font-display); font-size:17px; text-align:center; margin-bottom:4px; }
        .resume-doc-contact{ font-size:9px; text-align:center; color:#555; margin-bottom:12px; line-height:1.6; }
        .resume-doc-contact span{ margin:0 3px; }
        .resume-doc-contact a{ color:#555; text-decoration:underline; }
        .resume-doc-h{ font-size:10.5px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1.5px solid #1a1a1a; padding-bottom:3px; margin:11px 0 7px; }
        .resume-doc-line{ font-size:9.5px; line-height:1.45; margin-bottom:5px; color:#333; }
        .resume-doc-proj{ margin-bottom:9px; }
        .resume-doc-proj-head{ display:flex; justify-content:space-between; gap:10px; font-size:9.5px; margin-bottom:2px; }
        .resume-doc-proj-head span{ white-space:nowrap; color:#666; font-size:8.5px; }
        .resume-doc-demo{ font-size:8.5px; color:var(--accent-2); margin-bottom:2px; }
        .resume-doc-cert-desc{ font-size:9.5px; line-height:1.4; color:#333; }
        .resume-doc ul{ margin:0; padding-left:14px; }
        .resume-doc li{ font-size:9.5px; line-height:1.4; color:#333; margin-bottom:2px; }

        .pdf-modal{
          position:fixed; inset:0; z-index:700; background:rgba(0,0,0,0.65);
          display:flex; align-items:center; justify-content:center;
          padding:calc(var(--header-h) + 16px) 4vw 4vh;
        }
        .pdf-modal-inner{ position:relative; width:100%; max-width:700px; max-height:82vh; background:var(--paper); border-radius:16px; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 30px 80px rgba(0,0,0,0.5); }
        .pdf-modal-head{
          display:flex; align-items:center; justify-content:space-between; padding:18px 24px;
          border-bottom:1px solid rgba(21,23,30,0.08); flex-shrink:0;
        }
        .pdf-modal-head h3{ font-family:var(--font-display); font-size:18px; color:#1a1a1a; }
        .pdf-modal-actions{ display:flex; align-items:center; gap:12px; }
        .pdf-modal-dl{ padding:10px 18px; font-size:11px; }
        .pdf-modal-close{
          width:36px; height:36px; border-radius:50%;
          background:#1a1a1a; color:#fff; border:none; font-size:14px;
        }
        .pdf-modal-body{ overflow-y:auto; flex:1; min-height:0; }

        @media (max-width:900px){
          .rc-grid{ grid-template-columns:1fr; }
          .form-row{ grid-template-columns:1fr; }
        }
      `}</style>
    </section>
  );
}
