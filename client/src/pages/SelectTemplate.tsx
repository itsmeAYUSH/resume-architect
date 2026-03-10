'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TemplateGrid from '@/components/templates/TemplateGrid';
import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/store/resumeStore';
import { Template } from '@/types/resume';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const SelectTemplate = () => {
  const router = useRouter();
  const { userType, selectedTemplate, setSelectedTemplate } = useResumeStore();

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      router.push('/builder');
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-16 md:py-24">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Choose Your Template
            </h1>
            <p className="text-lg text-muted-foreground">
              {userType 
                ? `Showing templates recommended for ${userType}s. You can also browse all templates.`
                : 'Select a template that best represents your professional style.'}
            </p>
          </div>
          
          <TemplateGrid
            userType={userType}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
          />
          
          <div className="mt-12 flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push('/get-started')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              variant="accent"
              size="lg"
              disabled={!selectedTemplate}
              onClick={handleContinue}
            >
              Build Resume
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SelectTemplate;
