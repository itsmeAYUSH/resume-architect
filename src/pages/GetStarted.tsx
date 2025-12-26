import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import UserTypeCard from '@/components/usertype/UserTypeCard';
import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/store/resumeStore';
import { UserType } from '@/types/resume';
import { ArrowRight } from 'lucide-react';

const GetStarted = () => {
  const navigate = useNavigate();
  const { userType, setUserType } = useResumeStore();
  const [selected, setSelected] = useState<UserType | null>(userType);

  const handleSelect = (type: UserType) => {
    setSelected(type);
    setUserType(type);
  };

  const handleContinue = () => {
    if (selected) {
      navigate('/select-template');
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-16 md:py-24">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Tell Us About Yourself
              </h1>
              <p className="text-lg text-muted-foreground">
                Select your career stage so we can recommend the best templates for you.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {(['fresher', 'student', 'professional'] as UserType[]).map((type) => (
                <UserTypeCard
                  key={type}
                  type={type}
                  selected={selected === type}
                  onSelect={handleSelect}
                />
              ))}
            </div>
            
            <div className="mt-12 flex justify-center">
              <Button
                variant="accent"
                size="xl"
                disabled={!selected}
                onClick={handleContinue}
              >
                Continue to Templates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GetStarted;
