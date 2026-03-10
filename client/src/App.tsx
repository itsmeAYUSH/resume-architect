import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Eager load critical path
import Index from './pages/Index';

// Lazy load all app pages for code splitting
const GetStarted = lazy(() => import('./pages/GetStarted'));
const SelectTemplate = lazy(() => import('./pages/SelectTemplate'));
const Templates = lazy(() => import('./pages/Templates'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Builder = lazy(() => import('./pages/Builder'));
const Preview = lazy(() => import('./pages/Preview'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ImportProfile = lazy(() => import('./pages/ImportProfile'));
const NotFound = lazy(() => import('./pages/NotFound'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-accent" />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner richColors position="top-right" />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Marketing */}
            <Route path="/" element={<Index />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/pricing" element={<Pricing />} />

            {/* App flow */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/select-template" element={<SelectTemplate />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/import" element={<ImportProfile />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
