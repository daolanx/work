'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';

interface Icon {
  x: number;
  y: number;
  z: number;
  id: number;
}

interface IconCloudProps {
  images: string[];
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

export function IconCloud({ images }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [iconPositions, setIconPositions] = useState<Icon[]>([]);
  const [targetRotation, setTargetRotation] = useState<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    startTime: number;
    duration: number;
  } | null>(null);

  // Refs for high-frequency values (no re-render needed)
  const isVisibleRef = useRef(false);
  const isDraggingRef = useRef(false);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef(targetRotation);
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const animationFrameRef = useRef<number>(0);
  const imagesLoadedRef = useRef<boolean[]>([]);

  // Sync targetRotation state to ref
  useEffect(() => {
    targetRotationRef.current = targetRotation;
  }, [targetRotation]);

  // Native IntersectionObserver
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          isVisibleRef.current = true;
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Create offscreen canvases for images
  useEffect(() => {
    if (!isVisible || !images.length) return;

    imagesLoadedRef.current = new Array(images.length).fill(false);

    const newIconCanvases = images.map((src, index) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = 40;
      offscreen.height = 40;
      const offCtx = offscreen.getContext('2d');

      if (offCtx) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = src;
        img.onload = () => {
          offCtx.clearRect(0, 0, 40, 40);
          offCtx.beginPath();
          offCtx.arc(20, 20, 20, 0, Math.PI * 2);
          offCtx.closePath();
          offCtx.clip();
          offCtx.drawImage(img, 0, 0, 40, 40);
          imagesLoadedRef.current[index] = true;
        };
      }
      return offscreen;
    });

    iconCanvasesRef.current = newIconCanvases;

    return () => {
      iconCanvasesRef.current = [];
    };
  }, [images, isVisible]);

  // Generate initial icon positions on a sphere
  useEffect(() => {
    const numIcons = images.length || 20;
    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));
    const newIcons: Icon[] = [];

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;

      newIcons.push({
        x: Math.cos(phi) * r * 100,
        y: y * 100,
        z: Math.sin(phi) * r * 100,
        id: i,
      });
    }

    setIconPositions(newIcons);
  }, [images]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking an icon
    for (const icon of iconPositions) {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      const screenX = canvasRef.current.width / 2 + rotatedX;
      const screenY = canvasRef.current.height / 2 + rotatedY;

      const scale = (rotatedZ + 200) / 300;
      const radius = 20 * scale;
      const dx = x - screenX;
      const dy = y - screenY;

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z),
        );
        const targetY = Math.atan2(icon.x, icon.z);
        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(
          (targetX - currentX) ** 2 + (targetY - currentY) ** 2,
        );

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          startTime: performance.now(),
          duration: Math.min(2000, Math.max(800, distance * 1000)),
        });
        return;
      }
    }

    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    if (isDraggingRef.current) {
      const deltaX = e.clientX - lastMousePosRef.current.x;
      const deltaY = e.clientY - lastMousePosRef.current.y;

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      };

      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Animation loop — runs once, reads refs for latest state
  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const mx = mousePosRef.current.x - centerX;
      const my = mousePosRef.current.y - centerY;
      const distance = Math.sqrt(mx * mx + my * my);
      const speed = 0.003 + (distance / maxDistance) * 0.01;

      const currentTarget = targetRotationRef.current;

      if (currentTarget) {
        const elapsed = performance.now() - currentTarget.startTime;
        const progress = Math.min(1, elapsed / currentTarget.duration);
        const easedProgress = easeOutCubic(progress);

        rotationRef.current = {
          x:
            currentTarget.startX +
            (currentTarget.x - currentTarget.startX) * easedProgress,
          y:
            currentTarget.startY +
            (currentTarget.y - currentTarget.startY) * easedProgress,
        };

        if (progress >= 1) {
          setTargetRotation(null);
        }
      } else if (!isDraggingRef.current) {
        rotationRef.current = {
          x: rotationRef.current.x + (my / canvas.height) * speed,
          y: rotationRef.current.y + (mx / canvas.width) * speed,
        };
      }

      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      iconPositions.forEach((icon, index) => {
        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;

        const scale = (rotatedZ + 200) / 300;
        const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 150) / 200));

        ctx.save();
        ctx.translate(centerX + rotatedX, centerY + rotatedY);
        ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;

        if (
          iconCanvasesRef.current[index] &&
          imagesLoadedRef.current[index]
        ) {
          ctx.drawImage(iconCanvasesRef.current[index], -20, -20, 40, 40);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, 20, 0, Math.PI * 2);
          ctx.fillStyle = '#4444ff';
          ctx.fill();
          ctx.fillStyle = 'white';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = '16px Arial';
          ctx.fillText(`${icon.id + 1}`, 0, 0);
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [iconPositions, isVisible]);

  return (
    <div ref={containerRef} className="rounded-lg">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        aria-label="Interactive 3D Icon Cloud"
        role="img"
      />
    </div>
  );
}
