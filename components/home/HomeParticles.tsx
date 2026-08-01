"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

export function HomeParticles({ density = 78 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const node = canvas;
    const ctx = context;

    let width = 0;
    let height = 0;
    let frame = 0;
    let pointerX = -1000;
    let pointerY = -1000;
    let particles: Particle[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      width = node.clientWidth;
      height = node.clientHeight;
      node.width = width * dpr;
      node.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(density * Math.min(1.9, (width * height) / 1_000_000 + 0.65));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.35 + 0.55,
      }));
    }

    function movePointer(event: PointerEvent) {
      pointerX = event.clientX;
      pointerY = event.clientY;
    }

    function leavePointer() {
      pointerX = -1000;
      pointerY = -1000;
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        const dx = particle.x - pointerX;
        const dy = particle.y - pointerY;
        const distanceSq = dx * dx + dy * dy;
        if (distanceSq < 18_000) {
          const force = (1 - distanceSq / 18_000) * 0.035;
          particle.vx += dx * force * 0.01;
          particle.vy += dy * force * 0.01;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.998;
        particle.vy *= 0.998;
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq < 20_000) {
            ctx.strokeStyle = `rgba(86, 180, 225, ${(0.16 * (1 - distanceSq / 20_000)).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const particle of particles) {
        const dx = particle.x - pointerX;
        const dy = particle.y - pointerY;
        const nearPointer = dx * dx + dy * dy < 32_000;
        ctx.fillStyle = nearPointer ? "rgba(125, 211, 252, 0.86)" : "rgba(125, 211, 252, 0.5)";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, nearPointer ? particle.r + 0.45 : particle.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", movePointer);
    window.addEventListener("pointerleave", leavePointer);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", movePointer);
      window.removeEventListener("pointerleave", leavePointer);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="home-particles" aria-hidden="true" />;
}
