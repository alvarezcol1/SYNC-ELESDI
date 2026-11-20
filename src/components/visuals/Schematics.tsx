import { useId, type ReactNode } from 'react';
import type { SolutionId } from '../../data/solutions';

/* ------------------------------------------------------------------ */
/* Shared drawing helpers                                              */
/* ------------------------------------------------------------------ */

type P = [number, number];
const pts = (a: P[]) => a.map((p) => p.join(',')).join(' ');

/** Isometric projector centred at (ox, oy) with unit size s. */
function isoProjector(ox: number, oy: number, s: number) {
  return (x: number, y: number, z: number): P => [ox + (x - y) * 0.866 * s, oy + (x + y) * 0.5 * s - z * s];
}

function IsoBox({
  iso,
  x,
  y,
  z = 0,
  w,
  d,
  h,
  tone = 'line',
}: {
  iso: ReturnType<typeof isoProjector>;
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  tone?: 'line' | 'accent' | 'amber';
}) {
  const top: P[] = [iso(x, y, z + h), iso(x + w, y, z + h), iso(x + w, y + d, z + h), iso(x, y + d, z + h)];
  const right: P[] = [iso(x + w, y, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x + w, y, z + h)];
  const left: P[] = [iso(x, y + d, z), iso(x + w, y + d, z), iso(x + w, y + d, z + h), iso(x, y + d, z + h)];
  return (
    <g className={`sk-box sk-box--${tone}`}>
      <polygon points={pts(top)} className="sk-face sk-face--top" />
      <polygon points={pts(right)} className="sk-face sk-face--right" />
      <polygon points={pts(left)} className="sk-face sk-face--left" />
    </g>
  );
}

/** Line-art tractor-trailer in profile; same proportions as the hero truck. */
function TruckOutline({ x, y, s, trailer = true }: { x: number; y: number; s: number; trailer?: boolean }) {
  const cab = 'M892 240 L892 62 Q892 40 914 40 L1040 40 Q1060 40 1068 50 L1086 58 L1122 128 L1222 136 Q1244 138 1248 160 L1252 254 L760 254 L760 236';
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="sk-truck">
      {trailer && <rect x="0" y="30" width="880" height="192" rx="3" vectorEffect="non-scaling-stroke" />}
      <path d={cab} vectorEffect="non-scaling-stroke" />
      <path d="M1056 66 L1090 66 L1114 124 L1056 124 Z" vectorEffect="non-scaling-stroke" className="sk-truck__glass" />
      {(trailer ? [105, 185, 818, 896, 1154] : [818, 896, 1154]).map((cx) => (
        <circle key={cx} cx={cx} cy="264" r="36" vectorEffect="non-scaling-stroke" />
      ))}
      <circle cx="1244" cy="196" r="12" className="sk-node-fill" />
    </g>
  );
}

function Plate({ children, label, className = '' }: { children: ReactNode; label: string; className?: string }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 480 320" className={`plate ${className}`} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`pl-grid-${uid}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" className="plate__grid" />
        </pattern>
        <radialGradient id={`pl-vig-${uid}`} cx="0.5" cy="0.45" r="0.75">
          <stop offset="0.55" stopColor="#050c1b" stopOpacity="0" />
          <stop offset="1" stopColor="#050c1b" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <rect width="480" height="320" className="plate__bg" />
      <rect width="480" height="320" fill={`url(#pl-grid-${uid})`} />
      {children}
      <rect width="480" height="320" fill={`url(#pl-vig-${uid})`} pointerEvents="none" />
    </svg>
  );
}

const Node = ({ x, y, pulse = false }: { x: number; y: number; pulse?: boolean }) => (
  <g className={pulse ? 'sk-node sk-node--pulse' : 'sk-node'}>
    <circle cx={x} cy={y} r="9" className="sk-node__halo" />
    <circle cx={x} cy={y} r="3" className="sk-node__dot" />
  </g>
);

/* ------------------------------------------------------------------ */
/* Solution plates                                                     */
/* ------------------------------------------------------------------ */

