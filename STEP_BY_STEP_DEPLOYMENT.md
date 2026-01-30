# Step-by-Step Deployment Guide

This guide will walk you through deploying your Campus Management Platform from start to finish.

---

## Prerequisites Checklist

Before starting, make sure you have:
- ✅ A GitHub account (or GitLab/Bitbucket)
- ✅ A Supabase account (free tier works)
- ✅ Your Supabase project URL and API keys
- ✅ Node.js installed locally (for testing)

---

## Step 1: Prepare Your Code

### 1.1 Check Your Current Code
```bash
# Make sure you're in the project directory
cd /Users/testaccount/Desktop/BlueTesters/campus-management-platform

# Check if git is initialized
git status
```

### 1.2 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - Ready for deployment"
```

### 1.3 Create .gitignore (if missing)
Make sure `.gitignore` includes:
```
node_modules/
.next/
.env.local
.env*.local
.DS_Store
```

---

## Step 2: Set Up Supabase Database

### 2.1 Go to Supabase Dashboard
1. Visit [supabase.com](https://supabase.com)
2. Sign in to your account
3. Open your project (or create a new one)

### 2.2 Get Your Supabase Credentials
1. Go to **Settings** → **API**
2. Copy these values (you'll need them later):
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

### 2.3 Run Database Scripts
1. Go to **SQL Editor** in Supabase dashboard
2. Run these scripts **IN ORDER** (copy and paste each one):

   **Script 1: Main Database Schema**
   - Open `scripts/setup-database.sql`
   - Copy all content
   - Paste in SQL Editor
   - Click **Run**

   **Script 2: Fix User Policies**
   - Open `scripts/fix-users-rls-policy.sql`
   - Copy and run

   **Script 3: Fix Community Policies**
   - Open `scripts/fix-communities-rls-policy.sql`
   - Copy and run

   **Script 4: Fix Community Members Recursion**
   - Open `scripts/fix-community-members-rls-recursion.sql`
   - Copy and run

   **Script 5: Create Messages Table**
   - Open `scripts/create-community-messages-table.sql`
   - Copy and run

   **Script 6: Fix Messages Policies**
   - Open `scripts/fix-community-messages-rls-policy.sql`
   - Copy and run

   **Script 7: Fix Resources Policies**
   - Open `scripts/fix-resources-rls-policy-safe.sql`
   - Copy and run

   **Script 8: Add Resource Columns**
   - Open `scripts/add-resources-approved-columns.sql`
   - Copy and run

   **Script 9: Fix Events Policies**
   - Open `scripts/fix-events-rls-policy-safe.sql`
   - Copy and run

   **Script 10: Fix Event Attendees Policies**
   - Open `scripts/fix-event-attendees-delete-policy.sql`
   - Copy and run

### 2.4 Configure Supabase Auth
1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. (Optional) Disable "Confirm email" for testing (Settings → Auth → Email)

---

## Step 3: Push Code to GitHub

### 3.1 Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click **New Repository**
3. Name it: `campus-management-platform`
4. Make it **Public** or **Private** (your choice)
5. **Don't** initialize with README
6. Click **Create repository**

### 3.2 Push Your Code
```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/campus-management-platform.git

# Replace YOUR_USERNAME with your actual GitHub username

# Push code
git branch -M main
git push -u origin main
```

If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Or use SSH: `git remote set-url origin git@github.com:YOUR_USERNAME/campus-management-platform.git`

---

## Step 4: Deploy to Vercel

### 4.1 Sign Up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub

### 4.2 Import Your Project
1. Click **Add New...** → **Project**
2. Find your `campus-management-platform` repository
3. Click **Import**

### 4.3 Configure Project Settings
1. **Framework Preset**: Should auto-detect "Next.js" ✅
2. **Root Directory**: Leave as `./` (default)
3. **Build Command**: `npm run build` (default)
4. **Output Directory**: `.next` (default)
5. **Install Command**: `npm install` (default)

### 4.4 Add Environment Variables
Click **Environment Variables** and add these **one by one**:

**Variable 1:**
- Name: `NEXT_PUBLIC_SUPABASE_URL`
- Value: Your Supabase Project URL (from Step 2.2)
- Environment: Production, Preview, Development (check all)

**Variable 2:**
- Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: Your Supabase anon key (from Step 2.2)
- Environment: Production, Preview, Development (check all)

**Variable 3 (Optional - for admin operations):**
- Name: `SUPABASE_SERVICE_ROLE_KEY`
- Value: Your Supabase service_role key (from Step 2.2)
- Environment: Production, Preview, Development (check all)
- ⚠️ **Keep this secret!**

### 4.5 Deploy
1. Click **Deploy** button
2. Wait 2-5 minutes for build to complete
3. You'll see a success message with your live URL!

---

## Step 5: Test Your Deployment

### 5.1 Visit Your Live Site
1. Click the deployment URL (e.g., `https://campus-management-platform.vercel.app`)
2. You should see your application!

