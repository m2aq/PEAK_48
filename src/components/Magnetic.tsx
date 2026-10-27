import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "../lib/motion";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: "solid" | "line";
  type?: "button" | "submit";
  onClick?: () => void;
};

/** Button with subtle magnetic pull (fine pointers only) and animated arrow. */
export default function Magnetic({ href, children, variant = "solid", type = "button", onClick }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(el);
    };
  }, []);

  const inner = (
    <>
      <span className="btn-fill" aria-hidden="true" />
      <span className="btn-label">{children}</span>
      <svg className="btn-arrow" width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
        <path d="M0 6h16M11 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </>
  );

  return href ? (
    <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={`btn btn-${variant}`}>
      {inner}
    </a>
  ) : (
    <button ref={ref as React.RefObject<HTMLButtonElement>} type={type} onClick={onClick} className={`btn btn-${variant}`}>
      {inner}
    </button>
  );
}
