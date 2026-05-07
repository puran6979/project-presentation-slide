/**
 * WalkingCat — 3-D gimmick for the MeetTheTeam slide.
 * After `delay` ms the cat walks in from the right edge using the
 * "03_Walk_LittleFriends" animation, then switches to "02_Idle_LittleFriends".
 */
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import catGlb from "../../assets/models/little_cat/scene.glb?url";

const CAT_URL = catGlb;

// Preload so the first visit doesn't stall on download
useGLTF.preload(CAT_URL);

// ─── Walking speed (world-units / second) ───────────────────────────────────
const WALK_SPEED = 0.65;
// World-X where the cat enters (off-screen right)
const START_X = 6.0;
// World-X where the cat stops — bottom-right area, not all the way across
const STOP_X = 3.0;
// Duration (seconds) of the turn-CCW rotation after stopping
const TURN_DURATION = 0.6;

// ─── Inner 3-D mesh ──────────────────────────────────────────────────────────
function CatMesh({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const { scene, animations } = useGLTF(CAT_URL);
  const { actions } = useAnimations(animations, group);

  const xRef = useRef(START_X);
  const stopped = useRef(false);
  // Turning state: 0 = not turning, > 0 = turning progress in [0,1]
  const turnProgress = useRef(0);
  // rotation-y at walk time (facing left = -PI/2)
  const WALK_ROT = -Math.PI / 2;
  // target rotation after CCW 90° turn (faces toward viewer / away from right)
  const IDLE_ROT = WALK_ROT + Math.PI / 2; // = 0

  useEffect(() => {
    if (!active) return;
    xRef.current = START_X;
    stopped.current = false;
    turnProgress.current = 0;
    if (group.current) {
      group.current.position.x = START_X;
      group.current.rotation.y = WALK_ROT;
    }
    actions["03_Walk_LittleFriends"]?.reset().fadeIn(0.25).play();
  }, [active, actions]);

  useFrame((_, dt) => {
    if (!active || !group.current) return;

    if (!stopped.current) {
      xRef.current -= dt * WALK_SPEED;
      group.current.position.x = xRef.current;

      if (xRef.current <= STOP_X) {
        stopped.current = true;
        turnProgress.current = 0;
        // Cross-fade walk → idle
        const idle = actions["02_Idle_LittleFriends"];
        const walk = actions["03_Walk_LittleFriends"];
        if (idle && walk) {
          idle.reset().setEffectiveTimeScale(1).setEffectiveWeight(1);
          idle.crossFadeFrom(walk, 0.4, true);
          idle.play();
        }
      }
    } else if (turnProgress.current < 1) {
      // Smoothly rotate CCW 90° over TURN_DURATION seconds
      turnProgress.current = Math.min(
        1,
        turnProgress.current + dt / TURN_DURATION,
      );
      const t = turnProgress.current;
      // ease-in-out cubic
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      group.current.rotation.y = WALK_ROT + (IDLE_ROT - WALK_ROT) * ease;
    }
  });

  return (
    <group
      ref={group}
      position={[START_X, -1.6, 0]}
      rotation={[0, WALK_ROT, 0]}
    >
      <primitive object={scene} scale={2.3} />
    </group>
  );
}

// ─── Exported overlay ────────────────────────────────────────────────────────
export function WalkingCat({ delayMs = 5000 }: { delayMs?: number }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      {/*
        Camera: slightly elevated, looking at the scene center.
        fov 45 at z=7 → visible world width ≈ ±5.5 units, height ≈ ±3.1 units.
        Cat y=-1.6 puts it in the bottom third of the frame.
      */}
      <Canvas
        camera={{ position: [0, 0.6, 7], fov: 38 }}
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >
        {/* Soft two-point lighting so the fur texture reads well */}
        <ambientLight intensity={1.8} />
        <directionalLight
          position={[4, 10, 6]}
          intensity={1.2}
          castShadow={false}
        />
        <Suspense fallback={null}>
          <CatMesh active={active} />
        </Suspense>
      </Canvas>
    </div>
  );
}
