import { Template } from '@/types/resume';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  template: Template;
  selected?: boolean;
  onSelect: (template: Template) => void;
  onPreview?: (template: Template) => void;
}

const TemplateCard = ({ template, selected, onSelect, onPreview }: TemplateCardProps) => {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card transition-all duration-300",
        selected 
          ? "border-accent ring-2 ring-accent ring-offset-2 ring-offset-background" 
          : "border-border hover:border-accent/50 hover:shadow-card-hover"
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        {/* Placeholder template preview */}
        <div 
          className="flex h-full w-full items-center justify-center p-4"
          style={{ 
            background: `linear-gradient(135deg, ${template.colors.secondary} 0%, ${template.colors.primary}10 100%)` 
          }}
        >
          <div className="w-full space-y-3 rounded-lg bg-background/90 p-4 shadow-sm">
            <div 
              className="h-3 w-2/3 rounded"
              style={{ backgroundColor: template.colors.primary }}
            />
            <div className="h-2 w-full rounded bg-muted" />
            <div className="h-2 w-4/5 rounded bg-muted" />
            <div className="mt-4 h-2 w-1/2 rounded bg-muted" />
            <div className="h-2 w-full rounded bg-muted" />
            <div className="h-2 w-3/4 rounded bg-muted" />
            <div 
              className="mt-4 h-2 w-1/3 rounded"
              style={{ backgroundColor: template.colors.accent }}
            />
          </div>
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-primary/80 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onPreview?.(template);
            }}
          >
            <Eye className="mr-1 h-4 w-4" />
            Preview
          </Button>
          <Button
            variant="accent"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template);
            }}
          >
            {selected ? (
              <>
                <Check className="mr-1 h-4 w-4" />
                Selected
              </>
            ) : (
              'Use Template'
            )}
          </Button>
        </div>
        
        {/* Popular badge */}
        {template.popular && (
          <Badge 
            className="absolute left-3 top-3 bg-accent text-accent-foreground"
          >
            Popular
          </Badge>
        )}
        
        {/* Selected indicator */}
        {selected && (
          <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-accent">
            <Check className="h-4 w-4 text-accent-foreground" />
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold">{template.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {template.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1">
          {template.category.map((cat) => (
            <span 
              key={cat}
              className="rounded-full bg-secondary px-2 py-0.5 text-xs capitalize text-secondary-foreground"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
