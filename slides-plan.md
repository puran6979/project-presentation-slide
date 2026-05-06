# Slide Plan: Slide13 – Slide22

Covers the Implementation, Evaluation, Team, and Conclusion sections missing from the current 12-slide deck. Each entry describes goal, layout, exact content, components, color scheme, and animation notes.

---

## Slide13 — Section Divider: "Implementation"

**Goal:** Transition the audience from the design/approach section into the engineering deep-dive.

**Pattern:** Same as Slide07 and Slide11 — use `<SectionDivider>` component, no custom layout needed.

**Content:**
```
prefix  = "System"
highlight = "Implementation."
```

**Notes:**
- Glow color: purple (`124,58,237`) top-right, green (`16,185,129`) bottom-left.
- Matches the visual rhythm of Slide07/Slide11. One-liner implementation.

---

## Slide14 — Services Breakdown

**Goal:** Show the 7 microservices of the AiQ architecture — what each does and what tech it uses. Makes the Solution Overview (Slide12 architecture diagram) concrete and readable.

**Layout:** `SlideHeader` + a 7-item list. Two columns: left column 4 items, right column 3 items. Each row is an `IconCard`-style row: icon tile on the left, service name bold + one-line responsibility, tech pill(s) on the right.

**Header:**
```
label    = "Aingo"
title    = "Services"
highlight = "Breakdown."
tagline  = "7 decoupled microservices — each with a single responsibility"
```

**Services data (exact text from report):**

| # | Service | Responsibility (1 line) | Tech | Accent color |
|---|---------|------------------------|------|--------------|
| 1 | Frontend Application | Real-time Chat, Citation display, Document Upload | Next.js · React · Tailwind | `#06B6D4` (cyan) |
| 2 | Backend Orchestrator | Session management, request routing, SSE progress streaming | NestJS · TypeScript | `#7C3AED` (purple) |
| 3 | Search Flow Service | Multi-agent ReAct reasoning with HyDE query expansion and MCP tools | Python · CrewAI | `#EC4899` (pink) |
| 4 | Embedding Service | Text-to-vector (BGE-M3), cosine similarity search, sole Qdrant manager | Python · Qdrant | `#3B82F6` (blue) |
| 5 | Data Ingestion Service | ETL pipeline — Docling structural extraction, HybridChunker, RabbitMQ worker | Python · RabbitMQ · Docling | `#F59E0B` (amber) |
| 6 | File Storage Service | Object storage intermediary (MinIO/S3), presigned URLs, event notifications | Python · MinIO/S3 | `#10B981` (green) |
| 7 | SharePoint Webhook | Listens for file-change triggers from SharePoint, commands ingestion via queue | Python · Graph API | `#EF4444` (red) |

**Components:** `SlideHeader`, `SlideShell`, `IconTile` (for numbered service icon), `Pill` (for tech tags), `motion.div` fade-in stagger per row.

**Animation:** Each row fades in with `fadeInLeft` staggered by 0.1s starting at delay 0.28.

**Glow:** purple top-right, cyan bottom-left.

---

## Slide15 — Data Ingestion Pipeline

**Goal:** Show how AiQ's HybridChunker solves the Ingestion Gap — the 3-step structural extraction algorithm that makes chunking structure-aware instead of naive fixed-window.

**Layout:** `SlideHeader` + two regions side by side.
- **Left (40%):** A vertical 3-step flow — Step 1 → Step 2 → Step 3, with a connecting arrow between each step. Each step is a card with a number badge, title, and 1–2 sentence description.
- **Right (60%):** A visual diagram showing a sample document being processed:
  - Input: raw PDF block (labelled "SharePoint / Xhive document")
  - After Step 1: document with detected boundary markers highlighted
  - After Step 2: breadcrumb annotation `Policy > IT > Security` prepended to chunk
  - After Step 3: final chunks labelled "≤ 512 tokens" going into Qdrant

**Header:**
```
label    = "Aingo"
title    = "Ingestion"
highlight = "Pipeline."
tagline  = "HybridChunker — structure-aware extraction via Docling"
```

