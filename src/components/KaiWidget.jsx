import { useEffect, useRef, useState } from 'react';

const WELCOME = "Hi, I'm Kai. Ask me anything about Basu's background, skills, or projects.";

export default function KaiWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dockOffset, setDockOffset] = useState(0);
  const listRef = useRef();

  // When the footer scrolls into view, lift the launcher (and closed panel
  // position) above it so it never sits on top of the footer's social icons.
  useEffect(() => {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const visibleHeight = entry.intersectionRect.height;
          setDockOffset(visibleHeight + 16);
        } else {
          setDockOffset(0);
        }
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading, open]);

  const send = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    if (text.length > 800) {
      setError('Message is too long — please keep it under 800 characters.');
      return;
    }
    setError('');
    const nextMessages = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const history = nextMessages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(0, -1) // exclude the message we're sending now (sent separately)
        .slice(-8);

      const res = await fetch('/api/kai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });

      if (!res.ok) {
        let data = {};
        try { data = await res.json(); } catch { /* no JSON body on this error */ }
        setError(data.error || 'Kai ran into a problem. Please try again.');
        setMessages((m) => [...m, { role: 'assistant', content: "Sorry, I couldn't process that. Please try again, or use the Contact form below." }]);
        return;
      }

      // The reply streams in as plain text, word by word — append each chunk
      // to a live assistant message instead of waiting for the full reply.
      setMessages((m) => [...m, { role: 'assistant', content: '' }]);
      setLoading(false);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
        setMessages((m) => {
          const next = [...m];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, content: last.content + chunk };
          return next;
        });
      }
    } catch {
      setError('Network error — check your connection.');
      setMessages((m) => [...m, { role: 'assistant', content: "I couldn't connect just now. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className={`kai-launcher ${open ? 'hide' : ''}`}
        onClick={() => setOpen(true)}
        aria-label="Open Kai, the AI assistant"
        style={{ bottom: `${26 + dockOffset}px` }}
      >
        <span className="kai-launcher-glow" aria-hidden="true" />
        <span className="kai-launcher-dot" />
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
          <rect x="4" y="7" width="16" height="12" rx="4" />
          <path d="M12 7V4M9 3h6" />
          <circle cx="9" cy="13" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="15" cy="13" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      </button>

      <div
        className={`kai-panel ${open ? 'open' : ''}`}
        role="dialog"
        aria-label="Kai chat assistant"
        style={{ bottom: `${26 + dockOffset}px` }}
      >
        <div className="kai-panel-glow" aria-hidden="true" />
        <div className="kai-panel-body">
          <div className="kai-header">
            <div className="kai-header-id">
              <span className="kai-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <rect x="4" y="7" width="16" height="12" rx="4" />
                  <path d="M12 7V4M9 3h6" />
                  <circle cx="9" cy="13" r="1.4" fill="currentColor" stroke="none" />
                  <circle cx="15" cy="13" r="1.4" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <div>
                <strong>Kai</strong>
                <small>Basu's AI Assistant</small>
              </div>
            </div>
            <button className="kai-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </div>

          <div className="kai-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`kai-msg ${m.role}`}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="kai-msg assistant kai-typing">
                <span /><span /><span />
              </div>
            )}
          </div>

          {error && <div className="kai-error">{error}</div>}

          <form className="kai-input-row" onSubmit={send}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Kai about Basu…"
              maxLength={800}
              disabled={loading}
            />
            <button type="submit" className="kai-send-btn" disabled={loading || !input.trim()} aria-label="Send message">
              <i>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
              </i>
            </button>
          </form>
        </div>
      </div>

      {open && <div className="kai-scrim" onClick={() => setOpen(false)} />}

      <style>{`
        .kai-launcher{
          position:fixed; bottom:26px; right:26px; z-index:600;
          width:56px; height:56px; border-radius:50%;
          background:linear-gradient(135deg, var(--accent), var(--accent-2));
          border:none; color:var(--on-accent);
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 10px 30px rgba(0,0,0,0.4);
          transition:transform .35s cubic-bezier(.16,.8,.24,1), opacity .3s ease, bottom .3s ease;
        }
        .kai-launcher:hover{ transform:scale(1.08); }
        .kai-launcher.hide{ opacity:0; pointer-events:none; transform:scale(0.7); }
        .kai-launcher svg{ width:24px; height:24px; position:relative; z-index:1; }
        .kai-launcher-dot{
          position:absolute; top:6px; right:6px; width:9px; height:9px; border-radius:50%;
          background:#7ec98a; border:2px solid var(--bg); z-index:2;
        }
        .kai-launcher-glow{
          content:''; position:absolute; inset:-6px; border-radius:50%; z-index:0;
          background:conic-gradient(from 0deg, var(--accent), var(--accent-2), #fff, var(--accent-2), var(--accent));
          background-size:200% 200%;
          filter:blur(9px);
          opacity:0; transition:opacity .35s ease;
          animation:kaiGlowSpin 6s linear infinite;
        }
        .kai-launcher:hover .kai-launcher-glow{ opacity:0.85; }
        @keyframes kaiGlowSpin{
          0%{ background-position:0% 0%; }
          100%{ background-position:200% 200%; }
        }

        /* --- Panel: neutral charcoal gradient-border + radial corner glow --- */
        .kai-panel{
          position:fixed; bottom:26px; right:26px; z-index:610;
          width:min(92vw, 380px); height:min(72vh, 560px);
          border-radius:22px;
          padding:1.5px;
          background:linear-gradient(to bottom right, #7e7e7e, #363636, #363636, #363636, #363636);
          overflow:hidden;
          transform:translateY(24px) scale(0.96); opacity:0; pointer-events:none;
          transition:transform .4s cubic-bezier(.16,.8,.24,1), opacity .3s ease, bottom .3s ease;
          box-shadow:0 30px 80px rgba(0,0,0,0.6);
        }
        .kai-panel.open{ transform:translateY(0) scale(1); opacity:1; pointer-events:auto; }
        .kai-panel-glow{
          position:absolute; top:-10px; left:-10px; width:30px; height:30px; z-index:0;
          background:radial-gradient(ellipse at center, #ffffff, rgba(255,255,255,0.3), rgba(255,255,255,0.1), transparent 70%);
          filter:blur(1px); pointer-events:none;
        }
        .kai-panel-body{
          position:relative; z-index:1; height:100%;
          background:rgba(0,0,0,0.55);
          backdrop-filter:blur(20px) saturate(140%);
          -webkit-backdrop-filter:blur(20px) saturate(140%);
          border-radius:20.5px;
          display:flex; flex-direction:column; overflow:hidden;
        }

        .kai-header{
          display:flex; align-items:center; justify-content:space-between;
          padding:16px 18px; border-bottom:1px solid var(--line);
        }
        .kai-header-id{ display:flex; align-items:center; gap:12px; }
        .kai-avatar{
          width:38px; height:38px; border-radius:50%;
          background:linear-gradient(135deg, var(--accent), var(--accent-2));
          display:flex; align-items:center; justify-content:center; color:var(--on-accent); flex-shrink:0;
        }
        .kai-avatar svg{ width:19px; height:19px; }
        .kai-header-id strong{ display:block; font-family:var(--font-display); font-size:15px; color:var(--heading); }
        .kai-header-id small{ font-family:var(--font-mono); font-size:10px; color:var(--accent-2); }
        .kai-close{
          width:30px; height:30px; border-radius:50%; background:rgba(255,255,255,0.05);
          border:1px solid var(--glass-border); color:var(--text-dim); font-size:13px;
          transition:transform .3s ease, color .3s ease;
        }
        .kai-close:hover{ transform:translateY(-3px); color:var(--heading); }

        .kai-messages{ flex:1; overflow-y:auto; padding:18px; display:flex; flex-direction:column; gap:12px; }
        .kai-msg{
          max-width:82%; padding:11px 15px; border-radius:14px; font-size:13.5px; line-height:1.55;
        }
        .kai-msg.assistant{ background:rgba(255,255,255,0.05); border:1px solid var(--glass-border); align-self:flex-start; border-bottom-left-radius:4px; color:var(--text); }
        .kai-msg.user{ background:var(--accent); color:var(--on-accent); align-self:flex-end; border-bottom-right-radius:4px; }
        .kai-typing{ display:flex; gap:4px; padding:14px 16px; align-items:center; }
        .kai-typing span{ width:6px; height:6px; border-radius:50%; background:var(--accent-2); animation:kaiTyping 1.2s infinite; }
        .kai-typing span:nth-child(2){ animation-delay:.2s; }
        .kai-typing span:nth-child(3){ animation-delay:.4s; }
        @keyframes kaiTyping{ 0%,60%,100%{ opacity:.3; transform:translateY(0);} 30%{ opacity:1; transform:translateY(-3px);} }

        .kai-error{ padding:0 18px 8px; color:#e0857f; font-size:11.5px; }

        .kai-input-row{ display:flex; gap:10px; padding:14px; border-top:1px solid var(--line); align-items:center; }
        .kai-input-row input{
          flex:1; background:rgba(0,0,0,0.35); border:1px solid var(--glass-border); border-radius:100px;
          padding:11px 16px; color:var(--heading); font-size:13.5px;
        }
        .kai-input-row input::placeholder{ color:var(--text-dim); }
        .kai-input-row input:focus{ outline:none; border-color:var(--accent-2); }

        .kai-send-btn{
          width:40px; height:40px; border-radius:12px; flex-shrink:0;
          padding:2px; border:none; outline:none; cursor:pointer;
          background:linear-gradient(to top, #1a1a1a, #3a3a3a, #1a1a1a);
          box-shadow:inset 0 4px 2px -3px rgba(255,255,255,0.35);
          display:flex; align-items:center; justify-content:center;
          transition:transform .15s ease;
        }
        .kai-send-btn i{
          width:100%; height:100%; display:flex; align-items:center; justify-content:center;
          background:rgba(0,0,0,0.25); border-radius:10px; color:var(--text-dim);
        }
        .kai-send-btn svg{ width:17px; height:17px; transition:all .3s ease; }
        .kai-send-btn:not(:disabled):hover svg{ color:var(--accent-2); filter:drop-shadow(0 0 5px var(--accent-2)); }
        .kai-send-btn:not(:disabled):focus svg{
          color:var(--accent-2); filter:drop-shadow(0 0 5px var(--accent-2));
          transform:scale(1.15) rotate(20deg);
        }
        .kai-send-btn:not(:disabled):active{ transform:scale(0.92); }
        .kai-send-btn:disabled{ opacity:0.4; cursor:not-allowed; }

        .kai-scrim{ position:fixed; inset:0; z-index:605; background:transparent; }

        @media (max-width:480px){
          .kai-panel{ right:12px; bottom:12px; width:calc(100vw - 24px); height:70vh; }
          .kai-launcher{ right:16px; bottom:16px; }
        }
      `}</style>
    </>
  );
}