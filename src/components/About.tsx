import { useEffect, useRef } from "react";
import { gsap, SplitText, reducedMotion } from "../lib/motion";
import { about } from "../content/companyContent";
import Scene from "./Scene";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      const split = SplitText.create(".about-h", { type: "lines", mask: "lines", autoSplit: true,
        onSplit: (s) =>
          gsap.from(s.lines, { yPercent: 105, duration: 1, stagger: 0.1, ease: "power4.out",
            scrollTrigger: { trigger: ".about-h", start: "top 82%" } }),
      });
      gsap.from(".about-img", { clipPath: "inset(100% 0 0 0)", duration: 1.4, ease: "power4.inOut",
        scrollTrigger: { trigger: ".about-img", start: "top 80%" } });
      gsap.from(".about-img .scene", { scale: 1.25, duration: 1.8, ease: "power3.out",
        scrollTrigger: { trigger: ".about-img", start: "top 80%" } });
      gsap.to(".about-img .scene", { yPercent: 8, ease: "none",
        scrollTrigger: { trigger: ".about-img", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(".about-p", { y: 30, opacity: 0, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".about-p", start: "top 85%" } });
      return () => split.revert();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="section light">
      <div className="wrap about-grid">
        <div>
          <p className="label mono">{about.label}</p>
          <h2 className="about-h display">{about.heading}</h2>
          {about.body.map((p) => (
            <p key={p} className="about-p lead">{p}</p>
          ))}
        </div>
        <figure className="about-img">
          <Scene variant={2} />
          <figcaption className="mono cap">Conceptual illustration</figcaption>
        </figure>
      </div>
    </section>
  );
}
