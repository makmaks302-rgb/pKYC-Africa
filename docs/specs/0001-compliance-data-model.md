# 0001. Compliance data model

**Date**: 2026-09-04
**Status**: Proposed

## Summary

This spec defines the first durable data model for pKYC Africa. It chooses PostgreSQL with Drizzle migrations, Zod validation, and a server side repository layer so tenant isolation, role checks, audit events, and compliance decisions are enforced in one place. The model is intentionally bounded to the MVP while covering individual KYC, business KYB, evidence, risk, screening, alerts, investigations, imports, transaction monitoring, and immutable audit history.

## Context

pKYC Africa handles identity, ownership, document, risk, screening, alert, investigation, transaction, and audit data for banks and fintechs. The platform must keep each institution isolated, preserve explainable human decisions, and avoid treating screening or risk outputs as final without review.

The current app is a Next.js scaffold, so the data model will become the foundation every later feature builds on. If this decision stays loose, later slices will invent incompatible tables, tenant scoping rules, and audit behavior.

The MVP must support manual form entry as the main onboarding path. Document uploads and CSV imports are optional ingestion methods. CSV transaction import exists mainly to support bulk monitoring and testing, not to replace the core onboarding flow.

## Requirements

**User stories**:
* As a compliance analyst, I want one tenant scoped model for individual KYC and business KYB so I can create reviewable customer files.
* As a compliance manager, I want risk, screening, alert, investigation, and decision records to stay explainable so I can review the evidence behind each outcome.
* As an institution admin, I want imported customer and transaction data to be validated and isolated so bad rows do not pollute compliance records.
* As an engineer, I want repository functions to enforce tenant scope, role checks, validation, and audit writes so later features do not duplicate security logic.

**Acceptance criteria**:
* **AC-1**: The schema defines tenant scoped entities for institutions, users, customers, individual profiles, business profiles, business parties, documents, review decisions, risk assessments, screening runs, screening matches, alerts, investigation cases, case notes, import batches, transactions, monitoring results, and audit events.
* **AC-2**: Every tenant scoped table stores `institution_id`, uses UUID style primary keys, records timezone aware timestamps, and supports institution scoped indexes for common lookups.
* **AC-3**: Individual and business customers share one lifecycle with states `draft`, `submitted`, `in_review`, `approved`, `rejected`, `needs_more_info`, and `archived`, with type specific profile tables.
* **AC-4**: Business ownership and control are represented through business parties with role values for beneficial owner, director, control person, and signatory.
* **AC-5**: Review decisions, risk assessments, screening matches, alerts, investigations, monitoring results, and audit events preserve the human reviewer, rule outcomes, reasons, and source evidence needed for explainability.
* **AC-6**: Repository functions under `src/server/` require `{ institutionId, actorUserId, role }`, enforce institution scope and role authorization, validate inputs with Zod, and never expose direct table access to pages.
* **AC-7**: Sensitive writes and their audit events commit in the same transaction, and no partial sensitive write may commit without the matching immutable audit event.
* **AC-8**: Import batches store row level validation results, accepted row counts, rejected row counts, and reject reasons without making CSV import required for onboarding.
* **AC-9**: Operational records can be archived or soft deleted where needed, while audit events remain append only and decision evidence remains retained for compliance history.

## Options considered

### Option 1: PostgreSQL with Drizzle, Zod, and repositories

Use PostgreSQL as the relational store, Drizzle for schema and migrations, Zod for server boundary validation, and a project owned repository layer for tenant scoped data access.

**Pros**:
* Fits relational compliance data, tenant scoped queries, immutable events, and explainable review records.
* Keeps TypeScript types close to the schema without hiding SQL concepts.
* Centralizes tenant isolation, role authorization, validation, and audit behavior.

**Cons**:
* Adds migration, schema, and repository setup before user workflows can move quickly.
* Requires the team to learn Drizzle patterns if they are not already familiar.

### Option 2: PostgreSQL with raw SQL migrations

Use PostgreSQL with handwritten SQL migrations and a small typed query helper.

**Pros**:
* Gives maximum control over constraints, indexes, and PostgreSQL features.
* Avoids an ORM dependency.

