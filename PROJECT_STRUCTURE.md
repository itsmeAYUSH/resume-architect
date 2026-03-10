# Resume Architect — Project Structure (v2.0)

Clean Monorepo with **only 2 folders** + **root documentation**

## 📂 Root Level Organization

```
resume-architect/
├── client/                 # ⭐ Frontend - All React code & assets
├── server/                 # ⭐ Backend - API & services (template)
├── ARCHITECTURE.md         # System architecture & tech stack
├── README.md               # Main project documentation
├── package.json            # Monorepo workspace config
├── .gitignore              # Git ignore rules
└── PROJECT_STRUCTURE.md    # This file

.git/ excluded from view
```

---

## 📁 COMPLETE STRUCTURE

### Root Level (Monorepo)
```
resume-architect/
├── .git/                   # Git repository
├── client/                 # 👇 SEE BELOW
├── server/                 # 👇 SEE BELOW
├── .gitignore              # Root git ignore
├── ARCHITECTURE.md         # Tech design & security
├── package.json            # Monorepo config (workspaces)
├── PROJECT_STRUCTURE.md    # This file
└── README.md               # Main documentation
```

---

## 📁 CLIENT FOLDER (Frontend)

```
client/
├── .env                    # Local environment (git ignored)
├── .env.example            # Environment template
├── .gitignore              # Frontend-specific ignores
├── bun.lockb               # Lock file (if using Bun)
├── components.json         # shadcn/ui config
├── eslint.config.js        # ESLint configuration
├── index.html              # Entry HTML
├── package.json            # Frontend dependencies
├── package-lock.json       # Lock file
├── postcss.config.js       # PostCSS config
├── README.md               # Frontend documentation
├── tailwind.config.ts      # Tailwind CSS config
├── tsconfig.json           # Main TypeScript config
├── tsconfig.app.json       # App TypeScript config
├── tsconfig.node.json      # Node TypeScript config
├── vite.config.ts          # Vite bundler config
│
├── public/                 # Static assets
│   └── robots.txt
│
├── src/                    # React source code
│   ├── App.css
│   ├── App.tsx             # Main app with routing
│   ├── index.css           # Base styles
│   ├── main.tsx            # Entry point
│   ├── vite-env.d.ts       # Vite types
│   │
│   ├── components/
│   │   ├── NavLink.tsx
│   │   ├── ui/             # shadcn/ui components (20+)
│   │   ├── home/           # Landing page components
│   │   ├── builder/        # Builder features
│   │   │   └── ATSScorePanel.tsx
│   │   ├── layout/         # Layout wrappers
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── templates/      # Resume templates
│   │   │   ├── ResumeRenderer.tsx
│   │   │   ├── TemplateCard.tsx
│   │   │   └── renderers/  # 10 template implementations
│   │   ├── seo/            # SEO components
│   │   │   └── SEOMeta.tsx
│   │   └── usertype/       # User type components
│   │
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Landing
│   │   ├── GetStarted.tsx  # Onboarding
│   │   ├── SelectTemplate.tsx
│   │   ├── Templates.tsx   # Template showcase
│   │   ├── Pricing.tsx
│   │   ├── Builder.tsx     # Main editor
│   │   ├── Preview.tsx     # Export page
│   │   ├── Dashboard.tsx   # User dashboard
│   │   ├── ImportProfile.tsx
│   │   └── NotFound.tsx
│   │
│   ├── store/
│   │   └── resumeStore.ts  # Zustand state management
│   │
│   ├── types/
│   │   └── resume.ts       # TypeScript types
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── security/       # XSS protection & validation
│   │   │   └── index.ts
│   │   └── validation/     # Zod schemas
│   │       └── schemas.ts
│   │
│   ├── utils/
│   │   ├── atsScore.ts     # ATS score calculator
│   │   ├── exportUtils.ts  # PDF/DOCX/JSON export
│   │   └── importUtils.ts  # Profile import
│   │
│   ├── data/
│   │   ├── templates.ts    # Template definitions
│   │   └── sampleResumeData.ts
│   │
│   └── integrations/
│       └── supabase/       # Supabase client & types
│
└── supabase/               # Supabase config
    └── config.toml
```

---

## 📁 SERVER FOLDER (Backend - Template)

