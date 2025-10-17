# Diwali Quiz - Vercel Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- Vercel account
- PostgreSQL database (Vercel Postgres, Supabase, or PlanetScale)
- Node.js 18+ installed locally

### Step 1: Database Setup

1. **Create a PostgreSQL database:**
   - Use Vercel Postgres (recommended)
   - Or use Supabase, PlanetScale, or any PostgreSQL provider

2. **Get your database URL:**
   ```
   postgresql://username:password@host:port/database
   ```

### Step 2: Deploy to Vercel

1. **Connect your repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Set Environment Variables:**
   In Vercel dashboard, go to Settings → Environment Variables:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your-secret-key-here
   NODE_ENV=production
   ```

3. **Configure Build Settings:**
   - Build Command: `npm run vercel-build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Step 3: Database Migration

1. **Run Prisma migrations:**
   ```bash
   npx prisma migrate deploy
   ```

2. **Seed the database:**
   ```bash
   npm run prisma:seed
   ```

### Step 4: Verify Deployment

1. Visit your deployed URL
2. Take the quiz to test functionality
3. Check that results are saved and displayed correctly

## 🔧 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your database URL
   ```

3. **Run database migrations:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Seed the database:**
   ```bash
   npm run prisma:seed
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

## 📊 Performance Optimizations

- ✅ Image optimization with Next.js Image component
- ✅ Lazy loading for components and images
- ✅ API route caching
- ✅ Bundle optimization
- ✅ SEO optimizations
- ✅ Security headers

## 🛠️ Troubleshooting

### Common Issues:

1. **Database connection errors:**
   - Check DATABASE_URL format
   - Ensure database is accessible from Vercel

2. **Build failures:**
   - Check Node.js version (18+)
   - Verify all dependencies are installed
   - Check for TypeScript errors

3. **Image loading issues:**
   - Ensure images are in the correct directory
   - Check image file names match the code

### Performance Monitoring:

- Use Vercel Analytics for performance insights
- Monitor Core Web Vitals
- Check bundle size with `npm run build`

## 🔒 Security Features

- Security headers configured
- Input validation on API routes
- Error handling without sensitive data exposure
- CSRF protection
- XSS protection

## 📈 SEO Features

- Meta tags optimized
- Open Graph tags
- Twitter Card support
- Sitemap generation
- Robots.txt configuration
- Structured data ready

## 🚀 Production Checklist

- [ ] Database connected and migrated
- [ ] Environment variables set
- [ ] Images optimized
- [ ] SEO meta tags configured
- [ ] Analytics configured (optional)
- [ ] Error monitoring set up (optional)
- [ ] Performance monitoring enabled
