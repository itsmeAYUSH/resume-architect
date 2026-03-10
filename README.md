# Resume Architect — Monorepo

A full-stack resume builder application with 10 professional templates, ATS score calculator, PDF/DOCX export, and intelligent profile import.

## 📁 Project Structure

```
resume-architect/
├── client/                 # Frontend (React + TypeScript + Vite)
│   ├── src/                # React components, pages, utilities
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   ├── tsconfig.json       # TypeScript config
│   ├── vite.config.ts      # Vite config
│   ├── tailwind.config.ts  # Tailwind config
│   ├── .env.example        # Frontend env template
│   ├── .gitignore          # Frontend ignore rules
│   └── README.md           # Frontend documentation
│
├── server/                 # Backend (Node.js/Express - Template)
│   ├── src/                # API endpoints, services, database
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Backend env template
│   ├── .gitignore          # Backend ignore rules
│   └── README.md           # Backend documentation
│
├── ARCHITECTURE.md         # System design & technology details
├── PROJECT_STRUCTURE.md    # Complete folder breakdown
├── README.md               # This file
├── package.json            # Monorepo root config
└── .gitignore              # Monorepo ignore rules
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (or **Bun** 1.0+)
- **npm/pnpm/yarn/bun** package manager
- **PostgreSQL** (for backend database)
- **Supabase** account (optional, for auth & storage)

### Setup

1. **Clone and install dependencies:**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

2. **Configure environment variables:**
   ```bash
   # Root level
   cp .env.example .env.local
   
   # Client
   cd client && cp .env.example .env.local
   
   # Server
   cd ../server && cp .env.example .env.local
   ```

3. **Start development servers:**
   ```bash
   # Terminal 1: Frontend (runs on http://localhost:5173)
   cd client && npm run dev
   
   # Terminal 2: Backend (runs on http://localhost:3001)
   cd server && npm run dev
   ```

Visit http://localhost:5173

## 📦 Features

✅ **10 Professional Templates** — Minimal, Modern, Professional, ATS, Creative, Executive, Nordic, Terminal, Manuscript, Prestige  
✅ **Live Template Previews** — Real-time scaled-down renders  
✅ **ATS Score Calculator** — Keyword, completeness, formatting, readability analysis  
✅ **Multi-Format Export** — PDF (print-based), DOCX (editable), JSON (re-import)  
✅ **Profile Import** — JSON upload, GitHub integration, LinkedIn mock  
✅ **Dashboard** — Progress tracking, version history, quick actions  
✅ **Dark Mode** — Full theme support  
✅ **Offline-First** — Local storage with auto-save every 30s  
✅ **Security** — XSS sanitization, input validation, rate limiting, CSP headers  
✅ **Performance** — Code splitting, lazy loading, efficient rendering  

## 🛠️ Tech Stack

### Frontend
- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Fast build tool
- **Tailwind CSS** — Styling
- **Zustand** — State management
- **React Query** — Server state
- **Zod** — Validation
- **shadcn/ui** — Component library
- **Lucide Icons** — Icon set

### Backend
- **Node.js** — Runtime
- **Express.js** — Web framework
- **PostgreSQL** — Database
- **Supabase** — Auth & storage (optional)
- **JWT** — Authentication
- **Zod** — Input validation

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Project structure, security, performance
- **[client/README.md](./client/README.md)** — Frontend-specific setup & development
- **[server/README.md](./server/README.md)** — Backend-specific setup & deployment

## 🔒 Security

| Layer | Implementation |
|---|---|
| **XSS** | HTML tag stripping, sanitization |
| **Input Validation** | Zod schemas on all forms |
| **File Uploads** | Type & size validation |
| **Rate Limiting** | Client & server-side limits |
| **Headers** | CSP, X-Frame-Options, HSTS |
| **Storage** | Secure localStorage wrapper |

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed security implementation.

## 🎨 Customization

### Adding a New Template
1. Create `src/components/templates/renderers/YourTemplate.tsx`
2. Export component with `{ data: ResumeData }` props
3. Add entry to `src/components/templates/ResumeRenderer.tsx` template map
4. Add template definition to `src/data/templates.ts`

### Modifying ATS Score Logic
Edit `src/utils/atsScore.ts` to adjust:
- Keyword weights
- Completeness criteria
- Formatting checks
- Readability thresholds

### Customizing Validation
Edit `src/lib/validation/schemas.ts` to modify:
- Field max lengths
- Email/URL formats
- Custom validation rules

## 📊 Performance

- **Code Splitting:** Pages & templates lazy-loaded
- **Auto-Save:** 30s debounce, only when dirty
- **Version History:** Max 10 versions, deep cloned
- **Bundle Size:** ~150KB gzipped (React + Zustand + Zod)

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Push to Vercel or deploy `dist/` folder
```

### Backend (Railway/Render/AWS)
```bash
cd server
npm run build
NODE_ENV=production npm start
```

See [client/README.md](./client/README.md) and [server/README.md](./server/README.md) for detailed deployment instructions.

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Commit changes: `git commit -am 'Add my feature'`
3. Push branch: `git push origin feature/my-feature`
4. Open a Pull Request

## 📝 License

MIT License — feel free to use this project commercially.

## 💡 Support

For questions or issues:
1. Check [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Review [client/README.md](./client/README.md) and [server/README.md](./server/README.md)
3. Open a GitHub Issue
4. Contact: [your-email@example.com]

---

**Happy Resume Building! 🎉**
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for Vercel and Docker. The client is a Next.js app: set `NEXT_PUBLIC_APP_URL` and run `npm run build` in `client/`.

## Custom domain

Point your domain to your hosting (e.g. Vercel project settings → Domains).
