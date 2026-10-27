import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { capabilities } from "../content/companyContent";
import Scene from "./Scene";

export default function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".cap-row", { opacity: 0, y: 40, stagger: 0.12, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".cap-list", start: "top 80%" } });
      gsap.from(".cap-rule", { scaleX: 0, transformOrigin: "left", stagger: 0.12, duration: 1.2, ease: "power3.inOut",
        scrollTrigger: { trigger: ".cap-list", start: "top 80%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="capabilities" className="section light">
      <div className="wrap">
        <p className="label mono">{capabilities.label}</p>
        <h2 className="display">{capabilities.heading}</h2>
        <ul className="cap-list">
          {capabilities.items.map((c) => (
            <li key={c.n} className="cap-row">
              <span className="cap-rule" aria-hidden="true" />
              <a href="#contact" className="cap-link">
                <span className="mono cap-n">{c.n}</span>
                <span className="cap-title">{c.title}</span>
                <span className="cap-text">{c.text}</span>
                <svg className="cap-arrow" width="28" height="18" viewBox="0 0 18 12" aria-hidden="true">
                  <path d="M0 6h16M11 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
                <span className="cap-preview" aria-hidden="true"><Scene variant={c.scene} /></span>
              </a>
            </li>
          ))}
        </ul>
        <p className="note mono">{capabilities.note}</p>
      </div>
    </section>
  );
}
