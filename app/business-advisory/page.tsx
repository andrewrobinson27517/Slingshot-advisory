import type { Metadata } from 'next';
import { getService } from '@/data/services';
import { ServicePage } from '@/components/shared/ServicePage';

const service = getService('business-advisory')!;

export const metadata: Metadata = {
  title: service.seo.title,
  description: service.seo.description,
  alternates: { canonical: service.route },
};

export default function Page() {
  return <ServicePage service={service} />;
}
