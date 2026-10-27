import { useEffect, useRef } from "react";
import { gsap } from "../lib/motion";
import { philosophy } from "../content/companyContent";

/** Pinned narrative: three statements scrub in sequence while a blueprint structure builds. */
export default function Philosophy() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const n = philosophy.steps.length;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: `+=${n * 70}%`, pin: true, scrub: 0.6 },
      });
      gsap.set(".phil-step", { opacity: 0, y: 40 });
      gsap.set(".phil-line", { strokeDasharray: 1, strokeDashoffset: 1 });
      philosophy.steps.forEach((_, i) => {
        tl.to(`.phil-step-${i}`, { opacity: 1, y: 0, duration: 1 })
          .to(`.phil-group-${i} .phil-line`, { strokeDashoffset: 0, duration: 1, stagger: 0.1 }, "<")
          .to(".phil-bar", { scaleX: (i + 1) / n, duration: 1 }, "<");
        if (i < n - 1) tl.to(`.phil-step-${i}`, { opacity: 0, y: -40, duration: 0.6 }, "+=0.5");
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="philosophy" className="phil dark">
      <div className="grid-bg" aria-hidden="true" />
      <div className="wrap phil-inner">
        <p className="label mono">{philosophy.label}</p>
        <div className="phil-steps">
          {philosophy.steps.map((s, i) => (
            <div key={s.key} className={`phil-step phil-step-${i}`}>
              <h2 className="display big">{s.key}</h2>
              <p className="lead">{s.text}</p>
            </div>
          ))}
        </div>
        <svg className="phil-svg" viewBox="0 0 400 400" aria-hidden="true">
          <g className="phil-group-0" fill="none" stroke="#b8865a" strokeWidth="1.2">
            <path className="phil-line" pathLength={1} d="M40 360H360" />
            <path className="phil-line" pathLength={1} d="M80 360V220M200 360V220M320 360V220" />
          </g>
          <g className="phil-group-1" fill="none" stroke="#b8865a" strokeWidth="1.2">
            <path className="phil-line" pathLength={1} d="M60 220H340M60 150H340" />
            <path className="phil-line" pathLength={1} d="M80 220 200 150 320 220M80 150 200 220 320 150" />
          </g>
          <g className="phil-group-2" fill="none" stroke="#e8e2d6" strokeWidth="1.2">
            <path className="phil-line" pathLength={1} d="M40 150 200 40 360 150" />
            <path className="phil-line" pathLength={1} d="M200 40V360" />
          </g>
        </svg>
        <div className="phil-track" aria-hidden="true"><div className="phil-bar" /></div>
      </div>
    </section>
  );
}
