/** Shared scroll progress (0 = empty site, 1 = fully built). Written by ScrollTrigger, read by the 3D scene. */
export const build = { target: 0, value: 0 };

/** True when the device can reasonably run the WebGL hero. */
export function canUse3D(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (mem !== undefined && mem < 4) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}
