# Resume Architect – Deployment Guide

## Quick Deploy (Vercel)

1. **Connect repo**  
   Push to GitHub/GitLab and import the project in [Vercel](https://vercel.com). Select the **client** directory as the root (or the monorepo root and set “Root Directory” to `client`).

2. **Environment variables**  
   In Vercel → Project → Settings → Environment Variables, add:

   | Variable | Description |
   |----------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (if using Supabase) |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key |
   | `NEXT_PUBLIC_APP_URL` | Production URL, e.g. `https://yourdomain.com` (used for sitemap, robots, OG) |

3. **Build**  
   Vercel will run `npm run build` (or `npm install && npm run build` in `client`). No extra config needed for Next.js.

4. **Optional: OG image**  
   Add `public/og-image.png` (1200×630) for Open Graph. If missing, update `app/layout.tsx` metadata `images` to point to your CDN or remove.

---

## Docker (self-hosted)

Example Dockerfile for the **client** (Next.js):

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY client/package*.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY client/ .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t resume-architect-client -f Dockerfile .
docker run -p 3000:3000 -e NEXT_PUBLIC_APP_URL=https://yourdomain.com resume-architect-client
```

For standalone output, add to `client/next.config.mjs`:

```js
const nextConfig = {
  output: 'standalone',
  // ... rest
};
```

---

## Security checklist

- [ ] Set `NEXT_PUBLIC_APP_URL` to the real production URL.
- [ ] Do not commit `.env` or `.env.local`; use `.env.example` as a template.
- [ ] If using Supabase, restrict RLS and use anon key only in the client.
- [ ] Headers (X-Frame-Options, X-Content-Type-Options, etc.) are set in `next.config.mjs`.
- [ ] File upload (JSON import) is validated and size-limited in `src/lib/security`.
- [ ] Export (PDF/JSON/DOCX) is rate-limited and HTML export is escaped against XSS.

---

## Performance

- Next.js App Router with lazy-loaded template components.
- Static metadata and sitemap/robots for SEO.
- Consider enabling ISR or CDN caching for landing/templates if you add a backend.

---

## Scaling later

- **Backend**: Add `server/` (e.g. Express + Prisma) for auth, persisted resumes, and server-side PDF/DOCX generation.
- **Rate limiting**: Move export rate limits to API routes or a gateway.
- **Redis**: Use for session or rate-limit state if you run multiple instances.
