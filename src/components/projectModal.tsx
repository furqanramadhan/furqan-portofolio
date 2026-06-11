import Image from "next/image";

export const projects = [
  {
    id: "zonapetik",
    title: "ZonaPETIK",
    subtitle: "Smart Planting Calendar for Farmers",
    role: "Backend Developer",
    org: "TDMRC USK",
    year: "2025",
    img: "/assets/image/projects/project1.webp",
    desc: "Built a smart rice planting calendar predicting optimal schedules from climate time-series data. Deployed and used by local agricultural stakeholders in Aceh Besar to reduce crop failure risk.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Flask", "Scikit-Learn"],
    linkCode: null,
    linkLive: "http://www.zonapetik.site",
    featured: true, // large card
  },
  {
    id: "signmate",
    title: "SignMate",
    subtitle: "Indonesian Sign Language Learning App",
    role: "Mobile Developer",
    org: "Bangkit Academy",
    year: "2024",
    img: "/assets/image/projects/project2.webp",
    desc: "Built an Android app using Kotlin to bridge communication for the deaf and hard of hearing. Delivered Sign Language Dictionary with camera support and Quiz Practice feature in a cross-functional team (Mobile, ML, Cloud).",
    tech: ["Kotlin", "Android", "ML", "Cloud"],
    linkCode: "https://github.com/furqanramadhan/SignMate-C241-PS262",
    linkLive: null,
    featured: false,
  },
  {
    id: "capytype",
    title: "CapyType",
    subtitle: "Minimalistic Typing Test Platform",
    role: "Backend Developer",
    org: "Team Project",
    year: "2023",
    img: "/assets/image/projects/project3.webp",
    desc: "Built a typing test platform measuring WPM, CPM, and accuracy across timed and untimed modes. Implemented user authentication and leaderboard system to store and rank results across users.",
    tech: ["Laravel", "MySQL", "JavaScript"],
    linkCode: "https://github.com/EKIZAMANI/CapyDEV_final_project",
    linkLive: null,
    featured: false,
  },
];

export type Project = (typeof projects)[0];

export function ProjectModal({
  project,
  onClose,
  isDark,
}: {
  project: Project;
  onClose: () => void;
  isDark: boolean;
}) {
  const theme = isDark
    ? {
        bg: "#0f0f0f",
        border: "#1e1e1e",
        text: "#C8C8C8",
        textMuted: "#555",
        tagBg: "#0a0a0a",
      }
    : {
        bg: "#EDE8DC",
        border: "#C8BFA8",
        text: "#1A1A1A",
        textMuted: "#7A7060",
        tagBg: "#E0DAD0",
      };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.88)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backdropFilter: "blur(6px)",
        animation: "fadeInModal 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: theme.bg,
          border: `1px solid ${theme.border}`,
          width: "100%",
          maxWidth: 680,
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          fontFamily: "'JetBrains Mono', monospace",
          animation: "slideUpModal 0.25s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal title bar */}
        <div
          style={{
            background: isDark ? "#0a0a0a" : "#E0DAD0",
            borderBottom: `1px solid ${theme.border}`,
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={onClose}
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#ff5f57",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#febc2e",
              }}
            />
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#28c840",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 10,
              color: theme.textMuted,
              letterSpacing: "0.08em",
            }}
          >
            ./{project.id}.sh
          </span>
          <span style={{ fontSize: 10, color: theme.textMuted }}>
            furqan@dev
          </span>
        </div>

        {/* Project image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/7",
            background: isDark ? "#111" : "#E8E3D8",
            overflow: "hidden",
          }}
        >
          <Image
            src={project.img}
            alt={project.title}
            fill
            style={{
              objectFit: "cover",
              filter: isDark ? "brightness(0.85)" : "brightness(0.95)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
            }}
          />
          {/* Year badge */}
          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              fontSize: 10,
              color: "var(--accent-color)",
              border: "1px solid var(--accent-color)",
              padding: "2px 8px",
              background: isDark ? "rgba(0,0,0,0.7)" : "rgba(245,240,232,0.85)",
              letterSpacing: "0.08em",
            }}
          >
            {project.year}
          </div>
        </div>

        {/* Content */}
        <div className="project-modal-content" style={{ padding: "24px 24px 28px" }}>
          {/* Header */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 10,
                color: "var(--accent-color)",
                letterSpacing: "0.1em",
                marginBottom: 6,
              }}
            >
              <span style={{ color: theme.textMuted }}>$ </span>
              {project.org} · {project.role}
            </div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: theme.text,
                margin: "0 0 4px",
                letterSpacing: "0.03em",
              }}
            >
              {project.title}
            </h2>
            <div
              style={{
                fontSize: 12,
                color: theme.textMuted,
                letterSpacing: "0.04em",
              }}
            >
              {project.subtitle}
            </div>
          </div>

          {/* Desc */}
          <div
            style={{
              fontSize: 11,
              color: theme.textMuted,
              lineHeight: 1.8,
              marginBottom: 20,
              borderLeft: "2px solid var(--accent-color)",
              paddingLeft: 14,
            }}
          >
            {project.desc}
          </div>

          {/* Tech stack */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: 10,
                color: "var(--accent-color)",
                letterSpacing: "0.1em",
                marginBottom: 10,
              }}
            >
              // stack
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 10,
                    color: theme.textMuted,
                    border: `1px solid ${theme.border}`,
                    padding: "3px 10px",
                    letterSpacing: "0.06em",
                    background: theme.tagBg,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="modal-links" style={{ display: "flex", gap: 10 }}>
            {project.linkLive && (
              <a
                href={project.linkLive}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link-btn primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "10px 18px",
                  border: "1px solid var(--accent-color)",
                  color: "var(--accent-color)",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  background: "transparent",
                }}
              >
                <i
                  className="fas fa-external-link-alt"
                  style={{ fontSize: 10 }}
                />{" "}
                ./live_demo.sh
              </a>
            )}
            {project.linkCode && (
              <a
                href={project.linkCode}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link-btn secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "10px 18px",
                  border: `1px solid ${theme.border}`,
                  color: theme.textMuted,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  transition: "all 0.2s",
                  background: "transparent",
                }}
              >
                <i className="fab fa-github" style={{ fontSize: 11 }} />{" "}
                ./view_code.sh
              </a>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .modal-link-btn.primary:hover {
          background: var(--accent-color) !important;
          color: #000 !important;
        }
        .modal-link-btn.secondary:hover {
          border-color: var(--accent-color) !important;
          color: var(--accent-color) !important;
        }
        @media (max-width: 768px) {
          .modal-links {
            flex-direction: column;
          }
          .modal-link-btn {
            width: 100%;
          }
          .project-modal-content {
             padding: 18px 18px 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
