import type { ServiceKey } from '@/lib/validation';

export type IntakeFieldType =
  | 'text'
  | 'tel'
  | 'url'
  | 'number'
  | 'date'
  | 'textarea'
  | 'select';

export type IntakeField = {
  id: string;
  label: string;
  type: IntakeFieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: string[];
  full?: boolean; // span both columns
};

export type IntakeConfig = {
  key: ServiceKey;
  label: string; // shown in the service selector
  blurb: string; // one line under the selected service
  fields: IntakeField[]; // conditional, service-specific questions
  documents?: string[]; // "documents typically needed" checklist
};

const budgetOptions = ['Under $2,000', '$2,000 – $4,000', '$4,000 – $8,000', '$8,000+', 'Not sure yet'];
const timelineOptions = ['As soon as possible', '1–3 months', '3–6 months', 'Flexible'];
const yesPartialNo = ['Yes', 'Partially', 'No'];
const propertyTypes = ['Retail', 'Office', 'Medical', 'Industrial', 'Mixed-use', 'Other'];

export const intakeConfigs: IntakeConfig[] = [
  {
    key: 'cam-review',
    label: 'CAM Review',
    blurb: 'Review an annual CAM reconciliation and the costs behind it.',
    fields: [
      { id: 'propertyLocation', label: 'Property location', type: 'text', required: true, placeholder: 'City, state or address' },
      { id: 'propertyType', label: 'Property type', type: 'select', options: propertyTypes },
      { id: 'squareFeet', label: 'Approx. leased square footage', type: 'number', placeholder: 'e.g. 2,400' },
      { id: 'reconciliationYear', label: 'Reconciliation year', type: 'text', placeholder: 'e.g. 2024' },
      { id: 'annualCam', label: 'Approx. annual CAM expenses', type: 'text', placeholder: 'e.g. $18,000' },
      { id: 'concern', label: 'Primary concern', type: 'textarea', required: true, full: true, placeholder: 'What prompted the review? Any charges that seem off?' },
    ],
    documents: [
      'Your current lease and amendments',
      'The CAM reconciliation statement in question',
      'Prior-year CAM statements, if available',
    ],
  },
  {
    key: 'lease-renewal',
    label: 'Lease Renewal Financial Analysis',
    blurb: 'Model a renewal decision before you commit to the next term.',
    fields: [
      { id: 'expirationDate', label: 'Lease expiration date', type: 'date' },
      { id: 'baseRent', label: 'Current base rent', type: 'text', placeholder: 'e.g. $22/sf or $4,400/mo' },
      { id: 'squareFeet', label: 'Approx. leased square footage', type: 'number', placeholder: 'e.g. 2,400' },
      { id: 'currentTerm', label: 'Current lease length', type: 'text', placeholder: 'e.g. 5 years' },
      { id: 'proposedTerms', label: 'Proposed renewal terms', type: 'textarea', full: true, placeholder: 'Rent, escalations, term, concessions offered…' },
      { id: 'questions', label: 'Your primary questions', type: 'textarea', required: true, full: true, placeholder: 'What are you trying to decide?' },
    ],
    documents: ['Your current lease and amendments', 'Any renewal proposal or letter of intent'],
  },
  {
    key: 'website',
    label: 'Website Development',
    blurb: 'A modern site that helps customers find you and reach out.',
    fields: [
      { id: 'existingUrl', label: 'Existing website URL', type: 'url', placeholder: 'https:// (leave blank if none)' },
      { id: 'category', label: 'Business category', type: 'text', placeholder: 'e.g. clinic, law firm, contractor' },
      { id: 'features', label: 'Features you need', type: 'textarea', full: true, placeholder: 'Booking, forms, payments, blog, AI assistant…' },
      { id: 'timeline', label: 'Desired launch timeline', type: 'select', options: timelineOptions },
      { id: 'budget', label: 'Approximate budget', type: 'select', options: budgetOptions },
      { id: 'description', label: 'Project description', type: 'textarea', required: true, full: true, placeholder: 'Tell us what you’re trying to accomplish.' },
    ],
  },
  {
    key: 'ai-automation',
    label: 'AI Automation',
    blurb: 'Automate a repetitive workflow or add a website assistant.',
    fields: [
      { id: 'businessType', label: 'Business type', type: 'text', placeholder: 'e.g. clinic, agency, retailer' },
      { id: 'challenge', label: 'What do you want to automate?', type: 'textarea', required: true, full: true, placeholder: 'The repetitive task or workflow that eats your time.' },
      { id: 'tools', label: 'Existing tools / software', type: 'text', placeholder: 'e.g. Gmail, QuickBooks, a CRM' },
      { id: 'outcome', label: 'Desired outcome', type: 'textarea', full: true, placeholder: 'What would success look like?' },
      { id: 'timeline', label: 'Timeline', type: 'select', options: timelineOptions },
    ],
  },
  {
    key: 'underwriting',
    label: 'Real Estate Underwriting',
    blurb: 'A clear model and honest read on a real estate opportunity.',
    fields: [
      { id: 'propertyType', label: 'Property type', type: 'select', options: propertyTypes },
      { id: 'location', label: 'Location', type: 'text', placeholder: 'City, state' },
      { id: 'askingPrice', label: 'Asking price', type: 'text', placeholder: 'e.g. $1,250,000' },
      { id: 'revenueAvailable', label: 'Rent roll / revenue available?', type: 'select', options: yesPartialNo },
      { id: 'expensesAvailable', label: 'Operating expenses available?', type: 'select', options: yesPartialNo },
      { id: 'financing', label: 'Financing assumptions to model', type: 'textarea', full: true, placeholder: 'Down payment, rate, term, or “use your judgment”.' },
      { id: 'objective', label: 'Analysis objective', type: 'textarea', required: true, full: true, placeholder: 'What decision will this analysis inform?' },
    ],
    documents: ['Rent roll or income summary', 'Trailing operating expenses (T-12 if available)', 'Asking price or purchase terms'],
  },
  {
    key: 'property',
    label: 'Asset Management & Repositioning',
    blurb: 'A property strategy conversation — occupancy, performance, and opportunities.',
    fields: [
      { id: 'location', label: 'Property location', type: 'text', required: true, placeholder: 'City, state or address' },
      { id: 'propertyType', label: 'Property type', type: 'select', options: propertyTypes },
      { id: 'size', label: 'Approximate size', type: 'text', placeholder: 'e.g. 18,000 sf, 12 units' },
      { id: 'occupancy', label: 'Current occupancy', type: 'text', placeholder: 'e.g. 85%, fully leased, vacant' },
      { id: 'challenges', label: 'Main performance challenges', type: 'textarea', required: true, full: true, placeholder: 'What’s not working, or what you’d like to improve.' },
      { id: 'outcomes', label: 'Desired outcomes', type: 'textarea', full: true, placeholder: 'What would a good result look like?' },
    ],
  },
  {
    key: 'business-advisory',
    label: 'Business Advisory',
    blurb: 'Practical help with a financial or operational challenge.',
    fields: [
      { id: 'businessType', label: 'Business type', type: 'text', placeholder: 'e.g. clinic, contractor, retailer' },
      { id: 'challenge', label: 'Primary challenge', type: 'textarea', required: true, full: true, placeholder: 'What’s the problem you’re trying to solve?' },
      { id: 'outcome', label: 'Desired outcome', type: 'textarea', full: true, placeholder: 'What would a good result look like?' },
      { id: 'tools', label: 'Existing tools / software', type: 'text' },
      { id: 'timeline', label: 'Timeline', type: 'select', options: timelineOptions },
      { id: 'supporting', label: 'Supporting information', type: 'textarea', full: true, placeholder: 'Anything else that would help us prepare.' },
    ],
  },
];

export function getIntakeConfig(key: ServiceKey): IntakeConfig | undefined {
  return intakeConfigs.find((c) => c.key === key);
}

/** Human-readable label for a field id within a service (for emails/summaries). */
export function fieldLabel(key: ServiceKey, fieldId: string): string {
  const cfg = getIntakeConfig(key);
  return cfg?.fields.find((f) => f.id === fieldId)?.label ?? fieldId;
}
