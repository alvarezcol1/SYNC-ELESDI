import { useId, type ReactNode } from 'react';
import { TruckSilhouette } from './TruckSilhouette';

export type SegmentId = 'owner' | 'company' | 'fleet';

function Frame({ children, label, sky }: { children: (u: string) => ReactNode; label: string; sky: [string, string, string] }) {
  const u = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 960 600" preserveAspectRatio="xMidYMid slice" className="segment-scene" role="img" aria-label={label}>
      <defs>
        <linearGradient id={`sky-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="0.62" stopColor={sky[1]} />
          <stop offset="0.75" stopColor={sky[2]} />
        </linearGradient>
        <radialGradient id={`sun-${u}`} cx="0.5" cy="0.72" r="0.5">
          <stop offset="0" stopColor="#f5c46b" stopOpacity="0.55" />
          <stop offset="0.4" stopColor="#c0703f" stopOpacity="0.15" />
          <stop offset="1" stopColor="#c0703f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`lamp-${u}`}>
          <stop offset="0" stopColor="#ffe9bd" stopOpacity="0.9" />
          <stop offset="0.25" stopColor="#f5c46b" stopOpacity="0.28" />
          <stop offset="1" stopColor="#f5c46b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`ground-${u}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0b1530" />
          <stop offset="1" stopColor="#02040a" />
        </linearGradient>
      </defs>
      <rect width="960" height="600" fill={`url(#sky-${u})`} />
      {children(u)}
    </svg>
  );
}

/** One truck, open road, first light. */
function Owner({ label }: { label: string }) {
  return (
    <Frame label={label} sky={['#050c1b', '#1a2a50', '#4a3a48']}>
      {(u) => (
        <>
          <rect width="960" height="600" fill={`url(#sun-${u})`} />
          {/* Mesas on the horizon */}
          <path d="M0 438 L120 430 L160 410 L250 408 L280 428 L520 432 L560 414 L640 412 L670 432 L960 440 V460 H0Z" fill="#0d1834" />
          <rect y="452" width="960" height="148" fill={`url(#ground-${u})`} />
          {/* Level highway */}
          <rect y="470" width="960" height="130" fill="#060b18" />
          <rect y="468" width="960" height="2" fill="#8fb4ff" opacity="0.22" />
          <path d="M0 572 H960" stroke="#d6dce5" strokeOpacity="0.3" strokeWidth="3" strokeDasharray="44 40" />
          <ellipse cx="520" cy="548" rx="330" ry="14" fill="#000" opacity="0.5" />
          <g transform="translate(860 388) scale(-0.52 0.52)">
            <TruckSilhouette spin={false} />
          </g>
        </>
      )}
    </Frame>
  );
}

/** Terminal at night: trailers backed in, rear doors and lamps. */
function Company({ label }: { label: string }) {
  const trailers = [80, 250, 420, 590, 760];
  return (
    <Frame label={label} sky={['#03070f', '#0b1730', '#16244a']}>
      {(u) => (
        <>
          {/* Terminal building */}
          <rect x="0" y="170" width="960" height="210" fill="#0a142b" />
          <rect x="0" y="170" width="960" height="3" fill="#8fb4ff" opacity="0.2" />
          {trailers.map((x) => (
            <rect key={`d${x}`} x={x - 6} y="214" width="132" height="160" fill="#060c1b" />
          ))}
          <rect y="372" width="960" height="228" fill={`url(#ground-${u})`} />
          {/* Lamps */}
          {[165, 505, 845].map((x) => (
            <g key={x}>
              <circle cx={x} cy="150" r="120" fill={`url(#lamp-${u})`} />
              <rect x={x - 14} y="146" width="28" height="5" rx="2" fill="#fff1d1" />
            </g>
          ))}
          {/* Trailer rears */}
          {trailers.map((x, i) => (
            <g key={x}>
              <rect x={x} y="232" width="120" height="196" rx="3" fill="#0e1a36" stroke="#8fb4ff" strokeOpacity="0.18" />
              <path d={`M${x + 60} 236 V424`} stroke="#03060e" strokeWidth="2" />
              {[30, 90].map((dx) => (
                <path key={dx} d={`M${x + dx} 244 V416`} stroke="#b4bdca" strokeOpacity="0.25" strokeWidth="2" />
              ))}
              <rect x={x + 4} y="430" width="112" height="10" fill="#070d1c" />
              <rect x={x + 6} y="404" width="10" height="16" rx="2" fill="#ef5a5f" opacity={i === 2 ? 1 : 0.75} />
              <rect x={x + 104} y="404" width="10" height="16" rx="2" fill="#ef5a5f" opacity={i === 2 ? 1 : 0.75} />
              {[42, 54, 66].map((dx) => (
                <circle key={dx} cx={x + dx + 6} cy="240" r="2" fill="#ef5a5f" />
              ))}
              <rect x={x + 16} y="440" width="34" height="34" rx="6" fill="#03050b" />
              <rect x={x + 70} y="440" width="34" height="34" rx="6" fill="#03050b" />
              {/* Wet-pavement reflection */}
              <rect x={x + 6} y="478" width="10" height="60" fill="#ef5a5f" opacity="0.12" />
              <rect x={x + 104} y="478" width="10" height="60" fill="#ef5a5f" opacity="0.12" />
            </g>
          ))}
          {/* Bay numbers as thin ticks, no text */}
          {trailers.map((x) => (
            <rect key={`t${x}`} x={x + 52} y="190" width="16" height="3" fill="#f0b44c" opacity="0.6" />
          ))}
        </>
      )}
    </Frame>
  );
}

