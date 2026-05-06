import { IconBadge } from "../primitives/IconBadge.tsx";

/** Column header icon for the "Objective" section (target circles). */
export function ObjectiveColumnIcon() {
  return (
    <IconBadge
      gradient={["#7C3AED", "#A855F7"]}
      shadow="rgba(124,58,237,0.35)"
      size={32}
      radius={9}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
        <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="2" />
        <circle cx="12" cy="12" r="2" fill="white" />
      </svg>
    </IconBadge>
  );
}

/** Column header icon for the "Scope" section (clipboard with lines). */
export function ScopeColumnIcon() {
  return (
    <IconBadge
      gradient={["#F59E0B", "#EF4444"]}
      shadow="rgba(245,158,11,0.35)"
      size={32}
      radius={9}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="M9 9h6M9 12h6M9 15h4"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </IconBadge>
  );
}

/** Card icon for "Research & Design" objective item. */
export function ResearchDesignIcon() {
  return (
    <IconBadge
      gradient={["#6366F1", "#8B5CF6"]}
      shadow="rgba(99,102,241,0.3)"
      size={44}
      radius={12}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5z"
          stroke="white"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M2 17l10 5 10-5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12l10 5 10-5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconBadge>
  );
}

/** Card icon for "Evaluation" objective item. */
export function EvaluationIcon() {
  return (
    <IconBadge
      gradient={["#EC4899", "#F43F5E"]}
      shadow="rgba(236,72,153,0.3)"
      size={44}
      radius={12}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <polyline
          points="22 12 18 12 15 21 9 3 6 12 2 12"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconBadge>
  );
}

/** Card icon for "Implementation" objective item. */
export function ImplementationIcon() {
  return (
    <IconBadge
      gradient={["#10B981", "#059669"]}
      shadow="rgba(16,185,129,0.3)"
      size={44}
      radius={12}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <polyline
          points="16 18 22 12 16 6"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="8 6 2 12 8 18"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconBadge>
  );
}

/** Card icon for "Data Ingestion" scope item. */
export function DataIngestionIcon() {
  return (
    <IconBadge
      gradient={["#F59E0B", "#F97316"]}
      shadow="rgba(245,158,11,0.3)"
      size={44}
      radius={12}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="white" strokeWidth="2" />
        <path
          d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"
          stroke="white"
          strokeWidth="2"
        />
        <path
          d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </IconBadge>
  );
}

/** Card icon for "User Interface" scope item. */
export function ChatUIIcon() {
  return (
    <IconBadge
      gradient={["#06B6D4", "#3B82F6"]}
      shadow="rgba(6,182,212,0.3)"
      size={44}
      radius={12}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
          stroke="white"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <line
          x1="9"
          y1="10"
          x2="15"
          y2="10"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <line
          x1="9"
          y1="14"
          x2="13"
          y2="14"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </IconBadge>
  );
}

/** Card icon for "AI System" scope item. */
export function AISystemIcon() {
  return (
    <IconBadge
      gradient={["#8B5CF6", "#6366F1"]}
      shadow="rgba(139,92,246,0.3)"
      size={44}
      radius={12}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="8" width="16" height="12" rx="3" stroke="white" strokeWidth="1.8" />
        <path d="M8 14H8.01" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 14H16.01" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M10 18H14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 8V4" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="4" r="1" stroke="white" strokeWidth="1.8" />
        <path d="M4 12H2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M22 12H20" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </IconBadge>
  );
}

