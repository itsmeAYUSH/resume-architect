# Resume Architect — Frontend

React + TypeScript + Vite frontend for Resume Architect resume builder.

## 📋 Features

- ✅ 10 professional resume templates with live preview
- ✅ ATS score calculator with actionable suggestions
- ✅ PDF/DOCX/JSON export capabilities
- ✅ Smart profile import (JSON, GitHub, LinkedIn)
- ✅ Dashboard with version history and progress tracking
- ✅ Offline-first with auto-save every 30 seconds
- ✅ Dark mode support
- ✅ Full TypeScript type safety
- ✅ XSS protection and input validation
- ✅ Responsive mobile-first design

## 🛠️ Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Lightning-fast build tool
- **Tailwind CSS** — Utility-first styling
- **Zustand** — Lightweight state management
- **React Query** — Server state management
- **Zod** — Runtime validation
- **shadcn/ui** — High-quality component library
- **React Router** — Client-side routing
- **Lucide Icons** — Beautiful icon set

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun 1.0+
- npm, pnpm, yarn, or bun

### Installation

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install
# or
bun install
```

### Environment Setup

```bash
# Copy example env file
cp .env.example .env.local

# Edit with your configuration
# - VITE_API_URL: Backend API URL (default: http://localhost:3001)
# - VITE_SUPABASE_URL: Supabase project URL (optional)
# - VITE_SUPABASE_ANON_KEY: Supabase anon key (optional)
```

### Development

```bash
# Start development server (runs on http://localhost:5173)
npm run dev

# or with Bun
bun run dev
```

The app will hot-reload on file changes.

### Build

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
src/
├── App.tsx                        # Main app with routing
├── App.css                        # Global styles
├── main.tsx                       # Entry point
├── index.css                      # Base styles
├── vite-env.d.ts                 # Vite environment types
│
├── components/
│   ├── NavLink.tsx               # Navigation link component
│   ├── ui/                        # shadcn UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   └── ... (20+ components)
│   ├── home/                      # Landing page components
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── CTASection.tsx
│   │   └── HowItWorksSection.tsx
│   ├── builder/                   # Builder feature components
│   │   └── ATSScorePanel.tsx      # ATS score display
│   ├── layout/                    # Layout components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── templates/                 # Template system
│   │   ├── ResumeRenderer.tsx     # Template switcher
│   │   ├── TemplateCard.tsx       # Template preview card
│   │   └── renderers/             # 10 template implementations
│   │       ├── MinimalTemplate.tsx
│   │       ├── ModernTemplate.tsx
│   │       ├── ProfessionalTemplate.tsx
│   │       ├── ATSTemplate.tsx
│   │       ├── CreativeTemplate.tsx
│   │       ├── ExecutiveTemplate.tsx
│   │       ├── NordicTemplate.tsx
│   │       ├── TerminalTemplate.tsx
│   │       ├── ManuscriptTemplate.tsx
│   │       └── PrestigeTemplate.tsx
│   ├── seo/                       # SEO components
│   │   └── SEOMeta.tsx            # Dynamic meta tags
│   └── usertype/                  # User type selection
│       └── UserTypeCard.tsx
│
├── pages/                         # Page components
│   ├── Index.tsx                  # Landing page
│   ├── GetStarted.tsx             # Onboarding
│   ├── SelectTemplate.tsx         # Template selection
│   ├── Templates.tsx              # Templates showcase
│   ├── Pricing.tsx                # Pricing page
│   ├── Builder.tsx                # Main editor
│   ├── Preview.tsx                # Export preview
│   ├── Dashboard.tsx              # User dashboard
│   ├── ImportProfile.tsx          # Profile import
│   └── NotFound.tsx               # 404 page
│
├── store/
│   └── resumeStore.ts             # Zustand store (state management)
│
├── types/
│   └── resume.ts                  # TypeScript types
│
├── hooks/
│   ├── use-mobile.tsx             # Mobile breakpoint hook
│   └── use-toast.ts               # Toast notification hook
│
├── lib/
│   ├── utils.ts                   # Utility functions
│   ├── security/
│   │   └── index.ts               # XSS sanitization & validation
│   └── validation/
│       └── schemas.ts             # Zod validation schemas
│
├── utils/
│   ├── atsScore.ts                # ATS score calculator
│   ├── exportUtils.ts             # PDF/DOCX/JSON export
│   └── importUtils.ts             # Profile import handlers
│
├── data/
│   ├── templates.ts               # Template definitions
│   └── sampleResumeData.ts        # Demo resume data
│
└── integrations/
    └── supabase/
        ├── client.ts              # Supabase client
        └── types.ts               # Supabase types
```

