import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const features = [
    'Access to all 14+ templates',
    'AI-powered content enhancement',
    'ATS-optimized formats',
    'Multiple resume versions',
    'Cover letter generator',
    'Instant PDF download',
    'Edit anytime before download',
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mb-12 text-lg text-muted-foreground">
              Create your resume for free. Pay only when you download.
            </p>
            
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card md:p-12">
              {/* Decorative element */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />
              
              <div className="relative">
                <div className="mb-8">
                  <div className="mb-2 flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold">₹10</span>
                    <span className="text-muted-foreground">/download</span>
                  </div>
                  <p className="text-muted-foreground">
                    One-time payment • No subscription • No hidden fees
                  </p>
                </div>
                
                <div className="mb-8 space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button variant="accent" size="xl" asChild className="w-full sm:w-auto">
                  <Link to="/get-started">Start Building Free</Link>
                </Button>
                
                <p className="mt-6 text-sm text-muted-foreground">
                  Secure payment powered by Razorpay
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
