import { UserType } from '@/types/resume';
import { cn } from '@/lib/utils';
import { GraduationCap, Briefcase, BookOpen, Check } from 'lucide-react';

interface UserTypeCardProps {
  type: UserType;
  selected: boolean;
  onSelect: (type: UserType) => void;
}

const typeConfig = {
  fresher: {
    icon: GraduationCap,
    title: 'Fresher',
    description: 'Recently graduated and looking for your first job opportunity',
    features: ['Entry-level templates', 'Focus on education & projects', 'Skills-first layout'],
  },
  student: {
    icon: BookOpen,
    title: 'Student',
    description: 'Currently studying and seeking internships or part-time roles',
    features: ['Academic-focused designs', 'Internship highlights', 'Coursework sections'],
  },
  professional: {
    icon: Briefcase,
    title: 'Professional',
    description: 'Experienced professional looking for the next career move',
    features: ['Executive templates', 'Achievement-focused', 'Career progression layout'],
  },
};

const UserTypeCard = ({ type, selected, onSelect }: UserTypeCardProps) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <button
      onClick={() => onSelect(type)}
      className={cn(
        "relative w-full rounded-xl border bg-card p-6 text-left transition-all duration-300",
        selected 
          ? "border-accent ring-2 ring-accent ring-offset-2 ring-offset-background shadow-card-hover" 
          : "border-border hover:border-accent/50 hover:shadow-card"
      )}
    >
      {/* Selected indicator */}
      {selected && (
        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-accent">
          <Check className="h-4 w-4 text-accent-foreground" />
        </div>
      )}
      
      {/* Icon */}
      <div className={cn(
        "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
        selected ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
      )}>
        <Icon className="h-6 w-6" />
      </div>
      
      {/* Content */}
      <h3 className="mb-2 text-xl font-semibold">{config.title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{config.description}</p>
      
      {/* Features */}
      <ul className="space-y-2">
        {config.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            <Check className={cn(
              "h-4 w-4",
              selected ? "text-accent" : "text-muted-foreground"
            )} />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </button>
  );
};

export default UserTypeCard;