## 🔐 Security Features

### XSS Protection
- HTML tag stripping in `sanitizeString()`
- JavaScript protocol removal
- Event handler cleanup

### Input Validation
- Zod schemas on all form fields
- Max length enforcement
- Email/URL format validation
- Phone number pattern matching

### Rate Limiting
- Client-side export/import rate limits
- Prevents spam operations

### Content Security Policy
- Configured via `vercel.json`
- Blocks inline scripts
- Restricts external resources

## 🎨 Component System

### UI Components (shadcn/ui)
```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
```

### Using Zustand State
```tsx
import { useResumeStore } from '@/store/resumeStore';

export function MyComponent() {
  const { resumeData, setResumeData } = useResumeStore();
  
  return (
    <div>
      <h1>{resumeData.personalInfo.fullName}</h1>
    </div>
  );
}
```

### Form Validation with Zod
```tsx
import { resumeDataSchema } from '@/lib/validation/schemas';

const result = resumeDataSchema.safeParse(data);
if (result.success) {
  // Valid data
} else {
  // Handle validation errors
}
```

## 📊 Performance Optimization

### Code Splitting
- Pages lazy-loaded with `React.lazy()`
- Templates lazy-loaded dynamically
- Reduces initial bundle size

### Auto-Save
- 30-second debounce
- Only saves when data is dirty
- Uses `resume-architect-v2` localStorage key

### Version History
- Max 10 versions stored
- Uses `structuredClone()` for deep copying
- Full round-trip JSON export/import

## 🌐 Routing

| Route | Component | Purpose |
|---|---|---|
| `/` | `Index` | Landing page |
| `/templates` | `Templates` | Browse all templates |
| `/pricing` | `Pricing` | Pricing page |
| `/dashboard` | `Dashboard` | User overview & history |
| `/get-started` | `GetStarted` | Onboarding flow |
| `/select-template` | `SelectTemplate` | Choose template |
| `/builder` | `Builder` | Main resume editor |
| `/preview` | `Preview` | Export/download |
| `/import` | `ImportProfile` | Import profile data |
| `*` | `NotFound` | 404 error page |

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect repository:**
   ```bash
   vercel
   ```

2. **Configure environment:**
   - Set `VITE_API_URL` to production API
   - Set `VITE_SUPABASE_*` keys

3. **Deploy:**
   ```bash
   npm run build
   vercel --prod
   ```

### Netlify

1. **Create `netlify.toml`:**
   ```toml
   [build]
   command = "npm run build"
   publish = "dist"

   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200
   ```

2. **Deploy:**
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🧪 Testing

```bash
# Run tests (if configured)
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📚 Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Check TypeScript types |

## 🔗 API Integration

The frontend communicates with the backend at `VITE_API_URL`:

```tsx
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/endpoint`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes
3. Test thoroughly
4. Commit: `git commit -am 'Add feature'`
5. Push: `git push origin feature/my-feature`
6. Create Pull Request

## 📝 License

MIT License — free to use commercially.

## 💡 Support

- Check [ARCHITECTURE.md](../ARCHITECTURE.md) for detailed architecture
- Review component code for usage examples
- Open GitHub issues for bugs
- Email: [support@resumearchitect.app]

---

**Happy building! 🚀**
