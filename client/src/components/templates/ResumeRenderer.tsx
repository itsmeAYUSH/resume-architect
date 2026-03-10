import type { ResumeData, Template } from '@/types/resume';
import { FileText } from 'lucide-react';
import { lazy, Suspense } from 'react';

// Lazy load all templates for code splitting
const MinimalTemplate = lazy(() => import('./renderers/MinimalTemplate'));
const ModernTemplate = lazy(() => import('./renderers/ModernTemplate'));
const ProfessionalTemplate = lazy(() => import('./renderers/ProfessionalTemplate'));
const ATSTemplate = lazy(() => import('./renderers/ATSTemplate'));
const CreativeTemplate = lazy(() => import('./renderers/CreativeTemplate'));

// Re-export remaining templates (from previous build)
const ExecutiveTemplate = lazy(() => import('./renderers/ExecutiveTemplate'));
const NordicTemplate = lazy(() => import('./renderers/NordicTemplate'));
const TerminalTemplate = lazy(() => import('./renderers/TerminalTemplate'));
const ManuscriptTemplate = lazy(() => import('./renderers/ManuscriptTemplate'));
const PrestigeTemplate = lazy(() => import('./renderers/PrestigeTemplate'));

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

  const templateId = template?.id ?? 'minimal';

  const templateMap: Record<string, React.ComponentType<{ data: ResumeData }>> = {
    minimal: MinimalTemplate as React.ComponentType<{ data: ResumeData }>,
    modern: ModernTemplate as React.ComponentType<{ data: ResumeData }>,
    professional: ProfessionalTemplate as React.ComponentType<{ data: ResumeData }>,
    ats: ATSTemplate as React.ComponentType<{ data: ResumeData }>,
    creative: CreativeTemplate as React.ComponentType<{ data: ResumeData }>,
    executive: ExecutiveTemplate as React.ComponentType<{ data: ResumeData }>,
    nordic: NordicTemplate as React.ComponentType<{ data: ResumeData }>,
    terminal: TerminalTemplate as React.ComponentType<{ data: ResumeData }>,
    manuscript: ManuscriptTemplate as React.ComponentType<{ data: ResumeData }>,
    prestige: PrestigeTemplate as React.ComponentType<{ data: ResumeData }>,
  };

  const TemplateComponent = templateMap[templateId] ?? MinimalTemplate;

  return (
    <Suspense fallback={<TemplateFallback />}>
      <TemplateComponent data={data} />
    </Suspense>
  );
}