```
server/
├── .env                    # Local environment (git ignored)
├── .env.example            # Environment template
├── .gitignore              # Server-specific ignores
├── README.md               # Backend documentation
│
├── src/                    # (Ready for implementation)
│   ├── index.ts
│   ├── server.ts
│   ├── routes/             # API endpoint routes
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic
│   ├── middleware/         # Express middleware
│   ├── database/           # Database connection & migrations
│   ├── lib/                # Shared utilities
│   │   ├── security/
│   │   └── validation/
│   ├── types/              # TypeScript types
│   └── integrations/       # External APIs
│
└── package.json            # Backend dependencies
```

---

## 🚀 Quick Start

### Run Frontend
```bash
cd client
npm install
npm run dev
```

### Run Backend (Optional)
```bash
cd server
npm install
npm run dev
```

### Run Both (Using Monorepo Scripts)
```bash
npm run dev    # Runs both client and server
```

---

## 📋 File Status

### ✅ Created / Moved
- All frontend code → `client/src/`
- All frontend config → `client/`
- All static assets → `client/public/`
- Backend template → `server/`
- Root monorepo config → Root

### 📝 Documentation
- `README.md` — Main overview
- `ARCHITECTURE.md` — Technical details
- `PROJECT_STRUCTURE.md` — This file
- `client/README.md` — Frontend guide
- `server/README.md` — Backend guide

### 🔧 Configuration Files
- `package.json` — Root monorepo config with workspaces
- `client/.env.example` — Frontend env template
- `server/.env.example` — Backend env template
- `.gitignore` — Root-level ignores

---

## 📦 Tech Stack

### Frontend (client/)
- React 18, TypeScript, Vite
- Tailwind CSS, shadcn/ui
- Zustand, React Query, Zod
- React Router, Lucide Icons

### Backend (server/)
- Node.js, Express.js (ready to implement)
- PostgreSQL/Supabase
- JWT, Zod validation
- Helmet security, CORS

---

## 🎯 Key Features

✅ 10 Professional Templates  
✅ ATS Score Calculator  
✅ Multi-Format Export (PDF, DOCX, JSON)  
✅ Profile Import (JSON, GitHub, LinkedIn)  
✅ Dashboard with Version History  
✅ XSS Protection & Input Validation  
✅ Code Splitting & Lazy Loading  
✅ Offline-First with Auto-Save  

---

## 📚 What to Do Next

1. **Review Documentation**
   - Read [README.md](./README.md)
   - Check [ARCHITECTURE.md](./ARCHITECTURE.md)
   - See [client/README.md](./client/README.md)

2. **Environment Setup**
   ```bash
   cd client
   cp .env.example .env.local
   # Edit with your config
   ```

3. **Start Development**
   ```bash
   cd client && npm run dev
   ```

4. **Implement Backend** (Optional)
   - Review [server/README.md](./server/README.md)
   - Create API endpoints
   - Connect to database

---

This is now a clean, production-ready monorepo! 🎉


## 📋 Summary

You now have a professional, production-ready monorepo structure for the Resume Architect application with:

✅ Separate client (frontend) and server (backend) folders  
✅ Comprehensive documentation  
✅ Environment configuration files  
✅ Security and validation implementations  
✅ Component library and utilities  
✅ Page routing and lazy loading  
✅ State management setup  

## 📁 Full Directory Structure

