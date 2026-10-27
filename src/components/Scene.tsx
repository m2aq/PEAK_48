import { useMemo } from "react";

/**
 * Procedural architectural/mountain illustration (SVG).
 * Conceptual art only — not a photograph and not a PEAK 48 project.
 */
function rng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function ridge(r: () => number, base: number, amp: number, steps: number) {
  let d = `M0 600 L0 ${base}`;
  for (let i = 1; i <= steps; i++) {
    const x = (i / steps) * 800;
    const y = base - r() * amp;
    d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d + " L800 600 Z";
}

const tones = [
  ["#d9d2c6", "#b9ae9d", "#8d8374", "#5b544a", "#2a2723"],
  ["#cfc6b8", "#a99b86", "#7a6c5a", "#4d443a", "#221f1b"],
  ["#e1dbd0", "#c2b6a3", "#95887a", "#5f574c", "#2c2925"],
];

export default function Scene({ variant = 0, label }: { variant?: number; label?: string }) {
  const art = useMemo(() => {
    const r = rng(variant + 3);
    const t = tones[variant % tones.length];
    const layers = [
      { d: ridge(r, 330, 140, 9), fill: t[0], o: 0.9 },
      { d: ridge(r, 390, 130, 11), fill: t[1], o: 0.95 },
      { d: ridge(r, 450, 110, 13), fill: t[2], o: 1 },
      { d: ridge(r, 520, 80, 15), fill: t[3], o: 1 },
    ];
    const beams = Array.from({ length: 6 }, (_, i) => 90 + i * 110 + (variant % 2) * 20);
    return { layers, t, beams };
  }, [variant]);

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label ?? "Conceptual architectural illustration"}
      className="scene"
    >
      <defs>
        <linearGradient id={`sky${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe9de" />
          <stop offset="1" stopColor={art.t[0]} />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#sky${variant})`} />
      <circle cx={560 - variant * 60} cy="170" r="46" fill="#b8865a" opacity="0.55" />
      {art.layers.map((l, i) => (
        <path key={i} d={l.d} fill={l.fill} opacity={l.o} data-depth={(i + 1) * 0.25} className="scene-layer" />
      ))}
      <g stroke={art.t[4]} strokeWidth="1.4" fill="none" opacity="0.85" className="scene-frame">
        <path d="M60 600V380H740V600" />
        <path d="M60 380 400 250 740 380" />
        {art.beams.map((x) => (
          <path key={x} d={`M${x} 600V380L${x + 55} 315`} />
        ))}
        <path d="M60 470H740M60 540H740" opacity="0.5" />
      </g>
      <rect y="540" width="800" height="60" fill={art.t[4]} />
    </svg>
  );
}
