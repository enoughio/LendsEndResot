# Land's End Resort - Sumiran Forest

A modern, SEO-optimized website for Land's End Resort at Sumiran Forest, Bhopal. Built with Next.js 14+, TypeScript, and Tailwind CSS.

## 🌟 Features

- **SEO Optimized**: Complete metadata, Open Graph, Twitter Cards, and JSON-LD structured data
- **Performance**: Optimized images, lazy loading, and Next.js App Router
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Production Ready**: Error boundaries, loading states, 404 pages
- **Analytics**: Vercel Analytics integration
- **Accessibility**: WCAG compliant with semantic HTML

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lend
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local` with your actual values

5. Run development server:
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🌐 Production URL

The site is deployed at: [https://landsend.bharatstorytellers.com](https://landsend.bharatstorytellers.com)

## 📁 Project Structure

```
src/
├── app/                # App router pages
│   ├── about/         # About page
│   ├── booking/       # Booking pages
│   ├── contact/       # Contact page
│   ├── gallery/       # Gallery page
│   ├── layout.tsx     # Root layout with metadata
│   ├── page.tsx       # Home page
│   ├── error.tsx      # Error boundary
│   ├── loading.tsx    # Loading state
│   ├── not-found.tsx  # 404 page
│   ├── sitemap.ts     # Dynamic sitemap
│   └── manifest.ts    # PWA manifest
├── components/        # React components
│   ├── home/         # Home page components
│   ├── aboutPage/    # About page components
│   ├── booking/      # Booking components
│   ├── contactPage/  # Contact page components
│   └── ...           # Shared components
├── lib/              # Utilities and types
public/
├── gallery/          # Gallery images
├── home/            # Home page images
├── icons/           # Icon assets
└── robots.txt       # SEO robots file
```

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available environment variables:

- `NEXT_PUBLIC_SITE_URL`: Your production URL
- `NEXT_PUBLIC_GOOGLE_VERIFICATION`: Google Search Console verification code
- Social media URLs for footer links

### SEO Configuration

Update metadata in `src/app/layout.tsx`:
- Site title and description
- Open Graph images
- Twitter card settings
- Verification codes

### Structured Data

Modify `src/components/StructuredData.tsx` to update:
- Business information
- Location coordinates
- Amenities
- Social media links

## 🏗️ Building for Production

```bash
pnpm build
# or
npm run build
```

Test the production build locally:
```bash
pnpm start
# or
npm start
```

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Other Platforms

Build the production bundle and deploy the `.next` folder with:
```bash
pnpm build
```

## ✅ Production Checklist

- [x] SEO metadata on all pages
- [x] Open Graph and Twitter Cards
- [x] JSON-LD structured data
- [x] Sitemap and robots.txt
- [x] Error boundaries and loading states
- [x] 404 page
- [x] Image optimization
- [x] Console logs removed/conditioned
- [x] Analytics integrated
- [ ] Update Google verification code
- [ ] Test all pages in production
- [ ] Submit sitemap to Google Search Console
- [ ] Test mobile responsiveness
- [ ] Check accessibility with Lighthouse

## 📱 Key Pages

- **Home** (`/`): Hero, activities, dining, gallery preview
- **About** (`/about`): Resort story, mission, team, conservation
- **Gallery** (`/gallery`): Photo collage of resort and nature
- **Contact** (`/contact`): Contact form and information
- **Booking** (`/booking`): Booking overview and options

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics
- **Fonts**: Urbanist (Google Fonts)

## 📄 License

© 2026 Land's End Resort. All rights reserved.

## 🤝 Support

For support, email landsend.sumiran@gmail.com or call +91 8871317382.
