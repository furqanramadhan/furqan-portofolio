"use client";
import { useState, useEffect } from "react";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Header({ isDark, onToggleTheme }: HeaderProps) {
  const [scrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const accent = "var(--accent-color)";

  const border = isDark ? "#1e1e1e" : "#C8BFA8";
  const textMuted = isDark ? "#555555" : "#7A7060";
  const bg = isDark ? "rgba(13,13,13,0.95)" : "rgba(245,240,232,0.95)";
  const textColor = isDark ? "#C8C8C8" : "#1A1A1A";

  useEffect(() => {
    // Keep the simple scroll check for the scrolled (blur) state
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Listen for the custom event from SmoothScroll
    const handleSectionActive = (e: Event) => {
      const { id } = (e as CustomEvent).detail;
      setActiveSection(id);
    };
    window.addEventListener("section:active", handleSectionActive);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("section:action", handleSectionActive);
    };
  }, []);

  const getSectionId = (menuName: string) => {
    if (menuName === "Work") return "featured";
    return menuName.toLowerCase();
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
        padding: scrolled ? "12px 0" : "20px 0",
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
        {/* Logo / Name */}
        <a
          href="#home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              position: "relative",
              width: 40,
              height: 40,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: `1px solid ${border}`,
                overflow: "hidden",
                background: isDark ? "#111" : "#E8E3D8",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = border)}
            >
              <img
                src="/assets/image/icons-arch-linux.png"
                alt="Logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <span
              style={{
                fontSize: "clamp(16px, 2vw, 20px)",
                fontWeight: 700,
                color: textColor,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              FURQAN <span style={{ color: accent }}>RAMADHAN.</span>
            </span>
            {/* Underline accent */}
            <span
              style={{
                position: "absolute",
                bottom: -2,
                left: 0,
                width: 24,
                height: 2,
                background: accent,
                transition: "width 0.4s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.width = "100%")}
              onMouseLeave={(e) => (e.currentTarget.style.width = "24px")}
            />
          </div>
        </a>

        {/* Mobile hamburger */}
        <button
          style={{
            display: "none",
            background: "transparent",
            border: `1px solid ${border}`,
            color: textColor,
            fontSize: 18,
            padding: "4px 10px",
            cursor: "pointer",
            fontFamily: "monospace",
          }}
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Nav links + theme toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <ul
            style={{
              display: "flex",
              gap: 28,
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {["Home", "Skills", "Journey", "Work", "About", "Contact"].map(
              (item) => {
                const sectionId = getSectionId(item);
                const isActive = activeSection === sectionId;
                return (
                  <li key={item}>
                    <a
                      href={`#${sectionId}`}
                      style={{
                        color: isActive ? accent : textMuted,
                        textDecoration: "none",
                        fontSize: 12,
                        letterSpacing: "0.08em",
                        fontWeight: isActive ? 600 : 400,
                        position: "relative",
                        paddingBottom: 4,
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          accent)
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          isActive ? accent : textMuted)
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {item}
                      {/* Active underline */}
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
              },
            )}
          </ul>

          {/* Theme toggle — moved from fixed to header */}
          <button
            onClick={onToggleTheme}
            style={{
              background: "transparent",
              border: `1px solid ${border}`,
              color: textMuted,
              fontFamily: "monospace",
              fontSize: 11,
              padding: "4px 10px",
              cursor: "pointer",
              letterSpacing: "0.05em",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = accent;
              (e.currentTarget as HTMLButtonElement).style.borderColor = accent;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = textMuted;
              (e.currentTarget as HTMLButtonElement).style.borderColor = border;
            }}
          >
            {isDark ? "[ LIGHT ]" : "[ DARK ]"}
          </button>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          ul {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
