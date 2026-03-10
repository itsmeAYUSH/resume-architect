import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-primary p-8 md:p-16">
          {/* Decorative elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
              Ready to Build Your Career?
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/80">
              Join thousands of job seekers who have landed their dream jobs with our AI-powered resume builder.
            </p>
            <Button
              variant="accent"
              size="xl"
              asChild
              className="shadow-xl"
            >
              <Link href="/get-started">
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="mt-6 text-sm text-primary-foreground/60">
              No credit card required • Pay only when you download
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
