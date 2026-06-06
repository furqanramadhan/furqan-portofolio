"use client";
interface FooterProps {
  isDark?: boolean;
}

const accent = "var(--accent-color)";

export default function Footer({ isDark = true }: FooterProps) {
  const border = isDark ? "#1e1e1e" : "#C8BFA8";
  const textMuted = isDark ? "#444444" : "#9A9080";
  const bg = isDark ? "#0a0a0a" : "#E8E3D8";
  const textColor = isDark ? "#555555" : "#7A7060";

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const socials = [
    {
      label: "LI",
      title: "LinkedIn",
      href: "https://www.linkedin.com/in/furqan-ramadhan-a86808179",
      icon: "fab fa-linkedin-in",
    },
    {
      label: "GH",
      title: "GitHub",
      href: "https://github.com/furqanramadhan",
      icon: "fab fa-github",
    },
    {
      label: "EM",
      title: "Email",
      href: "mailto:furqan2682@gmail.com",
      icon: "fas fa-envelope",
    },
  ];
  return (
    <footer
      style={{
        background: bg,
        borderTop: `1px solid ${border}`,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        transition: "all 0.3s ease",
      }}
    >
      {/* Main statusbar */}
      <div
        style={{
          width: "90%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        {/* Left — name */}
        {/* <a
          href="#home"
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: textColor,
            textDecoration: "none",
            letterSpacing: "0.08em",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = accent)
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = textColor)
          }
        >
          FURQAN<span style={{ color: accent }}>.</span>DEV
        </a> */}
        {/* Center — social icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              title={s.title}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 28,
                height: 28,
                border: `1px solid ${border}`,
                color: textMuted,
                fontSize: 11,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = accent;
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  accent;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = textMuted;
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  border;
              }}
            >
              <i className={s.icon} />
            </a>
          ))}
        </div>
        {/* Right — copyright + back to top */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{ fontSize: 10, color: textMuted, letterSpacing: "0.06em" }}
          >
            © 2026 FURQAN RAMADHAN
          </span>
          <span style={{ color: border, fontSize: 10 }}>·</span>
          <button
            onClick={scrollToTop}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 10,
              color: textMuted,
              letterSpacing: "0.08em",
              fontFamily: "monospace",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = accent)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = textMuted)
            }
          >
            ↑ TOP
          </button>
        </div>
      </div>
      {/* Sub-bar — built with */}
      <div
        style={{
          borderTop: `1px solid ${border}`,
          padding: "7px 0",
          textAlign: "center",
        }}
      >
        <span
          style={{ fontSize: 9, color: textMuted, letterSpacing: "0.14em" }}
        >
          BUILT WITH{" "}
          {["NEXT.JS", "TAILWIND", "HONO", "TYPESCRIPT"].map((tech, i, arr) => (
            <span key={tech}>
              <span style={{ color: accent }}>{tech}</span>
              {i < arr.length - 1 && <span style={{ color: border }}> · </span>}
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}
