import { useRef } from 'react';
import useReveal from '../../hooks/useReveal';

export default function ArchitectureSection() {
  const ref = useRef();
  useReveal(ref, []);

  return (
    <section id="architecture" ref={ref} className="section-shell arch-section">
      <div className="section-head">
        <span className="section-num mono">07</span>
        <h2 className="section-title reveal">A Real Example</h2>
        <div className="section-line" />
      </div>
      <p className="section-sub reveal">
        Here's the actual multi-agent architecture behind one of my production projects — proof, not just philosophy.
      </p>

      <div className="arch-wrap liquid-card reveal">
        <img
          src="/images/architecture-diagram.svg"
          alt="AI Tour Guide Agent workflow diagram: a multi-agent pipeline with three phases — Discovery (user input through selecting a destination), Parallel Planning (Route, Itinerary, Hotel, and Budget agents running simultaneously), and Delivery (finalizing and presenting the trip plan as a downloadable PDF), including reject and refinement feedback loops."
          className="arch-image"
          loading="lazy"
          decoding="async"
        />
      </div>

      <style>{`
        .arch-wrap{ padding:20px; border-radius:20px; display:flex; justify-content:center; }
        .arch-image{ width:100%; max-width:560px; height:auto; display:block; border-radius:8px; margin:0 auto; }
      `}</style>
    </section>
  );
}