**Step cards data:**

| Step | Title | Body |
|------|-------|------|
| 01 | Structural Intersection | Detects semantic boundaries and structural markers — headers, subheaders. Chunks are divided at natural breakpoints, never mid-paragraph. |
| 02 | Structural Serialization | Document headers extracted and serialized as contextual breadcrumbs (e.g. `Policy › IT › Security`) prepended to every chunk. |
| 03 | Token-Aware Merging | Chunks capped at 512 tokens using an embedding-aligned tokenizer. Smaller related peers are merged and hierarchical breadcrumbs prepended before vectorization. |

**Accent colors:** Step 01 amber `#F59E0B`, Step 02 purple `#7C3AED`, Step 03 green `#10B981`.

**Right side:** Use `ImagePlaceholder` with `variant="dashed"` and label "Data Ingestion Diagram" as a placeholder for the actual diagram (reference: `data_ingestion_overview.png` from the report). If the image asset exists at `src/assets/data-ingestion-overview.png`, use `<img>` instead.

**Components:** `SlideHeader`, `SlideShell`, `BigGhostNumber` (watermark step numbers), `Pill` (breadcrumb example), `ImagePlaceholder` or `<img>`.

**Animation:** Left steps stagger `fadeInLeft`, right diagram `fadeInRight` at delay 0.3.

**Glow:** amber top-right `245,158,11` opacity 0.1, purple bottom-left `124,58,237` opacity 0.08.

---

## Slide16 — HyDE: Bridging the Semantic Density Gap

**Goal:** Explain the core retrieval innovation — why standard cosine similarity fails on enterprise queries, and how Hypothetical Document Embeddings (HyDE) solves it. Land the **20.6% improvement** number as a memorable result.

**Layout:** `SlideHeader` + main body split into two rows.
- **Top row (55%):** Two side-by-side cards showing the "before" and "after" vector space:
  - Card LEFT — "Standard Retrieval" (red/amber accent): short user query sits in low-density space, technical document sits in high-density space → poor cosine similarity → wrong chunk retrieved.
  - Card RIGHT — "HyDE Retrieval" (purple/green accent): LLM generates a "hypothetical answer" from the query → that hypothetical answer sits in the same high-density space as the documents → high cosine similarity → correct chunk retrieved.
- **Bottom row (45%):** Three stat callout boxes side by side:
  - `+20.6%` Performance improvement vs standard vector retrieval baseline
  - `0.77` Faithfulness (vs `0.55–0.65` naive RAG baseline)
  - `Why not GraphRAG?` — rejected due to 142s sync latency; HyDE gave better precision at lower cost

**Header:**
```
label    = "Aingo"
title    = "HyDE &"
highlight = "Density Gap."
tagline  = "Bridging the semantic mismatch between queries and enterprise documents"
```

**Exact text for cards:**

*Left card — The Problem:*
- Eyebrow pill: "Standard RAG" (amber)
- Body: User queries are short, colloquial, intent-focused → low-density semantic space. Technical documents are long, terminology-dense, structurally complex → high-density space. This mismatch causes poor cosine similarity scores at retrieval time.

*Right card — The Solution (HyDE):*
- Eyebrow pill: "AiQ HyDE" (purple/green)
- Body: Instead of vectorizing the sparse user query, a generative model synthesizes an "ideal hypothetical answer." Vectorizing this detailed response maximizes semantic overlap with actual documentation in the vector database.

**Callout boxes:**
- Box 1 — Big number `+20.6%` label "Performance vs baseline" accent green
- Box 2 — Big number `0.77` label "Faithfulness score" sub "vs 0.55–0.65 naive baseline" accent purple
- Box 3 — "GraphRAG rejected" label "142s sync latency" sub "HyDE: superior precision + lower cost" accent amber

**Components:** `SlideHeader`, `SlideShell`, `Pill`, `GradientText` (for +20.6%), `BigGhostNumber` (watermark behind stat boxes), `Callout` or custom cards.

**Animation:** Top cards `fadeInUp` stagger, stat boxes `scaleIn` stagger starting delay 0.55.