```
resume-architect/
│
├── ROOT FILES
│   ├── README.md                 # Main project documentation
│   ├── ARCHITECTURE.md           # Technical architecture & design
│   ├── .env.example              # Root environment template
│   ├── .gitignore                # Git ignore rules
│   ├── package.json              # Root monorepo config
│   └── tsconfig.json             # TypeScript base config
│
├── CLIENT (Frontend)
│   ├── .gitignore
│   ├── .env.example
│   ├── README.md                 # Frontend-specific docs
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── postcss.config.js
│   ├── eslint.config.js
│   ├── components.json
│   ├── index.html
│   ├── vercel.json               # Deployment config
│   │
│   └── src/
│       ├── App.tsx               # Main app with routing
│       ├── App.css               # Global styles
│       ├── main.tsx              # Entry point
│       ├── index.css             # Base styles
│       ├── vite-env.d.ts
│       │
│       ├── components/
│       │   ├── NavLink.tsx
│       │   ├── ui/               # shadcn/ui components (20+)
│       │   ├── home/
│       │   │   ├── HeroSection.tsx
│       │   │   ├── FeaturesSection.tsx
│       │   │   ├── CTASection.tsx
│       │   │   └── HowItWorksSection.tsx
│       │   ├── builder/
│       │   │   └── ATSScorePanel.tsx       # ✨ NEW
│       │   ├── layout/
│       │   │   ├── Header.tsx
│       │   │   └── Footer.tsx
│       │   ├── templates/
│       │   │   ├── ResumeRenderer.tsx      # ✨ NEW
│       │   │   ├── TemplateCard.tsx
│       │   │   └── renderers/
│       │   │       ├── MinimalTemplate.tsx
│       │   │       ├── ModernTemplate.tsx
│       │   │       ├── ProfessionalTemplate.tsx
│       │   │       ├── ATSTemplate.tsx
│       │   │       ├── CreativeTemplate.tsx
│       │   │       ├── ExecutiveTemplate.tsx
│       │   │       ├── NordicTemplate.tsx
│       │   │       ├── TerminalTemplate.tsx
│       │   │       ├── ManuscriptTemplate.tsx
│       │   │       └── PrestigeTemplate.tsx
│       │   ├── seo/
│       │   │   └── SEOMeta.tsx              # ✨ NEW
│       │   └── usertype/
│       │       └── UserTypeCard.tsx
│       │
│       ├── pages/
│       │   ├── Index.tsx
│       │   ├── GetStarted.tsx
│       │   ├── SelectTemplate.tsx
│       │   ├── Templates.tsx
│       │   ├── Pricing.tsx
│       │   ├── Builder.tsx
│       │   ├── Preview.tsx                 # ✨ UPDATED
│       │   ├── Dashboard.tsx               # ✨ NEW
│       │   ├── ImportProfile.tsx           # ✨ NEW
│       │   └── NotFound.tsx
│       │
│       ├── store/
│       │   └── resumeStore.ts
│       │
│       ├── types/
│       │   └── resume.ts                   # ✨ UPDATED
│       │
│       ├── hooks/
│       │   ├── use-mobile.tsx
│       │   └── use-toast.ts
│       │
│       ├── lib/
│       │   ├── utils.ts
│       │   ├── security/
│       │   │   └── index.ts                # ✨ NEW
│       │   └── validation/
│       │       └── schemas.ts              # ✨ NEW
│       │
│       ├── utils/
│       │   ├── atsScore.ts                 # ✨ NEW
│       │   ├── exportUtils.ts              # ✨ NEW
│       │   └── importUtils.ts              # ✨ NEW
│       │
│       ├── data/
│       │   ├── templates.ts
│       │   └── sampleResumeData.ts
│       │
│       └── integrations/
│           └── supabase/
│               ├── client.ts
│               └── types.ts
│
├── SERVER (Backend - Structure for future)
│   ├── .gitignore
│   ├── .env.example
│   ├── README.md                 # Backend-specific docs
│   ├── package.json
│   ├── tsconfig.json
│   │
│   └── src/
│       ├── index.ts
│       ├── server.ts
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       ├── middleware/
│       ├── database/
│       ├── lib/
│       ├── types/
│       └── integrations/
│
└── PUBLIC
    └── robots.txt
```

## 🆕 New Files Created

### Frontend Utilities & Components
- ✨ **src/utils/atsScore.ts** — ATS score calculator with keyword analysis
- ✨ **src/utils/exportUtils.ts** — PDF/DOCX/JSON export functions
- ✨ **src/utils/importUtils.ts** — Profile import from JSON/GitHub/LinkedIn
- ✨ **src/lib/security/index.ts** — XSS sanitization and security utilities
- ✨ **src/lib/validation/schemas.ts** — Zod validation schemas for all forms
- ✨ **src/components/builder/ATSScorePanel.tsx** — ATS score UI component
- ✨ **src/components/seo/SEOMeta.tsx** — Dynamic meta tags for SEO
- ✨ **src/components/templates/ResumeRenderer.tsx** — Template renderer with lazy loading

