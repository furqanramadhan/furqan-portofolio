"use client";
import { useState } from "react";
import Image from "next/image"; // Add this line
import {
  ProjectModal,
  type Project,
  projects,
} from "@/src/components/projectModal";

interface FeaturedWorkProps {
  isDark?: boolean;
}

export default function FeaturedWork({ isDark = true }: FeaturedWorkProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const openModal = (p: Project) => {
    setActiveProject(p);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setActiveProject(null);
    document.body.style.overflow = "auto";
  };

  const theme = isDark
    ? {
        bg: "#0D0D0D",
        bgCard: "#111111",
        bgCardHover: "#161b22",
        border: "#1e1e1e",
        text: "#C8C8C8",
        textMuted: "#555555",
        scanline: "rgba(255,255,255,0.008)",
      }
    : {
        bg: "#F5F0E8",
        bgCard: "#EDE8DC",
        bgCardHover: "#E5DECE",
        border: "#C8BFA8",
        text: "#1A1A1A",
        textMuted: "#7A7060",
        scanline: "rgba(0,0,0,0.008)",
      };

  const accent = "var(--accent-color)";

  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);

  const CardOverlay = ({
    project,
    isLarge = false,
  }: {
    project: Project;
    isLarge?: boolean;
  }) => {
    const [hovered, setHovered] = useState(false);

    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => openModal(project)}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          border: `1px solid ${hovered ? "var(--accent-color)" : theme.border}`,
          overflow: "hidden",
          cursor: "pointer",
          background: theme.bgCard,
          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
          boxShadow: hovered ? "0 8px 32px rgba(23,147,209,0.1)" : "none",
        }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: isLarge ? "60%" : "55%",
            overflow: "hidden",
          }}
        >
          <Image
            src={project.img}
            alt={project.title}
            fill
            style={{
              objectFit: "cover",
              filter: hovered
                ? isDark
                  ? "brightness(0.9) contrast(1.05)"
                  : "brightness(0.95)"
                : "grayscale(40%) brightness(0.75)",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "filter 0.4s ease, transform 0.4s ease",
            }}
          />
          {/* Scanline on image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${theme.scanline} 3px, ${theme.scanline} 4px)`,
              pointerEvents: "none",
            }}
          />
          {/* Gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)",
            }}
          />
          {/* Year */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              fontSize: 9,
              color: "var(--accent-color)",
              border: "1px solid var(--accent-color)",
              padding: "2px 7px",
              background: "rgba(0,0,0,0.6)",
              letterSpacing: "0.08em",
            }}
          >
            {project.year}
          </div>
          {/* Org badge */}
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              fontSize: 9,
              color: theme.textMuted,
              border: `1px solid ${theme.border}`,
              padding: "2px 7px",
              background: "rgba(0,0,0,0.6)",
              letterSpacing: "0.06em",
            }}
          >
            {project.org}
          </div>
        </div>

        {/* Info */}
        <div
          style={{
            padding: isLarge ? "20px 22px" : "16px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            height: isLarge ? "40%" : "45%",
          }}
        >
          {/* Corner bracket */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 20,
              height: 20,
              borderTop: `2px solid var(--accent-color)`,
              borderLeft: `2px solid var(--accent-color)`,
              opacity: hovered ? 1 : 0.3,
              transition: "opacity 0.2s",
            }}
          />

          <div>
            <div
              style={{
                fontSize: 10,
                color: accent,
                letterSpacing: "0.08em",
                marginBottom: 4,
              }}
            >
              {project.role}
            </div>
            <h3
              style={{
                fontSize: isLarge ? 18 : 15,
                fontWeight: 700,
                color: theme.text,
                margin: 0,
                letterSpacing: "0.03em",
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>
            <div
              style={{
                fontSize: 10,
                color: theme.textMuted,
                marginTop: 2,
                letterSpacing: "0.04em",
              }}
            >
              {project.subtitle}
            </div>
          </div>

          {/* Tech tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 5,
              marginTop: "auto",
            }}
          >
            {project.tech.slice(0, isLarge ? 5 : 3).map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 9,
                  color: theme.textMuted,
                  border: `1px solid ${theme.border}`,
                  padding: "2px 7px",
                  letterSpacing: "0.05em",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              fontSize: 10,
              color: hovered ? "var(--accent-color)" : theme.textMuted,
              letterSpacing: "0.08em",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "color 0.2s",
              marginTop: 4,
            }}
          >
            <span>./open_project.sh</span>
            <span
              style={{
                transform: hovered ? "translateX(3px)" : "translateX(0)",
                transition: "transform 0.2s",
              }}
            >
              →
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="featured"
      style={{
        background: theme.bg,
        padding: "80px 0",
        borderBottom: `1px solid ${theme.border}`,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Scanline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${theme.scanline} 2px, ${theme.scanline} 4px)`,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "90%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div
          className="animate-on-scroll"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: theme.textMuted,
                letterSpacing: "0.12em",
                marginBottom: 8,
              }}
            >
              <span style={{ color: accent }}>$ </span>ls ./projects
            </div>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                color: theme.text,
                margin: 0,
                letterSpacing: "0.04em",
                position: "relative",
                display: "inline-block",
              }}
            >
              FEATURED WORK
              <span
                style={{
                  position: "absolute",
                  bottom: -6,
                  left: 0,
                  width: 48,
                  height: 2,
                  background: accent,
                  boxShadow: "0 0 8px var(--accent-color)",
                }}
              />
            </h2>
          </div>
          <a
            href="https://github.com/furqanramadhan"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 11,
              color: theme.textMuted,
              letterSpacing: "0.08em",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                "var(--accent-color)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color =
                theme.textMuted)
            }
          >
            <i className="fab fa-github" /> ./view_all_repos.sh →
          </a>
        </div>

        {/* Bento grid */}
        <div
          className="animate-on-scroll"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr",
            gridTemplateRows: "360px 280px",
            gap: 12,
          }}
        >
          {/* Featured — spans 2 rows */}
          <div style={{ gridRow: "1 / 3" }}>
            <CardOverlay project={featured} isLarge />
          </div>

          {/* Small cards */}
          {rest.map((p) => (
            <div key={p.id} style={{ gridColumn: "2" }}>
              <CardOverlay project={p} />
            </div>
          ))}
        </div>

        {/* Counter */}
        <div
          style={{
            marginTop: 16,
            fontSize: 10,
            color: theme.textMuted,
            letterSpacing: "0.08em",
          }}
        >
          <span style={{ color: accent }}>{projects.length}</span> projects ·
          click any card to view details
        </div>
      </div>

      {/* Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={closeModal}
          isDark={isDark}
        />
      )}

      <style>{`
        @keyframes fadeInModal {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
