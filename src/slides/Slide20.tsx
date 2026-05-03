import { motion } from "framer-motion";
import { SlideShell, SlideHeader, Pill } from "../components/index.ts";
import { fadeInUp, stagger, DURATION } from "../lib/motion.ts";

const MEMBERS = [
  {
    name: "Tanit Yodsirawong (Born)",
    roles: ["Web Developer", "UX/UI Designer"],
    img: null,
  },
  {
    name: "Peerapat Patcharamontree (Atom)",
    roles: ["Web Developer", "Project Manager"],
    img: null,
  },
  {
    name: "Chawin Leardswai (Mas)",
    roles: ["Data Engineer"],
    img: null,
  },
  {
    name: "Puran Prasertthai (Prod)",
    roles: ["Data Engineer"],
    img: null,
  },
  {
    name: "Nattapol Teerayuttawong (Pon)",
    roles: ["AI Engineer"],
    img: null,
  },
];

function getRoleColor(role: string) {
  if (role.includes("Web")) return { color: "#06B6D4", rgb: "6,182,212" };
  if (role.includes("UX")) return { color: "#EC4899", rgb: "236,72,153" };
  if (role.includes("Project")) return { color: "#3B82F6", rgb: "59,130,246" };
  if (role.includes("Data")) return { color: "#F59E0B", rgb: "245,158,11" };
  if (role.includes("AI")) return { color: "#7C3AED", rgb: "124,58,237" };
  return { color: "#6B7280", rgb: "107,114,128" };
}

function MemberCard({ member, delay, size = 150 }: { member: typeof MEMBERS[number]; delay: number; size?: number }) {
  const mainRole = getRoleColor(member.roles[0]);

  return (
    <motion.div
      {...fadeInUp(delay, { distance: 24, duration: DURATION.med })}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
    >
      {/* Circular photo */}
      <div style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        background: "linear-gradient(145deg, #e8e8f0, #d0d0e0)",
        flexShrink: 0,
        position: "relative",
      }}>
        {member.img ? (
          <img src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          /* Silhouette placeholder */
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden" }}>
            <svg width={size * 0.72} height={size * 0.72} viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="35" r="22" fill="#b0b0c8" />
              <ellipse cx="50" cy="95" rx="38" ry="28" fill="#b0b0c8" />
            </svg>
          </div>
        )}
      </div>

      {/* Role tags as Pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
        {member.roles.map((r) => {
          const c = getRoleColor(r);
          return (
            <Pill key={r} color={c.color} rgb={c.rgb} fontSize={11} padding="4px 12px">
              {r}
            </Pill>
          );
        })}
      </div>

      {/* Name */}
      <div style={{ fontSize: 18, fontWeight: 800, color: "#111827", textAlign: "center", lineHeight: 1.2, marginTop: 2 }}>
        {member.name}
      </div>
    </motion.div>
  );
}

export function Slide20() {
  const top = MEMBERS.slice(0, 3);
  const bottom = MEMBERS.slice(3);

  return (
    <SlideShell glowColorTop="#7C3AED" glowColorBottom="#3B82F6" glowOpacity={0.05}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingTop: 8 }}>

        <SlideHeader
          label="Aingo"
          title="Meet the"
          highlight="Team."
          tagline="Five members · Four disciplines · One mission"
        />

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", marginTop: 40 }}>
          {/* Row 1 — 3 members */}
          <div style={{ display: "flex", justifyContent: "center", gap: 110, marginBottom: 80 }}>
            {top.map((m, i) => (
              <MemberCard key={i} member={m} delay={stagger(0.2, 0.12, i)} size={240} />
            ))}
          </div>

          {/* Row 2 — 2 members centered */}
          <div style={{ display: "flex", justifyContent: "center", gap: 160 }}>
            {bottom.map((m, i) => (
              <MemberCard key={i} member={m} delay={stagger(0.2, 0.12, i + 3)} size={240} />
            ))}
          </div>
        </div>

      </div>
    </SlideShell>
  );
}