### Frontend Pages
- ✨ **src/pages/Dashboard.tsx** — User dashboard with ATS and version history
- ✨ **src/pages/ImportProfile.tsx** — Profile import from multiple sources
- ✨ **src/pages/Preview.tsx** — Export preview with version control

### Root Level
- 📄 **README.md** — Comprehensive project documentation
- 📄 **ARCHITECTURE.md** — Technical architecture and features
- 📄 **.env.example** — Root environment template
- 📄 **.gitignore** — Git ignore rules for monorepo

### Client Folder
- 📄 **client/README.md** — Frontend-specific setup and development guide
- 📄 **client/.env.example** — Frontend environment template
- 📄 **client/.gitignore** — Frontend-specific ignore rules

### Server Folder (Prepared)
- 📄 **server/README.md** — Backend setup and API documentation
- 📄 **server/.env.example** — Backend environment template
- 📄 **server/.gitignore** — Backend-specific ignore rules

## 🔑 Key Features Implemented

### Security
✅ XSS protection via `sanitizeString()` and `sanitizeObject()`  
✅ Zod schema validation on all inputs  
✅ File upload type & size validation  
✅ Client-side rate limiting  
✅ Secure localStorage wrapper  
✅ CSP headers via vercel.json  

### Performance
✅ Code splitting with React.lazy()  
✅ Template lazy loading  
✅ Auto-save with 30-second debounce  
✅ Version history with 10-version limit  
✅ Efficient state management with Zustand  

### Features
✅ 10 professional templates  
✅ Live template previews  
✅ ATS score calculator  
✅ Multi-format export (PDF, DOCX, JSON)  
✅ Profile import (JSON, GitHub, LinkedIn)  
✅ Dashboard with progress tracking  
✅ Version history & restore  
✅ Dark mode support  
✅ Responsive design  

## 🚀 Getting Started

### Quick Setup

```bash
# Frontend
cd client
npm install
cp .env.example .env.local
npm run dev

# Backend (when ready)
cd server
npm install
cp .env.example .env.local
npm run dev
```

### Environment Variables

**Client (client/.env.local):**
```
VITE_API_URL=http://localhost:3001
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
```

**Server (server/.env.local):**
```
NODE_ENV=development
SERVER_PORT=3001
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
```

## 📚 Documentation Files

| File | Purpose |
|---|---|
| [README.md](./README.md) | Main project overview |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Technical design details |
| [client/README.md](./client/README.md) | Frontend development guide |
| [server/README.md](./server/README.md) | Backend API docs |
| [client/.env.example](./client/.env.example) | Frontend config template |
| [server/.env.example](./server/.env.example) | Backend config template |

## 🎯 Next Steps

1. **Review Documentation**
   - Read [README.md](./README.md) for overview
   - Check [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
   - Review [client/README.md](./client/README.md) for frontend specifics

2. **Set Environment Variables**
   ```bash
   cd client
   cp .env.example .env.local
   # Edit .env.local with your config
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```

4. **Develop Backend** (Optional)
   - Review [server/README.md](./server/README.md)
   - Create API endpoints
   - Connect to frontend

5. **Deploy**
   - Frontend: Vercel, Netlify
   - Backend: Railway, Render, AWS

## 🔗 Important Imports

```typescript
// Store (State Management)
import { useResumeStore } from '@/store/resumeStore';

// ATS Score
import { calculateATSScore } from '@/utils/atsScore';

// Export Functions
import { exportAsPDF, exportAsJSON, exportAsDOCX } from '@/utils/exportUtils';

// Import Functions
import { importFromJSONFile, importFromGitHub, importFromLinkedIn } from '@/utils/importUtils';

// Components
import { ATSScorePanel } from '@/components/builder/ATSScorePanel';
import { ResumeRenderer } from '@/components/templates/ResumeRenderer';
import { SEOMeta } from '@/components/seo/SEOMeta';

// Security & Validation
import { sanitizeString, validateJsonUpload } from '@/lib/security';
import { resumeDataSchema } from '@/lib/validation/schemas';
```

## 📞 Support

- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
- Review component code for usage examples
- Check [client/README.md](./client/README.md) for frontend questions
- Check [server/README.md](./server/README.md) for backend questions

---

**Your production-ready resume builder is ready to go! 🎉**
