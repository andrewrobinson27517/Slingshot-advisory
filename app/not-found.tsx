import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-eyebrow text-accent-strong">404</p>
      <h1 className="mt-3 text-4xl font-bold text-ink">Page not found</h1>
      <p className="mt-3 max-w-md text-ink-muted">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Return Home</Button>
        <Button href="/contact" variant="outline">
          Request a Consultation
        </Button>
      </div>
    </Container>
  );
}
