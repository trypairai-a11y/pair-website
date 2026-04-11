"use client";

import { useRef, useState, useCallback, useEffect } from "react";

export default function Carousel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velX = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const rafId = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  const cancelMomentum = () => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  const applyMomentum = useCallback(() => {
    if (!scrollRef.current) return;
    velX.current *= 0.93;
    scrollRef.current.scrollLeft -= velX.current;
    if (Math.abs(velX.current) > 0.5) {
      rafId.current = requestAnimationFrame(applyMomentum);
    } else {
      rafId.current = null;
    }
  }, []);

  const updateProgress = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    cancelMomentum();
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = scrollRef.current.scrollLeft;
    lastX.current = e.pageX;
    lastTime.current = Date.now();
    velX.current = 0;
    setDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velX.current = (lastX.current - e.pageX) / dt * 16;
    }
    lastX.current = e.pageX;
    lastTime.current = now;
    const walk = e.pageX - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
    updateProgress();
  };

  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDragging(false);
    rafId.current = requestAnimationFrame(applyMomentum);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateProgress, { passive: true });
    return () => el.removeEventListener("scroll", updateProgress);
  }, []);

  // Track width of progress thumb
  const thumbWidth = scrollRef.current
    ? Math.max(
        40,
        (scrollRef.current.clientWidth / scrollRef.current.scrollWidth) * 100
      )
    : 40;

  return (
    <div className={`relative ${className}`}>
      <div
        ref={scrollRef}
        className={`flex gap-5 overflow-x-auto scrollbar-hide pb-6 ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{ scrollBehavior: "auto" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {children}
      </div>

    </div>
  );
}
