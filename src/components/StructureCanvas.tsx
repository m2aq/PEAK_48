import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { build } from "../lib/buildProgress";

type Piece = {
  kind: "column" | "beam" | "slab" | "glass" | "base";
  pos: [number, number, number];
  size: [number, number, number];
  t0: number;
  dur: number;
};

const XS = [-3, -1, 1, 3];
const ZS = [-2, 0, 2];
const FLOORS = 3;
const H = 1.5;

/** Procedural steel-frame building. Order of pieces = order of construction. */
function makePieces(): Piece[] {
  const p: Piece[] = [];
  p.push({ kind: "base", pos: [0, -0.1, 0], size: [8.6, 0.2, 5.6], t0: 0, dur: 0.1 });
  for (let f = 0; f < FLOORS; f++) {
    const s = 0.1 + f * 0.27; // floor start
    XS.forEach((x, i) =>
      ZS.forEach((z, j) =>
        p.push({ kind: "column", pos: [x, f * H, z], size: [0.18, H, 0.18], t0: s + (i + j) * 0.012, dur: 0.07 }),
      ),
    );
    const y = (f + 1) * H;
    ZS.forEach((z, j) => p.push({ kind: "beam", pos: [0, y, z], size: [6.2, 0.12, 0.12], t0: s + 0.09 + j * 0.015, dur: 0.06 }));
    XS.forEach((x, i) => p.push({ kind: "beam", pos: [x, y, 0], size: [0.12, 0.12, 4.2], t0: s + 0.11 + i * 0.012, dur: 0.06 }));
    p.push({ kind: "slab", pos: [0, y + 0.07, 0], size: [6.6, 0.1, 4.6], t0: s + 0.17, dur: 0.08 });
  }
  // Envelope: glass panels on front and back faces
  const top = FLOORS * H;
  XS.slice(0, -1).forEach((x, i) => {
    [-2, 2].forEach((z) =>
      p.push({ kind: "glass", pos: [x + 1, top / 2, z], size: [1.9, top - 0.1, 0.03], t0: 0.9 + i * 0.02, dur: 0.1 }),
    );
  });
  return p;
}

const ease = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

const COPPER = new THREE.Color("#b8865a");
const STEEL = new THREE.Color("#2b2a27");
const STONE = new THREE.Color("#e8e2d6");

function Building() {
  const pieces = useMemo(makePieces, []);
  const refs = useRef<(THREE.Group | null)[]>([]);
  const root = useRef<THREE.Group>(null);
  const box = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(box), [box]);
  const { camera, size, pointer } = useThree();
  const wide = size.width / size.height > 1.1;

  useFrame((_, dt) => {
    build.value += (build.target - build.value) * Math.min(1, dt * 5);
    const p = build.value;
    pieces.forEach((pc, i) => {
      const g = refs.current[i];
      if (!g) return;
      const e = ease((p - pc.t0) / pc.dur);
      g.visible = e > 0.001;
      if (pc.kind === "column") g.scale.set(1, Math.max(e, 0.001), 1);
      else if (pc.kind === "slab" || pc.kind === "glass" || pc.kind === "base") {
        g.scale.set(Math.max(e, 0.001), 1, Math.max(e, 0.001));
        g.position.y = pc.pos[1] + (1 - e) * 1.2;
      } else g.scale.set(Math.max(e, 0.001), 1, Math.max(e, 0.001));
    });
    // Orbit: slow reveal around the structure, small pointer influence.
    const a = 0.75 + p * 1.5 + pointer.x * 0.12;
    const r = 13.5 - p * 1.5;
    camera.position.set(Math.sin(a) * r, 5 + p * 1.2 + pointer.y * 0.4, Math.cos(a) * r);
    camera.lookAt(0, 2.2, 0);
    if (root.current) root.current.position.set(wide ? 2.8 : 0, wide ? 0 : 1.2, 0);
  });

  return (
    <group ref={root} scale={wide ? 1 : 0.62}>
      {pieces.map((pc, i) => {
        const base = pc.kind === "column";
        const glass = pc.kind === "glass";
        return (
          <group key={i} ref={(el) => { refs.current[i] = el; }} position={base ? [pc.pos[0], pc.pos[1], pc.pos[2]] : pc.pos} visible={false}>
            <group position={[0, base ? pc.size[1] / 2 : 0, 0]} scale={pc.size}>
              <mesh geometry={box}>
                <meshStandardMaterial
                  color={pc.kind === "slab" || pc.kind === "base" ? STONE : STEEL}
                  roughness={0.7}
                  metalness={0.3}
                  transparent={glass || pc.kind === "slab"}
                  opacity={glass ? 0.18 : pc.kind === "slab" ? 0.55 : 1}
                />
              </mesh>
              <lineSegments geometry={edges}>
                <lineBasicMaterial color={COPPER} transparent opacity={glass ? 0.5 : 0.95} />
              </lineSegments>
            </group>
          </group>
        );
      })}
      <gridHelper args={[16, 16, "#b8865a", "#3a372f"]} position={[0, -0.21, 0]} />
    </group>
  );
}

export default function StructureCanvas() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering when the hero is off-screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="hero-3d" aria-hidden="true">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ fov: 32, position: [9, 5, 9], near: 0.1, far: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 10, 4]} intensity={1.8} color="#fff1dc" />
        <directionalLight position={[-6, 3, -6]} intensity={0.5} color="#b8865a" />
        <Building />
      </Canvas>
    </div>
  );
}
