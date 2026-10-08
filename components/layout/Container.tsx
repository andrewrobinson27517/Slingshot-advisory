import { cn } from '@/lib/cn';

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
};

/** Horizontal page gutter + max width. */
export function Container({ children, className, size = 'default' }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-6 lg:px-8',
        size === 'default' && 'max-w-6xl',
        size === 'narrow' && 'max-w-3xl',
        size === 'wide' && 'max-w-7xl',
        className,
      )}
    >
      {children}
    </div>
  );
}
