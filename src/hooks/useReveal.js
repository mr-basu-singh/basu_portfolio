import { useEffect } from 'react';

// Watches all .reveal elements inside a container ref and adds .in when they enter view.
export default function useReveal(containerRef, deps = []) {
  useEffect(() => {
    const root = containerRef?.current || document;
    const els = root.querySelectorAll('.reveal:not(.in)');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
