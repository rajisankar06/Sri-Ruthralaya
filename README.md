# 🛕 Sri Ruthralaya Bharathanatyam Academy — Full Stack Platform

> A production-ready, three-tier web application and academy management platform for **Sri Ruthraalayaa Dance Academy** in Thiruthangal near Sivakasi, Tamil Nadu. Built with traditional South Indian temple aesthetics, complete student & admin portals, and an intelligent AI chatbot and analytics engine.

---

## 🏛️ Reference Branding & Visual Design Language
- **Academy**: Sri Ruthraalayaa (Sri Ruthralaya Bharathanatyam Academy)
- **Founder & Director**: Guru Nattiyakalaimani R. Sridevi (Diploma in Dance, Title of *Nattiyakalaimani*, BFA in Classical Dance)
- **Legacy**: 18+ Years of Classical Dance Heritage in Thiruthangal near Sivakasi, Tamil Nadu
- **Affiliation**: Tamil Nadu Music and Fine Arts University (Grade Examinations 1–7)
- **Palette**:
  - **Temple Maroon**: `#7B1E1E`, `#58111A`, `#3B0000`
  - **Temple Antique Gold**: `#D4AF37`, `#FFD700`, `#FFF8D6`, `#FFF2A8`
  - **Sacred Cream & Ivory**: `#FDFBF7`, `#FAF5EE`, `#FFFDF9`
- **Motifs**: Kolam geometric rangoli patterns, Bharatanatyam mudra iconography, temple-arch section dividers
- **Typography**: `Cinzel` (Royal Classical Headings), `Cormorant Garamond` (Sacred Quotes & Subtitles), `Outfit` (Modern UI)

---

## 🛠️ Technology Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Recharts, React Router DOM v6, Axios, React Hook Form, Zod, Canvas Confetti
- **Backend**: Node.js, Express.js, native `pg` PostgreSQL driver (Connection Pooling with SSL), JWT (Access + Refresh tokens with httpOnly cookies), Bcryptjs (12 salt rounds), Helmet, CORS, Express-Rate-Limit, PDFKit
- **Database**: PostgreSQL (hosted on Neon DB serverless PostgreSQL)
- **Database Driver**: Native `pg` (no ORM overhead, direct SQL queries)
- **AI Engine**: OpenAI API / Anthropic Claude API (with high-fidelity Natyashastra classical fallback engine)
- **Deployment**: Netlify / Vercel (Frontend SPA) + Render (Backend Web Service) + Neon (PostgreSQL Database)

---

## 📂 Monorepo Structure

```
Sri Ruthralaya/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js            # Native PostgreSQL connection pool & data models
│   │   ├── controllers/
│   │   │   ├── aiInsightsController.js # AI trends, risk & recommendation generator
│   │   │   ├── analyticsController.js  # KPIs, Recharts data & Linear Regression forecast
│   │   │   ├── attendanceController.js # Attendance marking & CSV bulk upload
│   │   │   ├── authController.js       # Register, Login, Refresh, Logout, Secure OTP Forgot Password
│   │   │   ├── batchController.js      # Batch & curriculum CRUD
│   │   │   ├── chatbotController.js    # Public FAQ + Student authenticated query resolver
│   │   │   ├── eventController.js      # Events management
│   │   │   ├── feeController.js        # Fee ledger & PDF receipt generator (PDFKit)
│   │   │   ├── galleryController.js    # Performance photos & cloud/file media storage
│   │   │   ├── noticeController.js     # Audience-targeted notice broadcasts
│   │   │   └── studentController.js    # Student CRUD & approvals
│   │   ├── middleware/
│   │   │   ├── auth.js          # JWT verification & role-based access control
│   │   │   ├── errorHandler.js  # Global standardized error responses
│   │   │   └── rateLimiter.js   # Rate limiters for auth and chatbot abuse prevention
│   │   ├── routes/              # Versioned API routes (/api/v1/...)
│   │   ├── utils/
│   │   │   └── token.js         # JWT access & refresh token utilities
│   │   └── server.js            # Express server entrypoint & static uploads
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   ├── _redirects           # Netlify SPA redirect rule
│   │   └── favicon.svg          # Nataraja classical emblem icon
│   ├── src/
│   │   ├── components/
│   │   │   ├── chatbot/
│   │   │   │   └── FloatingChatbot.jsx # Reusable floating AI assistant
│   │   │   └── common/
│   │   │       ├── Footer.jsx
│   │   │       ├── KolamDivider.jsx
│   │   │       ├── MudraIcon.jsx
│   │   │       ├── Navbar.jsx
│   │   │       ├── ProtectedRoute.jsx
│   │   │       ├── PublicLayout.jsx
│   │   │       └── TempleBorder.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Global session, user state, and token rotation
│   │   ├── layouts/
│   │   │   ├── AdminLayout.jsx  # Executive sidebar layout
│   │   │   └── StudentLayout.jsx# Disciple portal sidebar layout
│   │   ├── pages/
│   │   │   ├── admin/           # Dashboard, Students, Batches, Attendance, Fees, Events, Gallery, Logs
│   │   │   ├── public/          # Home, About, Courses, Gallery, Events, Testimonials, Contact, Login, Register, Forgot Password
│   │   │   └── student/         # Dashboard, Profile, Attendance, Schedule, Fees, Progress, Notices, Materials
│   │   ├── services/
│   │   │   └── api.js           # Axios client with automatic Bearer tokens & 401 refresh
│   │   ├── App.jsx              # Complete route hierarchy
│   │   ├── index.css            # Temple theme, Kolam backgrounds, custom scrollbars
│   │   └── main.jsx
│   ├── .env.example
│   ├── .env.development
│   ├── tailwind.config.js       # Temple color palette & typography tokens
│   ├── vite.config.js
│   └── package.json
│
└── README.md                    # Setup & Deployment Guide
```

