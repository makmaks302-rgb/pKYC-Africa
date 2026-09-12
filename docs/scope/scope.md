# Scope: pKYC Africa

pKYC Africa is a privacy first KYC and AML/CFT platform for banks and fintechs in West Africa. It helps compliance teams onboard individual and business customers, assess risk, screen potential matches, monitor transactions, and investigate alerts from one explainable workspace.

**Build approach:** Tracer Bullet (build each narrow compliance slice through the real app layers).
**Workflow:** GA (`/check verify`, then `/test`, then `/check review`, then `/document`). The project default level of rigor. `/architect` is the recommended first stop for a feature with a real decision, but skippable when you already know the build. Any feature can carry its own tag to do more or less.

_These are recommendations to keep your build orderly, not requirements. Skip anything that does not fit: if you already know how to build a feature, use `/develop` and skip `/architect`. You decide when a feature is `done`._

## At a glance

| # | Feature | Phase | Status |
|---|---------|-------|--------|
| 1 | App scaffold | Foundation | existing |
| 2 | Product context and coding standards | Foundation | planned |
| 3 | Compliance data model | Foundation | planned |
| 4 | Institution access and roles | Foundation | planned |
| 5 | UI foundation for compliance work | Foundation | planned |
| 6 | Individual KYC onboarding loop | Slice 1 | planned |
| 7 | Business KYB onboarding loop | Slice 2 | planned |
| 8 | Document intake and evidence inventory | Slice 3 | planned |
| 9 | Explainable risk assessment | Slice 4 | planned |
| 10 | Internal watchlist screening | Slice 5 | planned |
| 11 | Compliance alert queue | Slice 6 | planned |
| 12 | Investigation case workspace | Slice 7 | planned |
| 13 | CSV import for customers and transactions | Slice 8 | planned |
| 14 | Transaction monitoring rules and alerts | Slice 9 | planned |
| 15 | Guide & Aide (onboarding & contextual help) | Foundation | planned |

## Foundations

### 1. App scaffold, existing
The project has a Next.js scaffold with the default app page, layout, global styles, public assets, and package scripts.
code in `pkyc-africa/src/app/`, `pkyc-africa/public/`, `pkyc-africa/package.json`

### 2. Product context and coding standards, needs a decision
Capture the real product context, Next.js conventions, quality gates, and team rules so later slices make consistent choices.
**Done when:** root guidance reflects the real app, compliance data sensitivity is named, and lint, build, and project conventions are documented.
- [ ] Capture conventions and tooling choices: `/audit`

### 3. Compliance data model, needs a decision
Define the smallest durable model for institutions, users, roles, customers, business entities, documents, risk results, screening matches, alerts, investigations, transactions, and immutable audit events.
**Done when:** the model supports one institution isolated from another, individual KYC, business KYB, explainable risk, review decisions, and alert investigation without a breaking redesign.
- [ ] Design it (spec): `/architect compliance data model`

### 4. Institution access and roles, needs a decision
Give each institution its own workspace with strict data isolation, role based access, session controls, and clear analyst, manager, and admin permissions.
**Done when:** a user can sign in to one institution, permissions gate analyst, manager, and admin actions, and session state is visible and controllable.
- [ ] Design it (spec): `/architect institution access and roles`

### 5. UI foundation for compliance work, needs a decision
Create the bilingual compliance workspace shell, core navigation, dense table patterns, review panels, status language, and accessible form controls.
**Done when:** English and French labels can render, core compliance views share one layout, and tables, forms, badges, filters, and review actions are accessible.
- [ ] Design it (spec): `/architect UI foundation for compliance work`

## Slice 1: Individual KYC onboarding

### 6. Individual KYC onboarding loop, needs a decision
Build the first complete path for a bank or fintech analyst to create an individual customer, capture identity details, attach evidence, submit for review, and record a human decision.
**Done when:** an analyst can create one individual KYC file, a manager can review it, the decision is saved, and the audit trail explains who did what and why.
- [ ] Design it (spec): `/architect individual KYC onboarding loop`

## Slice 2: Business KYB onboarding

### 7. Business KYB onboarding loop, needs a decision
Add a narrow but real business onboarding path for company identity, ownership, control persons, beneficial owners, and review decisions.
**Done when:** an analyst can create one business KYB file with owners and control persons, a manager can review it, and the audit trail records the decision.
- [ ] Design it (spec): `/architect business KYB onboarding loop`

## Slice 3: Evidence handling

### 8. Document intake and evidence inventory, needs a decision
Support practical document upload and inventory for identity, registration, ownership, and source of funds evidence across KYC and KYB files.
**Done when:** documents can be attached to a customer or business file, categorized, reviewed, replaced, and tracked through immutable document change events.
- [ ] Design it (spec): `/architect document intake and evidence inventory`

## Slice 4: Risk scoring

### 9. Explainable risk assessment, needs a decision
Score customers and businesses through a deterministic, human reviewable model using geography, customer type, product exposure, channel, and country specific overrides.
**Done when:** each KYC or KYB file receives a risk band, visible rule outcomes, override reasons where applicable, and a review decision recorded by a human.
- [ ] Design it (spec): `/architect explainable risk assessment`

## Slice 5: Screening

