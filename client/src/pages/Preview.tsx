'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, FileJson, FileText, History } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import { exportAsPDF, exportAsJSON, exportAsDOCX } from '@/utils/exportUtils';
import ResumeRenderer from '@/components/templates/ResumeRenderer';
import { toast } from 'sonner';

export default function Preview() {
  const router = useRouter();
  const { resumeData, selectedTemplate, versions, restoreVersion } = useResumeStore();
  const [showVersions, setShowVersions] = useState(false);

  const handlePDFExport = async () => {
    toast.loading('Preparing PDF export…');
    await exportAsPDF('resume-preview-root');
    toast.dismiss();
  };

  const handleJSONExport = () => {
    const name = resumeData.personalInfo.fullName || 'resume';
    exportAsJSON(resumeData, name.replace(/\s+/g, '_').toLowerCase());
  };

  const handleDOCXExport = async () => {
    toast.loading('Preparing DOCX export…');
    const name = resumeData.personalInfo.fullName || 'resume';
    await exportAsDOCX(resumeData, name.replace(/\s+/g, '_').toLowerCase());
    toast.dismiss();
  };

  return (
    <div className="flex min-h-screen flex-col bg-secondary/30">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          {/* Top bar */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="outline" onClick={() => router.push('/builder')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Button>

            <div className="flex flex-wrap gap-2">
              {/* Version history */}
              {versions.length > 0 && (
                <Button variant="outline" size="sm" onClick={() => setShowVersions(!showVersions)}>
                  <History className="mr-2 h-4 w-4" />
                  History ({versions.length})
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleJSONExport}>
                <FileJson className="mr-2 h-4 w-4" />
                Export JSON
              </Button>
              <Button variant="outline" size="sm" onClick={handleDOCXExport}>
                <FileText className="mr-2 h-4 w-4" />
                Export DOCX
              </Button>
              <Button variant="accent" onClick={handlePDFExport}>
                <Printer className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="mx-auto flex max-w-5xl gap-6">
            {/* Version history sidebar */}
            {showVersions && (
              <div className="w-64 shrink-0">
                <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                  <h3 className="mb-4 font-semibold text-sm">Version History</h3>
                  <div className="space-y-2">
                    {versions.map((v) => (
                      <div
                        key={v.id}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-2 hover:bg-gray-50"
                      >
                        <div className="flex-1">
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
              </div>
            )}

            {/* Resume preview - A4 aspect ratio */}
            <div className="flex-1">
              <div className="overflow-hidden rounded-xl shadow-2xl border border-border">
                <div id="resume-preview-root" className="relative w-full" style={{ paddingTop: `${(1056 / 816) * 100}%` }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                    <ResumeRenderer data={resumeData} template={selectedTemplate} />
                  </div>
                </div>
              </div>

              {/* Export info */}
              <div className="mt-4 rounded-xl border border-border bg-card p-4 text-center shadow-sm">
                <p className="text-sm text-muted-foreground">
                  📄 PDF Export uses your browser's print dialog ·
                  📋 DOCX is editable in Microsoft Word ·
                  🔄 JSON exports are fully importable
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