/** Mixed fleet in formation at dusk: tractor, box truck, cargo van. */
function Fleet({ label }: { label: string }) {
  return (
    <Frame label={label} sky={['#050c1b', '#172a52', '#3a3346']}>
      {(u) => (
        <>
          <rect width="960" height="600" fill={`url(#sun-${u})`} opacity="0.7" />
          <rect y="430" width="960" height="170" fill={`url(#ground-${u})`} />
          <rect y="430" width="960" height="1" fill="#8fb4ff" opacity="0.25" />
          {/* Cargo van (back) */}
          <g transform="translate(470 352)" opacity="0.85">
            <path d="M0 80 V18 Q0 4 14 4 H150 Q166 4 178 24 L198 52 Q214 56 214 70 V80 Z" fill="#0d1834" stroke="#8fb4ff" strokeOpacity="0.25" />
            <path d="M152 12 L174 50 H140 V12 Z" fill="#203560" opacity="0.8" />
            <circle cx="44" cy="84" r="17" fill="#03050b" />
            <circle cx="170" cy="84" r="17" fill="#03050b" />
            <circle cx="208" cy="64" r="6" fill="#fff1d1" />
          </g>
          {/* Box truck (middle) */}
          <g transform="translate(70 300)">
            <rect x="0" y="0" width="250" height="120" rx="3" fill="#0f1d3d" stroke="#8fb4ff" strokeOpacity="0.25" />
            <path d="M256 120 V44 Q256 30 270 30 H310 L338 70 Q350 72 350 86 V120 Z" fill="#0d1834" stroke="#8fb4ff" strokeOpacity="0.25" />
            <path d="M298 38 L326 72 H290 V38 Z" fill="#203560" />
            <rect x="0" y="118" width="350" height="8" fill="#070d1c" />
            <circle cx="60" cy="132" r="20" fill="#03050b" />
            <circle cx="300" cy="132" r="20" fill="#03050b" />
            <circle cx="344" cy="98" r="6" fill="#fff1d1" />
            {[40, 125, 210].map((x) => (
              <circle key={x} cx={x} cy="114" r="2.2" fill="#f5c46b" />
            ))}
          </g>
          {/* Tractor (front, bobtail) */}
          <g transform="translate(250 296) scale(0.52)">
            <TruckSilhouette trailer={false} beam={false} spin={false} />
          </g>
          {/* Formation link lines */}
          <path d="M195 290 Q380 230 580 340" fill="none" stroke="#8fb4ff" strokeOpacity="0.35" strokeDasharray="3 6" />
          <circle cx="195" cy="290" r="4" fill="#f5c46b" />
          <circle cx="580" cy="340" r="4" fill="#f5c46b" />
          <circle cx="800" cy="310" r="4" fill="#f5c46b" />
          <path d="M580 340 Q690 290 800 310" fill="none" stroke="#8fb4ff" strokeOpacity="0.35" strokeDasharray="3 6" />
        </>
      )}
    </Frame>
  );
}

export function SegmentScene({ id, label }: { id: SegmentId; label: string }) {
  if (id === 'owner') return <Owner label={label} />;
  if (id === 'company') return <Company label={label} />;
  return <Fleet label={label} />;
}