**Cons**:
* Type safety and query reuse take more manual work.
* Later feature builds may drift without a clear schema module convention.

### Option 3: Prisma with PostgreSQL

Use Prisma schema and Prisma Migrate for PostgreSQL.

**Pros**:
* Mature developer workflow with strong generated client types.
* Familiar to many TypeScript teams.

**Cons**:
* Higher abstraction can make advanced PostgreSQL constraints, JSONB usage, and explicit audit transaction patterns feel less direct.

### Option 4: SQLite first

Use SQLite for local MVP speed and migrate to PostgreSQL later.

**Pros**:
* Quick local setup for a hackathon.
* Fewer moving parts for early screens.

**Cons**:
* Defers tenant isolation, transaction, indexing, and production storage decisions that shape the whole product.
* Creates migration risk right where the product is most sensitive.

## Decision

**Chosen option**: Option 1: PostgreSQL with Drizzle, Zod, and repositories

Use PostgreSQL with Drizzle Kit migrations, Drizzle schema modules, Zod validation at server boundaries, and a `src/server/` repository layer for all tenant scoped reads and writes.

## Rationale

The product is data heavy, regulated, and multi tenant. PostgreSQL gives strong constraints, foreign keys, timezone aware timestamps, JSONB for flexible rule evidence, indexes for review queues, and transactions for atomic sensitive writes plus audit events.

Drizzle keeps the schema close to SQL while fitting the TypeScript app. Zod makes form, import, and API validation explicit. A repository layer is the important boundary: later pages, server actions, and route handlers should not each invent their own tenant and audit checks.

## Feature design

**Data model sketch**:

