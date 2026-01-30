# Deployment Guide

## Project Structure

This is a **Next.js full-stack application** where frontend and backend are in the same codebase:

### 📁 Frontend Files
- **Pages/Components**: `app/` directory
  - `app/dashboard/` - Dashboard pages
  - `app/auth/` - Authentication pages
  - `components/` - Reusable React components
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions and clients

### 📁 Backend Files (API Routes)
- **API Endpoints**: `app/api/` directory
  - `app/api/communities/` - Community management
  - `app/api/events/` - Event management
  - `app/api/resources/` - Resource management
  - `app/api/bookings/` - Booking management
  - `app/api/notifications/` - Notifications
  - `app/api/analytics/` - Analytics
  - `app/api/dashboard/` - Dashboard stats

### 📁 Database
- **SQL Scripts**: `scripts/` directory
- **Database**: Supabase (external service)

---

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the recommended platform for Next.js applications.

#### Steps:
1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository
   - Configure environment variables (see below)
   - Click "Deploy"

3. **Environment Variables** (Add in Vercel Dashboard):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (optional, for admin operations)
   ```

4. **Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build` (or `pnpm build`)
   - Output Directory: `.next` (default)

---

### Option 2: Other Platforms

#### Netlify
1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

#### Railway
1. Connect your Git repository
2. Auto-detects Next.js
3. Add environment variables
4. Deploy automatically

#### AWS Amplify / DigitalOcean App Platform
- Similar process: connect repo, add env vars, deploy

---

## Pre-Deployment Checklist

### 1. Environment Variables
Create a `.env.production` file (or set in your hosting platform):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Database Setup
Run these SQL scripts in your Supabase SQL Editor (in order):
1. `scripts/setup-database.sql` - Main database schema
2. `scripts/fix-users-rls-policy.sql` - User policies
3. `scripts/fix-communities-rls-policy.sql` - Community policies
4. `scripts/fix-community-members-rls-recursion.sql` - Fix recursion
5. `scripts/create-community-messages-table.sql` - Messages table
6. `scripts/fix-community-messages-rls-policy.sql` - Message policies
7. `scripts/fix-resources-rls-policy-safe.sql` - Resource policies
8. `scripts/add-resources-approved-columns.sql` - Resource columns
9. `scripts/fix-events-rls-policy-safe.sql` - Event policies
10. `scripts/fix-event-attendees-delete-policy.sql` - Attendee policies

### 3. Build the Application
```bash
npm install
npm run build
```

### 4. Test Locally
```bash
npm start
```

---

## Production Build

### Build Command
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Output
- Built files are in `.next/` directory
- Static files are optimized
- API routes are serverless functions

---

## Important Notes

### 1. Next.js Configuration
- The app uses Next.js 16 with App Router
- API routes are serverless functions
- Images are unoptimized (can be optimized for production)

### 2. Supabase Configuration
- Make sure your Supabase project is in production mode
- Update RLS policies for production
- Enable email provider in Supabase Auth settings

### 3. CORS & Security
- Update `allowedDevOrigins` in `next.config.mjs` for production
- Remove development IPs or set to empty array

### 4. Environment Variables
- `NEXT_PUBLIC_*` variables are exposed to the browser
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the frontend
- Use environment variables in your hosting platform

---

## File Structure Summary

```
campus-management-platform/
├── app/                    # Frontend pages + Backend API routes
│   ├── api/               # 🔧 BACKEND - API endpoints
│   ├── dashboard/         # 🎨 FRONTEND - Dashboard pages
│   ├── auth/              # 🎨 FRONTEND - Auth pages
│   └── layout.tsx         # 🎨 FRONTEND - Root layout
├── components/            # 🎨 FRONTEND - React components
├── hooks/                 # 🎨 FRONTEND - Custom hooks
├── lib/                   # 🔧 BACKEND + 🎨 FRONTEND - Utilities
├── scripts/               # 🗄️ DATABASE - SQL scripts
├── public/                # 🎨 FRONTEND - Static assets
├── package.json           # Dependencies
└── next.config.mjs        # Next.js configuration
```

---

## Quick Deploy Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm start

# Deploy to Vercel (if using Vercel CLI)
vercel --prod
```

---

## Support

If you encounter issues:
1. Check `TROUBLESHOOTING.md` for common issues
2. Verify all environment variables are set
3. Check Supabase dashboard for database errors
4. Review build logs in your hosting platform