### 10. Internal watchlist screening, needs a decision
Screen individuals, businesses, owners, and control persons against an internal configurable watchlist while keeping a clean boundary for future external providers.
**Done when:** potential matches are created as review items, analysts can mark false positives or escalate, and no match is treated as final without human review.
- [ ] Design it (spec): `/architect internal watchlist screening`

## Slice 6: Alerts

### 11. Compliance alert queue, needs a decision
Create one queue for risk, screening, onboarding, document, and monitoring alerts with ownership, priority, status, filters, and in app notifications.
**Done when:** alerts can be generated, assigned, filtered, reviewed, and resolved or escalated with all actions added to the audit trail.
- [ ] Design it (spec): `/architect compliance alert queue`

## Slice 7: Investigations

### 12. Investigation case workspace, needs a decision
Give analysts a focused case view for alert context, customer profile, linked evidence, notes, decisions, and manager escalation.
**Done when:** an alert can become an investigation case, reviewers can add notes and outcomes, and the full decision history remains explainable.
- [ ] Design it (spec): `/architect investigation case workspace`

## Slice 8: Imports

### 13. CSV import for customers and transactions, needs a decision
Let institutions load practical customer and transaction files for onboarding support and monitoring tests without requiring full API ingestion.
**Done when:** an admin can upload mapped CSV files, preview validation errors, import accepted rows, and see rejected rows with reasons.
- [ ] Design it (spec): `/architect CSV import for customers and transactions`

## Slice 9: Transaction monitoring

### 14. Transaction monitoring rules and alerts, needs a decision
Apply a small configurable rules set to imported transactions so unusual activity can generate reviewable compliance alerts.
**Done when:** transaction rules can flag suspicious patterns, alerts link back to customers and transactions, and analysts can review and disposition each alert.
- [ ] Design it (spec): `/architect transaction monitoring rules and alerts`

## Foundation: Guide & Aide

### 15. Guide & Aide (onboarding & contextual help), ready to build
Add a lightweight help system for new users: a Guide page showing the 7-step compliance workflow, contextual help panels on Risk/Screening/Alerts/Investigation pages, a quick help button in page headers, and an optional first-login onboarding modal.
**Done when:** a "Guide & Aide" nav item appears in the sidebar, the guide page renders 7 steps with title/description/what-it's-for/what-to-do/what-happens-next, contextual help is available on Risk/Screening/Alerts/Investigation pages without leaving the page, the onboarding modal shows on first login with start/skip options, and all content is static (no AI, no backend).

## Deferred

Out of scope for the current MVP build pass, kept so the plan stays honest.

- **External sanctions and PEP providers**: connect official and commercial providers through the screening abstraction, needs a decision, GA
- **Regulator export packs**: prepare evidence bundles and regulator ready summaries, needs a decision, GA
- **Enterprise SSO**: add SAML or OIDC based enterprise identity, needs a decision, GA
- **Email and webhook notifications**: notify reviewers and downstream systems outside the app, needs a decision
- **Advanced analytics**: dashboards for onboarding throughput, risk distribution, alert aging, and investigator performance, needs a decision
- **Public API ingestion**: allow institutions to push customers, documents, and transactions through APIs, needs a decision, GA
- **Broader Africa country coverage**: expand beyond the first West Africa rule set and configurable country overrides, needs a decision, GA

## Legend

**The decision box.** Every planned feature carries exactly one box whose label ends with `(spec)`. Its wording varies, so skills locate it by that suffix, never by an exact label. Every other box is an execution box and `/architect` never ticks one.

**Feature lifecycle**: the scope updates as a feature moves; each row is what it shows and who sets it:

| State | Set by | The feature shows |
|---|---|---|
| `planned`, needs a decision | `/scope` | one box: `Design it (spec): /architect <feature>` |
| `in-progress` (designed) | `/architect` at spec capture | `Design it` ticked; spec linked; `Build it: /develop <feature>` plus 2 to 5 milestones; the tier closing boxes; any surfaced follow up enrolled |
| `in-progress` (building) | `/develop` | milestone boxes tick one by one; code pointer filled |
| `in-progress` (verified) | `/check verify` | `Build it` and milestones ticked; `Verify it` ticked |
| `done` | you, when you decide it is | boxes you ran ticked, skipped ones marked skipped; the tier last stage is the suggested point to call it done; `/sync` captures conventions |

- **Next step** = the first unticked box, always a command or a tracked milestone.
- **needs a decision** = run `/architect` first; otherwise go straight to `/develop`, or `/audit` for standards and tooling.
- **Atomic build tasks live in the spec's `## Build plan`, not here**: the scope carries only the milestone rollup.
- **Status** `planned` to `in-progress` to `done`, plus `existing` for pre workflow work and `dropped` for removed scope kept as history.
- **Approach tag** beside a heading overrides the project default for that feature; no tag means it inherits the default.
- **Workflow tier tag** beside a heading sets that one feature's rigor above or below the project default; no tag means it inherits the default.
- **Workflow** is the project default, what runs after `/develop`: **Prototype** = nothing after it; **Alpha** = `/check verify`; **Beta** = `/check verify` then `/test`; **GA** = `/check verify`, `/test`, `/check review`, then `/document`.
- **Pointer line**: the spec link is added by `/architect`, and the code path is added by `/develop`.
