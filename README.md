# HarverstIQ

**Enterprise-Grade Web Crawler & Data Aggregation Platform**

HarverstIQ is a production-ready web scraping and data harvesting platform that combines the precision of distributed scraping with sheet-native data storage and real-time orchestration.

## 🏗️ Architecture

```
HarverstIQ Monorepo
├── apps/
│   ├── web/          (Next.js 14, TypeScript, Shadcn/ui)
│   ├── api/          (Node.js 20, Express, TypeScript)
│   └── scraper/      (Python 3.11, Scrapy, Playwright)
├── shared/           (Types, Constants)
└── infra/            (Docker, Scripts)
```

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose v2+
- Node.js 20+ (local development)
- Python 3.11+ (local Python development)

### Setup

```bash
# Clone repository
git clone https://github.com/webdevelopmentstars/HarverstIQ.git
cd HarverstIQ

# Copy environment template
cp .env.example .env

# Update .env with your values
# CRITICAL: Add GOOGLE_SHEETS_ID and mount service-account.json

# Start all services
docker-compose up --build
```

### Services

- **Web**: http://localhost:3000 (Next.js frontend)
- **API**: http://localhost:4000 (Express backend)
- **Scraper**: Internal Python worker
- **MongoDB**: localhost:27017 (admin/password)
- **Redis**: localhost:6379

## 🔧 Development Commands

```bash
# Start all services
make dev

# Build images
make build

# View logs
make logs
make logs:api
make logs:scraper

# Shell into containers
make shell:api
make shell:scraper

# Stop services
make down
```

## 📋 Features

- ✅ Multi-URL concurrent scraping with Playwright
- ✅ Smart deduplication (SHA256 content hashing)
- ✅ Proxy rotation & fingerprint evasion
- ✅ Real-time job progress via Socket.IO
- ✅ Google Sheets native storage (Staging → Approved workflow)
- ✅ Role-based access control (Admin, Editor, Viewer)
- ✅ Scheduled jobs (APScheduler)
- ✅ Queue management (BullMQ + Redis)
- ✅ Browser pool with context recycling
- ✅ Comprehensive audit logging

## 🔐 Security

- JWT-based authentication (15min access + 7d refresh tokens)
- Password hashing (bcryptjs)
- Input validation (Zod schemas)
- RBAC with granular dataset permissions
- Rate limiting (100 req/min per user)
- No hardcoded secrets (env-based)
- Google Sheets credentials via mounted volume

## 📊 Google Sheets Integration

HarverstIQ writes directly to Google Sheets with the following tabs:

| Tab | Purpose |
|---|---|
| `Raw_Data` | Direct scraper output |
| `Staging` | Pending admin review |
| `Approved_Data` | Production-ready data |
| `Job_Logs` | Execution history |
| `Audit_Logs` | Admin action trail |

## 🗄️ Data Schema

### Row Format
```
record_uuid | dataset_uuid | dataset_version | source_url
title | description | content | author
published_date | scraped_at | content_hash | status
```

## 🔄 Data Flow

```
1. Admin creates Job in Dashboard
   ↓
2. API validates & stores in MongoDB
   ↓
3. Job pushed to Redis/BullMQ queue
   ↓
4. Python Worker picks job from queue
   ↓
5. Playwright scrapes URL(s)
   ↓
6. Normalize & dedup (SHA256 check)
   ↓
7. Write to Google Sheets (Staging tab)
   ↓
8. Admin reviews & approves in Dashboard
   ↓
9. Approved rows moved to Approved_Data tab
   ↓
10. Real-time Socket.IO events to connected clients
```

## 🗂️ Project Structure

### Backend (Node.js)

```
apps/api/src/
├── middleware/       (auth, error handler, logging)
├── models/           (MongoDB schemas)
├── routes/           (API endpoints)
├── services/         (business logic)
├── utils/            (helpers, constants)
├── schemas/          (Zod validation)
└── app.ts            (Express app)
```

### Frontend (Next.js)

```
apps/web/src/
├── app/              (Next.js 14 App Router)
│   ├── (auth)/       (login, logout)
│   └── (dashboard)/  (protected routes)
├── components/       (React components)
├── hooks/            (custom hooks)
├── lib/              (utilities, API client)
├── store/            (Zustand state)
└── styles/           (Tailwind CSS)
```

### Scraper (Python)

```
apps/scraper/
├── main.py           (worker entrypoint)
├── config.py         (settings)
├── browser/          (Playwright pool)
├── scraper/          (scraping logic)
├── sheets/           (Google Sheets writer)
├── storage/          (MongoDB, Redis)
├── queue/            (BullMQ consumer)
├── scheduler/        (APScheduler)
└── requirements.txt
```

## 📈 Monitoring

### Health Check

```bash
curl http://localhost:4000/admin/health
```

Returns service status, queue depth, active jobs, and metrics.

## 🧪 Testing

```bash
# Run all tests
npm run test

# API tests (Jest + supertest)
cd apps/api && npm test

# Scraper tests (pytest)
cd apps/scraper && pytest
```

## 📝 Environment Configuration

See `.env.example` for all available options. Critical variables:

```bash
# Google Sheets
GOOGLE_SHEETS_ID=your_sheet_id_here
GOOGLE_CREDENTIALS_PATH=./config/service-account.json

# Secrets (generate new in production)
JWT_SECRET=generate_random_32_char_string
SCRAPER_SECRET=generate_random_32_char_string

# Database
MONGODB_URI=mongodb://admin:password@mongo:27017/harvestiq
REDIS_URL=redis://redis:6379/0
```

## 🚀 Deployment

### Production Build

```bash
# Build all images
make build

# Deploy with compose
make up

# Check status
make logs
```

### Docker Production Notes

- All services run with `restart: unless-stopped`
- Health checks configured for all services
- Proper dependency ordering with `depends_on`
- Non-root users for security
- Named volumes for persistent data

## 📚 API Documentation

### Authentication

```bash
# Login
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@harvestiq.com", "password": "password"}'

# Response includes access_token (JWT)
# Refresh token stored as httpOnly cookie
```

### Create Job

```bash
curl -X POST http://localhost:4000/jobs \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "News Scraper",
    "target_url": "https://news.example.com",
    "selector_template_id": "template_uuid",
    "schedule": "0 */4 * * *"
  }'
```

### Trigger Job

```bash
curl -X POST http://localhost:4000/jobs/{id}/run \
  -H "Authorization: Bearer <token>"
```

## 🔍 Debugging

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f scraper

# MongoDB
docker-compose logs -f mongo

# Redis
docker-compose logs -f redis
```

### Shell Access

```bash
# API container
docker-compose exec api sh

# Scraper container
docker-compose exec scraper bash

# MongoDB
docker-compose exec mongo mongosh -u admin -p password
```

## 📞 Support

For issues, questions, or contributions:

1. Check existing issues on GitHub
2. Review documentation in `/docs`
3. Check error logs: `docker-compose logs -f`
4. Verify environment configuration in `.env`

## 📄 License

Proprietionary - All rights reserved

## 👨‍💼 Author

Developed by webdevelopmentstars

---

**Built with Production Excellence in Mind** 🚀
