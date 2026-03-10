import type { ResumeData } from '@/types/resume';

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const [y, m] = dateStr.split('-').map(Number);
  if (!y) return '';
  const d = new Date(y, (m || 1) - 1);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200 pb-1">
      {children}
    </h2>
  );
}

export function ContactLine({ data }: { data: ResumeData['personalInfo'] }) {
  const parts = [data.email, data.phone, data.location].filter(Boolean);
  return <p className="text-sm text-gray-600">{parts.join(' • ')}</p>;
}

export function LinksLine({ data }: { data: ResumeData['personalInfo'] }) {
  const links = [
    data.linkedIn && { href: data.linkedIn, label: 'LinkedIn' },
    data.github && { href: data.github, label: 'GitHub' },
    data.portfolio && { href: data.portfolio, label: 'Portfolio' },
  ].filter(Boolean) as { href: string; label: string }[];
  if (links.length === 0) return null;
  return (
    <p className="mt-1 text-sm text-gray-600">
      {links.map((l, i) => (
        <span key={l.label}>
          {i > 0 && ' • '}
          <a href={l.href.startsWith('http') ? l.href : `https://${l.href}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 underline hover:text-gray-900">
            {l.label}
          </a>
        </span>
      ))}
    </p>
  );
}
