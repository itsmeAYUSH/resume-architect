# Resume Architect — Backend

Node.js + Express backend API for Resume Architect resume builder.

## 📋 Features

- ✅ RESTful API for resume management
- ✅ User authentication with JWT
- ✅ PDF/DOCX/JSON export generation
- ✅ Profile import/sync from external sources
- ✅ ATS score calculation on server-side
- ✅ Rate limiting and security
- ✅ PostgreSQL database with Supabase
- ✅ Comprehensive input validation

## 🛠️ Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **TypeScript** — Type safety
- **PostgreSQL** — Database
- **Supabase** — Auth & storage (optional)
- **Zod** — Runtime validation
- **JWT** — Token-based authentication
- **Helmet** — Security headers
- **CORS** — Cross-origin requests

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun 1.0+
- PostgreSQL 12+ (or Supabase)
- npm, pnpm, yarn, or bun

### Installation

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install
# or
npm install -g bun && bun install
```

### Database Setup

```bash
# Option 1: Local PostgreSQL
# Make sure PostgreSQL is running, then create database:
createdb resume_architect

# Option 2: Supabase (Recommended for production)
# Create a Supabase project and get the connection string
```

### Environment Setup

```bash
# Copy example env file
cp .env.example .env.local

# Edit with your configuration:
# - DATABASE_URL: PostgreSQL connection string
# - NODE_ENV: development/production
# - SERVER_PORT: Port to run on (default: 3001)
# - JWT_SECRET: Random string for JWT signing
# - CORS_ORIGIN: Allowed frontend URLs
```

### Initialize Database

```bash
# Create tables and schema
npm run db:init

# Or if using migrations:
npm run db:migrate
```

### Development

```bash
# Start development server (with auto-reload)
npm run dev

# or with Bun
bun run dev
```

Server runs on http://localhost:3001

### Build

```bash
# Compile TypeScript
npm run build

# Start production server
NODE_ENV=production npm start
```

## 📁 Project Structure

```
src/
├── server.ts                      # Express app setup
├── index.ts                       # Entry point
│
├── routes/
│   ├── auth.ts                    # Authentication routes
│   ├── resumes.ts                 # Resume CRUD routes
│   ├── export.ts                  # Export routes (PDF/DOCX/JSON)
│   ├── import.ts                  # Import routes
│   ├── ats.ts                     # ATS score routes
│   └── health.ts                  # Health check
│
├── controllers/
│   ├── authController.ts          # Auth logic
│   ├── resumeController.ts        # Resume logic
│   ├── exportController.ts        # Export logic
│   ├── importController.ts        # Import logic
│   └── atsController.ts           # ATS logic
│
├── services/
│   ├── authService.ts             # JWT & auth
│   ├── resumeService.ts           # Resume business logic
│   ├── exportService.ts           # Export generation
│   ├── importService.ts           # Import parsing
│   ├── atsService.ts              # ATS calculation
│   └── emailService.ts            # Email sending
│
├── middleware/
│   ├── auth.ts                    # JWT verification
│   ├── validation.ts              # Input validation
│   ├── errorHandler.ts            # Error handling
│   ├── corsHandler.ts             # CORS setup
│   └── rateLimiter.ts             # Rate limiting
│
├── database/
│   ├── db.ts                      # Database connection
│   ├── migrations/                # Database migrations
│   └── schema.sql                 # Database schema
│
├── lib/
│   ├── security/
│   │   └── index.ts               # Sanitization & security
│   ├── validation/
│   │   └── schemas.ts             # Zod schemas
│   └── utils.ts                   # Utility functions
│
└── types/
    ├── index.ts                   # Global types
    ├── resume.ts                  # Resume types
    └── user.ts                    # User types
```

## 🔐 Security Features

### Authentication
- JWT token-based auth
- Refresh token rotation
- Secure password hashing (bcrypt)

### Input Validation
- Zod schemas on all endpoints
- Max file size checks
- Sanitization of user input

### Rate Limiting
- Per-IP rate limiting
- Endpoint-specific limits
- Configurable windows

### Security Headers
- Helmet.js for HTTP headers
- CORS configuration
- CSP headers

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register          # Register new user
POST   /api/auth/login             # Login user
POST   /api/auth/refresh           # Refresh token
POST   /api/auth/logout            # Logout user
GET    /api/auth/me                # Get current user
```