**Glow:** purple top-right, green bottom-left.

---

## Slide17 — Search Flow Service: CrewAI ReAct Flow

**Goal:** Show how the agentic reasoning loop works — the state-driven CrewAI Flow that builds context, injects MCP tools, runs ReAct, and streams results back via SSE. Explains why the system achieves 0.99 Tool Correctness.

**Layout:** `SlideHeader` + one horizontal flow diagram spanning the full width, with annotations below.

**Header:**
```
label    = "Aingo"
title    = "Search Flow Service &"
highlight = "ReAct Loop."
tagline  = "State-driven multi-agent reasoning with SSE progress streaming"
```

**Flow diagram (left → right, 6 nodes connected by arrows):**

| Node | Label | Sub-label | Color |
|------|-------|-----------|-------|
| 1 | User Query | NestJS Gateway receives request | cyan `#06B6D4` |
| 2 | Build Context | History injection + context block assembly | purple `#7C3AED` |
| 3 | Inject MCP Tools | Model Context Protocol tool binding | blue `#3B82F6` |
| 4 | ReAct Loop | Reason → Act → Observe → repeat | pink `#EC4899` |
| 5 | Synthesize Answer | LLM generates grounded response with citations | green `#10B981` |
| 6 | SSE Stream | Token-by-token progress to frontend | amber `#F59E0B` |

**Below the flow — two annotation cards (side by side):**

*Card A — ReAct Pattern:*
- Pill: "CrewAI"
- Body: The agent iteratively Reasons about what it needs, Acts by invoking MCP tools (vector search, graph traversal), and Observes results — looping until the task is complete or context is sufficient.

*Card B — SSE Streaming:*
- Pill: "Server-Sent Events"
- Body: Long-running agentic reasoning is streamed token-by-token via a single HTTP connection. Users see progress in real-time, eliminating perceived latency. Each event carries `type`, `content`, and `citations`.

**Components:** `SlideHeader`, `SlideShell`, `Pill`, `IconTile` (for each flow node icon), `motion.div` with `fadeInLeft` cascade across the 6 nodes.

**Animation:** Flow nodes cascade left-to-right, each delayed by 0.1s from previous. Annotation cards `fadeInUp` after the flow is drawn (delay ~0.9).

**Glow:** pink top-right `236,72,153` opacity 0.09, blue bottom-left `59,130,246` opacity 0.08.

---

## Slide18 — Section Divider: "Evaluation"

**Goal:** Transition into the results section.

**Pattern:** `<SectionDivider>` component.

```
prefix    = "Testing &"
highlight = "Evaluation."
```

**Notes:** Same single-component pattern as Slide07, Slide11, Slide13.

---

## Slide19 — Evaluation Results

**Goal:** Present the hard numbers — 4 metrics from Ragas/DeepEval across 231 test runs, compared against naive RAG baseline. This is the proof slide.

**Layout:** `SlideHeader` + two rows.
- **Top row (50%):** 4 big stat cards in a horizontal row — one per metric.
- **Bottom row (50%):** Left: a comparison callout (AiQ vs naive baseline). Right: a brief analysis paragraph.

**Header:**
```
label    = "Aingo"
title    = "Evaluation"
highlight = "Results."
tagline  = "231 test executions · Ragas & DeepEval · LLM-as-Judge"
```

**Metric cards data:**

| Metric | Score | Evals | Accent | Big number color |
|--------|-------|-------|--------|-----------------|
| Faithfulness | 0.77 | 231 | purple `#7C3AED` | gradient purple→violet |
| Task Completion | 0.97 | 231 | green `#10B981` | gradient green→emerald |
| Tool Correctness | 0.99 | 231 | blue `#3B82F6` | gradient blue→cyan |
| Factual Correctness | 0.78 | 231 | pink `#EC4899` | gradient pink→rose |

Each metric card contains:
- `BigGhostNumber` watermark (the score value, very large, low opacity, behind)
- Bold score number `0.xx` (large, colored gradient)
- Metric name (semibold, dark)
- Small divider line
- 1-line description (body text)
- Bottom accent bar with gradient

