# Sri Ruthralaya Bharathanatyam Academy - Deployment Guide

This guide details the complete production deployment workflow for the **Sri Ruthralaya Bharathanatyam Academy** web platform.

---

## 🏗️ Architecture Overview

| Component | Recommended Host | Free Tier Available? | Build / Output Settings |
| :--- | :--- | :--- | :--- |
| **PostgreSQL Database** | [Neon.tech](https://neon.tech) or [Supabase](https://supabase.com) | ✅ Yes | Direct connection pooler with SSL |
| **Node.js Express Backend** | [Render.com](https://render.com) or [Railway](https://railway.app) | ✅ Yes | Root: `backend`, Build: `npm install && npm run build`, Start: `npm start` |
| **React + Vite Frontend** | [Vercel](https://vercel.com) or [Netlify](https://netlify.com) | ✅ Yes | Root: `frontend`, Build: `npm run build`, Output: `dist` |

---

## Step 1: Provision the PostgreSQL Database (Neon.tech)

1. Sign up / Log in to [Neon Console](https://console.neon.tech).
2. Create a new project:
   - **Name**: `sri-ruthralaya-db`
   - **Region**: Select closest to your audience (e.g. `ap-southeast-1` Singapore or `eu-central-1`).
3. Under **Dashboard > Connection Details**, copy the **Pooled connection string**:
   ```env
   postgresql://<user>:<password>@<ep-pooler-domain>.neon.tech/neondb?sslmode=require
   ```
4. Keep this connection string ready for Step 2.

---

## Step 2: Deploy Backend to Render.com

1. Push your repository to **GitHub** or **GitLab**.
2. Go to [Render Dashboard](https://dashboard.render.com) and click **New > Web Service**.
3. Connect your GitHub repository: `rajisankar06/Sri-Ruthralaya`.
4. Configure service settings:
   - **Name**: `sri-ruthralaya-api`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Region**: Choose the same or closest region as your Neon database.
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Configure **Environment Variables** under the **Environment** tab:

   | Key | Value / Example | Note |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Enables production security & logging |
   | `PORT` | `5000` | (Or leave empty, Render assigns automatically) |
   | `DATABASE_URL` | *Your Neon PostgreSQL connection string* | Must include `?sslmode=require` |
   | `JWT_SECRET` | *Random 64+ char secret string* | e.g. run `openssl rand -hex 32` |
   | `JWT_REFRESH_SECRET`| *Different random 64+ char secret* | e.g. run `openssl rand -hex 32` |
   | `FRONTEND_URL` | `https://sriruthralaya.vercel.app` | *Update with your actual frontend URL* |
   | `OPENAI_API_KEY` | *sk-...* (optional) | Enables AI chatbot & dashboard insights |

6. Click **Deploy Web Service**.
7. Run Initial Migrations & Seeds:
   - In Render, click the **Shell** tab for your service.
   - Run the database migration and seed:
     ```bash
     npx prisma migrate deploy
     node prisma/seed.js
     ```
8. Copy your live backend URL (e.g., `https://sri-ruthralaya-api.onrender.com`).
   - Test it in your browser: `https://sri-ruthralaya-api.onrender.com/api/v1/health`

---

## Step 3: Deploy Frontend to Vercel (or Netlify)

### Option A: Vercel (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com) and click **Add New > Project**.
2. Select your repository `Sri-Ruthralaya`.
3. In **Project Configuration**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click *Edit* and select `frontend`.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables** and add:
   - `VITE_API_BASE_URL`: `https://sri-ruthralaya-api.onrender.com/api/v1`
   - `VITE_APP_NAME`: `Sri Ruthralaya Bharathanatyam Academy`
   - `VITE_ACADEMY_PHONE`: `+91 98421 23456`
   - `VITE_ACADEMY_LOCATION`: `Thiruthangal near Sivakasi, Tamil Nadu`
5. Click **Deploy**.
6. When deployment finishes, copy the live URL (e.g., `https://sri-ruthralaya.vercel.app`).

### Option B: Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com) and click **Add new site > Import an existing project**.
2. Select your GitHub repository.
3. Configuration:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. Under **Site configuration > Environment variables**, add:
   - `VITE_API_BASE_URL`: `https://sri-ruthralaya-api.onrender.com/api/v1`
5. Click **Deploy Site**. The included `frontend/public/_redirects` ensures SPA client-side routing works smoothly.

---

## Step 4: Finalize CORS Configuration

Once you have your frontend URL (e.g., `https://sri-ruthralaya.vercel.app`):
1. Return to **Render > sri-ruthralaya-api > Environment**.
2. Update `FRONTEND_URL`:
   ```env
   FRONTEND_URL="https://sri-ruthralaya.vercel.app,http://localhost:5173"
   ```
3. Click **Save Changes** (Render will automatically redeploy).

---

## Step 5: Verification & Smoke Test

1. Visit your live frontend URL.
2. Verify public pages:
   - Home, About Guru, Courses, Gallery, Contact.
3. Test login:
   - Navigate to `/login`
   - Login with default administrator credentials:
     - **Email**: `admin@srillaya.edu`
     - **Password**: `Password123!`
4. Open the Executive Control Center at `/admin/dashboard`:
   - Verify that the top executive bar indicates `🟢 PostgreSQL Engine Online`.
   - Test adding a student, logging attendance, or publishing an announcement.
