import type { ResumeData, Template } from '@/types/resume';
import { FileText } from 'lucide-react';
import { lazy, Suspense } from 'react';

// Lazy load templates for code splitting (Minimal, Modern, Professional, ATS, Creative)
const MinimalTemplate = lazy(() => import('./renderers/MinimalTemplate'));
const ModernTemplate = lazy(() => import('./renderers/ModernTemplate'));
const ProfessionalTemplate = lazy(() => import('./renderers/ProfessionalTemplate'));
const ATSTemplate = lazy(() => import('./renderers/ATSTemplate'));
const CreativeTemplate = lazy(() => import('./renderers/CreativeTemplate'));

interface Props {
  data: ResumeData;
  template: Template | null;
}

function EmptyState() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div className="text-center text-gray-400">
        <FileText className="mx-auto mb-3 h-12 w-12 opacity-20" />
        <p className="text-sm">Fill in your details to see the preview</p>
      </div>
    </div>
  );
}

function TemplateFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600" />
    </div>
  );
}

export default function ResumeRenderer({ data, template }: Props) {
  const isEmpty =
    !data.personalInfo.fullName &&
    data.education.length === 0 &&
    data.experience.length === 0 &&
    data.projects.length === 0;

  if (isEmpty) return <EmptyState />;

  // Normalize template id: "minimal-fresh" -> "minimal", "ats-friendly" -> "ats"
  const rawId = template?.id ?? 'minimal';
  const templateId = rawId.split('-')[0] === 'ats' ? 'ats' : rawId.split('-')[0];

  const templateMap: Record<string, React.ComponentType<{ data: ResumeData }>> = {
    minimal: MinimalTemplate as React.ComponentType<{ data: ResumeData }>,
    modern: ModernTemplate as React.ComponentType<{ data: ResumeData }>,
    professional: ProfessionalTemplate as React.ComponentType<{ data: ResumeData }>,
    ats: ATSTemplate as React.ComponentType<{ data: ResumeData }>,
    creative: CreativeTemplate as React.ComponentType<{ data: ResumeData }>,
  };

  const TemplateComponent = templateMap[templateId] ?? MinimalTemplate;

  return (
    <Suspense fallback={<TemplateFallback />}>
      <TemplateComponent data={data} />
    </Suspense>
  );
}
