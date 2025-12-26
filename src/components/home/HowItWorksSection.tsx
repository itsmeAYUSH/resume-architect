import { UserCheck, FileEdit, Sparkles, Download } from 'lucide-react';

const steps = [
  {
    icon: UserCheck,
    step: '01',
    title: 'Select Your Profile',
    description: 'Tell us if you are a fresher, student, or experienced professional.',
  },
  {
    icon: FileEdit,
    step: '02',
    title: 'Choose a Template',
    description: 'Pick from 10+ templates designed specifically for your career stage.',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'Fill & Enhance',
    description: 'Enter your details and let AI improve your content automatically.',
  },
  {
    icon: Download,
    step: '04',
    title: 'Download & Apply',
    description: 'Pay ₹10 and download your professional resume instantly.',
  },
];

const HowItWorksSection = () => {
  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Create your perfect resume in four simple steps
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <div key={index} className="relative text-center">
                {/* Step number circle */}
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-accent/10" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-md">
                    <item.icon className="h-7 w-7 text-accent" />
                  </div>
                  <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {item.step}
                  </span>
                </div>
                
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
