# Project Conventions

Rules for any agent (or human) writing code in this repo. Follow them exactly. If a rule conflicts with a request, say so instead of silently breaking it.

Read `AGENTS.md` first: this is a newer Next.js than most training data, so check `node_modules/next/dist/docs/` before using a Next.js API.

## 1. shadcn/ui first

- Before building any UI element, check `components/ui/`. If shadcn has a component for it, use it. Never hand-roll buttons, inputs, dropdowns, dialogs, sidebars, tabs, tables, tooltips, etc.
- If it is not installed yet, install it: `npx shadcn@latest add <name> -y` (e.g. `sidebar`, `dropdown-menu`, `select`, `dialog`, `table`, `sonner`). Use `npx shadcn@latest search <query>` if unsure of the name.
- This project uses the `base-nova` style, which is built on **Base UI** (`@base-ui/react`), not Radix. Read the installed component in `components/ui/` for its real API before using it (for example, composition uses the `render` prop, not `asChild`).
- Do not edit files in `components/ui/` for feature-specific needs. Wrap them in a component under `components/` instead. Only edit `ui/` for changes that should apply app-wide.
- Class names are merged with `cn` from `@/lib/utils`.
- Icons come from `lucide-react` only.

## 2. Colors and theming

- Use only the semantic color tokens defined in `app/globals.css` through Tailwind utilities: `bg-background`, `text-foreground`, `bg-primary`, `text-primary-foreground`, `bg-muted`, `text-muted-foreground`, `bg-card`, `border-border`, `text-destructive`, `ring-ring`, `bg-sidebar`, and so on.
- Never use raw colors: no hex, `rgb()`, `oklch()`, or Tailwind palette classes such as `bg-zinc-50`, `text-red-500`, `bg-blue-600`.
- The same meaning always uses the same token: primary actions and brand surfaces use `primary`, errors use `destructive`, secondary text uses `muted-foreground`, borders use `border`/`input`.
- If a new color is truly needed, add a token to both `:root` and `.dark` in `app/globals.css` and register it in `@theme inline`, then use it by name. Do not inline it.
- Every screen must work in light and dark mode, which is automatic when only tokens are used.

## 3. Folder structure

```
app/                      Routes only: page.tsx, layout.tsx, route groups. Keep pages thin.
  (auth)/                 Route group for login/signup (no URL segment)
components/
  ui/                     shadcn primitives (generated, do not put feature code here)
  common/                 App-wide reusable pieces (BrandLogo, PageHeader, EmptyState, ...)
  forms/                  Reusable form building blocks (FormField, PasswordInput, SubmitButton)
  <feature>/              Feature components (auth/, dashboard/, cases/, ...)
hooks/                    Reusable hooks (use-form-state.ts, ...)
lib/
  api/                    apiClient + one <feature>.api.ts per backend area
  constants/              routes.ts, app.ts, other static values
  validators/             Pure validation functions per feature
  store/
    index.ts              makeStore, RootState, AppDispatch
    hooks.ts              useAppDispatch / useAppSelector / useAppStore
    provider.tsx          StoreProvider (client)
    createAppAsyncThunk.ts
    features/<feature>/   <feature>.types.ts, <feature>Slice.ts, <feature>Thunks.ts
  utils.ts                cn()
```

- Imports use the `@/` alias (project root). No deep relative paths like `../../..`.
- Files use kebab-case for components/hooks (`login-form.tsx`, `use-form-state.ts`); slices, thunks and API files follow the existing camelCase/dotted names (`authSlice.ts`, `auth.api.ts`).
- One component per file. Named exports for components; default export only where Next.js requires it (`page`, `layout`).
- Pages and layouts are Server Components by default. Add `"use client"` only to the smallest component that needs state, effects, or browser APIs.

## 4. Redux Toolkit: slices

- One folder per feature under `lib/store/features/<feature>/`, containing `<feature>.types.ts`, `<feature>Slice.ts`, and `<feature>Thunks.ts` if it calls an API.
- Register every new reducer in `lib/store/index.ts`.
- Always use the typed hooks from `@/lib/store/hooks`. Never use bare `useDispatch`/`useSelector`.
- Slices hold serializable state only (no Dates, class instances, functions).
- Export selectors from the slice file (`selectUser`, `selectAuthLoading`) and use them in components instead of inline `state.x.y` reads.
- Keep request state as `status: "idle" | "loading" | "succeeded" | "failed"` plus `error: string | null`.
- Do not put form field values in Redux. Local form state belongs in the component (`useFormState`).
- The store is created per request by `StoreProvider`. Never export a module-level store singleton.

## 5. API integration with thunks

- All HTTP goes through `apiClient` in `lib/api/client.ts`. Components never call `fetch` directly.
- Each backend area gets one file in `lib/api/` (`auth.api.ts`, `cases.api.ts`, ...) exposing plain typed functions. These files know URLs and payload types, nothing about Redux.
- Every API call used by the UI is wrapped in a thunk in `<feature>Thunks.ts`, built with `createAppAsyncThunk` from `@/lib/store/createAppAsyncThunk`. Catch errors and `rejectWithValue(getErrorMessage(error))` so `action.payload` is a user-facing string.
- Handle `pending`/`fulfilled`/`rejected` in the slice's `extraReducers` (use `isAnyOf` when several thunks share handling).
- Components dispatch the thunk and react to the result, for example `const result = await dispatch(loginUser(payload)); if (loginUser.fulfilled.match(result)) router.push(...)`.
- Backend base URL comes from `NEXT_PUBLIC_API_URL` (defaults to `/api`). Put it in `.env.local`; never hardcode hosts.

## 6. Reusable components

- Build for reuse by default. If markup or logic appears (or will obviously appear) in two places, extract it. A page should read as a composition of named components.
- Reusable components take typed props, accept `className` where sensible, and pass remaining props through to the underlying shadcn element.
- Extract repeated logic into hooks (`hooks/`) and repeated validation into `lib/validators/`.
- Before writing a new component, look in `components/common/` and `components/forms/` for one that already does the job.
- Static strings used in many places (app name, routes) live in `lib/constants/`, not inline.

## 7. Clean code

- TypeScript strict. No `any`; use `unknown` and narrow. Type component props explicitly.
- Small functions and small components. If a component grows past roughly 100 lines, split it.
- Descriptive names. No commented-out code. Comments only for a non-obvious "why".
- No dead code, unused imports or unused files. Delete placeholders (such as the demo `counter` slice) when a real feature replaces them.
- Forms: validate on submit with a pure validator, show errors under the field with `FormField`/`FieldError`, disable the submit button while loading.
- Accessibility: every input has a label, icon-only buttons have `aria-label`, errors use `role="alert"` (already done by `FieldError`).
- Layouts must be responsive (mobile first).

## 8. Before you say you are done

Run all of these and fix what they report:

```
npx tsc --noEmit
npx eslint app lib components hooks
npx next build
```

For UI changes, also open the page in a browser (dev server) and check it in both light and dark mode. If you could not, say so explicitly.
