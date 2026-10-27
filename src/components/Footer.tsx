import { useEffect, useRef } from "react";
import { gsap, reducedMotion } from "../lib/motion";
import { brand, nav } from "../content/companyContent";

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".foot-big span", { yPercent: 105, duration: 1.4, ease: "power4.out",
        scrollTrigger: { trigger: ".foot-big", start: "top 95%" } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className="footer dark">
      <div className="wrap foot-top">
        <nav aria-label="Footer">
          {nav.map((n) => <a key={n.id} href={`#${n.id}`} className="link-u">{n.label}</a>)}
        </nav>
        <p className="mono">{brand.tagline}</p>
        <a href="#top" className="link-u mono">Back to top ↑</a>
      </div>
      <div className="foot-big" aria-hidden="true"><span>PEAK 48</span></div>
      <div className="wrap foot-legal mono">
        <span>© {new Date().getFullYear()} {brand.full}. All rights reserved.</span>
      </div>
      <div className="seal">
        <span>Developed by <b>m<i>2</i>aq</b><em className="led" aria-hidden="true" /></span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
