import { Sparkles, Layout, Download, Shield, Zap, Users } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI Enhancement',
    description: 'Get intelligent suggestions to improve your resume content and stand out from the crowd.',
  },
  {
    icon: Layout,
    title: '10+ Templates',
    description: 'Choose from professionally designed templates for every career stage and industry.',
  },
  {
    icon: Download,
    title: 'Easy Download',
    description: 'Download your resume as PDF in one click for just ₹10. No hidden fees.',
  },
  {
    icon: Shield,
    title: 'ATS Optimized',
    description: 'All templates are designed to pass Applicant Tracking Systems effortlessly.',
  },
  {
    icon: Zap,
    title: 'Quick Setup',
    description: 'Create a professional resume in under 10 minutes with our intuitive builder.',
  },
  {
    icon: Users,
    title: 'Role-Specific',
    description: 'Templates tailored for freshers, students, and experienced professionals.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Everything You Need to
            <span className="text-accent"> Land Your Dream Job</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our resume builder combines powerful AI with beautiful design to help you succeed.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
