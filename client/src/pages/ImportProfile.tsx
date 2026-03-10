'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileJson, Github, Linkedin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import {
  importFromJSONFile,
  importFromGitHub,
  importFromLinkedIn,
} from '@/utils/importUtils';
import { toast } from 'sonner';

type ImportSource = 'json' | 'github' | 'linkedin' | null;

export default function ImportProfile() {
  const router = useRouter();
  const { importData } = useResumeStore();
  const [activeSource, setActiveSource] = useState<ImportSource>(null);
  const [githubUsername, setGithubUsername] = useState('');
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleJSONUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    const data = await importFromJSONFile(file);
    if (data) {
      importData(data);
      setImported(true);
      toast.success('Profile imported successfully!');
    }
    setImporting(false);
    e.target.value = '';
  };

  const handleGitHubImport = async () => {
    if (!githubUsername.trim()) {
      toast.error('Please enter a GitHub username.');
      return;
    }
    setImporting(true);
    const data = await importFromGitHub(githubUsername.trim());
    if (data) {
      importData(data);
      setImported(true);
    }
    setImporting(false);
  };

  const handleLinkedInImport = async () => {
    setImporting(true);
    const data = await importFromLinkedIn();
    if (data) {
      importData(data);
      setImported(true);
    }
    setImporting(false);
  };

  const sources = [
    { id: 'json', icon: FileJson, label: 'Upload JSON', desc: 'Import a previously exported resume JSON file' },
    { id: 'github', icon: Github, label: 'GitHub Profile', desc: 'Auto-fill from your GitHub username and repos' },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', desc: 'Import your professional profile (requires auth)' },
  ] as const;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container py-16 md:py-24">
          <div className="mx-auto max-w-2xl">
            <div className="mb-10 text-center">
              <h1 className="mb-3 text-3xl font-bold tracking-tight">Import Your Profile</h1>
              <p className="text-lg text-muted-foreground">
                Start faster by importing your existing profile data.
              </p>
            </div>

            {/* Source selection */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              {sources.map(({ id, icon: Icon, label, desc }) => (
                <Card
                  key={id}
                  className={`cursor-pointer border-2 p-4 transition-all ${
                    activeSource === id
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50'
                  }`}
                  onClick={() => setActiveSource(activeSource === id ? null : id)}
                >
                  <Icon className="mb-2 h-6 w-6 text-accent" />
                  <h3 className="font-semibold text-sm">{label}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                </Card>
              ))}
            </div>

            {/* Action panels */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              {!activeSource && (
                <p className="text-center text-muted-foreground">
                  Select an import method above to get started.
                </p>
              )}

              {activeSource === 'json' && (
                <div className="space-y-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleJSONUpload}
                    disabled={importing}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={importing}
                    className="w-full"
                  >
                    {importing ? 'Importing...' : 'Choose JSON File'}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Upload a previously exported resume JSON file to restore all your data.
                  </p>
                </div>
              )}

              {activeSource === 'github' && (
                <div className="space-y-4">
                  <Input
                    placeholder="Enter GitHub username"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    disabled={importing}
                  />
                  <Button
                    onClick={handleGitHubImport}
                    disabled={importing || !githubUsername.trim()}
                    className="w-full"
                  >
                    {importing ? 'Importing...' : 'Import from GitHub'}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    We'll fetch your public repositories and create project entries automatically.
                  </p>
                </div>
              )}

              {activeSource === 'linkedin' && (
                <div className="space-y-4">
                  <Button
                    onClick={handleLinkedInImport}
                    disabled={importing}
                    className="w-full"
                  >
                    {importing ? 'Connecting...' : 'Connect LinkedIn'}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    You'll be redirected to LinkedIn to authorize the import securely.
                  </p>
                </div>
              )}
            </div>

            {/* Success state */}
            {imported && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 dark:bg-green-950 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900">Profile imported!</h3>
                    <p className="mt-1 text-sm text-green-800">
                      Your profile data has been imported. Review and complete your details in the builder.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => router.push('/builder')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Go to Builder
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setImported(false);
                          setActiveSource(null);
                        }}
                      >
                        Import More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!imported && (
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>
                  New to Resume Architect?{' '}
                  <button
                    onClick={() => router.push('/get-started')}
                    className="font-semibold text-accent hover:underline"
                  >
                    Create a new resume
                  </button>
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
