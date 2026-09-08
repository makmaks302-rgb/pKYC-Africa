<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Stack

* **Language / Runtime**: TypeScript, Node.js
* **Framework**: Next.js 16 App Router, React 19
* **Styling**: Tailwind CSS 4 through PostCSS
* **Package manager**: npm

## Build approach

Tracer Bullet, build each narrow compliance slice through the real app layers.

## Commands

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## Specs

Stored in `docs/specs/`. Format: `docs/specs/NNNN-title.md`.

## Scope

Product scope lives in `docs/scope/scope.md`. Current workflow target is GA.

## Rules

* Treat this as a privacy first compliance product. Identity data, business ownership data, documents, watchlist results, risk scores, alerts, investigations, and audit events are sensitive.
* Keep institution data isolated. Do not add shared views or queries that cross institutions unless a spec explicitly permits it.
* Screening results are potential matches only. A human review decision is required before treating a match as resolved or escalated.
* Risk, screening, alert, and investigation decisions must stay explainable through visible rule outcomes, reviewer notes, and immutable audit events.
* Support English and French user facing text when building compliance workflows.
* Use the `@/*` path alias for imports from `src`.
* Keep the app compatible with the installed Next.js version. Read the local Next.js docs in `node_modules/next/dist/docs/` before changing Next.js APIs or conventions.

_Drafted by /audit from the repo, worth a quick human pass. Edit freely: once a line stops matching this draft, later runs treat it as curated and will flag rather than overwrite it._
