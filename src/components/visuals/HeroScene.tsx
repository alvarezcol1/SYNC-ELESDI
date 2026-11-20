import { useMemo } from 'react';
import { TruckSilhouette } from './TruckSilhouette';

/** Deterministic PRNG so the skyline is identical on every render and build. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Building = { x: number; w: number; h: number; lights: [number, number][] };

function makeSkyline(): Building[] {
  const rand = mulberry32(214);
  const out: Building[] = [];
  let x = -20;
  while (x < 1640) {
    const w = 26 + rand() * 58;
    // A denser, taller downtown cluster left of centre, low sprawl elsewhere.
    const downtown = Math.exp(-((x - 420) ** 2) / (2 * 190 ** 2));
    const h = 18 + rand() * 40 + downtown * (90 + rand() * 170);
    const lights: [number, number][] = [];
    const n = Math.floor(h / 26);
    for (let i = 0; i < n; i++) if (rand() > 0.72) lights.push([x + 4 + rand() * (w - 8), 600 - 8 - rand() * (h - 14)]);
    out.push({ x, w, h, lights });
    x += w + rand() * 6;
  }
  return out;
}

export type Callout = { label: string; x: number; y: number; ly: number };

/**
 * Cinematic hero plate (viewBox 1600×900): dusk sky over a distant skyline,
 * an elevated highway, and a tractor-trailer tracking right-to-left with its
 * trailer running out of frame. Layers carry `data-depth` so CSS can parallax
 * them from `--scroll-y`. Callouts annotate the truck with coverage lines.
 */
