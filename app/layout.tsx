import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Fraunces } from 'next/font/google';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Assistant } from '@/components/assistant/Assistant';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { site } from '@/data/site';
import '@/styles/globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Slingshot Advisory — Smarter Business. Stronger Decisions.',
    template: '%s | Slingshot Advisory',
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'business consulting Rochester MN',
    'CAM reconciliation review',
    'commercial lease renewal analysis',
    'real estate underwriting services',
    'business website development Rochester MN',
    'AI automation for small business',
    'lender package preparation',
  ],
  authors: [{ name: site.name }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: site.name,
    title: 'Slingshot Advisory — Smarter Business. Stronger Decisions.',
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Slingshot Advisory — Smarter Business. Stronger Decisions.',
    description: site.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#16212e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${fraunces.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <SchemaScript schema={[organizationSchema(), websiteSchema()]} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Assistant />
      </body>
    </html>
  );
}
