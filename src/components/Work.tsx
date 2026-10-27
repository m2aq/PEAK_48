import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { work } from "../content/companyContent";
import Scene from "./Scene";

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".work-item").forEach((it, i) => {
        const trigger = { trigger: it, start: "top 85%" };
        gsap.from(it.querySelector(".work-frame"), { clipPath: "inset(0 0 100% 0)", duration: 1.3, ease: "power4.inOut", scrollTrigger: trigger });
        gsap.from(it.querySelector(".scene"), { scale: 1.3, duration: 1.8, ease: "power3.out", scrollTrigger: trigger });
        gsap.from(it.querySelector(".work-meta"), { opacity: 0, y: 20, duration: 0.9, delay: 0.3, scrollTrigger: trigger });
        gsap.to(it.querySelector(".work-frame"), { y: i % 2 ? -40 : 30, ease: "none",
          scrollTrigger: { trigger: it, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="work" className="section dark-soft">
      <div className="wrap">
        <p className="label mono">{work.label}</p>
        <h2 className="display">{work.heading}</h2>
        <div className="work-grid">
          {work.items.map((w) => (
            <article key={w.title} className={`work-item work-${w.size}`}>
              <div className="work-frame">
                <Scene variant={w.scene} label={`Conceptual illustration for ${w.title}`} />
                <span className="work-tag mono">Concept</span>
              </div>
              <div className="work-meta">
                <h3>{w.title}</h3>
                <p className="mono">{w.meta}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="note mono">{work.disclaimer}</p>
      </div>
    </section>
  );
}
