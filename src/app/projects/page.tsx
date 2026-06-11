"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ProjectModal,
  type Project,
  projects,
} from "@/src/components/projectModal";

interface FeaturedWorkProps {
  isDark?: boolean;
}
const accent = "var(--accent-color)";

const FeaturedCard = ({
  project,
  isDark,
  theme,
  onClick,
}: {
  project: Project;
  isDark: boolean;
  theme: any;
  onClick: (p: Project) => void;
}) => (
  <div
    onClick={() => onClick(project)}
    className="project-card featured-card"
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      border: `1px solid ${theme.border}`,
      overflow: "hidden",
      cursor: "pointer",
      background: theme.bgCard,
      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    }}
  >
    <div
      className="card-image-content"
      style={{
        position: "relative",
        width: "100%",
        height: "60%",
        overflow: "hidden",
      }}
    >
      <Image
        src={project.img}
        alt={project.title}
        fill
        priority
        className="project-image"
        style={{ objectFit: "cover", willChange: "transform" }}
      />
      <div className="image-overlay" />
      <div
        className="scanline-overlay"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${theme.scanline} 3px, ${theme.scanline} 4px)`,
        }}
      />
      <div className="card-badge left">{project.year}</div>
      <div
        className="card-badge right"
        style={{ color: theme.textMuted, border: `1px solid ${theme.border}` }}
      >
        {project.org}
      </div>
    </div>

    <div
      className="card-info"
      style={{
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        height: "40%",
      }}
    >
      <div
        className="corner-bracket"
        style={{
          borderTop: `2px solid var(--accent-color)`,
          borderLeft: `2px solid var(--accent-color)`,
        }}
      />
      <div>
        <div className="role-text">{project.role}</div>
        <h3 className="title-text" style={{ color: theme.text }}>
          {project.title}
        </h3>
        <div className="subtitle-text" style={{ color: theme.textMuted }}>
          {project.subtitle}
        </div>
      </div>
      <div className="cta-text" style={{ color: theme.textMuted }}>
        <span>./open_project.sh</span>
        <span className="arrow">→</span>
      </div>
    </div>
  </div>
);

const ProjectCard = ({
  project,
  isDark,
  theme,
  onClick,
}: {
  project: Project;
  isDark: boolean;
  theme: any;
  onClick: (p: Project) => void;
}) => (
  <div
    onClick={() => onClick(project)}
    className="project-card small-card"
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      border: `1px solid ${theme.border}`,
      overflow: "hidden",
      cursor: "pointer",
      background: theme.bgCard,
      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    }}
  >
    <div
      className="card-image-content"
      style={{
        position: "relative",
        width: "100%",
        height: "55%",
        overflow: "hidden",
      }}
    >
      <Image
        src={project.img}
        alt={project.title}
        fill
        className="project-image"
        style={{ objectFit: "cover", willChange: "transform" }}
      />
      <div className="image-overlay" />
      <div
        className="scanline-overlay"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${theme.scanline} 3px, ${theme.scanline} 4px)`,
        }}
      />
      <div className="card-badge left">{project.year}</div>
      <div
        className="card-badge right"
        style={{ color: theme.textMuted, border: `1px solid ${theme.border}` }}
      >
        {project.org}
      </div>
    </div>

    <div
      className="card-info"
      style={{
        padding: "16px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        height: "45%",
      }}
    >
      <div
        className="corner-bracket"
        style={{
          borderTop: `2px solid var(--accent-color)`,
          borderLeft: `2px solid var(--accent-color)`,
        }}
      />
      <div>
        <div className="role-text">{project.role}</div>
        <h3 className="title-text" style={{ color: theme.text, fontSize: 15 }}>
          {project.title}
        </h3>
        <div className="subtitle-text" style={{ color: theme.textMuted }}>
          {project.subtitle}
        </div>
      </div>
      <div className="cta-text" style={{ color: theme.textMuted }}>
        <span>./open_project.sh</span>
        <span className="arrow">→</span>
      </div>
    </div>
  </div>
);

export default function FeaturedWork({ isDark = true }: FeaturedWorkProps) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  const openModal = (p: Project) => setActiveProject(p);
  const closeModal = () => setActiveProject(null);

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

  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);

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
        <div className="animate-on-scroll featured-grid">
          {/* Featured — spans 2 rows */}
          <div className="featured-card-wrapper">
            <FeaturedCard
              project={featured}
              isDark={isDark}
              theme={theme}
              onClick={openModal}
            />
          </div>

          {/* Small cards */}
          {rest.map((p) => (
            <div key={p.id} className="small-card-wrapper">
              <ProjectCard
                project={p}
                isDark={isDark}
                theme={theme}
                onClick={openModal}
              />
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
        .featured-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          grid-template-rows: 360px 280px;
          gap: 12px;
        }

        .featured-card-wrapper {
          grid-row: 1 / 3;
        }

        @media (max-width: 1024px) {
          .featured-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }
          .featured-card-wrapper {
            grid-row: auto;
          }
        }

        @media (max-width: 768px) {
          .featured-grid {
            gap: 16px;
          }
          .card-image-content {
            height: 220px !important;
          }
          .card-info {
            height: auto !important;
          }
        }

        /* Hover Styles */
        .project-card:hover {
          border-color: var(--accent-color) !important;
          box-shadow: 0 8px 32px rgba(23,147,209,0.1);
        }

        .project-card .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%);
          opacity: 0.35;
          transition: opacity 0.4s ease;
          z-index: 1;
        }

        .project-card:hover .image-overlay {
          opacity: 0.15;
        }

        .project-card .project-image {
          filter: grayscale(40%) brightness(0.75);
          transition: filter 0.4s ease, transform 0.4s ease;
        }

        .project-card:hover .project-image {
          filter: ${isDark ? "brightness(0.9) contrast(1.05)" : "brightness(0.95)"};
          transform: scale(1.03);
        }

        .project-card .scanline-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
        }

        .project-card .card-badge {
          position: absolute;
          top: 12,
          font-size: 9px;
          padding: 2px 7px;
          background: rgba(0,0,0,0.6);
          letter-spacing: 0.08em;
          z-index: 3;
        }

        .project-card .card-badge.left {
          left: 12px;
          top: 12px;
          color: var(--accent-color);
          border: 1px solid var(--accent-color);
        }

        .project-card .card-badge.right {
          right: 12px;
          top: 12px;
        }

        .project-card .corner-bracket {
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          opacity: 0.3;
          transition: opacity 0.2s;
        }

        .project-card:hover .corner-bracket {
          opacity: 1;
        }

        .project-card .role-text {
          font-size: 10px;
          color: var(--accent-color);
          letter-spacing: 0.08em;
          margin-bottom: 4px;
        }

        .project-card .title-text {
          font-weight: 700;
          margin: 0;
          letter-spacing: 0.03em;
          line-height: 1.2;
          font-size: 18px;
        }

        .project-card .subtitle-text {
          font-size: 10px;
          margin-top: 2px;
          letter-spacing: 0.04em;
        }

        .project-card .cta-text {
          font-size: 10px;
          letter-spacing: 0.08em;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
          margin-top: auto;
        }

        .project-card:hover .cta-text {
          color: var(--accent-color) !important;
        }

        .project-card .arrow {
          transition: transform 0.2s;
        }

        .project-card:hover .arrow {
          transform: translateX(3px);
        }

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