function AutoLiability() {
  return (
    <>
      <line x1="0" y1="236" x2="480" y2="236" className="sk-ground" />
      <line x1="0" y1="262" x2="480" y2="262" className="sk-lane" />
      <TruckOutline x={30} y={150} s={0.2} />
      {/* Third-party vehicle */}
      <path d="M352 236 V214 Q352 206 360 205 L378 204 L392 190 Q396 186 404 186 H436 Q444 186 448 194 L456 206 Q464 207 464 216 V236" className="sk-line" />
      <circle cx="372" cy="238" r="9" className="sk-line" />
      <circle cx="440" cy="238" r="9" className="sk-line" />
      {/* Liability envelope */}
      <rect x="18" y="128" width="452" height="128" rx="22" className="sk-envelope" />
      <rect x="18" y="128" width="452" height="128" rx="22" className="sk-flow" />
      <path d="M282 186 C310 160 336 162 360 186" className="sk-accent sk-dash" />
      <Node x={281} y={186} pulse />
      <Node x={362} y={186} />
      <Node x={240} y={92} />
      <path d="M240 101 V128" className="sk-accent" />
    </>
  );
}

function Cargo() {
  const iso = isoProjector(250, 92, 1);
  return (
    <>
      {/* Trailer shell (floor + back wall + side wall cut away) */}
      <polygon points={pts([iso(0, 0, 0), iso(220, 0, 0), iso(220, 90, 0), iso(0, 90, 0)])} className="sk-face sk-face--floor" />
      <polygon points={pts([iso(0, 0, 0), iso(220, 0, 0), iso(220, 0, 90), iso(0, 0, 90)])} className="sk-wall" />
      <polygon points={pts([iso(0, 0, 0), iso(0, 90, 0), iso(0, 90, 90), iso(0, 0, 90)])} className="sk-wall" />
      <polyline points={pts([iso(0, 90, 90), iso(220, 90, 90), iso(220, 0, 90)])} className="sk-dash sk-line" />
      <polyline points={pts([iso(220, 90, 0), iso(220, 90, 90)])} className="sk-dash sk-line" />
      {/* Palletised freight */}
      {[
        [12, 8, 40, 'line'],
        [12, 48, 52, 'accent'],
        [64, 8, 56, 'line'],
        [64, 48, 36, 'line'],
        [116, 8, 44, 'amber'],
        [116, 48, 48, 'line'],
        [168, 30, 30, 'line'],
      ].map(([x, y, h, tone], i) => (
        <g key={i}>
          <IsoBox iso={iso} x={x as number} y={y as number} w={44} d={34} h={5} />
          <IsoBox iso={iso} x={(x as number) + 2} y={(y as number) + 2} z={5} w={40} d={30} h={h as number} tone={tone as 'line'} />
        </g>
      ))}
      <Node x={iso(138, 25, 52)[0]} y={iso(138, 25, 52)[1]} pulse />
      <path d={`M${iso(138, 25, 52).join(' ')} L${iso(138, 25, 52)[0]} 40 H420`} className="sk-accent sk-dash" />
    </>
  );
}

function PhysicalDamage() {
  return (
    <>
      <line x1="0" y1="252" x2="480" y2="252" className="sk-ground" />
      <TruckOutline x={-136} y={92} s={0.42} trailer={false} />
      {/* Dimension lines */}
      <path d="M184 64 H392 M184 58 V70 M392 58 V70" className="sk-accent" />
      <path d="M440 108 V252 M434 108 H446 M434 252 H446" className="sk-accent" />
      {/* Inspection reticles */}
      {[
        [388, 175],
        [313, 205],
        [348, 203],
      ].map(([x, y]) => (
        <g key={`${x}`} className="sk-reticle">
          <circle cx={x} cy={y} r="16" />
          <path d={`M${x - 24} ${y} H${x - 10} M${x + 10} ${y} H${x + 24} M${x} ${y - 24} V${y - 10} M${x} ${y + 10} V${y + 24}`} />
        </g>
      ))}
      <Node x={388} y={175} pulse />
      <rect x="150" y="70" width="2" height="190" className="sk-scan" />
    </>
  );
}

