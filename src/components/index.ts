// ─── Layout ────────────────────────────────────────────────────────────────
export { SlideShell } from "./layout/SlideShell.tsx";
export { SlideHeader } from "./layout/SlideHeader.tsx";
export { SlideLabel } from "./layout/SlideLabel.tsx";
export { SectionDivider } from "./layout/SectionDivider.tsx";
export { BottomLabel } from "./layout/BottomLabel.tsx";
export { PresentationFrame } from "./layout/PresentationFrame.tsx";
export { Navigation } from "./layout/Navigation.tsx";

// ─── Composite ─────────────────────────────────────────────────────────────
export { SectionTitle } from "./composite/SectionTitle.tsx";
export { Callout } from "./composite/Callout.tsx";
export { IconCard } from "./composite/IconCard.tsx";
export { BeforeAfterRow } from "./composite/BeforeAfterRow.tsx";
export { BenefitItem } from "./composite/BenefitItem.tsx";
export { default as Lanyard } from "./composite/Lanyard.tsx";

// ─── Primitives ────────────────────────────────────────────────────────────
export { Pill } from "./primitives/Pill.tsx";
export { IconTile } from "./primitives/IconTile.tsx";
export { IconBadge } from "./primitives/IconBadge.tsx";
export { BigGhostNumber } from "./primitives/BigGhostNumber.tsx";
export { ImagePlaceholder } from "./primitives/ImagePlaceholder.tsx";
export { VerticalDivider, HorizontalDivider } from "./primitives/Divider.tsx";
export { GradientText } from "./primitives/GradientText.tsx";
export { ThaiText } from "./primitives/ThaiText.tsx";
export { AccentLine } from "./primitives/AccentLine.tsx";
export { AnimatedBeam } from "./primitives/AnimatedBeam.tsx";
export type { AnimatedBeamProps } from "./primitives/AnimatedBeam.tsx";

// ─── Icons ─────────────────────────────────────────────────────────────────
export { ZapIcon, ParadoxIcon } from "./icons/BackgroundIcons.tsx";
export { SearchFailIcon, ScatterIcon, ClockIcon, AlertCircleIcon, CostIcon } from "./icons/ProblemIcons.tsx";
export { LegacySearchIcon, NaiveRagIcon, ProposedSystemIcon } from "./icons/EvolutionIcons.tsx";
export { PulseRings, LayersIcon, GraphIcon, SyncIcon } from "./icons/ApproachIcons.tsx";
export {
  ObjectiveColumnIcon,
  ScopeColumnIcon,
  ResearchDesignIcon,
  EvaluationIcon,
  ImplementationIcon,
  DataIngestionIcon,
  ChatUIIcon,
} from "./icons/ObjectiveScopeIcons.tsx";
export {
  FrontendIcon,
  BackendIcon,
  AIEngineIcon,
  EmbeddingIcon,
  IngestionIcon,
  StorageIcon,
  WebhookIcon,
} from "./icons/ServiceIcons.tsx";
