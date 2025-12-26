import { Template } from '@/types/resume';

export const templates: Template[] = [
  // Fresher/Student Templates
  {
    id: 'minimal-fresh',
    name: 'Minimal Fresh',
    description: 'Clean and simple design perfect for first-time job seekers',
    thumbnail: '/templates/minimal-fresh.png',
    category: ['fresher', 'student'],
    popular: true,
    colors: { primary: '#1a1a1a', secondary: '#f5f5f5', accent: '#2563eb' }
  },
  {
    id: 'academic-light',
    name: 'Academic Light',
    description: 'Elegant layout highlighting education and projects',
    thumbnail: '/templates/academic-light.png',
    category: ['student'],
    popular: true,
    colors: { primary: '#0f172a', secondary: '#f8fafc', accent: '#0d9488' }
  },
  {
    id: 'graduate-pro',
    name: 'Graduate Pro',
    description: 'Modern design for recent graduates entering the workforce',
    thumbnail: '/templates/graduate-pro.png',
    category: ['fresher', 'student'],
    popular: false,
    colors: { primary: '#18181b', secondary: '#fafafa', accent: '#7c3aed' }
  },
  {
    id: 'campus-starter',
    name: 'Campus Starter',
    description: 'Vibrant template showcasing internships and academics',
    thumbnail: '/templates/campus-starter.png',
    category: ['student'],
    popular: false,
    colors: { primary: '#1e293b', secondary: '#f1f5f9', accent: '#f59e0b' }
  },
  
  // Professional Templates
  {
    id: 'executive-classic',
    name: 'Executive Classic',
    description: 'Timeless professional design for senior positions',
    thumbnail: '/templates/executive-classic.png',
    category: ['professional'],
    popular: true,
    colors: { primary: '#0c0a09', secondary: '#fafaf9', accent: '#0369a1' }
  },
  {
    id: 'corporate-modern',
    name: 'Corporate Modern',
    description: 'Sleek and contemporary for corporate environments',
    thumbnail: '/templates/corporate-modern.png',
    category: ['professional'],
    popular: true,
    colors: { primary: '#171717', secondary: '#fafafa', accent: '#059669' }
  },
  {
    id: 'tech-innovator',
    name: 'Tech Innovator',
    description: 'Perfect for tech professionals and developers',
    thumbnail: '/templates/tech-innovator.png',
    category: ['professional', 'fresher'],
    popular: true,
    colors: { primary: '#020617', secondary: '#f8fafc', accent: '#8b5cf6' }
  },
  {
    id: 'creative-edge',
    name: 'Creative Edge',
    description: 'Bold design for creative industry professionals',
    thumbnail: '/templates/creative-edge.png',
    category: ['professional'],
    popular: false,
    colors: { primary: '#18181b', secondary: '#fafafa', accent: '#ec4899' }
  },
  {
    id: 'consultant-elite',
    name: 'Consultant Elite',
    description: 'Sophisticated layout for consultants and managers',
    thumbnail: '/templates/consultant-elite.png',
    category: ['professional'],
    popular: false,
    colors: { primary: '#0f172a', secondary: '#f8fafc', accent: '#0891b2' }
  },
  {
    id: 'industry-leader',
    name: 'Industry Leader',
    description: 'Premium design for C-suite and leadership roles',
    thumbnail: '/templates/industry-leader.png',
    category: ['professional'],
    popular: false,
    colors: { primary: '#1c1917', secondary: '#fafaf9', accent: '#b45309' }
  },
  
  // Universal Templates
  {
    id: 'clean-slate',
    name: 'Clean Slate',
    description: 'Versatile minimalist design for any career stage',
    thumbnail: '/templates/clean-slate.png',
    category: ['fresher', 'student', 'professional'],
    popular: true,
    colors: { primary: '#1f2937', secondary: '#f9fafb', accent: '#3b82f6' }
  },
  {
    id: 'two-column',
    name: 'Two Column',
    description: 'Efficient use of space with sidebar layout',
    thumbnail: '/templates/two-column.png',
    category: ['fresher', 'student', 'professional'],
    popular: true,
    colors: { primary: '#111827', secondary: '#f3f4f6', accent: '#10b981' }
  },
  {
    id: 'timeline-flow',
    name: 'Timeline Flow',
    description: 'Visual timeline-based career progression',
    thumbnail: '/templates/timeline-flow.png',
    category: ['professional', 'fresher'],
    popular: false,
    colors: { primary: '#0a0a0a', secondary: '#fafafa', accent: '#6366f1' }
  },
  {
    id: 'modern-serif',
    name: 'Modern Serif',
    description: 'Classic typography meets modern layout',
    thumbnail: '/templates/modern-serif.png',
    category: ['professional', 'student'],
    popular: false,
    colors: { primary: '#1a1a1a', secondary: '#fffbeb', accent: '#a16207' }
  },
];

export const getTemplatesByCategory = (category: string): Template[] => {
  if (category === 'all') return templates;
  return templates.filter(t => t.category.includes(category as any));
};

export const getPopularTemplates = (): Template[] => {
  return templates.filter(t => t.popular);
};

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find(t => t.id === id);
};