### Resumes
```
GET    /api/resumes                # List user resumes
GET    /api/resumes/:id            # Get resume details
POST   /api/resumes                # Create new resume
PATCH  /api/resumes/:id            # Update resume
DELETE /api/resumes/:id            # Delete resume
```

### Export
```
POST   /api/export/pdf             # Generate PDF
POST   /api/export/docx            # Generate DOCX
POST   /api/export/json            # Generate JSON
```

### Import
```
POST   /api/import/json            # Import from JSON
POST   /api/import/github          # Sync GitHub profile
POST   /api/import/linkedin        # Sync LinkedIn profile
```

### ATS Score
```
POST   /api/ats/calculate          # Calculate ATS score
POST   /api/ats/suggestions        # Get improvement suggestions
```

### Health
```
GET    /api/health                 # Health check
GET    /api/health/db              # Database health check
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Resumes Table
```sql
CREATE TABLE resumes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(255),
  data JSONB,
  template_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Resume Versions Table
```sql
CREATE TABLE resume_versions (
  id UUID PRIMARY KEY,
  resume_id UUID REFERENCES resumes(id),
  label VARCHAR(255),
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔗 Database Connection

### PostgreSQL Local
```bash
# Start PostgreSQL
brew services start postgresql

# Connect to database
psql resume_architect
```

### Supabase (Recommended)
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
```

## 🚢 Deployment

### Railway (Recommended)

1. **Create Railway project**
2. **Add PostgreSQL plugin**
3. **Deploy:**
   ```bash
   railway link
   npm run build
   railway up
   ```

### Render

1. **Create new Web Service**
2. **Connect GitHub repository**
3. **Set Environment:**
   - `NODE_ENV`: production
   - `DATABASE_URL`: PostgreSQL URL
   - `JWT_SECRET`: Secret key

### AWS/EC2

```bash
# Build
npm run build

# Start
NODE_ENV=production npm start
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "start"]
```

## 📊 Monitoring

### Logs
```bash
# View logs
npm run logs

# Stream logs
npm run logs:stream
```

### Health Check
```bash
# Check server health
curl http://localhost:3001/api/health

# Check database connection
curl http://localhost:3001/api/health/db
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## 📚 Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build TypeScript |
| `npm start` | Start production server |
| `npm run db:init` | Initialize database |
| `npm run db:migrate` | Run migrations |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Check TypeScript |
| `npm run test` | Run tests |

## 🔄 API Authentication Flow

```
1. User registers/logs in → POST /api/auth/login
2. Server returns { accessToken, refreshToken }
3. Client stores tokens (accessToken in memory, refreshToken in httpOnly cookie)
4. Client includes Authorization header: "Bearer {accessToken}"
5. When token expires → POST /api/auth/refresh
6. Server returns new accessToken
```

## 📝 Environment Variables Reference

| Variable | Type | Default | Description |
|---|---|---|---|
| `NODE_ENV` | string | development | Environment mode |
| `SERVER_PORT` | number | 3001 | Server port |
| `DATABASE_URL` | string | required | PostgreSQL connection |
| `JWT_SECRET` | string | required | JWT signing key |
| `JWT_EXPIRY` | string | 7d | Token expiration |
| `CORS_ORIGIN` | string | * | Allowed origins |
| `LOG_LEVEL` | string | info | Logging level |

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes
3. Write tests
4. Commit: `git commit -am 'Add feature'`
5. Push: `git push origin feature/my-feature`
6. Create Pull Request

## 📝 License

MIT License — free to use commercially.

## 💡 Support

- Check [ARCHITECTURE.md](../ARCHITECTURE.md) for system design
- Review API endpoint documentation
- Check logs for errors
- Open GitHub issues
- Email: [support@resumearchitect.app]

---

**Happy hacking! 🚀**
