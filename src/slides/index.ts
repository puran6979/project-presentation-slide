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
// import { TempSlide } from './TempSlide.tsx';

export type SlideComponent = ComponentType;

export const slides: SlideComponent[] = [
  // Intro
  Intro01,
  Intro02,
  // Problem Definition
  Problem01,
  Problem02,
  Problem03,
  Problem04,
  Problem05,
  // Approach
  Approach01,
  Approach02,
  Approach03,
  Approach04,
  // System Design & Implementation
  System01,
  System02,
  System03,
  System04,
  System05,
  System06,
  System07,
  System08,
  System09,
  System10,
  // Testing & Evaluation
  Eval01,
  Eval02,
  // Team & Timeline
  Team01,
  Team02,
  Team03,
  Team04,
  // TempSlide,
];
