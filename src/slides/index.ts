import type { ComponentType } from 'react';
// ── Intro ──────────────────────────────────────────────────────────────────
import { Intro01 } from './Intro01.tsx';
import { Intro02 } from './Intro02.tsx';
// ── Problem Definition ─────────────────────────────────────────────────────
import { Problem01 } from './Problem01.tsx';
import { Problem02 } from './Problem02.tsx';
import { Problem03 } from './Problem03.tsx';
import { Problem04 } from './Problem04.tsx';
import { Problem05 } from './Problem05.tsx';
// ── Approach ───────────────────────────────────────────────────────────────
import { Approach01 } from './Approach01.tsx';
import { Approach02 } from './Approach02.tsx';
import { Approach03 } from './Approach03.tsx';
import { Approach04 } from './Approach04.tsx';
// ── System Design & Implementation ─────────────────────────────────────────
import { System01 } from './System01.tsx';
import { SystemVideo } from './SystemVideo.tsx';
import { System02 } from './System02.tsx';
import { System03 } from './System03.tsx';
import { System04 } from './System04.tsx';
import { System05 } from './System05.tsx';
import { System06 } from './System06.tsx';
import { System07 } from './System07.tsx';
import { System08 } from './System08.tsx';
import { System09 } from './System09.tsx';
import { System10 } from './System10.tsx';
// ── Testing & Evaluation ───────────────────────────────────────────────────
import { Eval01 } from './Eval01.tsx';
import { Eval02 } from './Eval02.tsx';
// ── Team & Timeline ────────────────────────────────────────────────────────
import { Team01 } from './Team01.tsx';
import { Team02 } from './Team02.tsx';
import { Team03 } from './Team03.tsx';
import { Team04 } from './Team04.tsx';

export type SlideComponent = ComponentType;

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE DECK — edit here to reorder, add, or remove slides.
// Sections and their counts are derived automatically; no need to touch App.tsx.
// ─────────────────────────────────────────────────────────────────────────────
const deck = [
  {
    label: 'Intro',
    slides: [
      Intro01,
      Intro02,
    ],
  },
  {
    label: 'Problem',
    slides: [
      Problem01,
      Problem02,
      Problem03,
      Problem04,
      Problem05,
    ],
  },
  {
    label: 'Approach',
    slides: [
      Approach01,
      Approach02,
      Approach03,
      Approach04,
    ],
  },
  {
    label: 'System',
    slides: [
      System01,
      SystemVideo,
      System02,
      System03,
      System04,
      System05,
      System06,
      System07,
      System08,
      System09,
      System10,
    ],
  },
  {
    label: 'Testing',
    slides: [
      Eval01,
      Eval02,
    ],
  },
  {
    label: 'Team',
    slides: [
      Team01,
      Team02,
      Team03,
      Team04,
    ],
  },
] as const satisfies { label: string; slides: SlideComponent[] }[];

/** Flat ordered slide array used by the presentation engine. */
export const slides: SlideComponent[] = deck.flatMap((s) => s.slides);

/** Section metadata with auto-derived counts — consumed by ProgressTracker. */
export const sections: { label: string; count: number }[] = deck.map((s) => ({
  label: s.label,
  count: s.slides.length,
}));

/** Total number of slides shown in the progress tracker (excludes hidden/video slides). */
export const trackerSlideCount: number = slides.length;

