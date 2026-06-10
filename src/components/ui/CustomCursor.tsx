"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on mobile/touch interfaces
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Hide default cursor in desktop
    document.body.style.cursor = "none";

    const mouse = { x: 0, y: 0 };
    const dot = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Track hovered elements
    const updateCursorHoverState = () => {
      const hovers = document.querySelectorAll(
        "a, button, [role='button'], input, select, textarea, .cursor-pointer"
      );

      const addHover = () => {
        if (ringRef.current) {
          ringRef.current.style.width = "40px";
          ringRef.current.style.height = "40px";
          ringRef.current.style.borderColor = "#3B82F6";
          ringRef.current.style.backgroundColor = "rgba(59, 130, 246, 0.05)";
        }
      };

      const removeHover = () => {
        if (ringRef.current) {
          ringRef.current.style.width = "24px";
          ringRef.current.style.height = "24px";
          ringRef.current.style.borderColor = "rgba(59, 130, 246, 0.4)";
          ringRef.current.style.backgroundColor = "transparent";
        }
      };

      hovers.forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });

      return () => {
        hovers.forEach((el) => {
          el.removeEventListener("mouseenter", addHover);
          el.removeEventListener("mouseleave", removeHover);
        });
      };
    };

    // Listen for elements mutation to update hover triggers
    const observer = new MutationObserver(updateCursorHoverState);
    observer.observe(document.body, { childList: true, subtree: true });
    const cleanupHoverListeners = updateCursorHoverState();

    // Smooth animation tick
    let reqId: number;
    const tick = () => {
      // Small dot follows instantly
      dot.x += (mouse.x - dot.x) * 0.3;
      dot.y += (mouse.y - dot.y) * 0.3;

      // Outer ring lags behind (spring-like effect)
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }

      reqId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cleanupHoverListeners();
      observer.disconnect();
      cancelAnimationFrame(reqId);
      document.body.style.cursor = "";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor pointer-events-none fixed top-0 left-0" />
      <div ref={ringRef} className="custom-cursor-ring pointer-events-none fixed top-0 left-0 transition-[width,height,border-color,background-color] duration-300" />
    </>
  );
}