| Entity | Key fields | Relationships and constraints |
|---|---|---|
| `institutions` | `id uuid pk`, `name text`, `country_code text`, `status text`, `created_at timestamptz`, `updated_at timestamptz` | Unique `name` per active tenant context if needed later |
| `institution_users` | `id uuid pk`, `institution_id uuid`, `user_id text`, `email text`, `role text`, `status text`, `created_at timestamptz`, `updated_at timestamptz` | FK to `institutions`; unique `(institution_id, user_id)`; role in `analyst`, `manager`, `admin` |
| `customers` | `id uuid pk`, `institution_id uuid`, `customer_type text`, `display_name text`, `country_code text`, `lifecycle_state text`, `created_by uuid`, `archived_at timestamptz nullable`, `created_at timestamptz`, `updated_at timestamptz` | FK to `institutions`; FK to `institution_users`; customer type in `individual`, `business`; indexed by `(institution_id, lifecycle_state)` |
| `individual_profiles` | `id uuid pk`, `institution_id uuid`, `customer_id uuid`, `first_name text`, `last_name text`, `date_of_birth date`, `nationality_country_code text`, `id_number text nullable`, `phone text nullable`, `email text nullable`, `address jsonb nullable`, `sensitive_fields jsonb` | FK to `customers`; unique `customer_id`; only for individual customers |
| `business_profiles` | `id uuid pk`, `institution_id uuid`, `customer_id uuid`, `legal_name text`, `registration_number text`, `registration_country_code text`, `business_type text`, `industry_code text nullable`, `address jsonb nullable`, `sensitive_fields jsonb` | FK to `customers`; unique `customer_id`; unique `(institution_id, registration_country_code, registration_number)` where active |
| `business_parties` | `id uuid pk`, `institution_id uuid`, `business_customer_id uuid`, `party_customer_id uuid nullable`, `full_name text`, `role text`, `ownership_percent numeric nullable`, `country_code text nullable`, `sensitive_fields jsonb`, `archived_at timestamptz nullable` | FK to business `customers`; optional FK to party `customers`; role in `beneficial_owner`, `director`, `control_person`, `signatory` |
| `documents` | `id uuid pk`, `institution_id uuid`, `customer_id uuid nullable`, `business_party_id uuid nullable`, `document_type text`, `storage_key text`, `file_name text`, `mime_type text`, `status text`, `uploaded_by uuid`, `replaced_by_document_id uuid nullable`, `created_at timestamptz`, `updated_at timestamptz` | FK to `institutions`, optional FK to `customers` or `business_parties`; at least one target required |
| `review_decisions` | `id uuid pk`, `institution_id uuid`, `customer_id uuid`, `reviewer_user_id uuid`, `decision_type text`, `outcome text`, `reason text`, `evidence_snapshot jsonb`, `created_at timestamptz` | FK to `customers` and `institution_users`; append preferred, latest derived by read query |
| `risk_assessments` | `id uuid pk`, `institution_id uuid`, `customer_id uuid`, `version integer`, `score numeric`, `band text`, `factor_outcomes jsonb`, `rule_outcomes jsonb`, `country_override jsonb nullable`, `reviewer_override jsonb nullable`, `created_by uuid`, `created_at timestamptz` | FK to `customers`; unique `(customer_id, version)`; band in `low`, `medium`, `high`, `critical` |
| `screening_runs` | `id uuid pk`, `institution_id uuid`, `subject_type text`, `subject_id uuid`, `screening_type text`, `status text`, `created_by uuid`, `created_at timestamptz` | Subject points to customer or business party; status in `pending`, `completed`, `failed` |
| `screening_matches` | `id uuid pk`, `institution_id uuid`, `screening_run_id uuid`, `watchlist_entry_id uuid nullable`, `matched_name text`, `match_inputs jsonb`, `status text`, `reviewer_user_id uuid nullable`, `decision_reason text nullable`, `created_at timestamptz`, `updated_at timestamptz` | FK to `screening_runs`; status in `potential_match`, `false_positive`, `escalated`, `cleared` |
| `alerts` | `id uuid pk`, `institution_id uuid`, `source_type text`, `source_id uuid`, `priority text`, `status text`, `assigned_to uuid nullable`, `summary text`, `created_at timestamptz`, `updated_at timestamptz`, `resolved_at timestamptz nullable` | Source links to risk, screening, document, onboarding, or transaction event; indexed by `(institution_id, status, priority)` |
| `investigation_cases` | `id uuid pk`, `institution_id uuid`, `alert_id uuid`, `case_number text`, `status text`, `assigned_to uuid nullable`, `outcome text nullable`, `created_at timestamptz`, `updated_at timestamptz`, `closed_at timestamptz nullable` | FK to `alerts`; unique `(institution_id, case_number)` |
| `case_notes` | `id uuid pk`, `institution_id uuid`, `case_id uuid`, `author_user_id uuid`, `note_type text`, `body text`, `created_at timestamptz` | FK to `investigation_cases`; append only unless a later spec defines redaction |
| `import_batches` | `id uuid pk`, `institution_id uuid`, `import_type text`, `file_name text`, `status text`, `accepted_count integer`, `rejected_count integer`, `row_errors jsonb`, `created_by uuid`, `created_at timestamptz`, `completed_at timestamptz nullable` | Import type in `customers`, `transactions`; stores row level validation results |
| `transactions` | `id uuid pk`, `institution_id uuid`, `customer_id uuid`, `import_batch_id uuid nullable`, `external_reference text nullable`, `transaction_time timestamptz`, `amount numeric`, `currency text`, `direction text`, `counterparty jsonb nullable`, `metadata jsonb`, `created_at timestamptz` | FK to `customers` and optional `import_batches`; index `(institution_id, customer_id, transaction_time)` |
| `monitoring_results` | `id uuid pk`, `institution_id uuid`, `transaction_id uuid`, `rule_code text`, `outcome text`, `rule_snapshot jsonb`, `alert_id uuid nullable`, `created_at timestamptz` | FK to `transactions`; optional FK to `alerts`; outcome in `passed`, `flagged` |
| `audit_events` | `id uuid pk`, `institution_id uuid`, `actor_user_id uuid nullable`, `target_type text`, `target_id uuid`, `action text`, `previous_values jsonb nullable`, `new_values jsonb nullable`, `reason text nullable`, `created_at timestamptz` | Append only; indexed by `(institution_id, target_type, target_id, created_at)` |

**State transitions**:

