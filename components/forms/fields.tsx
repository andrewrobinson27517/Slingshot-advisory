import { cn } from '@/lib/cn';

const inputBase =
  'w-full rounded-lg border border-border bg-surface px-4 py-3 text-[0.95rem] text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-accent';

export function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  full,
  children,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(full && 'sm:col-span-2')}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-accent-strong"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-xs font-medium text-error">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-ink-faint">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputBase, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputBase, 'min-h-28', props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(inputBase, 'appearance-none', props.className)} />;
}
