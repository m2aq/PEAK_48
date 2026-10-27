import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { gsap, SplitText, ScrollTrigger, reducedMotion } from "../lib/motion";
import { build, canUse3D } from "../lib/buildProgress";
import { hero } from "../content/companyContent";
import Magnetic from "./Magnetic";
import StaticBlueprint from "./StaticBlueprint";

const StructureCanvas = lazy(() => import("./StructureCanvas"));

const PHASES = ["01 — Foundation", "02 — Structure", "03 — Envelope"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [use3D] = useState(canUse3D);

  useEffect(() => {
    const el = root.current!;
    const reduced = reducedMotion();
    const ctx = gsap.context(() => {
      const split = SplitText.create(".hero-title .ln", { type: "chars", mask: "chars" });
      if (!reduced) {
        gsap.set(split.chars, { yPercent: 110 });
        gsap.set([".hero-eyebrow", ".hero-sub", ".hero-cta"], { opacity: 0 });
        let started = false;
        const go = () => {
          if (started) return;
          started = true;
          gsap
            .timeline({ defaults: { ease: "power4.out" } })
            .from(".hero-3d", { opacity: 0, duration: 1.6, ease: "power2.out" }, 0)
            .to(split.chars, { yPercent: 0, duration: 1.1, stagger: 0.025 }, 0.1)
            .to(".hero-eyebrow, .hero-sub, .hero-cta", { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.4)
            .from(".hero-draw", { strokeDashoffset: 1, duration: 2, ease: "power2.inOut" }, 0.2);
        };
        window.addEventListener("intro:done", go, { once: true });
        const t = window.setTimeout(go, 2600);

        gsap.set(".hero-draw", { strokeDasharray: 1 });

        // Pinned scroll: the building assembles while the headline steps aside.
        const phase = el.querySelector<HTMLElement>(".hud-phase");
        const pct = el.querySelector<HTMLElement>(".hud-pct");
        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: "+=240%",
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            build.target = self.progress;
            if (phase) phase.textContent = PHASES[Math.min(2, Math.floor(self.progress * 3))];
            if (pct) pct.textContent = `${String(Math.round(self.progress * 100)).padStart(3, "0")}%`;
          },
        });
        const copy = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=60%", scrub: true } });
        copy.to(".hero-content", { yPercent: -14, opacity: 0, ease: "none" });
        gsap.fromTo(".hero-hud", { opacity: 0 }, { opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "+=25%", scrub: true } });

        return () => {
          window.clearTimeout(t);
          window.removeEventListener("intro:done", go);
          build.target = 0;
          build.value = 0;
        };
      }
      // Reduced motion: show everything, fully built.
      build.target = 1;
      build.value = 1;
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="hero" aria-label="Introduction">
      <div className="grid-bg" aria-hidden="true" />
      {use3D ? (
        <Suspense fallback={null}>
          <StructureCanvas />
        </Suspense>
      ) : (
        <StaticBlueprint />
      )}
      <div className="hero-content wrap">
        <p className="hero-eyebrow mono">{hero.eyebrow}</p>
        <h1 className="hero-title" aria-label={hero.title.join(" ")}>
          {hero.title.map((l) => (
            <span key={l} className="ln" aria-hidden="true">{l}</span>
          ))}
        </h1>
        <p className="hero-sub">{hero.subtitle}</p>
        <div className="hero-cta">
          <Magnetic href="#contact">{hero.cta}</Magnetic>
          <Magnetic href="#capabilities" variant="line">{hero.cta2}</Magnetic>
        </div>
      </div>
      <div className="hero-hud mono" aria-hidden="true" style={{ opacity: reducedMotion() ? 1 : 0 }}>
        <span className="hud-phase">{PHASES[0]}</span>
        <span className="hud-bar"><i /></span>
        <span className="hud-pct">000%</span>
        <span className="hud-note">Conceptual structure</span>
      </div>
      <div className="scroll-cue mono" aria-hidden="true"><span />Scroll</div>
    </section>
  );
}
