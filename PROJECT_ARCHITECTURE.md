# Resume Architect – Project Architecture

## Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS, Shadcn UI, Zustand, React Hook Form (available), Zod
- **State**: Zustand with persist (resume data, template, versions, lastSaved, isDirty)
- **Export**: Client-side PDF (print), JSON download, DOCX (HTML for Word); all rate-limited and XSS-safe
- **Backend**: Optional (Supabase client present; no API routes in repo)

## Folder Structure (client)

```
client/
├── app/
│   ├── layout.tsx          # Root layout, metadata, JSON-LD
│   ├── page.tsx            # Landing
│   ├── globals.css
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # Dynamic robots.txt
│   ├── not-found.tsx
│   ├── get-started/        # User type selection
│   ├── select-template/     # Template picker
│   ├── builder/            # Resume editor
│   ├── preview/            # Preview + export
│   ├── import/             # JSON / GitHub / LinkedIn import
│   ├── dashboard/          # Versions, quick actions
│   ├── templates/          # Template gallery
│   └── pricing/
├── src/
│   ├── components/
│   │   ├── layout/         # Header, Footer
│   │   ├── templates/       # ResumeRenderer, TemplateGrid, renderers/*
│   │   ├── builder/         # ATSScorePanel, etc.
│   │   ├── home/            # Hero, CTA, etc.
│   │   ├── ui/              # Shadcn
│   │   └── Providers.tsx
│   ├── store/
│   │   └── resumeStore.ts  # Zustand + persist, versions, importData
│   ├── types/
│   │   └── resume.ts       # ResumeData, Template, sections
│   ├── lib/
│   │   ├── security/       # sanitizeString, validateJsonUpload, rate limit
│   │   ├── validation/     # Zod schemas, validateAndSanitize
│   │   └── utils.ts
│   ├── utils/
│   │   ├── exportUtils.ts  # PDF, JSON, DOCX (HTML), escapeHtml
│   │   ├── importUtils.ts  # JSON, GitHub/LinkedIn mock
│   │   └── atsScore.ts
│   ├── data/
│   │   └── templates.ts    # Template list (minimal, modern, professional, ats, creative + more)
│   ├── hooks/
│   └── integrations/      # Supabase client
└── public/
    └── robots.txt         # Fallback; robots.ts overrides when built
```

## Security

- **Headers** (next.config.mjs): X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy; poweredByHeader off
- **XSS**: All user content in exported HTML escaped via `escapeHtml()` in exportUtils
- **Input**: Zod schemas with `sanitizedString()` (uses `sanitizeString` from lib/security)
- **File upload**: JSON only; type and size validated; parsed JSON validated with Zod
- **Rate limiting**: Client-side for PDF (3/min), JSON (10/min), DOCX (3/min)
- **Env**: No secrets in client; use NEXT_PUBLIC_* only for public config

## SEO

- **Metadata**: title, description, keywords, openGraph, twitter in app/layout.tsx; metadataBase from NEXT_PUBLIC_APP_URL
- **Sitemap**: app/sitemap.ts (dynamic)
- **Robots**: app/robots.ts (dynamic, points to sitemap)
- **JSON-LD**: WebApplication schema in layout

## Performance

- **Code splitting**: Template renderers lazy-loaded (Minimal, Modern, Professional, ATS, Creative)
- **Persist**: Zustand persist for resume data and versions (localStorage)
- **Next**: React strict mode; static metadata

## Templates

- **Canonical 5**: minimal, modern, professional, ats, creative (in data/templates and renderers/)
- **Resolver**: Template id normalized (e.g. minimal-fresh → minimal) in ResumeRenderer; unknown ids fall back to Minimal

## Deployment

- See **DEPLOYMENT.md** for Vercel and Docker.
- Set NEXT_PUBLIC_APP_URL in production for sitemap/OG/robots.
