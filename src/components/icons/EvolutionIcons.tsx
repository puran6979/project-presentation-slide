/** Pure SVG icons for Slide06 evolution levels — used inside <IconTile> in the slide. */

export function LegacySearchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="7" stroke="#EF4444" strokeWidth="2" />
      <line
        x1="16.5"
        y1="16.5"
        x2="21"
        y2="21"
        stroke="#EF4444"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="8"
        y1="11"
        x2="14"
        y2="11"
        stroke="#EF4444"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="11"
        y1="8"
        x2="11"
        y2="14"
        stroke="#EF4444"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function NaiveRagIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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
  );
}

export function ProposedSystemIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient
          id="zap-g"
          x1="4"
          y1="2"
          x2="20"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7C3AED" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      <path d="M13 2L4 14H11L9 22L20 10H13L13 2Z" fill="url(#zap-g)" />
    </svg>
  );
}
