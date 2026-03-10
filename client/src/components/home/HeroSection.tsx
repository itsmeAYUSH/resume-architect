import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const HeroSection = () => {
  const features = [
    'AI-powered content suggestions',
    '10+ professional templates',
    'ATS-friendly formats',
  ];

  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      
      <div className="container relative py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-4 py-2 text-sm backdrop-blur-sm animate-fade-in">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">AI-Powered Resume Builder</span>
          </div>
          
          {/* Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl animate-slide-up">
            Build Your Perfect Resume
            <span className="block text-accent">in Minutes</span>
          </h1>
          
          {/* Subtitle */}
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl animate-slide-up animation-delay-100">
            Create professional, ATS-optimized resumes with AI assistance. 
            Choose from beautiful templates designed for freshers, students, and professionals.
          </p>
          
          {/* Features list */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-4 animate-slide-up animation-delay-200">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up animation-delay-300">
            <Button variant="hero" asChild>
              <Link href="/get-started">
                Create Your Resume
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" asChild>
              <Link href="/templates">Browse Templates</Link>
            </Button>
          </div>
          
          {/* Social proof */}
          <p className="mt-8 text-sm text-muted-foreground animate-fade-in animation-delay-400">
            Join 10,000+ professionals who landed their dream jobs
          </p>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
