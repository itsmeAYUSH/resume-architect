'use client';

import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Download, Trash2, History } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import { calculateATSScore } from '@/utils/atsScore';
import ATSScorePanel from '@/components/builder/ATSScorePanel';
import ResumeRenderer from '@/components/templates/ResumeRenderer';
import { toast } from 'sonner';

export default function Dashboard() {
  const router = useRouter();
  const {
    resumeData,
    selectedTemplate,
    versions,
    isDirty,
    lastSaved,
    resetStore,
    restoreVersion,
  } = useResumeStore();

  const hasContent = !!(
    resumeData.personalInfo.fullName ||
    resumeData.experience.length ||
    resumeData.education.length
  );

  const atsScore = useMemo(() => calculateATSScore(resumeData), [resumeData]);

  const handleReset = () => {
    if (confirm('Are you sure? This will delete all your current resume data.')) {
      resetStore();
      toast.success('Resume cleared. Start fresh!');
    }
  };

  const completionPct = useMemo(() => {
    const checks = [
      resumeData.personalInfo.fullName,
      resumeData.personalInfo.email,
      resumeData.personalInfo.phone,
      resumeData.personalInfo.summary,
      resumeData.education.length > 0,
      resumeData.experience.length > 0 || resumeData.projects.length > 0,
      resumeData.skills.length > 0,
      selectedTemplate,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [resumeData, selectedTemplate]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-10">
          {/* Welcome header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {resumeData.personalInfo.fullName
                  ? `Welcome back, ${resumeData.personalInfo.fullName.split(' ')[0]}!`
                  : 'Your Dashboard'}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {lastSaved
                  ? `Last saved ${new Date(lastSaved).toLocaleString()}`
                  : 'No saves yet — your work is stored locally'}
                {isDirty && ' • Unsaved changes'}
              </p>
            </div>
            <div className="flex gap-2">
              {!hasContent && (
                <Button onClick={() => router.push('/get-started')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Resume
                </Button>
              )}
              {hasContent && (
                <>
                  <Button variant="outline" onClick={() => router.push('/builder')}>
                    Edit Resume
                  </Button>
                  <Button onClick={() => router.push('/preview')}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </>
              )}
            </div>
          </div>

          {!hasContent ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card py-20 text-center">
              <FileText className="mb-4 h-12 w-12 text-muted-foreground opacity-30" />
              <h2 className="mb-2 text-xl font-semibold">No resume yet</h2>
              <p className="mb-6 max-w-sm text-muted-foreground">
                Create a new resume or import an existing profile to get started.
              </p>
              <div className="flex gap-3">
                <Button onClick={() => router.push('/get-started')}>Create New</Button>
                <Button variant="outline" onClick={() => router.push('/import')}>
                  Import Profile
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              {/* Left: preview + actions */}
              <div className="flex flex-col gap-6">
                {/* Completion Progress */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium">Profile Completion</span>
                    <span className="font-bold">{completionPct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full bg-accent transition-all"
                      style={{ width: `${completionPct}%` }}
                    />
                  </div>
                </div>

                {/* Preview */}
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <h3 className="mb-3 font-semibold">Preview</h3>
                  <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <div style={{ width: '100%', paddingTop: `${(1056 / 816) * 100}%`, position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '816px', height: '1056px', transform: 'scale(0.3)', transformOrigin: 'top left' }}>
                        <ResumeRenderer data={resumeData} template={selectedTemplate} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: ATS score + versions */}
              <div className="flex flex-col gap-4">
                <ATSScorePanel score={atsScore} />

                {/* Version History */}
                {versions.length > 0 && (
                  <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                    <h3 className="mb-3 flex items-center gap-2 font-semibold text-sm">
                      <History className="h-4 w-4" />
                      Version History
                    </h3>
                    <div className="space-y-2">
                      {versions.slice(0, 5).map((v) => (
                        <div key={v.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-2">
                          <div>
                            <p className="text-xs font-medium">{v.label}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(v.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              restoreVersion(v.id);
                              toast.success('Version restored');
                            }}
                          >
                            Restore
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/templates')}
                    className="w-full"
                  >
                    Change Template
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/import')}
                    className="w-full"
                  >
                    Import Data
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleReset}
                    className="w-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
