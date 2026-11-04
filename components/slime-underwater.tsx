"use client";

import { useEffect, useRef } from "react";

type Bubble = { x: number; y: number; radius: number; vx: number; vy: number; life: number; maxLife: number };

export function SlimeUnderwater() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const bubbles: Bubble[] = [];
    let frame = 0;
    let lastTime = 0;
    let lastSpawn = 0;
    let previousX = -100;
    let previousY = -100;
    let width = 0;
    let height = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const spawn = (x: number, y: number, count: number, spread = false) => {
      for (let i = 0; i < count && bubbles.length < 20; i++) {
        const radius = 7 + Math.random() * 10;
        const life = 850 + Math.random() * 1050;
        const angle = (i / count) * Math.PI * 2 + Math.PI * .15;
        const distance = 25 + Math.random() * 15;
        bubbles.push({ x: x + (spread ? Math.cos(angle) * distance : (Math.random() - .5) * 16), y: y + (spread ? Math.sin(angle) * distance : (Math.random() - .5) * 14), radius, vx: (Math.random() - .5) * .45, vy: .45 + Math.random() * .65, life, maxLife: life });
      }
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const now = performance.now();
      const distance = Math.hypot(event.clientX - previousX, event.clientY - previousY);
      previousX = event.clientX;
      previousY = event.clientY;
      if (distance < 24 || now - lastSpawn < 75) return;
      lastSpawn = now;
      spawn(event.clientX, event.clientY, 1);
    };
    const click = (event: PointerEvent) => {
      if (event.pointerType === "touch" || event.button !== 0) return;
      spawn(event.clientX, event.clientY, 2 + Math.floor(Math.random() * 2), true);
    };
    const render = (now: number) => {
      const delta = Math.min(now - (lastTime || now), 40);
      lastTime = now;
      ctx.clearRect(0, 0, width, height);
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.life -= delta;
        if (b.life <= 0 || b.y < -15) { bubbles.splice(i, 1); continue; }
        b.x += b.vx * delta * .06 + Math.sin(now * .003 + i) * .08;
        b.y -= b.vy * delta * .06;
        const alpha = Math.min(1, (b.maxLife - b.life) / 180, b.life / 450);
        const r = b.radius;
        const glass = ctx.createRadialGradient(b.x - r * .32, b.y - r * .4, r * .06, b.x + r * .12, b.y + r * .12, r * 1.04);
        glass.addColorStop(0, `rgba(255,255,255,${alpha * .96})`);
        glass.addColorStop(.22, `rgba(235,252,255,${alpha * .33})`);
        glass.addColorStop(.52, `rgba(190,232,249,${alpha * .16})`);
        glass.addColorStop(.77, `rgba(70,153,200,${alpha * .29})`);
        glass.addColorStop(.93, `rgba(29,112,169,${alpha * .65})`);
        glass.addColorStop(1, `rgba(233,252,255,${alpha * .94})`);
        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fillStyle = glass;
        ctx.fill();
        const rim = ctx.createLinearGradient(b.x-r,b.y-r,b.x+r,b.y+r);
        rim.addColorStop(0,`rgba(255,255,255,${alpha * .98})`);
        rim.addColorStop(.45,`rgba(60,145,195,${alpha * .8})`);
        rim.addColorStop(.75,`rgba(20,98,162,${alpha * .95})`);
        rim.addColorStop(1,`rgba(255,255,255,${alpha * .9})`);
        ctx.strokeStyle = rim;
        ctx.lineWidth = Math.max(1.6,r*.15);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(b.x - r*.03, b.y - r*.04, r * .76, Math.PI * 1.08, Math.PI * 1.54);
        ctx.strokeStyle = `rgba(255,255,255,${alpha * .95})`;
        ctx.lineWidth = Math.max(1.8,r*.19);
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(b.x + r*.37, b.y + r*.45, r*.15, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${alpha * .8})`;
        ctx.fill();
      }
      frame = window.requestAnimationFrame(render);
    };
    resize();
    frame = window.requestAnimationFrame(render);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", click, { passive: true });
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move); window.removeEventListener("pointerdown", click); };
  }, []);

  return <>
    <div className="slime-underwater-light" aria-hidden="true">
      <svg viewBox="0 0 1200 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="slime-water-distort" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves="2" seed="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <linearGradient id="slime-caustic-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity=".9"/><stop offset=".7" stopColor="#ffffff" stopOpacity=".25"/><stop offset="1" stopColor="#ffffff" stopOpacity="0"/></linearGradient>
        </defs>
        <g filter="url(#slime-water-distort)" fill="none" stroke="url(#slime-caustic-fade)" strokeWidth="8" strokeLinecap="round">
          <path d="M 610 -90 C 510 80 740 150 865 55 S 1110 70 1230 210" />
          <path d="M 780 -90 C 940 65 840 180 1030 240 S 1190 360 1300 305" />
          <path d="M 340 80 C 480 -30 570 210 740 225 S 870 365 1090 320" />
          <path d="M 110 230 C 260 120 350 320 500 275 S 640 450 800 390" />
          <path d="M 570 410 C 670 310 810 500 945 430 S 1150 525 1280 450" />
          <path d="M 70 540 C 200 430 370 620 510 545 S 700 680 850 600" />
          <path d="M 840 80 C 690 120 680 285 540 330" />
          <path d="M 1080 190 C 920 225 1000 395 850 445" />
          <path d="M 380 260 C 270 360 425 460 300 535" />
          <path d="M 650 555 C 530 635 685 725 540 800" />
        </g>
      </svg>
    </div>
    <canvas ref={canvasRef} className="slime-underwater-bubbles" aria-hidden="true" />
  </>;
}
