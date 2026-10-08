import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { CTASection } from '@/components/shared/CTASection';
import { SchemaScript } from '@/components/shared/SchemaScript';
import { Badge } from '@/components/ui/Badge';
import { articles, getArticle, type Block } from '@/data/resources';
import { articleSchema } from '@/lib/schema';

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: 'Article not found' };
  return {
    title: a.seo.title,
    description: a.seo.description,
    alternates: { canonical: `/resources/${a.slug}` },
  };
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === 'h2')
          return (
            <h2 key={i} className="mt-10 text-2xl font-bold text-ink">
              {b.text}
            </h2>
          );
        if (b.type === 'p')
          return (
            <p key={i} className="mt-4 leading-relaxed text-ink-muted">
              {b.text}
            </p>
          );
        if (b.type === 'ul')
          return (
            <ul key={i} className="mt-4 space-y-2">
              {b.items.map((it) => (
                <li key={it} className="flex gap-2.5 leading-relaxed text-ink-muted">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {it}
                </li>
              ))}
            </ul>
          );
        return (
          <ol key={i} className="mt-4 space-y-2">
            {b.items.map((it, n) => (
              <li key={it} className="flex gap-3 leading-relaxed text-ink-muted">
                <span className="font-display font-bold text-accent-strong">{n + 1}.</span>
                {it}
              </li>
            ))}
          </ol>
        );
      })}
    </>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  return (
    <>
      <SchemaScript
        schema={articleSchema({
          title: a.title,
          description: a.seo.description,
          slug: a.slug,
          updated: a.updated,
        })}
      />

      <Section spacing="md">
        <Container size="narrow">
          <Link
            href="/resources"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> All resources
          </Link>

          <div className="mt-6 flex items-center gap-3">
            <Badge tone="accent">{a.category}</Badge>
            <span className="inline-flex items-center gap-1 text-xs text-ink-faint">
              <Clock className="h-3.5 w-3.5" /> {a.readMin} min read
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{a.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{a.excerpt}</p>

          <article className="mt-8">
            <Blocks blocks={a.body} />
          </article>

          {a.relatedRoute ? (
            <div className="mt-10 rounded-2xl border border-border bg-surface-muted p-6">
              <p className="text-eyebrow text-accent-strong">Related service</p>
              <Link
                href={a.relatedRoute}
                className="mt-1 inline-flex items-center gap-1.5 text-lg font-bold text-ink hover:text-accent-strong"
              >
                {a.relatedLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : null}
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
