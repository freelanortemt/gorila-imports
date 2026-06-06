"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const { pointer, viewport } = useThree();

  const geometry = useMemo(() => {
    const count = 980;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 12;
      positions[i3 + 1] = (Math.random() - 0.5) * 6.4;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;
      scales[i] = Math.random();
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    buffer.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    return buffer;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = t * 0.035 + pointer.x * 0.08;
      points.current.rotation.x = -0.08 + pointer.y * 0.04;
      points.current.position.x = pointer.x * 0.18;
      points.current.position.y = pointer.y * 0.1;
    }

    if (material.current) {
      material.current.uniforms.uTime.value = t;
      material.current.uniforms.uMouse.value.set(pointer.x, pointer.y);
      material.current.uniforms.uViewport.value.set(viewport.width, viewport.height);
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uViewport: { value: new THREE.Vector2(1, 1) },
          uColorA: { value: new THREE.Color("#ffe1a1") },
          uColorB: { value: new THREE.Color("#78a9ff") }
        }}
        vertexShader={`
          attribute float aScale;
          uniform float uTime;
          uniform vec2 uMouse;
          varying float vScale;
          varying float vDepth;

          void main() {
            vec3 p = position;
            float wave = sin((p.x * 0.7) + uTime * 0.6) * 0.16;
            p.y += wave + cos((p.z * 0.55) + uTime * 0.4) * 0.1;
            p.x += uMouse.x * (0.24 + aScale * 0.12);
            p.z += uMouse.y * 0.18;

            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            gl_PointSize = (2.2 + aScale * 4.2) * (1.0 / -mvPosition.z);
            vScale = aScale;
            vDepth = smoothstep(-7.0, 3.0, p.z);
          }
        `}
        fragmentShader={`
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying float vScale;
          varying float vDepth;

          void main() {
            vec2 c = gl_PointCoord - vec2(0.5);
            float d = length(c);
            float alpha = smoothstep(0.5, 0.08, d) * (0.18 + vScale * 0.62);
            vec3 color = mix(uColorB, uColorA, vScale * 0.75 + vDepth * 0.25);
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </points>
  );
}

function DepthGrid() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    group.current.rotation.x = -1.19 + pointer.y * 0.015;
    group.current.rotation.z = pointer.x * 0.012;
    group.current.position.z = -1.4 + Math.sin(clock.getElapsedTime() * 0.35) * 0.08;
  });

  return (
    <group ref={group} position={[1.4, -1.9, -3.2]}>
      <gridHelper args={[14, 28, "#d6ad57", "#35557a"]} />
    </group>
  );
}

function FloatingMonoliths() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;
    group.current.children.forEach((child, index) => {
      child.rotation.x = t * 0.08 + index;
      child.rotation.y = t * 0.11 + pointer.x * 0.16;
      child.position.y += Math.sin(t * 0.5 + index) * 0.0009;
    });
  });

  return (
    <group ref={group}>
      {[
        [-3.2, 0.8, -2.8],
        [3.4, 1.2, -3.6],
        [1.2, -0.8, -2.2]
      ].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <octahedronGeometry args={[0.26 + index * 0.08, 0]} />
          <meshStandardMaterial
            color={index === 1 ? "#6f8ec9" : "#d6ad57"}
            roughness={0.28}
            metalness={0.72}
            transparent
            opacity={0.38}
          />
        </mesh>
      ))}
    </group>
  );
}

function ShaderVeil() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    if (!material.current) return;

    material.current.uniforms.uTime.value = clock.getElapsedTime();
    material.current.uniforms.uMouse.value.set(pointer.x, pointer.y);
  });

  return (
    <mesh position={[0, 0, -4.7]} scale={[10.8, 6.6, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uGold: { value: new THREE.Color("#d6ad57") },
          uBlue: { value: new THREE.Color("#4f7ccc") }
        }}
        vertexShader={`
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec3 uGold;
          uniform vec3 uBlue;
          varying vec2 vUv;

          float beam(vec2 uv, float offset, float speed) {
            float wave = sin((uv.x * 9.0) + uTime * speed + offset) * 0.035;
            float line = smoothstep(0.035, 0.0, abs((uv.y + wave) - (0.2 + offset * 0.13)));
            return line;
          }

          void main() {
            vec2 uv = vUv;
            vec2 mouse = uMouse * 0.08;
            float leftGlow = 1.0 - smoothstep(0.02, 0.72, distance(uv, vec2(0.2 + mouse.x, 0.54 + mouse.y)));
            float rightGlow = 1.0 - smoothstep(0.03, 0.66, distance(uv, vec2(0.78 - mouse.x, 0.42 - mouse.y)));
            float grid = smoothstep(0.988, 1.0, sin((uv.x + uTime * 0.015) * 42.0)) * 0.16;
            grid += smoothstep(0.992, 1.0, sin((uv.y - uTime * 0.02) * 34.0)) * 0.1;
            float ribbons = beam(uv, 0.35, 0.42) + beam(uv, 1.25, -0.34) * 0.72;
            vec3 color = uGold * (leftGlow * 0.72 + ribbons * 0.4) + uBlue * (rightGlow * 0.46 + grid * 0.5);
            float alpha = clamp(leftGlow * 0.28 + rightGlow * 0.24 + ribbons * 0.14 + grid * 0.08, 0.0, 0.5);
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  );
}

export function WebGLHero() {
  return (
    <div className="webgl-stage" aria-hidden="true" data-webgl-hero>
      <div className="hero-photo-backdrop" />
      <Canvas camera={{ position: [0, 0, 5.2], fov: 48 }} dpr={[1, 1.65]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.55} />
        <pointLight position={[2.5, 2.2, 2.8]} intensity={8.5} color="#ffe1a1" />
        <pointLight position={[-3, 1.4, -1.8]} intensity={4.2} color="#5d83cc" />
        <fog attach="fog" args={["#050505", 4.8, 10]} />
        <ShaderVeil />
        <ParticleField />
        <DepthGrid />
        <FloatingMonoliths />
      </Canvas>
      <div className="clinical-lightfield">
        <span />
        <span />
      </div>
      <div className="kinetic-veil">
        <span />
        <span />
        <span />
      </div>
      <div className="diagnostic-sweep" />
      <div className="orbital-signature">
        <span />
        <span />
      </div>
      <div className="volumetric-glow" />
      <div className="cinema-vignette" />
    </div>
  );
}