* Customer lifecycle: `draft` to `submitted` to `in_review` to `approved`, `rejected`, or `needs_more_info`; `needs_more_info` can return to `submitted`; any non archived state can move to `archived` through an authorized repository function.
* Screening match lifecycle: `potential_match` to `false_positive`, `escalated`, or `cleared`; every terminal transition requires a reviewer and reason.
* Alert lifecycle: `open` to `in_review` to `resolved` or `escalated`; an escalated alert may open an investigation case.
* Investigation lifecycle: `open` to `in_review` to `closed`; closing requires an outcome and audit event.
* Import lifecycle: `uploaded` to `validated` to `imported` or `failed`; row level failures do not block accepted rows unless a caller asks for all or nothing.

**API surface**:

| Endpoint or function | Method | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|
| `createCustomerFile` | function | context, customer type, display name, country, profile fields | customer id, lifecycle state | analyst, manager, admin | 403 forbidden, 422 invalid, 409 duplicate |
| `updateCustomerLifecycle` | function | context, customer id, next state, reason | customer id, lifecycle state | analyst for draft changes, manager for approval outcomes | 403 forbidden, 409 invalid transition, 422 missing reason |
| `recordReviewDecision` | function | context, customer id, decision type, outcome, reason, evidence snapshot | decision id, outcome | manager | 403 forbidden, 404 missing customer, 422 invalid outcome |
| `recordRiskAssessment` | function | context, customer id, score, band, factors, rule outcomes, override data | assessment id, version, band | analyst, manager | 403 forbidden, 409 stale version, 422 invalid band |
| `recordScreeningRun` | function | context, subject type, subject id, screening type, matches | run id, match ids | analyst, manager | 403 forbidden, 404 missing subject, 422 invalid match |
| `createAlert` | function | context, source type, source id, priority, summary | alert id, status | analyst, manager, admin | 403 forbidden, 404 missing source, 422 invalid source type |
| `openInvestigationCase` | function | context, alert id, assignee, reason | case id, case number, status | manager | 403 forbidden, 409 alert already linked, 422 missing reason |
| `recordImportBatch` | function | context, import type, file name, row results | batch id, accepted count, rejected count, status | admin | 403 forbidden, 422 invalid rows |
| `recordTransactionMonitoringResult` | function | context, transaction id, rule code, outcome, rule snapshot, optional alert id | result id, outcome | analyst, manager, admin | 403 forbidden, 404 missing transaction, 422 invalid rule result |
| `listTenantScopedRecords` | function | context, resource type, filters, cursor, page size | records, next cursor | analyst, manager, admin | 403 forbidden, 422 invalid filter |

**Value sourcing**:

| Action | Value produced or displayed | Source |
|---|---|---|
| Create customer file | Tenant scope | `context.institutionId` |
| Create customer file | Actor | `context.actorUserId` |
| Create customer file | Role authorization | `context.role` |
| Create customer file | Customer type and profile fields | Validated form input |
| Update customer lifecycle | Valid next state | Current `customers.lifecycle_state` plus requested next state |
| Record review decision | Reviewer and decision reason | `context.actorUserId` plus validated input |
| Record review decision | Evidence snapshot | Document, risk, screening, and customer values read in the same tenant scope |
| Record risk assessment | Score, band, factors, and rule outcomes | Validated input from later risk rule logic |
| Record screening run | Potential match details | Validated input from internal watchlist screening logic |
| Create alert | Source link | `source_type` and `source_id` validated against tenant scoped records |
| Open investigation case | Case number | Generated by repository within institution scope |
| Record import batch | Accepted and rejected counts | Derived from row validation results |
| Record monitoring result | Rule outcome and alert link | Validated monitoring rule result and optional created alert |
| Write audit event | Previous and new values | Repository reads previous values before mutation and receives new values from mutation payload |
| List records | Pagination cursor | Repository generated cursor from ordered tenant scoped query |

**Key invariants**:

* Every tenant scoped record must carry `institution_id`.
* No repository function may read or write tenant scoped data without `institutionId`.
* Primary keys are UUID style ids.
* Time fields use timezone aware timestamps.
* Type specific profile tables must match the parent customer type.
* A business party belongs to a business customer.
* Screening matches are potential matches until a human reviewer records a decision.
* Approval, rejection, escalation, false positive, and case closure require a reason.
* Sensitive writes and their audit events commit atomically.
* `audit_events` is append only.
* Latest status and latest decision views are derived by queries unless a later performance spec permits cached fields.
* Lists are paginated.

