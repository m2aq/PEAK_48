import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/motion";
import { brand, nav } from "../content/companyContent";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  // Scroll progress + hide on scroll down.
  useEffect(() => {
    let last = 0;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(bar.current, { scaleX: self.progress });
        const y = self.scroll();
        setHidden(y > last && y > 200);
        last = y;
      },
    });
    return () => st.kill();
  }, []);

  // Lock scroll + Escape closes menu.
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    document.body.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  return (
    <>
      <header className={`nav ${hidden && !open ? "nav-hidden" : ""}`}>
        <div ref={bar} className="progress" aria-hidden="true" />
        <a href="#top" className="logo" aria-label={`${brand.full} — home`} onClick={() => setOpen(false)}>
          <svg width="26" height="20" viewBox="0 0 26 20" aria-hidden="true">
            <path d="M1 19 10 3l5 8 3-4 7 12z" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span>PEAK <b>48</b></span>
        </a>
        <nav aria-label="Primary" className="nav-links">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="link-u">{n.label}</a>
          ))}
        </nav>
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </header>
      <div id="mobile-menu" className={`mobile-menu ${open ? "open" : ""}`} hidden={!open && false} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {nav.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} tabIndex={open ? 0 : -1} style={{ transitionDelay: open ? `${i * 60 + 150}ms` : "0ms" }} onClick={() => setOpen(false)}>
              <small>0{i + 1}</small>{n.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
