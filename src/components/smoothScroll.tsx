"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 4), // snappier feel vs original
      smoothWheel: true,
    });

    // ── RAF loop ──────────────────────────────────────────────
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ── Dynamic header offset ─────────────────────────────────
    const getHeaderHeight = (): number => {
      const header = document.querySelector("header");
      return header ? header.getBoundingClientRect().height : 80;
    };

    // ── Anchor click handler ──────────────────────────────────
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const href = link.getAttribute("href")!;
        const targetSection = document.querySelector(href) as HTMLElement;

        if (targetSection) {
          lenis.scrollTo(targetSection, {
            offset: -(getHeaderHeight() + 16), // dynamic — follows real header height
            duration: 1.2,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // ── Section observer — emits custom events ────────────────
    // Other components can listen: window.addEventListener("section:active", (e) => ...)
    // e.detail = { id: "skills" }
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");

            // Emit active section event
            window.dispatchEvent(
              new CustomEvent("section:active", { detail: { id } }),
            );

            // Trigger scroll animation for children
            const animatables =
              entry.target.querySelectorAll(".animate-on-scroll");
            animatables.forEach((el) => el.classList.add("animated"));
          }
        });
      },
      {
        threshold: 0.15, // section must be 15% visible to trigger
        rootMargin: "0px 0px -10% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
      observer.disconnect();
    };
  }, []);
  return null;
}
