import { cn } from '@/lib/cn';
import { Eyebrow } from '@/components/ui/Eyebrow';

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  tone?: 'default' | 'on-dark';
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'default',
  className,
}: Props) {
  return (
    <div
      className={cn(
        align === 'center' && 'mx-auto text-center',
        align === 'center' ? 'max-w-2xl' : 'max-w-3xl',
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={tone === 'on-dark' ? 'on-dark' : 'accent'}>{eyebrow}</Eyebrow>
      ) : null}
      <h2
        className={cn(
          'mt-3 text-3xl font-bold tracking-tight sm:text-4xl',
          tone === 'on-dark' ? 'text-on-dark' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {intro ? (
        <div
          className={cn(
            'measure mt-4 text-[1.05rem] leading-relaxed',
            tone === 'on-dark' ? 'text-on-dark-muted' : 'text-ink-muted',
          )}
        >
          {intro}
        </div>
      ) : null}
    </div>
  );
}