**Security model**:

All model data is private and institution scoped. Analysts can create and update draft records, attach evidence through later document features, create alerts, and review assigned work. Managers can approve or reject customer files, make final screening decisions, escalate alerts, and close cases. Admins can manage institution settings and import batches, but business decisions still require the right review role.

Repository functions must require a context object with `institutionId`, `actorUserId`, and `role`. They must scope every query by `institutionId`, check role permissions before writes, validate inputs with Zod, and write audit events in the same transaction for sensitive changes.

**Configuration required**:

* `DATABASE_URL`: PostgreSQL connection string for Drizzle and the application repository layer.

**Critical test scenarios**:

* Happy path: create an individual customer and business customer in one institution, add profile records, record a review decision, and confirm audit events exist, verifies **AC-1**, **AC-2**, **AC-3**, **AC-5**, **AC-7**.
* Happy path: record a risk assessment, screening run, potential match, alert, investigation case, transaction, and monitoring result with tenant scoped links, verifies **AC-1**, **AC-5**.
* Failure case: an invalid lifecycle transition returns a typed conflict error and commits no data, verifies **AC-3** and **AC-6**.
* Failure case: an import batch with mixed valid and invalid rows records accepted and rejected counts plus row errors, verifies **AC-8**.
* Auth and permission: a user from one institution cannot read or write another institution record, and a non manager cannot approve a customer file, verifies **AC-2** and **AC-6**.
* Audit integrity: a sensitive write whose audit insert fails rolls back the whole transaction, verifies **AC-7** and **AC-9**.

## Build plan

1. Add Drizzle, PostgreSQL, and Zod setup with `DATABASE_URL`, schema module conventions, and migration scripts, satisfies **AC-1**, **AC-2**, **AC-6**.
2. Create the first migration for institutions, users, customers, KYC and KYB profile tables, business parties, documents, decisions, risk, screening, alerts, cases, imports, transactions, monitoring, and audit events, satisfies **AC-1**, **AC-2**, **AC-3**, **AC-4**, **AC-5**, **AC-8**, **AC-9**.
3. Implement shared Zod schemas and server repository primitives for context validation, tenant scoped querying, role checks, transactions, pagination, and typed errors, satisfies **AC-2**, **AC-6**, **AC-7**.
4. Implement repository functions for customer files, lifecycle changes, review decisions, risk assessments, screening runs, alerts, investigation cases, import batches, transactions, monitoring results, and audit events, satisfies **AC-1**, **AC-3**, **AC-4**, **AC-5**, **AC-6**, **AC-7**, **AC-8**, **AC-9**.
5. Add focused tests or executable checks for tenant isolation, lifecycle constraints, audit transaction rollback, import row errors, screening human review status, and paginated lists, satisfies **AC-2**, **AC-3**, **AC-5**, **AC-6**, **AC-7**, **AC-8**, **AC-9**.

## Consequences

**Positive**:
* Later KYC, KYB, risk, screening, alert, investigation, import, and monitoring slices share one coherent foundation.
* Tenant isolation and audit behavior live in the server repository layer instead of being repeated across pages.
* The schema can answer compliance review questions because decisions, reasons, rule outcomes, and audit events are queryable.

**Negative / tradeoffs**:
* The first data slice is larger than a simple customer table.
* Drizzle, migrations, and repository conventions add setup work before visible product screens.
* Some flexible rule and evidence details live in JSONB, so later specs must decide which values graduate to indexed columns.

**Neutral**:
* CSV import is represented in the model but remains optional for onboarding.
* Document rows store metadata and storage keys. The actual upload storage decision belongs to the document intake spec.
* External sanctions and PEP providers remain deferred. The screening model keeps a boundary for future provider data without choosing one now.

## Follow-up

* [ ] Agent Skill and MCP discovery for Drizzle, PostgreSQL, and Zod was declined for now.
