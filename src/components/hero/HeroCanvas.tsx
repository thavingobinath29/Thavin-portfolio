"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useMouseParallax } from "@/hooks/useMouseParallax";

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useMouseParallax();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Dimensions
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 30, 220);

    // Group to hold particles and lines for automatic slow rotation
    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // 1. Instanced Mesh Particles (120 spheres)
    const particleCount = 120;
    const particleGeometry = new THREE.SphereGeometry(0.8, 6, 6);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
    });
    const instancedMesh = new THREE.InstancedMesh(
      particleGeometry,
      particleMaterial,
      particleCount
    );

    // Initialize positions and velocities
    const particles: { pos: THREE.Vector3; vel: THREE.Vector3 }[] = [];
    const dummy = new THREE.Object3D();

    for (let i = 0; i < particleCount; i++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 260,
        (Math.random() - 0.5) * 160,
        (Math.random() - 0.5) * 160
      );
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.5) * 0.25
      );
      particles.push({ pos, vel });

      dummy.position.copy(pos);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    constellationGroup.add(instancedMesh);

    // 2. Dynamic Connections (Lines)
    const maxConnections = 400;
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    constellationGroup.add(lineSegments);

    // 3. Grid Plane (PlaneGeometry with wireframe)
    const gridGeometry = new THREE.PlaneGeometry(350, 350, 24, 24);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const gridPlane = new THREE.Mesh(gridGeometry, gridMaterial);
    gridPlane.rotation.x = -Math.PI / 2;
    gridPlane.position.y = -65;
    scene.add(gridPlane);

    // Animation variables
    let animationFrameId: number;
    const connectionLimit = 95; // distance under which particles connect

    // Animation Loop
    const animate = () => {
      // Rotate grid slowly
      if (!prefersReducedMotion) {
        gridPlane.rotation.z += 0.0006;
        constellationGroup.rotation.y += 0.0008;
      }

      // Update particle positions
      let lineIndex = 0;
      const positionsAttr = lineGeometry.getAttribute("position") as THREE.BufferAttribute;

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.pos.add(p.vel);
        }

        // Boundary reflection
        if (Math.abs(p.pos.x) > 130) p.vel.x *= -1;
        if (Math.abs(p.pos.y) > 80) p.vel.y *= -1;
        if (Math.abs(p.pos.z) > 80) p.vel.z *= -1;

        dummy.position.copy(p.pos);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);

        // Find connections
        for (let j = i + 1; j < particleCount; j++) {
          if (lineIndex >= maxConnections) break;

          const p2 = particles[j];
          const dist = p.pos.distanceTo(p2.pos);

          if (dist < connectionLimit) {
            // Add vertices for line segment
            positionsAttr.setXYZ(lineIndex * 2, p.pos.x, p.pos.y, p.pos.z);
            positionsAttr.setXYZ(lineIndex * 2 + 1, p2.pos.x, p2.pos.y, p2.pos.z);
            lineIndex++;
          }
        }
      }
      instancedMesh.instanceMatrix.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex * 2);
      positionsAttr.needsUpdate = true;

      // Mouse Parallax camera shift
      if (!prefersReducedMotion) {
        const targetX = mouse.x * 25;
        const targetY = (mouse.y * 15) + 30; // base height offset
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (targetY - camera.position.y) * 0.05;
        camera.lookAt(new THREE.Vector3(0, -10, 0));
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Dispose Three resources
      particleGeometry.dispose();
      particleMaterial.dispose();
      instancedMesh.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      renderer.dispose();
    };
  }, [mouse]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full opacity-25 dark:opacity-50" />
    </div>
  );
}
