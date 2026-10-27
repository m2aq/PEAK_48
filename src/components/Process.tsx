import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { process } from "../content/companyContent";

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".proc-step", { opacity: 0, y: 50, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".proc-list", start: "top 80%" } });
      gsap.fromTo(".proc-line", { scaleX: 0 }, { scaleX: 1, ease: "none", transformOrigin: "left",
        scrollTrigger: { trigger: ".proc-list", start: "top 75%", end: "bottom 60%", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="process" className="section light">
      <div className="wrap">
        <p className="label mono">{process.label}</p>
        <h2 className="display">{process.heading}</h2>
        <ol className="proc-list">
          <span className="proc-line" aria-hidden="true" />
          {process.steps.map((s) => (
            <li key={s.n} className="proc-step">
              <span className="mono proc-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="note mono">Process copy is proposed and pending client approval.</p>
      </div>
    </section>
  );
}
