import { useId } from 'react';

/**
 * Backlit American conventional tractor + 53' dry-van trailer, drawn in
 * truck-local coordinates: faces +x, ground at y = 300, length ≈ 1252.
 * Rendered as a night silhouette (rim light, amber marker lights, chrome
 * details) so it reads as cinematic rather than illustrative.
 *
 * Place it with a parent <g transform="…">; mirror with scale(-1, 1).
 */
export function TruckSilhouette({
  trailer = true,
  beam = true,
  spin = true,
}: {
  trailer?: boolean;
  beam?: boolean;
  spin?: boolean;
}) {
  const id = useId().replace(/:/g, '');
  const body = `tb-${id}`;
  const van = `tv-${id}`;
  const sheen = `ts-${id}`;
  const chrome = `tc-${id}`;
  const glass = `tg-${id}`;
  const rim = `tr-${id}`;
  const glow = `tgl-${id}`;
  const beamG = `tbm-${id}`;
  const amber = `ta-${id}`;
  const red = `trd-${id}`;

  const markerXs = [170, 330, 490, 650, 860];

  return (
    <g className="truck">
      <defs>
        <linearGradient id={body} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b3f6b" />
          <stop offset="0.4" stopColor="#14234a" />
          <stop offset="1" stopColor="#050a17" />
        </linearGradient>
        <linearGradient id={van} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a3c63" />
          <stop offset="0.5" stopColor="#152447" />
          <stop offset="1" stopColor="#070d1e" />
        </linearGradient>
        <linearGradient id={sheen} x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#8fb4ff" stopOpacity="0" />
          <stop offset="0.55" stopColor="#8fb4ff" stopOpacity="0" />
          <stop offset="0.72" stopColor="#c9d8ff" stopOpacity="0.2" />
          <stop offset="0.86" stopColor="#8fb4ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={chrome} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e6ebf2" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#6f7c92" />
          <stop offset="0.6" stopColor="#c9d1dd" />
          <stop offset="1" stopColor="#3a4559" />
        </linearGradient>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5d7fbf" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#1a2b52" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f0b44c" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={rim} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8fb4ff" stopOpacity="0.05" />
          <stop offset="0.6" stopColor="#bcd0ff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#f5c46b" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="#fff8e8" stopOpacity="1" />
          <stop offset="0.18" stopColor="#ffe3a8" stopOpacity="0.7" />
          <stop offset="1" stopColor="#f0b44c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={beamG} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff2d1" stopOpacity="0.3" />
          <stop offset="1" stopColor="#fff2d1" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={amber}>
          <stop offset="0" stopColor="#ffe2a3" />
          <stop offset="0.35" stopColor="#f0b44c" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f0b44c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={red}>
          <stop offset="0" stopColor="#ffb3b0" />
          <stop offset="0.35" stopColor="#d2363c" stopOpacity="0.9" />
          <stop offset="1" stopColor="#d2363c" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Headlight beam */}
      {beam && <polygon points="1246,190 1560,150 1560,290 1246,214" fill={`url(#${beamG})`} className="truck__beam" />}

      {/* Wet-road reflections */}
      <g opacity="0.55">
        <rect x="1228" y="304" width="30" height="46" fill={`url(#${amber})`} opacity="0.5" />
        {trailer && markerXs.map((x) => <rect key={x} x={x - 6} y="304" width="12" height="30" fill={`url(#${amber})`} opacity="0.45" />)}
      </g>

      {trailer && (
        <g className="truck__trailer">
          <rect x="0" y="30" width="880" height="192" rx="3" fill={`url(#${van})`} />
          {/* Corrugation / logistic posts */}
          <path
            d={Array.from({ length: 36 }, (_, i) => `M${14 + i * 24} 34V218`).join('')}
            stroke="#cfd9ec"
            strokeOpacity="0.045"
          />
          <rect x="0" y="30" width="880" height="192" rx="3" fill={`url(#${sheen})`} />
          {/* Top & bottom rails */}
          <rect x="0" y="30" width="880" height="5" fill="#26375c" />
          <rect x="0" y="216" width="880" height="9" fill="#0a1226" />
          {/* Side skirt */}
          <path d="M240 226 H664 L658 268 H246 Z" fill="#0a1328" />
          <path d="M240 226 H664" stroke="#8fb4ff" strokeOpacity="0.18" />
          {/* Rear bumper & landing gear */}
          <rect x="10" y="226" width="8" height="38" fill="#070d1c" />
          <rect x="4" y="262" width="62" height="6" rx="2" fill="#0d162c" />
          <rect x="690" y="226" width="8" height="56" fill="#0b1427" />
          <rect x="680" y="282" width="28" height="6" rx="2" fill="#0b1427" />
          {/* Rim light along the roofline */}
          <line x1="0" y1="30.5" x2="880" y2="30.5" stroke={`url(#${rim})`} strokeWidth="2.2" />
          {/* Marker lights */}
          {markerXs.map((x) => (
            <g key={x} className="truck__marker">
              <circle cx={x} cy="219" r="14" fill={`url(#${amber})`} opacity="0.6" />
              <circle cx={x} cy="219" r="2.6" fill="#ffe2a3" />
            </g>
          ))}
          <circle cx="872" cy="38" r="12" fill={`url(#${amber})`} opacity="0.65" />
          <circle cx="872" cy="38" r="2.4" fill="#ffe2a3" />
          <circle cx="8" cy="38" r="12" fill={`url(#${red})`} opacity="0.7" />
          <circle cx="8" cy="38" r="2.4" fill="#ffc9c6" />
          <rect x="0" y="196" width="6" height="18" rx="2" fill="#ef5a5f" />
          <circle cx="3" cy="205" r="22" fill={`url(#${red})`} opacity="0.55" />
          {/* Trailer tandem */}
          <Wheel cx={105} spin={spin} id={id} />
          <Wheel cx={185} spin={spin} id={id} />
        </g>
      )}

      {/* Tractor frame, fifth wheel, mud flap */}
      <rect x="760" y="236" width="150" height="12" fill="#070c1a" />
      <rect x="800" y="224" width="82" height="10" rx="2" fill="#0c1428" />
      <rect x="768" y="236" width="6" height="48" fill="#05080f" />

      {/* Cab + sleeper + hood */}
      <path
        d="M892 240 L892 62 Q892 40 914 40 L1040 40 Q1060 40 1068 50 L1086 58 L1122 128 L1222 136 Q1244 138 1248 160 L1252 236 L1252 254 L1197 254 A44 44 0 0 0 1111 254 L1111 240 Z"
        fill={`url(#${body})`}
      />
      <path
        d="M892 240 L892 62 Q892 40 914 40 L1040 40 Q1060 40 1068 50 L1086 58 L1122 128 L1222 136 Q1244 138 1248 160 L1252 236 L1252 254 L1197 254 A44 44 0 0 0 1111 254 L1111 240 Z"
        fill={`url(#${sheen})`}
      />
      {/* Rim light along roof, windshield and hood */}
      <path
        d="M892 62 Q892 40 914 40 L1040 40 Q1060 40 1068 50 L1086 58 L1122 128 L1222 136 Q1244 138 1248 160"
        fill="none"
        stroke={`url(#${rim})`}
        strokeWidth="2.4"
      />
      {/* Door, window, sleeper window */}
      <path d="M1056 66 L1090 66 L1114 124 L1056 124 Z" fill={`url(#${glass})`} />
      <path d="M1050 62 V236" stroke="#000" strokeOpacity="0.45" />
      <rect x="918" y="92" width="44" height="18" rx="5" fill="#16264a" opacity="0.8" />
      <path d="M1128 142 L1220 148" stroke="#8fb4ff" strokeOpacity="0.22" />
      {/* Mirror */}
      <path d="M1112 92 L1124 92" stroke="#3a4559" strokeWidth="2" />
      <rect x="1121" y="72" width="7" height="44" rx="2" fill="#0d1731" stroke={`url(#${chrome})`} strokeWidth="1" />
      {/* Exhaust stack */}
      <rect x="1040" y="4" width="9" height="236" rx="3" fill={`url(#${chrome})`} opacity="0.85" />
      {/* Grille & bumper */}
      <rect x="1244" y="160" width="8" height="76" fill={`url(#${chrome})`} opacity="0.75" />
      <rect x="1196" y="242" width="58" height="12" rx="3" fill={`url(#${chrome})`} opacity="0.7" />
      {/* Fuel tank */}
      <rect x="944" y="230" width="140" height="34" rx="16" fill={`url(#${chrome})`} opacity="0.55" />
      <rect x="944" y="230" width="140" height="34" rx="16" fill="none" stroke="#000" strokeOpacity="0.4" />
      {/* Cab clearance lights */}
      {[
        [1046, 42],
        [1054, 43.5],
        [1061, 46.5],
        [1068, 50.5],
        [1075, 54],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="1.9" fill="#ffd27f" className="truck__clearance" />
      ))}
      {/* Headlight */}
      <circle cx="1243" cy="196" r="46" fill={`url(#${glow})`} className="truck__headlight" />
      <ellipse cx="1244" cy="196" rx="5" ry="9" fill="#fffaf0" />

      {/* Tractor axles */}
      <Wheel cx={818} spin={spin} id={id} />
      <Wheel cx={896} spin={spin} id={id} />
      <Wheel cx={1154} spin={spin} id={id} />
    </g>
  );
}

function Wheel({ cx, spin, id }: { cx: number; spin: boolean; id: string }) {
  return (
    <g>
      <circle cx={cx} cy="264" r="36" fill="#03050b" />
      <circle cx={cx} cy="264" r="35" fill="none" stroke="#8fb4ff" strokeOpacity="0.12" />
      <circle cx={cx} cy="264" r="23" fill="#0c1428" stroke={`url(#tc-${id})`} strokeOpacity="0.5" strokeWidth="2" />
      <g className={spin ? 'wheel-spin' : undefined}>
        {[0, 72, 144, 216, 288].map((a) => (
          <circle
            key={a}
            cx={cx + Math.cos((a * Math.PI) / 180) * 14}
            cy={264 + Math.sin((a * Math.PI) / 180) * 14}
            r="2.2"
            fill="#9aa6b8"
            fillOpacity="0.7"
          />
        ))}
        <circle cx={cx} cy="264" r="7" fill="#5a667a" />
      </g>
    </g>
  );
}