export function HeroScene({ callouts, label }: { callouts: Callout[]; label: string }) {
  const skyline = useMemo(makeSkyline, []);
  const windows = useMemo(() => {
    let warm = '';
    let cool = '';
    skyline.forEach((b) =>
      b.lights.forEach(([lx, ly], j) => {
        const d = `M${lx.toFixed(1)} ${ly.toFixed(1)}h2v2h-2z`;
        if (j % 4) warm += d;
        else cool += d;
      }),
    );
    return { warm, cool };
  }, [skyline]);

  return (
    <svg className="hero-scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" role="img" aria-label={label}>
      <defs>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#02050d" />
          <stop offset="0.38" stopColor="#081227" />
          <stop offset="0.62" stopColor="#14254a" />
          <stop offset="0.7" stopColor="#2a3354" />
          <stop offset="0.74" stopColor="#3a3346" />
        </linearGradient>
        <radialGradient id="hs-dusk" cx="0.62" cy="0.67" r="0.6">
          <stop offset="0" stopColor="#f0b44c" stopOpacity="0.38" />
          <stop offset="0.35" stopColor="#c0703f" stopOpacity="0.12" />
          <stop offset="1" stopColor="#c0703f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hs-blue" cx="0.18" cy="0.55" r="0.55">
          <stop offset="0" stopColor="#3f7fff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#3f7fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hs-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1328" />
          <stop offset="0.35" stopColor="#060b18" />
          <stop offset="1" stopColor="#02040a" />
        </linearGradient>
        <linearGradient id="hs-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a3354" stopOpacity="0" />
          <stop offset="0.5" stopColor="#3a4a72" stopOpacity="0.35" />
          <stop offset="1" stopColor="#2a3354" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hs-streak" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f5c46b" stopOpacity="0" />
          <stop offset="0.5" stopColor="#f5c46b" stopOpacity="0.8" />
          <stop offset="1" stopColor="#f5c46b" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hs-streak-r" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ef5a5f" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ef5a5f" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ef5a5f" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hs-shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#030712" stopOpacity="0.92" />
          <stop offset="0.42" stopColor="#030712" stopOpacity="0.45" />
          <stop offset="0.7" stopColor="#030712" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="1600" height="900" fill="url(#hs-sky)" />
      <rect width="1600" height="900" fill="url(#hs-dusk)" />
      <rect width="1600" height="900" fill="url(#hs-blue)" />

      {/* Skyline (slowest parallax) */}
      <g data-depth="1" className="hero-scene__layer">
        {/* Buildings and lit windows as single paths (hundreds of rects → 4 nodes) */}
        <path d={skyline.filter((_, i) => i % 3).map((b) => `M${b.x} ${600 - b.h}h${b.w}v${b.h + 4}h${-b.w}z`).join('')} fill="#0c1834" />
        <path d={skyline.filter((_, i) => !(i % 3)).map((b) => `M${b.x} ${600 - b.h}h${b.w}v${b.h + 4}h${-b.w}z`).join('')} fill="#0a1530" />
        <path d={windows.warm} fill="#f5c46b" opacity="0.5" />
        <path d={windows.cool} fill="#d6dce5" opacity="0.45" />
        {/* Radio-tower beacon */}
        <line x1="452" y1="320" x2="452" y2="372" stroke="#2a3a62" strokeWidth="2" />
        <circle cx="452" cy="318" r="2.4" fill="#ef5a5f" className="beacon" />
        <rect y="560" width="1600" height="70" fill="url(#hs-haze)" />
      </g>

      {/* Far traffic streaks */}
      <g data-depth="2" className="hero-scene__layer">
        <g className="streaks streaks--far">
          {[0, 1].map((k) => (
            <g key={k} transform={`translate(${k * 1600} 0)`}>
              <rect x="80" y="606" width="220" height="1.6" fill="url(#hs-streak)" />
              <rect x="620" y="610" width="160" height="1.4" fill="url(#hs-streak-r)" />
              <rect x="980" y="604" width="260" height="1.6" fill="url(#hs-streak)" />
              <rect x="1360" y="609" width="140" height="1.2" fill="url(#hs-streak-r)" />
            </g>
          ))}
        </g>
      </g>

      {/* Highway deck */}
      <rect y="700" width="1600" height="200" fill="url(#hs-road)" />
      <rect y="696" width="1600" height="4" fill="#1c2b4e" />
      <rect y="700" width="1600" height="1" fill="#8fb4ff" opacity="0.3" />
      {/* Barrier posts (moving) */}
      <g className="posts">
        {Array.from({ length: 34 }, (_, i) => (
          <rect key={i} x={i * 100} y="674" width="3" height="22" fill="#1a2a4e" />
        ))}
        <rect x="0" y="674" width="3400" height="3" fill="#23365f" />
      </g>
      {/* Lane markings (moving) */}
      <g className="lanes">
        {Array.from({ length: 22 }, (_, i) => (
          <rect key={i} x={i * 160} y="866" width="80" height="4" fill="#d6dce5" opacity="0.32" />
        ))}
      </g>
      <rect y="893" width="1600" height="3" fill="#f0b44c" opacity="0.22" />

      <ellipse cx="1300" cy="822" rx="560" ry="26" fill="#000" opacity="0.55" />
      <ellipse cx="1180" cy="760" rx="520" ry="120" fill="url(#hs-dusk)" opacity="0.6" />

      {/* The truck: mirrored to drive right-to-left, trailer runs out of frame */}
      <g className="hero-scene__truck" transform="translate(2109 535) scale(-0.95 0.95)">
        <TruckSilhouette />
      </g>

      {/* Legibility shade for the copy column (left) */}
      <rect width="1600" height="900" fill="url(#hs-shade)" className="hero-scene__shade" />

      {/* Foreground motion-blurred guardrail (fastest parallax) */}

      {/* Coverage callouts: a dot on the truck, a rule up to a centred label */}
      <g className="hero-scene__callouts">
        {callouts.map((c, i) => (
          <g key={c.label} className="callout" style={{ ['--i' as string]: i }}>
            <path d={`M${c.x} ${c.y - 6} V${c.ly + 18}`} className="callout__line" />
            <circle cx={c.x} cy={c.y} r="11" className="callout__halo" />
            <circle cx={c.x} cy={c.y} r="3.4" className="callout__dot" />
            <text x={c.x} y={c.ly + 8} textAnchor="middle" className="callout__text">
              {c.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
