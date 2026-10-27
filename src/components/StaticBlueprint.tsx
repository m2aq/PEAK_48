/** Lightweight fallback for reduced-motion / low-power devices: a drawn building elevation. */
export default function StaticBlueprint() {
  const xs = [0, 1, 2, 3, 4].map((i) => 120 + i * 140);
  return (
    <svg className="hero-3d blueprint" viewBox="0 0 800 600" preserveAspectRatio="xMaxYMid meet" aria-hidden="true">
      <g fill="none" stroke="#b8865a" strokeWidth="1.2">
        <path d="M60 520H760" />
        {xs.map((x) => (
          <path key={x} d={`M${x} 520V150`} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M120 ${520 - i * 123}H680`} />
        ))}
        <path d="M120 150H680" strokeWidth="2" />
      </g>
    </svg>
  );
}