---

## 👥 User Credentials

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Superadmin (Guru)** | `admin@sriruthralaya.com` | `Admin@123` | Full control: AI Insights, Student Approvals, Fees, Batches, CSV Attendance |
| **Staff / Instructor** | `instructor@sriruthralaya.com` | `Staff@123` | Batch Attendance marking, Curriculum, Notices |
| **Active Disciple** | `ananya.r@gmail.com` | `Student@123` | Student Dashboard, Attendance Calendar, Fee Receipts, Adavu Progress |
| **Pending Applicant** | `priya.new@gmail.com` | `Student@123` | Pending admin verification |

---

## 🚀 Local Development Setup

### 1. Backend Setup
```bash
cd backend
npm install

# Configure environment variables in backend/.env:
# DATABASE_URL=postgresql://<user>:<password>@<neon-host>/neondb?sslmode=require
# JWT_SECRET=your_jwt_secret
# JWT_REFRESH_SECRET=your_jwt_refresh_secret

# Run Backend API server (runs on http://localhost:5000)
npm start
```

### 2. Frontend Setup
```bash
cd ../frontend
npm install

# Start Vite Dev Server (runs on http://localhost:5173)
npm run dev
```

Visit **http://localhost:5173** to view the application.

---

## ☁️ Deployment Instructions

### Step 1: PostgreSQL on Neon DB
1. Sign up / log in to [Neon DB](https://neon.tech).
2. Create a new project (e.g., `sri-ruthralaya-db`).
3. In the Dashboard, copy the **Pooled connection string** (Format: `postgresql://neondb_owner:***@ep-***-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`).

### Step 2: Backend API on Render
1. Sign up / log in to [Render](https://render.com).
2. Click **New +** → **Web Service**.
3. Connect your Git repository.
4. Set the following configuration:
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/server.js`
5. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `DATABASE_URL`: `your_neon_pooled_connection_string`
   - `JWT_SECRET`: `your_secure_jwt_access_secret`
   - `JWT_REFRESH_SECRET`: `your_secure_jwt_refresh_secret`
   - `OPENAI_API_KEY`: *(Optional - for live OpenAI GPT calls)*
   - `ANTHROPIC_API_KEY`: *(Optional - for live Claude calls)*
   - `FRONTEND_URL`: `https://sriruthralaya.netlify.app,https://your-custom-domain.com`
6. Click **Deploy Web Service** and copy your backend URL (e.g., `https://sri-ruthralaya-api.onrender.com`).

### Step 3: Frontend on Netlify / Vercel
1. Sign up / log in to [Netlify](https://netlify.com) or [Vercel](https://vercel.com).
2. Click **Add new site** → **Import an existing project**.
3. Select your repository.
4. Set the build configuration:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. Under **Site configuration** → **Environment variables**, add:
   - `VITE_API_BASE_URL`: `https://sri-ruthralaya-api.onrender.com/api/v1` (your Render backend URL)
6. Verify that `frontend/public/_redirects` contains:
   ```
   /*    /index.html   200
   ```
7. Click **Deploy Site**.

---

## 🌟 Key Features Walkthrough

### 1. AI Analysis & Linear Regression Forecasting (Admin Portal)
- Top KPI dashboard visualizing live attendance averages, monthly tuition collection, and pending dues.
- **AI Strategic Intelligence Panel**: Queries aggregated, anonymized metrics and produces 3 positive trends, 1 operational risk alert, and 1 actionable recommendation.
- **Interactive Recharts Visualizations**:
  - Monthly Enrollment Trend with a **dotted Linear Regression forecast line** predicting next month's student influx.
  - Batch Attendance % comparison vs the 85% university benchmark.
  - Stacked Revenue Collected vs Pending Dues.
  - Student Retention Curve over academic terms.

### 2. Context-Aware AI Chatbot Widget
- Floats on all public and student pages.
- **Public Mode**: Answers visitors regarding class timings, monthly fees, Guru Sridevi's 18-year legacy, and admission criteria.
- **Student Disciple Mode**: Queries PostgreSQL for the authenticated student's personalized metrics (e.g., *"What is my attendance this month?"* -> *"Namaskaram Ananya! Your current attendance is 93.3% across 15 sessions."*).
- All conversations recorded in `chatbot_logs` for administrative quality review.

### 3. Student Portal
- **Attendance Calendar**: Monthly interactive grid with color-coded presence/absence and % attendance gauge.
- **Fee Management**: Online payment simulator and instant **PDF receipt download** using PDFKit with custom temple branding.
- **Progress Tracker**: Interactive Adavu checklist (Tatta, Natta, Kuditta Metta, Teermanam) and Margam repertoire.
- **Timetable & Materials**: Weekly schedule and downloadable practice solkattu audio and syllabi.

### 4. Admin Management Modules
- **1-Click Registration Approval**: Streamlined verification of applicant disciples with batch assignments.
- **CSV Attendance Bulk Import**: One-click upload or direct attendance matrix marking.
- **Curriculum & Batch CRUD**: Modify schedules, fees, and instructors.
- **Event & Notice Broadcasts**: Push urgent notifications to student dashboards.
- **Gallery Management**: Upload performance and ceremony media with automatic cloud/local object storage.
