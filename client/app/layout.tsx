import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://resumeai.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ResumeAI - Build Professional Resumes with AI | Free Resume Builder',
    template: '%s | ResumeAI',
  },
  description:
    'Create professional, ATS-optimized resumes in minutes with AI-powered suggestions. Choose from 5+ templates. Export to PDF, DOCX, JSON. Free to use.',
  authors: [{ name: 'ResumeAI', url: BASE_URL }],
  keywords:
    'resume builder, AI resume, professional resume, CV maker, job application, career, fresher resume, student resume, ATS resume',
  openGraph: {
    title: 'ResumeAI - Build Professional Resumes with AI',
    description:
      'Create professional, ATS-optimized resumes in minutes. 5+ templates. Export PDF, DOCX, JSON.',
    type: 'website',
    url: BASE_URL,
    siteName: 'ResumeAI',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ResumeAI' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ResumeAI',
    title: 'ResumeAI - AI-Powered Resume Builder',
    description: 'Create professional resumes in minutes. Export PDF, DOCX, JSON.',
  },
  robots: { index: true, follow: true },
  verification: {},
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ResumeAI',
  description: 'Build professional, ATS-optimized resumes. Export to PDF, DOCX, JSON.',
  url: BASE_URL,
  applicationCategory: 'BusinessApplication',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
