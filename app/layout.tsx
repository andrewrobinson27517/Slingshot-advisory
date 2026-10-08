import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Assistant } from '@/components/assistant/Assistant';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { site } from '@/data/site';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' });

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
  themeColor: '#14263d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
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