function GeneralLiability() {
  const iso = isoProjector(210, 110, 1);
  return (
    <>
      <polygon points={pts([iso(-40, -20, 0), iso(260, -20, 0), iso(260, 170, 0), iso(-40, 170, 0)])} className="sk-face sk-face--floor" />
      {/* Warehouse */}
      <IsoBox iso={iso} x={0} y={0} w={150} d={90} h={70} />
      {/* Dock doors on the +y face */}
      {[14, 58, 102].map((dx) => (
        <polygon
          key={dx}
          points={pts([iso(dx, 90, 0), iso(dx + 32, 90, 0), iso(dx + 32, 90, 44), iso(dx, 90, 44)])}
          className={dx === 58 ? 'sk-door sk-door--active' : 'sk-door'}
        />
      ))}
      {/* Trailer backed into the middle door */}
      <IsoBox iso={iso} x={62} y={98} w={24} d={70} h={34} tone="accent" />
      {/* Office annex */}
      <IsoBox iso={iso} x={154} y={20} w={44} d={50} h={32} />
      <Node x={iso(74, 94, 0)[0]} y={iso(74, 94, 0)[1]} pulse />
      <Node x={iso(176, 72, 0)[0]} y={iso(176, 72, 0)[1]} />
      <path d={`M${iso(74, 94, 0).join(' ')} Q ${iso(140, 110, 0).join(' ')} ${iso(176, 72, 0).join(' ')}`} className="sk-accent sk-dash" />
    </>
  );
}

function WorkersComp() {
  return (
    <>
      <line x1="0" y1="272" x2="480" y2="272" className="sk-ground" />
      {/* Cab side, close up */}
      <path d="M90 272 V60 Q90 40 110 40 H250 L300 150 H420 Q440 150 444 170 V250" className="sk-line" />
      <path d="M180 56 H246 L286 146 H180 Z" className="sk-line sk-truck__glass" />
      <path d="M172 50 V250 H300 V150" className="sk-line" />
      {/* Steps */}
      <rect x="182" y="256" width="58" height="8" rx="2" className="sk-accent" />
      <rect x="182" y="226" width="58" height="8" rx="2" className="sk-accent" />
      {/* Grab handle */}
      <path d="M160 110 V220" className="sk-accent" strokeWidth="3" />
      <circle cx="372" cy="272" r="44" className="sk-line" />
      {/* Hard hat */}
      <g transform="translate(340 60)">
        <path d="M4 48 Q4 8 44 6 Q84 8 84 48 Z" className="sk-line" />
        <path d="M-6 48 H94 V56 H-6 Z" className="sk-line" />
        <path d="M44 6 V48 M28 10 Q24 26 24 48 M60 10 Q64 26 64 48" className="sk-accent" />
      </g>
      {/* Three points of contact */}
      <Node x={160} y={130} pulse />
      <Node x={160} y={205} />
      <Node x={211} y={260} />
      <path d="M160 130 L160 205 L211 260" className="sk-flow-path" />
    </>
  );
}

function Umbrella() {
  const iso = isoProjector(240, 70, 1);
  return (
    <>
      <polygon points={pts([iso(0, 0, -120), iso(160, 0, -120), iso(160, 120, -120), iso(0, 120, -120)])} className="sk-face sk-face--floor" />
      <IsoBox iso={iso} x={20} y={45} z={-120} w={120} d={30} h={30} />
      {[0, 1, 2].map((i) => (
        <polygon
          key={i}
          points={pts([iso(-10, -10, -70 + i * 38), iso(170, -10, -70 + i * 38), iso(170, 130, -70 + i * 38), iso(-10, 130, -70 + i * 38)])}
          className={`sk-plane sk-plane--${i}`}
        />
      ))}
      {[
        [-10, -10],
        [170, -10],
        [170, 130],
        [-10, 130],
      ].map(([x, y]) => (
        <path key={`${x}${y}`} d={`M${iso(x, y, -70).join(' ')} L${iso(x, y, 6).join(' ')}`} className="sk-line sk-dash" />
      ))}
      <Node x={iso(80, 60, 6)[0]} y={iso(80, 60, 6)[1]} pulse />
    </>
  );
}

const solutionPlates: Record<SolutionId, () => JSX.Element> = {
  autoLiability: AutoLiability,
  cargo: Cargo,
  physicalDamage: PhysicalDamage,
  generalLiability: GeneralLiability,
  workersComp: WorkersComp,
  umbrella: Umbrella,
};

export function SolutionPlate({ id, label }: { id: SolutionId; label: string }) {
  const Draw = solutionPlates[id];
  return (
    <Plate label={label} className={`plate--${id}`}>
      <Draw />
    </Plate>
  );
}
