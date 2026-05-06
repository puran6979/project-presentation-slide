/* eslint-disable react/no-unknown-property */
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import type { RigidBodyProps } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

import cardGLB from "../../assets/models/card.glb";
import lanyard from "../../assets/images/textures/lanyard.png";

import "./Lanyard.css";

extend({ MeshLineGeometry, MeshLineMaterial });

// ─── Card face texture drawn on a canvas ──────────────────────────────────────

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function useCardTexture(name: string, image?: HTMLImageElement | null): THREE.CanvasTexture {
  return useMemo(() => {
    const W = 1024,
      H = 1440;
    const HALF = W / 2; // 512 — each face occupies one half of the UV map (left/right)

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // Pre-compensate for GLB UV orientation: card face is mapped 180° rotated
    ctx.translate(W, H);
    ctx.scale(-1, -1);

    // Draw the card face design into a given half of the texture.
    function drawFace(xOffset: number, mirror = false) {
      ctx.save();
      if (mirror) {
        ctx.translate(xOffset + HALF, 0);
        ctx.scale(-0.5, 0.85);
      } else {
        ctx.translate(xOffset, 0);
        ctx.scale(0.5, 0.85);
      }

      // ── Background ──
      ctx.fillStyle = "#faeaf2ff"; // Soft lavender tint
      ctx.fillRect(0, 0, W, H);

      // ── Purple header band ──
      const headerGrad = ctx.createLinearGradient(0, 0, W, 0);
      headerGrad.addColorStop(0, "#7C3AED");
      headerGrad.addColorStop(1, "#A855F7");
      ctx.fillStyle = headerGrad;
      ctx.fillRect(0, 0, W, 380);

      // Small target icon top-right
      const ix = W - 90,
        iy = 60,
        ir = 36;
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 4;
      [ir, ir * 0.6, ir * 0.22].forEach((r) => {
        ctx.beginPath();
        ctx.arc(ix, iy, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // ── Avatar circle ──
      const ax = W / 2,
        ay = 380;

      // Outer ring
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 18;
      ctx.beginPath();
      ctx.arc(ax, ay, 168, 0, Math.PI * 2);
      ctx.stroke();

      if (image) {
        // Draw profile image
        ctx.save();
        ctx.beginPath();
        ctx.arc(ax, ay, 155, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(image, ax - 155, ay - 155, 310, 310);
        ctx.restore();
      } else {
        // Fallback to initial
        const avatarGrad = ctx.createRadialGradient(
          ax - 40,
          ay - 40,
          0,
          ax,
          ay,
          162,
        );
        avatarGrad.addColorStop(0, "#C4B5FD");
        avatarGrad.addColorStop(1, "#7C3AED");
        ctx.fillStyle = avatarGrad;
        ctx.beginPath();
        ctx.arc(ax, ay, 155, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "bold 210px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(name.charAt(0).toUpperCase() || "A", ax, ay + 8);
      }

      // ── Name ──
      ctx.font = "bold 110px system-ui, sans-serif";
      ctx.fillStyle = "#1E1B4B"; // Deep indigo/black
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "center";
      ctx.fillText(name, ax, 680);

      // ── Title ──
      ctx.font = "600 52px system-ui, sans-serif";
      ctx.fillStyle = "#7C3AED"; // Purple title
      ctx.fillText("PROJECT MANAGER", ax, 758);

      // ── AINGO pill ──
      const pW = 280,
        pH = 60,
        pX = ax - pW / 2,
        pY = 820;
      ctx.fillStyle = "#F5F3FF"; // Very light purple
      roundRect(ctx, pX, pY, pW, pH, 30);
      ctx.fill();
      ctx.strokeStyle = "#DDD6FE";
      ctx.lineWidth = 2;
      roundRect(ctx, pX, pY, pW, pH, 30);
      ctx.stroke();

      ctx.fillStyle = "#7C3AED";
      ctx.beginPath();
      ctx.arc(pX + 38, pY + pH / 2, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#7C3AED";
      ctx.font = "bold 42px system-ui, monospace";
      ctx.textBaseline = "middle";
      ctx.fillText("AINGO", ax + 14, pY + pH / 2);

      // ── Divider ──
      ctx.strokeStyle = "#F1F5F9";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(120, 940);
      ctx.lineTo(W - 120, 940);
      ctx.stroke();

      // ── Company ──
      ctx.fillStyle = "#64748B";
      ctx.font = "500 48px system-ui, sans-serif";
      ctx.textBaseline = "alphabetic";
      ctx.fillText("AINGO TECHNOLOGIES", ax, 1040);

      // ── ID ──
      ctx.fillStyle = "#94A3B8";
      ctx.font = "bold 36px monospace";
      const idPrefix = name.toUpperCase().slice(0, 2);
      ctx.fillText(`#${idPrefix}-PM-2024`, ax, 1120);

      ctx.restore();
    }

    // Render the same design into both halves so front and back are identical
    drawFace(0);
    drawFace(HALF, true); // mirrored for back face

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16;
    return tex;
  }, [name, image]);
}

// ─── Lanyard component ────────────────────────────────────────────────────────

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  name?: string;
  profileImage?: string;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  name = "Atom",
  profileImage,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = (): void => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} name={name} profileImage={profileImage} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  name: string;
  profileImage?: string;
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false, name, profileImage }: BandProps) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyard);

  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (profileImage) {
      const img = new Image();
      img.src = profileImage;
      img.onload = () => setImgElement(img);
    } else {
      setImgElement(null);
    }
  }, [profileImage]);

  // Canvas-drawn card face replaces the default baked-in map
  const cardTexture = useCardTexture(name, imgElement);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation(),
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody
          ref={fixed}
          {...segmentProps}
          type={"fixed" as RigidBodyProps["type"]}
        />
        <RigidBody
          position={[0.5, 0, 0]}
          ref={j1}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1, 0, 0]}
          ref={j2}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[1.5, 0, 0]}
          ref={j3}
          {...segmentProps}
          type={"dynamic" as RigidBodyProps["type"]}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={
            dragged
              ? ("kinematicPosition" as RigidBodyProps["type"])
              : ("dynamic" as RigidBodyProps["type"])
          }
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation())),
              );
            }}
          >
            {/* Card face — canvas texture replaces the default baked map */}
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardTexture}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
                side={THREE.FrontSide}
              />
            </mesh>
            {/* Clip and clamp kept from GLB */}
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          color="#7C3AED"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
