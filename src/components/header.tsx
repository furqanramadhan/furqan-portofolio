"use client";
import { useState, useEffect } from "react";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

const NAV_ITEMS = ["Home", "Skills", "Journey", "Work", "About", "Contact"];

export default function Header({ isDark, onToggleTheme }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobile, setIsMobile] = useState(false);

  const accent = "var(--accent-color)";
  const border = isDark ? "#1e1e1e" : "#C8BFA8";
  const textMuted = isDark ? "#555555" : "#7A7060";
  const textColor = isDark ? "#C8C8C8" : "#1A1A1A";
  const bg = isDark ? "rgba(13,13,13,0.96)" : "rgba(245,240,232,0.96)";
  const sheetBg = isDark ? "#0f0f0f" : "#EDE8DC";

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const handleSectionActive = (e: Event) => {
      const { id } = (e as CustomEvent).detail;
      setActiveSection(id);
    };
    window.addEventListener("section:active", handleSectionActive);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("section:active", handleSectionActive);
    };
  }, []);

  // Close sheet on outside tap
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: MouseEvent) => {
      const sheet = document.getElementById("bottom-sheet");
      if (sheet && !sheet.contains(e.target as Node)) setMenuOpen(false);
    };
    setTimeout(() => document.addEventListener("mousedown", close), 100);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  const getSectionId = (name: string) =>
    name === "Work" ? "featured" : name.toLowerCase();

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 9999,
          padding: scrolled ? "10px 0" : "18px 0",
          background: scrolled ? bg : "transparent",
          borderBottom: scrolled ? `1px solid ${border}` : "none",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.3s ease",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <div
          style={{
            width: "90%",
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                flexShrink: 0,
                borderRadius: "50%",
                border: `1px solid ${border}`,
                overflow: "hidden",
                background: isDark ? "#111" : "#E8E3D8",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--accent-color)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = border)}
            >
              <img
                src={
                  isDark
                    ? "/assets/image/logo/icon_dark.svg"
                    : "/assets/image/logo/logo_light.svg"
                }
                alt="Logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  fontSize: "clamp(14px, 2vw, 18px)",
                  fontWeight: 700,
                  color: textColor,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                FURQAN <span style={{ color: accent }}>RAMADHAN.</span>
              </span>
              <span
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  width: 20,
                  height: 2,
                  background: accent,
                  transition: "width 0.4s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.width = "100%")}
                onMouseLeave={(e) => (e.currentTarget.style.width = "20px")}
              />
            </div>
          </a>

          {/* Desktop nav */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              <ul
                style={{
                  display: "flex",
                  gap: 24,
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                {NAV_ITEMS.map((item) => {
                  const id = getSectionId(item);
                  const isActive = activeSection === id;
                  return (
                    <li key={item}>
                      <a
                        href={`#${id}`}
                        style={{
                          color: isActive ? accent : textMuted,
                          textDecoration: "none",
                          fontSize: 11,
                          letterSpacing: "0.08em",
                          fontWeight: isActive ? 600 : 400,
                          position: "relative",
                          paddingBottom: 4,
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color =
                            "var(--accent-color)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color =
                            isActive ? "var(--accent-color)" : textMuted)
                        }
                      >
                        {item}
                        <span
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            height: 1,
                            width: isActive ? "100%" : "0%",
                            background: accent,
                            transition: "width 0.3s",
                          }}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>

              <button
                onClick={onToggleTheme}
                style={{
                  background: "transparent",
                  border: `1px solid ${border}`,
                  color: textMuted,
                  fontFamily: "monospace",
                  fontSize: 10,
                  padding: "4px 10px",
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--accent-color)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "var(--accent-color)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    textMuted;
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    border;
                }}
              >
                {isDark ? "[ LIGHT ]" : "[ DARK ]"}
              </button>
            </div>
          )}

          {/* Mobile — hamburger only */}
          {isMobile && (
            <button
              onClick={() => setMenuOpen((p) => !p)}
              style={{
                background: "transparent",
                border: `1px solid ${border}`,
                color: textColor,
                fontSize: 16,
                width: 36,
                height: 36,
                cursor: "pointer",
                fontFamily: "monospace",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--accent-color)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = border)}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          )}
        </div>
      </header>

      {/* ── BOTTOM SHEET (mobile only) ── */}
      {isMobile && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 9997,
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? "auto" : "none",
              transition: "opacity 0.3s ease",
              backdropFilter: menuOpen ? "blur(4px)" : "none",
            }}
          />

          {/* Sheet */}
          <div
            id="bottom-sheet"
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 9998,
              background: sheetBg,
              borderTop: `1px solid ${border}`,
              fontFamily: "'JetBrains Mono', monospace",
              transform: menuOpen ? "translateY(0)" : "translateY(100%)",
              transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              borderRadius: "12px 12px 0 0",
              overflow: "hidden",
            }}
          >
            {/* Sheet handle */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "14px 0 8px",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 4,
                  borderRadius: 99,
                  background: border,
                }}
              />
            </div>

            {/* Sheet header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 24px 16px",
                borderBottom: `1px solid ${border}`,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: textMuted,
                  letterSpacing: "0.1em",
                }}
              >
                <span style={{ color: accent }}>$ </span>navigation
              </span>
              {/* Theme toggle inside sheet */}
              <button
                onClick={onToggleTheme}
                style={{
                  background: "transparent",
                  border: `1px solid ${border}`,
                  color: textMuted,
                  fontFamily: "monospace",
                  fontSize: 10,
                  padding: "4px 10px",
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    "var(--accent-color)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    "var(--accent-color)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color =
                    textMuted;
                  (e.currentTarget as HTMLButtonElement).style.borderColor =
                    border;
                }}
              >
                {isDark ? "[ LIGHT ]" : "[ DARK ]"}
              </button>
            </div>

            {/* Nav items */}
            <nav style={{ padding: "8px 0 32px" }}>
              {NAV_ITEMS.map((item, i) => {
                const id = getSectionId(item);
                const isActive = activeSection === id;
                return (
                  <a
                    key={item}
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 24px",
                      textDecoration: "none",
                      color: isActive ? "var(--accent-color)" : textColor,
                      fontSize: 14,
                      letterSpacing: "0.06em",
                      fontWeight: isActive ? 600 : 400,
                      borderBottom:
                        i < NAV_ITEMS.length - 1
                          ? `1px solid ${border}`
                          : "none",
                      transition: "background 0.15s, color 0.15s",
                      background: isActive
                        ? isDark
                          ? "rgba(23,147,209,0.06)"
                          : "rgba(23,147,209,0.05)"
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        isActive
                          ? isDark
                            ? "rgba(23,147,209,0.06)"
                            : "rgba(23,147,209,0.05)"
                          : "transparent";
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          color: isActive ? "var(--accent-color)" : textMuted,
                          letterSpacing: "0.1em",
                          minWidth: 20,
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        color: isActive ? "var(--accent-color)" : textMuted,
                      }}
                    >
                      {isActive ? "●" : "›"}
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* Sheet footer */}
            <div
              style={{
                padding: "12px 24px",
                borderTop: `1px solid ${border}`,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  color: textMuted,
                  letterSpacing: "0.08em",
                }}
              >
                furqan@portfolio:~<span style={{ color: accent }}>_</span>
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: textMuted,
                  letterSpacing: "0.06em",
                }}
              >
                {isDark ? "DARK" : "LIGHT"} · v2.0.1
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
 