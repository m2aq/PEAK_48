import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";

/** Brief (~1.8s) cinematic reveal. Non-blocking: content is already in the DOM. */
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current!;
    if (reducedMotion()) {
      el.style.display = "none";
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          el.style.display = "none";
          window.dispatchEvent(new Event("intro:done"));
        },
      });
      tl.from(".intro-line", { scaleX: 0, duration: 0.7, stagger: 0.08 })
        .from(".intro-word span", { yPercent: 110, duration: 0.7, ease: "power4.out" }, 0.2)
        .from(".intro-sub", { opacity: 0, duration: 0.4 }, 0.7)
        .to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.85 }, 1.15);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="intro" aria-hidden="true" style={{ clipPath: "inset(0 0 0% 0)" }}>
      <div className="intro-inner">
        <span className="intro-line" />
        <div className="intro-word"><span>PEAK&nbsp;48</span></div>
        <span className="intro-sub">Construction</span>
        <span className="intro-line" />
      </div>
    </div>
  );
}
