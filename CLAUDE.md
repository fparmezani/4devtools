# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**4DevTools** is an Angular 13 application that generates Brazilian test data (CPF, CNPJ, RG, CNH, PIS/PASEP, Título de Eleitor, etc.) for developers and testers. It also shows currency exchange rates (USD, EUR, BTC) and includes informational blog posts about each document type. The app is deployed on Vercel (auto-deploy from GitHub `main`) as static prerendered pages, configured in `vercel.json`.

## Commands

```bash
# Development server (Angular)
ng serve                          # http://localhost:4200

# Production server (Express serves built dist/)
npm start                         # node server.js, port 8080 — local preview of the prerendered build only (not used in production)

# Build
npm run build                     # prerender (Angular Universal): dist/4DevTools/browser/<rota>/index.html
ng build --watch --configuration development

# Tests
ng test                           # Karma + Jasmine in Chrome

# Generate component
ng generate component components/my-component
```

Node version: **18.18.2** (required by engines in package.json).

## Architecture

### Layers

```
src/app/
├── components/      # Feature widgets — each generator (gerar-cpf, gerar-cnpj, …)
├── Views/           # SEO wrapper pages (gerador-cpf, gerador-cnpj, gerador-cnh)
│                    #   — thin shells that embed component + set <meta> tags
├── blog/            # Static informational articles about each document type
├── shared/          # Cross-cutting UI: dashboard, contato, aviso, navbar, etc.
├── services/        # Business logic + HTTP
│   ├── gerador.service.ts   # All document generation algorithms (pure math)
│   └── cotacao.service.ts   # Currency quotes from awesomeapi.com.br
├── model/           # TypeScript classes: Pessoa, Endereco, CartaoCredito, Cotacao, …
└── app-routing.module.ts
```

### Key patterns

**Views vs Components**: Most routes use a "View" (in `Views/`) that wraps the functional component. Views only set `<meta>` tags for SEO and delegate rendering to the component. Example: `GeradorCpfComponent` (View) embeds `<app-gerar-cpf>` (Component).

**GeradorService**: The single service responsible for all document generation — CPF, CNPJ, CNH, RG, RENAVAM, PIS/PASEP, Título de Eleitor, CNS, passwords, credit cards, phone numbers. All generation is pure client-side math (no API calls). Inject this service in any new generator component.

**CotacaoService**: Fetches live exchange rates from `economia.awesomeapi.com.br`. The Dollar, Euro, and Bitcoin components use it. The API token is embedded in the URL in `cotacao.service.ts`.

**Hosting**: Vercel. `npm run build` prerenders, then `scripts/vercel-output.js` writes `.vercel/output` (Build Output API v3) with our own routing: `/x/` → 308 `/x`, prerendered pages, static files, everything else → `404.html` with status 404. This bypasses the project-level "Angular" preset SPA fallback. `server.js` (Express) is only a local preview and is not deployed.

**Copy-to-clipboard**: Components use the `copy-to-clipboard` npm package (imported as `import * as copy from 'copy-to-clipboard'`) and show a `ToastrService` success toast after copying.

**Locale**: App is configured for `pt-BR` locale (`LOCALE_ID` in AppModule). Use `DatePipe` with Brazilian date formats.

### Adding a new generator

1. Create component under `src/app/components/gerar-<name>/` — inject `GeradorService` and `ToastrService`.
2. Add generation logic to `GeradorService` if it involves Brazilian document math.
3. Optionally create a View under `src/app/Views/gerador-<name>/` for SEO meta tags.
4. Register both in `app.module.ts` declarations and `app-routing.module.ts`.
5. Add a blog article under `src/app/blog/<name>/` if informational content is needed.

### SEO / prerender

- Every route's `<title>`, description, canonical (`https://www.4devtools.com`) and robots come from `data: seo(...)` in `app-routing.module.ts`, applied by `services/seo.service.ts`. Don't set titles/meta in components.
- When adding a route: add `data: seo(...)`, add it to `prerender-routes.txt` (otherwise the server returns 404) and to `src/sitemap.xml`.
- Code that touches `window`/`document`/`localStorage` must be guarded with `isPlatformBrowser`, since pages are rendered in Node at build time.
