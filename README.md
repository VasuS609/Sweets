# 🎉 Diwali Sweet Quiz - Production Ready

A fun and interactive personality quiz that matches you with your perfect Diwali sweet! Built with Next.js 15, TypeScript, and optimized for Vercel deployment.

## ✨ Features

- 🎯 **Personality Quiz**: Interactive questions to determine your sweet personality
- 🍯 **Sweet Matching**: Get matched with traditional Diwali sweets
- 📊 **Nutrition Info**: Detailed nutritional information for each sweet
- 🎨 **Beautiful UI**: Modern, responsive design with Tailwind CSS
- ⚡ **Fast Performance**: Optimized for speed and Core Web Vitals
- 🔒 **Secure**: Production-ready security headers and validation
- 📱 **Mobile First**: Fully responsive design
- 🚀 **Vercel Ready**: Optimized for Vercel deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Diwali-Quiz
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your database URL
   ```

4. **Set up the database:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   npm run prisma:seed
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the app!

## 🚀 Production Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel:**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Set up environment variables in Vercel dashboard

2. **Environment Variables:**
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=your-secret-key
   NODE_ENV=production
   ```

3. **Deploy:**
   - Vercel will automatically build and deploy
   - Run database migrations: `npx prisma migrate deploy`
   - Seed the database: `npm run prisma:seed`

📖 **Detailed deployment guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel
- **Performance**: Optimized images, lazy loading, caching
- **SEO**: Meta tags, sitemap, robots.txt

## 📊 Performance Optimizations

- ✅ **Image Optimization**: Next.js Image component with WebP/AVIF support
- ✅ **Code Splitting**: Dynamic imports and lazy loading
- ✅ **Caching**: API route caching and static asset caching
- ✅ **Bundle Optimization**: Tree shaking and code splitting
- ✅ **SEO**: Comprehensive meta tags and structured data
- ✅ **Security**: Security headers and input validation
- ✅ **Core Web Vitals**: Optimized for LCP, FID, and CLS

## 🎯 Quiz Logic

The quiz uses a sophisticated tagging system:
- Each question option has personality tags
- User selections are scored by tag frequency
- Sweet recommendations are matched based on tag compatibility
- Results are saved for future reference

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Fast loading on mobile networks

## 🔒 Security Features

- Input validation on all API routes
- Security headers (XSS, CSRF protection)
- Error handling without data exposure
- Rate limiting ready
- SQL injection protection via Prisma

## 📈 SEO Features

- Comprehensive meta tags
- Open Graph and Twitter Card support
- Sitemap generation
- Robots.txt configuration
- Structured data ready
- Fast loading times

## 🧪 Development

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint

# Type check
npm run type-check

# Database
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/           # API routes
│   ├── components/    # Reusable components
│   ├── result/        # Result pages
│   └── quiz/          # Quiz pages
├── lib/               # Utilities
└── types/             # TypeScript types
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎉 Happy Diwali!

May this quiz bring joy and sweetness to your Diwali celebrations! 🪔✨

