# Testing Patterns

**Analysis Date:** 2026-05-08

## Test Framework

**None.** This project has no automated test infrastructure as of the analysis date.

Evidence:
- No test runner is declared in `package.json` (no `jest`, `vitest`, `mocha`, `ava`, `node:test`, `@testing-library/*`, `@playwright/test`, or `cypress` in either `dependencies` or `devDependencies`).
- No test script exists in `package.json` (`scripts` contains only `dev`, `build`, `start`, `lint`).
- No runner config files exist at the repo root (no `jest.config.*`, `vitest.config.*`, `playwright.config.*`, `cypress.config.*`, `.mocharc.*`, `karma.conf.*`).
- No test directories exist (`find` for `__tests__`, `tests`, `test`, `e2e` under the repo returns nothing).
- No test files exist (`find` for `*.test.*` and `*.spec.*` outside `node_modules` and `.next` returns nothing).
- `tsconfig.json` does not include any test-specific globs or types.

The only test-adjacent artifact is `.playwright-mcp/` at the repo root, which contains console-log captures from MCP-driven Playwright browsing sessions. These are not authored tests; they are tooling output and most are already deleted on disk per `git status`. Treat that directory as ephemeral, not as a test suite.

## Run Commands

```bash
# No test commands available.
# package.json defines:
npm run dev      # next dev
npm run build    # next build (also acts as the de facto type-check + lint gate)
npm run start    # next start
npm run lint     # eslint
```

The closest thing to an automated correctness check is:
```bash
npm run lint     # ESLint via eslint-config-next/core-web-vitals + eslint-config-next/typescript
npm run build    # next build will fail on TypeScript errors because tsconfig.json sets "strict": true
```

When validating a change, run both before considering work complete.

## Test File Organization

**Not applicable** — there are no tests.

If tests are introduced, follow these conventions matched to the rest of the codebase:
- Co-locate component tests next to the source (`components/ui/PillButton.tsx` → `components/ui/PillButton.test.tsx`). The existing `@/*` path alias and the PascalCase component naming both lend themselves to co-located `.test.tsx` files.
- Place integration tests for `app/` routes in a sibling `__tests__/` directory under the route, or use the `*.test.tsx` co-location pattern.
- Place end-to-end tests in a top-level `e2e/` directory.
- Update `tsconfig.json` `include` if tests live outside the current globs (currently `**/*.ts`, `**/*.tsx`, which already covers co-located tests).
- Update `eslint.config.mjs` `globalIgnores` if any test artifact directory should be excluded (e.g., `playwright-report/`, `coverage/`).

## Test Structure

**Not applicable** — no test patterns exist to document.

## Mocking

**Not applicable** — no mocks exist.

## Fixtures and Factories

**Not applicable.** Static data lives in `lib/constants.ts`, `lib/about-content.ts`, and `app/product/_data.ts`. If test fixtures are added, prefer importing from these existing modules to keep tests aligned with the data the UI actually renders.

## Coverage

No coverage tool is configured and no coverage thresholds are enforced.

## Test Types

**Unit Tests:** none.
**Integration Tests:** none.
**E2E Tests:** none. (`.playwright-mcp/` console logs are MCP runtime artifacts, not authored tests, and the project has no `@playwright/test` dependency or `playwright.config.*`.)
**Visual / snapshot tests:** none.
**Accessibility automated checks:** none. ARIA attributes are hand-written; rely on `eslint-config-next/core-web-vitals` for the limited static checks Next.js ships.

## Manual QA

The de facto validation loop is:
1. `npm run dev` and exercise the page in a browser.
2. `npm run lint` for static issues.
3. `npm run build` to surface TypeScript errors and Next.js build-time problems.
4. Visual review against the design intent (this is a marketing site with heavy custom animation in `components/sections/HeroSection.tsx`, `components/sections/TransformSection.tsx`, `components/sections/AgentDataSection.tsx`, `components/sections/AgentOSSection.tsx` and `app/globals.css`; visual regressions are caught by eye, not by snapshots).
5. Cross-browser check is implicit — many components include explicit Safari/WebKit fallbacks (`-webkit-backdrop-filter`, `WebkitMask`, `WebkitMaskComposite`). Verify Safari and Chrome at minimum on changes touching those CSS properties.

## Recommendations

These are deferred work items, not present today. Pick the lightest tooling that fits the change you are making:

1. **Vitest + React Testing Library for component unit tests.** This is the lowest-friction stack for a Next.js 16 + React 19 project, integrates with the existing TypeScript / ESM setup, and runs without a browser. Suggested layout:
   - Add `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` as devDependencies.
   - Add `vitest.config.ts` at repo root with `environment: "jsdom"` and the `@/*` alias.
   - Add `"test": "vitest"` and `"test:ci": "vitest run"` scripts.
   - Co-locate tests as `<Component>.test.tsx`.
   - Best initial targets (pure or near-pure components with branching logic): `components/ui/PillButton.tsx` (variant/size matrix and external/internal href branching), `components/ui/TextField.tsx` (validation + error states), `components/ui/LearnMoreForm.tsx` (per-field state and `isValid` gate), `components/ui/IndustrySelect.tsx` (open/close + selection), `components/sections/about/ValuesAccordion.tsx` (multi-open accordion state), `lib/utils.ts` (`cn()`).

2. **Playwright for end-to-end smoke coverage.** Marketing sites benefit most from a small handful of "page renders without error and exposes the right H1 / CTA" tests across the main routes:
   - `/` (home), `/learn-more`, `/about`, `/product`, `/customers`, `/blog`, `/blog/[slug]`, `/privacy-policy`, `/terms-and-conditions`.
   - Add `@playwright/test`, `playwright.config.ts`, and a top-level `e2e/` directory.
   - Add `"test:e2e": "playwright test"`.
   - This also catches issues in the heavy client-side animation islands (`HeroSection`, `TransformSection`) that unit tests cannot reach.

3. **Type-check as a CI gate.** Add `"typecheck": "tsc --noEmit"` to `package.json` so type errors surface independently of `next build`. `tsconfig.json` already has `noEmit: true`, so this is a one-line addition.

4. **A11y linting.** Consider `eslint-plugin-jsx-a11y` (often pulled in transitively by `eslint-config-next`, but not all rules are enabled at error level). The codebase already invests in ARIA — automated checks would prevent regressions in `components/sections/about/ValuesAccordion.tsx`, `components/sections/AgentDataSection.tsx`, `components/layout/Navbar.tsx`.

5. **Visual regression.** If marketing visuals change frequently and matter, add Playwright `toHaveScreenshot()` for the 6-8 above routes at one or two viewport widths. Skip this until copy and layout stabilize — animation-heavy sections will produce noisy diffs without `prefers-reduced-motion: reduce` overrides (which `app/globals.css` already supports for `.agent-os-layer`).

When introducing any of the above, update `eslint.config.mjs` to add the test runner's globals, and update this document with the actual structure / commands once the first tests land.

---

*Testing analysis: 2026-05-08*
