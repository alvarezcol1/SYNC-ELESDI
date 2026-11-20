import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

type Props = {
  /** Nodes per 10,000 px² of canvas area (capped by `maxNodes`). */
  density?: number;
  maxNodes?: number;
  /** Max distance (CSS px) at which two nodes connect. */
  linkDistance?: number;
  /** Signal pulses travelling along links. */
  signals?: boolean;
  className?: string;
};

type Node = { x: number; y: number; vx: number; vy: number; r: number; tone: 0 | 1 };
type Signal = { a: number; b: number; t: number; speed: number; amber: boolean };

/**
 * The "intelligent network" layer: drifting nodes, thin links, and occasional
 * signals travelling between them. 2D canvas only — no WebGL.
 *
 * Performance: DPR capped at 2, node count scaled to area, animation paused
 * when off-screen or the tab is hidden. Reduced motion draws one static frame.
 */
export function NeuralField({ density = 0.55, maxNodes = 80, linkDistance = 150, signals = true, className = '' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    let pulses: Signal[] = [];
    let raf = 0;
    let running = false;
    let visible = true;
    let last = performance.now();

    const seed = () => {
      const count = Math.min(maxNodes, Math.round(((w * h) / 10000) * density));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.08,
        r: Math.random() * 1.2 + 0.6,
        tone: Math.random() > 0.85 ? 1 : 0,
      }));
      pulses = [];
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw(0);
    };

    const maxD2 = linkDistance * linkDistance;

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      // Move
      if (dt) {
        for (const n of nodes) {
          n.x += n.vx * dt * 0.06;
          n.y += n.vy * dt * 0.06;
          if (n.x < -20) n.x = w + 20;
          else if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20;
          else if (n.y > h + 20) n.y = -20;
        }
      }
      // Links
      ctx.lineWidth = 0.6;
      const links: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            const alpha = (1 - d2 / maxD2) * 0.32;
            ctx.strokeStyle = `rgba(143,180,255,${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            links.push([i, j]);
          }
        }
      }
      // Nodes
      for (const n of nodes) {
        ctx.fillStyle = n.tone ? 'rgba(245,196,107,0.85)' : 'rgba(214,220,229,0.7)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // Signals
      if (signals && dt) {
        if (pulses.length < 6 && links.length && Math.random() < 0.035) {
          const [a, b] = links[(Math.random() * links.length) | 0];
          pulses.push({ a, b, t: 0, speed: 0.0007 + Math.random() * 0.0008, amber: Math.random() > 0.55 });
        }
        pulses = pulses.filter((p) => p.t <= 1);
        for (const p of pulses) {
          p.t += p.speed * dt;
          const a = nodes[p.a];
          const b = nodes[p.b];
          if (!a || !b) continue;
          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;
          const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
          const c = p.amber ? '245,196,107' : '143,180,255';
          g.addColorStop(0, `rgba(${c},0.95)`);
          g.addColorStop(1, `rgba(${c},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(48, now - last);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    resize();
    start();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [density, maxNodes, linkDistance, signals, reduced]);

  return <canvas ref={ref} className={`neural-field ${className}`} aria-hidden="true" />;
}