**Comparison callout (bottom-left):**
- Eyebrow: "vs Naive RAG Baseline"
- Body: Standard RAG systems typically score **0.55–0.65 Faithfulness** due to naive fixed-window chunking. AiQ's HybridChunker + HyDE pipeline achieves **0.77** — a significant improvement for enterprise deployment where information reliability is critical.
- Color: purple `#7C3AED`

**Analysis note (bottom-right):**
- Eyebrow: "Key Takeaway"
- Body: The exceptional Tool Correctness (0.99) and Task Completion (0.97) confirm high reliability in the CrewAI reasoning loop and MCP integration. The Faithfulness score of 0.77 has room for improvement via prompt engineering refinement.
- Color: green `#10B981`

**Components:** `SlideHeader`, `SlideShell`, `BigGhostNumber`, `GradientText`, `Callout`, `Pill`.

**Animation:** 4 metric cards `cardRise` stagger (delay 0.28 to 0.58), bottom callouts `fadeInUp` after.

**Glow:** purple top-right, green bottom-left.

---

## Slide20 — Section Divider: "Team"

**Goal:** Transition into the team and timeline section.

**Pattern:** `<SectionDivider>` component.

```
prefix    = "Team &"
highlight = "Timeline."
```

---

## Slide21 — Team Roles & 32-Week Timeline

**Goal:** Show team structure (4 roles + who owns what) and visualize the 32-week engineering lifecycle across 2 semesters as a milestone timeline.

**Layout:** `SlideHeader` + two columns.
- **Left column (40%):** Team roles — 4 cards stacked vertically.
- **Right column (60%):** Timeline visualization — horizontal swimlane with 2 phases (Sem 1 / Sem 2), key milestones marked as points on a line.

**Header:**
```
label    = "Aingo"
title    = "Team &"
highlight = "Timeline."
tagline  = "32-week engineering lifecycle · Scrum · bi-weekly sprints"
```

**Team cards data:**

| Role | Owner(s) | Responsibility summary | Accent |
|------|----------|----------------------|--------|
| Data Engineer | — | ETL pipeline, document format handling, database readiness | amber `#F59E0B` |
| Project Manager | — | Timeline, cross-team communication, sprint tracking (Jira) | blue `#3B82F6` |
| Web Developer | — | Chat UI, document upload, UX/UI, backend API integration | cyan `#06B6D4` |
| AI Engineer | — | AI agents, RAG pipeline, retrieval optimization, evaluation | purple `#7C3AED` |

Each card: `IconBadge` (role icon) + role title bold + 1-line responsibility + colored left border.

**Timeline (right side) — key milestones:**

*Semester 1 (Week 1–16):*
- Wk 1–2: Literature review & problem framing
- Wk 3–4: Requirements + user stories
- Wk 5–7: System architecture + tool selection
- Wk 8–10: Web app prototype (NestJS Gateway + vector baseline)
- Wk 11–12: Data Ingestion service prototype (Docling)
- Wk 13–14: Full end-to-end pipeline integration
- Wk 15–16: Final proposal + documentation

*Semester 2 (Week 17–32):*
- Wk 17–18: Pipeline enhancement + baseline metrics
- Wk 19–20: GraphRAG bottleneck (142s) → HyDE pivot
- Wk 21–23: Citations, UI/UX polish, SSO deferred
- Wk 24–26: UAT preparation + JWT finalization
- Wk 27–28: UAT + 50+ query evaluation
- Wk 29–30: Bug fixes + performance stabilization
- Wk 31–32: Final report + demo

**Layout of timeline:** Two horizontal bars (Sem 1 above, Sem 2 below), each with milestone dots. Key milestones highlighted with a colored dot + label. The "HyDE pivot" milestone gets a special accent (amber arrow + note).

**Components:** `SlideHeader`, `SlideShell`, `IconBadge`, `Pill`, `motion.div` for timeline segments, `AccentLine` for timeline bars.

