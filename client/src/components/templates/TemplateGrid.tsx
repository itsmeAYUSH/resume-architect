import { useState } from 'react';
import { Template, UserType } from '@/types/resume';
import { templates, getTemplatesByCategory } from '@/data/templates';
import TemplateCard from './TemplateCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TemplateGridProps {
  userType?: UserType | null;
  selectedTemplate?: Template | null;
  onSelectTemplate: (template: Template) => void;
  showFilters?: boolean;
}

const TemplateGrid = ({ 
  userType, 
  selectedTemplate, 
  onSelectTemplate,
  showFilters = true 
}: TemplateGridProps) => {
  const [activeFilter, setActiveFilter] = useState<string>(userType || 'all');

  const filters = [
    { id: 'all', label: 'All Templates' },
    { id: 'fresher', label: 'Fresher' },
    { id: 'student', label: 'Student' },
    { id: 'professional', label: 'Professional' },
  ];

  const filteredTemplates = getTemplatesByCategory(activeFilter);

  return (
    <div>
      {showFilters && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "rounded-full",
                activeFilter === filter.id && "bg-primary"
              )}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      )}
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            selected={selectedTemplate?.id === template.id}
            onSelect={onSelectTemplate}
          />
        ))}
      </div>
      
      {filteredTemplates.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No templates found for this category.</p>
        </div>
      )}
    </div>
  );
};

export default TemplateGrid;
