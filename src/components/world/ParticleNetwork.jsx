import { useEffect, useRef } from 'react';

const PARTICLE_COUNT_DESKTOP = 90;
const PARTICLE_COUNT_MOBILE = 40;
const LINK_DIST = 130;
const CURSOR_DIST = 200;

export default function ParticleNetwork() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999, active: false });
  const particles = useRef([]);
  const rafRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const isMobile = window.innerWidth <= 820;
    const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    function initParticles() {
      particles.current = new Array(count).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
      }));
    }
    initParticles();

    function getColors() {
      const styles = getComputedStyle(document.documentElement);
      return {
        dot: styles.getPropertyValue('--accent').trim() || '#E5D1B2',
        line: styles.getPropertyValue('--particle-line').trim() || 'rgba(229,209,178,0.12)',
        accent: styles.getPropertyValue('--accent').trim() || '#E5D1B2',
        cursorLine: styles.getPropertyValue('--cursor-line').trim() || 'rgba(245,226,198,0.4)',
      };
    }

    function hexToRgba(hex, alpha) {
      hex = hex.trim();
      if (hex.startsWith('rgba') || hex.startsWith('rgb')) return hex;
      const h = hex.replace('#', '');
      const bigint = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `rgba(${r},${g},${b},${alpha})`;
    }

    function scaleAlpha(rgbaStr, multiplier) {
      const m = rgbaStr.match(/rgba?\(([^)]+)\)/);
      if (!m) return rgbaStr;
      const parts = m[1].split(',').map((s) => s.trim());
      const [r, g, b] = parts;
      const baseAlpha = parts[3] !== undefined ? parseFloat(parts[3]) : 1;
      return `rgba(${r},${g},${b},${baseAlpha * multiplier})`;
    }

    function draw() {
      const colors = getColors();
      ctx.clearRect(0, 0, width, height);

      const pts = particles.current;

      // move
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        // cursor field: gentle pull from afar, firm push once too close —
        // keeps a natural minimum spacing instead of collapsing into a knot.
        if (mouse.current.active) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const MIN_DIST = 55;
          if (dist < MIN_DIST && dist > 0.01) {
            const push = (MIN_DIST - dist) / MIN_DIST;
            p.x -= (dx / dist) * push * 1.8;
            p.y -= (dy / dist) * push * 1.8;
          } else if (dist < CURSOR_DIST && dist > 0.01) {
            p.x += (dx / dist) * 0.06;
            p.y += (dy / dist) * 0.06;
          }
        }
      }

      // particle-to-particle links
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            ctx.strokeStyle = scaleAlpha(colors.line, (1 - dist / LINK_DIST) * 2.5);
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // cursor-to-particle links (accent colored)
      if (mouse.current.active) {
        for (const p of pts) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_DIST) {
            ctx.strokeStyle = hexToRgba(colors.accent, (1 - dist / CURSOR_DIST) * 0.45);
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(mouse.current.x, mouse.current.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
        // cursor glow dot
        ctx.beginPath();
        ctx.fillStyle = colors.cursorLine;
        ctx.arc(mouse.current.x, mouse.current.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // dots
      for (const p of pts) {
        ctx.beginPath();
        ctx.fillStyle = hexToRgba(colors.dot, 0.55);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }
    rafRef.current = requestAnimationFrame(draw);

    function onMouseMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    }
    function onMouseLeave() {
      mouse.current.active = false;
    }
    function onTouchMove(e) {
      if (e.touches && e.touches[0]) {
        mouse.current.x = e.touches[0].clientX;
        mouse.current.y = e.touches[0].clientY;
        mouse.current.active = true;
      }
    }
    function onResize() {
      resize();
      initParticles();
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