**Animation:** Team cards `fadeInLeft` stagger. Timeline milestones draw in left-to-right using `expandX` on the bar, then dots `scaleIn` stagger.

**Glow:** blue top-right, amber bottom-left.

---

## Slide22 — Conclusion & Future Work

**Goal:** Wrap up the presentation — 3 key achievements, 2 known limitations, and the future roadmap. Leave the audience with the core message: AiQ solves the "first mile" problem of enterprise RAG.

**Layout:** `SlideHeader` + three columns.
- **Left column:** 3 achievement cards (what was delivered).
- **Middle column (narrow):** Vertical divider + limitations note.
- **Right column:** Future work card.

**Header:**
```
label    = "Aingo"
title    = "Conclusion &"
highlight = "Future Work."
tagline  = "Intelligence That Drives Execution"
```

**Achievement cards (left, stacked):**

| # | Achievement | Detail | Accent |
|---|-------------|--------|--------|
| 1 | Robust Ingestion Pipeline | HybridChunker + Docling delivering structure-aware extraction that significantly reduces context fragmentation | green `#10B981` |
| 2 | Validated Performance | Faithfulness 0.77, Task Completion 0.97, Tool Correctness 0.99 — outperforming naive RAG baselines (0.55–0.65) | purple `#7C3AED` |
| 3 | Production-Grade Architecture | 7 decoupled microservices with JWT auth, SSE streaming, RabbitMQ-driven sync, and multilingual BGE-M3 embeddings | blue `#3B82F6` |

Each card: numbered `BigGhostNumber` watermark + `Pill` achievement label + description + colored bottom bar.

**Limitations note (middle, small):**
- Eyebrow: "Known Limitations"
- • Reasoning latency: multi-agent ReAct increases time-to-first-token
- • Token cost: multi-agent planning raises per-query token consumption
- Color: amber `#F59E0B`

**Future work card (right):**
- Title: "What's Next"
- Highlight accent: purple gradient
- Items:
  - **Neo4j Graph-Vector Hybrid Retrieval** — traverse explicit relational networks alongside semantic similarity, pushing enterprise knowledge discovery further
  - **Full Azure AD SSO Integration** — complete OIDC strategy via Passport-Azure-AD (architecturally designed, not yet deployed)
  - **AI Guardrails Layer** — prompt injection protection and inappropriate response filtering
  - **Multi-channel Integration** — LINE / Microsoft Teams connectors
- Each item prefixed with a colored arrow `→` or small `IconTile`

**Bottom strip:** A centered tagline row — `"Project AiQ · Intelligence That Drives Execution · Chulalongkorn University 2025"` in small muted text, with a `GradientText` accent on "AiQ".

**Components:** `SlideHeader`, `SlideShell`, `BigGhostNumber`, `GradientText`, `Pill`, `AccentLine`, `VerticalDivider`, `Callout`.

**Animation:** Left cards `fadeInLeft` stagger (0.28–0.48), middle `fadeIn` (0.5), right card `fadeInRight` (0.38), bottom strip `fadeIn` (0.65).

**Glow:** purple top-right `124,58,237` opacity 0.12, green bottom-left `16,185,129` opacity 0.09.

---

## Summary Table

| Slide | Type | Key visual | New components needed |
|-------|------|-----------|----------------------|
| 13 | Section divider | — | None (uses `SectionDivider`) |
| 14 | Services Breakdown | 7-row icon list with tech pills | None |
| 15 | Ingestion Pipeline | 3-step flow + diagram | None |
| 16 | HyDE / Density Gap | 2 concept cards + 3 stat callouts | None |
| 17 | CrewAI ReAct Flow | 6-node horizontal flow diagram | None |
| 18 | Section divider | — | None (uses `SectionDivider`) |
| 19 | Evaluation Results | 4 metric cards + comparison callout | None |
| 20 | Section divider | — | None (uses `SectionDivider`) |
| 21 | Team & Timeline | 4 role cards + dual milestone timeline | None |
| 22 | Conclusion | 3 achievement cards + future work | None |

All slides use the existing component library. No new components are required.
