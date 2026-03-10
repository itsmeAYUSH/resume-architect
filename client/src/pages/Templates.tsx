import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TemplateGrid from '@/components/templates/TemplateGrid';
import { useResumeStore } from '@/store/resumeStore';
import { Template } from '@/types/resume';
import { useNavigate } from 'react-router-dom';

const Templates = () => {
  const navigate = useNavigate();
  const { setSelectedTemplate } = useResumeStore();

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    navigate('/builder');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-16 md:py-24">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Resume Templates
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Browse our collection of professional resume templates designed for 
              every career stage and industry.
            </p>
          </div>
          
          <TemplateGrid
            onSelectTemplate={handleSelectTemplate}
            showFilters={true}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
