import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { site, footerNav } from '@/data/site';
import { Container } from './Container';
import { Logo } from './Logo';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-dark bg-navy text-on-dark">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo tone="on-dark" />
            <p className="measure mt-4 text-[0.95rem] leading-relaxed text-on-dark-muted">
              {site.supporting} We help business owners solve complex problems, improve
              operations, and make more informed decisions.
            </p>
            <address className="mt-5 space-y-2.5 text-[0.95rem] not-italic text-on-dark">
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-accent" />
                {site.contact.location}
              </p>
              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-center gap-2.5 hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                {site.contact.email}
              </a>
              <a href={site.contact.phoneHref} className="flex items-center gap-2.5 hover:text-white">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                {site.contact.phone}
              </a>
            </address>
          </div>

          {footerNav.map((col) => (
            <div key={col.heading}>
              <h3 className="text-eyebrow text-on-dark-muted">{col.heading}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.95rem] text-on-dark-muted transition-colors hover:text-on-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border-dark pt-6 text-[0.9rem] text-on-dark-muted">
          <p className="measure">
            Slingshot Advisory provides business analysis, preparation, and digital services.
            It is not a licensed real estate brokerage, law firm, CPA firm, mortgage
            originator, or registered investment adviser. Services described here are not
            legal, tax, accounting, appraisal, or investment advice.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} {site.name}. All rights reserved.</p>
            <p>
              An affiliate of{' '}
              <a
                href={site.family.realEstate}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:text-white"
              >
                Slingshot Real Estate
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