### 5.2 Test Key Features
1. **Sign Up**: Create a new account
2. **Login**: Sign in with your account
3. **Dashboard**: Check if dashboard loads
4. **Create Event**: (if you're organizer/admin)
5. **Join Community**: Test community features

### 5.3 Check for Errors
- Open browser console (F12)
- Look for any red errors
- Check Network tab for failed requests

---

## Step 6: Post-Deployment Setup

### 6.1 Create General Community (if needed)
1. Login as an **Organizer** or **Admin**
2. Go to **Communities** page
3. Click **Create General Chatroom** (if button appears)
4. Or manually create a community named "General"

### 6.2 Test All Features
- ✅ User registration
- ✅ User login
- ✅ Dashboard stats
- ✅ Event creation (organizers/admins)
- ✅ Resource creation (organizers/admins)
- ✅ Community joining
- ✅ Chatroom messaging
- ✅ Resource bookings
- ✅ Notifications

### 6.3 Set Up Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

---

## Troubleshooting Common Issues

### Issue: Build Fails
**Solution:**
- Check build logs in Vercel dashboard
- Make sure all environment variables are set
- Verify `package.json` has correct scripts

### Issue: Database Errors
**Solution:**
- Verify all SQL scripts ran successfully
- Check Supabase dashboard for errors
- Make sure RLS policies are enabled

### Issue: Authentication Not Working
**Solution:**
- Verify Supabase URL and keys are correct
- Check Supabase Auth settings
- Make sure email provider is enabled

### Issue: API Routes Return 500 Errors
**Solution:**
- Check Vercel function logs
- Verify environment variables are set
- Check Supabase RLS policies

### Issue: Images Not Loading
**Solution:**
- Images are set to unoptimized in `next.config.mjs`
- For production, consider using Supabase Storage or CDN

---

## Step 7: Monitor Your Application

### 7.1 Vercel Analytics
- Go to **Analytics** tab in Vercel
- Monitor page views, performance

### 7.2 Supabase Dashboard
- Monitor database usage
- Check authentication logs
- Review API usage

### 7.3 Error Tracking
- Check Vercel logs for errors
- Monitor Supabase logs
- Set up error tracking (Sentry, etc.) if needed

---

## Quick Reference Commands

```bash
# Local Development
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm start           # Start production server locally

# Git Commands
git status          # Check git status
git add .           # Stage all changes
git commit -m "msg" # Commit changes
git push            # Push to GitHub

# Vercel CLI (optional)
npm i -g vercel     # Install Vercel CLI
vercel login        # Login to Vercel
vercel              # Deploy to preview
vercel --prod       # Deploy to production
```

---

## Environment Variables Reference

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Optional (for admin operations)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Deployment Checklist

Before deploying, make sure:
- [ ] All code is committed to Git
- [ ] Code is pushed to GitHub
- [ ] Supabase database is set up
- [ ] All SQL scripts are run
- [ ] Environment variables are ready
- [ ] Supabase Auth is configured
- [ ] Local build works (`npm run build`)

After deployment:
- [ ] Site is accessible
- [ ] Can sign up new users
- [ ] Can login
- [ ] Dashboard loads
- [ ] Can create events/resources (if organizer/admin)
- [ ] Communities work
- [ ] Chatroom works
- [ ] No console errors

---

## Need Help?

If you encounter issues:
1. Check `TROUBLESHOOTING.md` in your project
2. Review Vercel deployment logs
3. Check Supabase dashboard for database errors
4. Verify all environment variables are set correctly

---

## Congratulations! 🎉

Your Campus Management Platform is now live! Share your URL with users and start managing your campus resources.

