# Resume Architect — Production Architecture

## Project Structure

```
src/
├── App.tsx                        # Router with lazy loading
├── components/
│   ├── builder/
│   │   └── ATSScorePanel.tsx      # ATS score UI component
│   ├── layout/                    # Header, Footer (existing)
│   ├── seo/
│   │   └── SEOMeta.tsx            # Dynamic meta tags
│   └── templates/
│       ├── ResumeRenderer.tsx     # Template switcher (lazy)
│       ├── TemplateCard.tsx       # Live preview card
│       └── renderers/             # 10 template components
│           ├── MinimalTemplate.tsx
│           ├── ModernTemplate.tsx
│           ├── ProfessionalTemplate.tsx
│           ├── ATSTemplate.tsx
│           ├── CreativeTemplate.tsx
│           ├── ExecutiveTemplate.tsx
│           ├── NordicTemplate.tsx
│           ├── TerminalTemplate.tsx
│           ├── ManuscriptTemplate.tsx
│           └── PrestigeTemplate.tsx
├── config/
│   └── security.ts                # CSP, headers config
├── data/
│   ├── templates.ts               # 10 template definitions
│   └── sampleResumeData.ts        # Preview sample data
├── lib/
│   ├── security/
│   │   └── index.ts               # XSS, file validation, rate limiting
│   └── validation/
│       └── schemas.ts             # Zod schemas for all forms
├── pages/
│   ├── Dashboard.tsx              # Overview + ATS + versions
│   ├── ImportProfile.tsx          # JSON/GitHub/LinkedIn import
│   ├── Preview.tsx                # Export: PDF/DOCX/JSON
│   └── ... (existing pages)
├── store/
│   └── resumeStore.ts             # Zustand + auto-save + versioning
├── types/
│   └── resume.ts                  # Strict TypeScript types
└── utils/
    ├── atsScore.ts                # ATS score calculator
    ├── exportUtils.ts             # PDF/DOCX/JSON exporters
    └── importUtils.ts             # JSON/GitHub/LinkedIn importers
```

## Security Implementation

| Layer | Implementation |
|---|---|
| XSS | `sanitizeString()` strips HTML tags, JS protocols, event handlers |
| Input validation | Zod schemas on every form field with max lengths |
| File uploads | Type + size validation before parsing |
| Rate limiting | Client-side `checkRateLimit()` for exports/imports |
| Storage | `secureStorage` wrapper with size limits |
| CSP | `Content-Security-Policy` header via `vercel.json` |
| Clickjacking | `X-Frame-Options: DENY` |
| MIME sniffing | `X-Content-Type-Options: nosniff` |
| HSTS | `Strict-Transport-Security` with preload |

## Performance

| Technique | Where |
|---|---|
| Code splitting | All pages lazy-loaded via `React.lazy` |
| Template splitting | All 10 templates lazy-loaded via dynamic `import()` |
| Auto-save | 30-second debounce, only when `isDirty` |
| Version history | Max 10 versions, `structuredClone` for deep copy |
| Bundle size | No runtime dependencies beyond React + Zustand + Zod |

## Features Added

- ✅ **10 Templates** (Minimal, Modern, Professional, ATS, Creative, Executive, Nordic, Terminal, Manuscript, Prestige)
- ✅ **Live Template Previews** — real scaled-down renders, not placeholder bars
- ✅ **ATS Score Calculator** — keyword, completeness, formatting, readability scoring
- ✅ **PDF Export** — print-based, zero dependencies
- ✅ **JSON Export/Import** — full round-trip with validation
- ✅ **DOCX Export** — via html-docx-js with HTML fallback
- ✅ **Profile Import** — JSON upload, GitHub mock, LinkedIn mock
- ✅ **Dashboard** — completion tracking, version history, quick actions
- ✅ **Version History** — auto-save every 30s, last 10 versions, restore
