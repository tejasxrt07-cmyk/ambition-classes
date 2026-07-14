# Ambition Classes

A premium, single-institute coaching website for Ambition Classes (Bihariganj, Madhepura, Bihar), run by Amit Sir. Public pages showcase the institute and let students browse/download study notes; a hidden admin panel lets Amit Sir manage notes without any student-facing accounts.

## Run & Operate

- `pnpm --filter @workspace/ambition-classes run dev` — run the frontend (Vite/React)
- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec after editing `lib/api-spec/openapi.yaml`
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env/secrets: `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_PASSWORD`, plus object storage vars (`DEFAULT_OBJECT_STORAGE_BUCKET_ID`, `PRIVATE_OBJECT_DIR`, `PUBLIC_OBJECT_SEARCH_PATHS`)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind (artifact `ambition-classes`, previewPath `/`)
- API: Express 5 (artifact `api-server`, previewPath `/api`)
- DB: PostgreSQL + Drizzle ORM
- Object storage: Replit App Storage (PDF uploads), presigned-URL upload flow
- API codegen: Orval (from OpenAPI spec) — generated hooks live in `lib/api-client-react`, Zod schemas in `lib/api-zod`

## Where things live

- `lib/api-spec/openapi.yaml` — source of truth for the API contract (notes CRUD, admin auth, storage upload/download)
- `lib/db/src/schema/notes.ts` — Drizzle schema for study notes (`id, title, class, subject, pdfObjectPath, uploadDate`)
- `artifacts/api-server/src/routes/` — `notes.ts` (CRUD), `admin.ts` (login/logout/session), `storage.ts` (upload-url request + object serving)
- `artifacts/ambition-classes/src/pages/` — `home`, `about`, `notes`, `contact`, and `admin/login` + `admin/dashboard`

## Architecture decisions

- Admin auth is a single shared password (`ADMIN_PASSWORD` secret) checked server-side, not a full user-accounts system — matches the "no student accounts, one admin" requirement. Session state is a signed cookie (`express-session`, `SESSION_SECRET`) with an `isAdmin` flag.
- PDF uploads use the standard presigned-URL object-storage flow: admin-gated `POST /storage/uploads/request-url` returns a signed PUT URL + object path, the browser PUTs the file directly to storage, then the app saves the returned `objectPath` on the note. Serving objects (`GET /storage/objects/*`) is public — students need no login to download.
- Public site reflects admin CRUD instantly because both admin dashboard and public Study Notes page read from the same `/notes` endpoint via React Query, invalidated on every mutation.

## Product

- **Home / About / Contact** — static marketing pages with institute info (Amit Sir, Station Road, Bihariganj, Madhepura, Bihar), phone/WhatsApp (Call/WhatsApp buttons), and a Google Maps embed on Contact.
- **Study Notes** — public, filterable by Class (8/9/10) and Subject; each note shows title/class/subject/upload date and either a Download button or a disabled "Coming Soon" state when no PDF is attached yet.
- **Admin** — hidden route `/admin` (not linked from the navbar), single-password login, full CRUD dashboard for notes including PDF upload and delete-with-confirmation.

## User preferences

- Visual theme is fixed and must be preserved: black/emerald palette (`#0B0B0B` background, `#00E676` accent), white text, Poppins font, glassmorphism cards, emerald glow accents.
- No student accounts or public sign-up anywhere on the site — the only authentication is the single admin password gate on `/admin`.

## Gotchas

- After editing `lib/api-spec/openapi.yaml`, always re-run the Orval codegen command above before using new/changed endpoints in the frontend — hand-written fetch calls should be avoided in favor of the generated hooks.
- Zod v3 (pinned in this workspace) does not support `format: uri` in the OpenAPI spec — it triggers a `zod.url()` call that doesn't exist in v3. Omit `format: uri` on response fields that are URLs.
- `pnpm run build` fails for `mockup-sandbox` when run standalone outside its own workflow (it requires `PORT` to be injected) — this is expected outside the managed workflow/deploy pipeline, not a regression.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
