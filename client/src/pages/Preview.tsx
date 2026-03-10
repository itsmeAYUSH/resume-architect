import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Printer, FileJson, FileText, History } from 'lucide-react';
import { useResumeStore } from '@/store/resumeStore';
import { exportAsPDF, exportAsJSON, exportAsDOCX } from '@/utils/exportUtils';
import ResumeRenderer from '@/components/templates/ResumeRenderer';
import { toast } from 'sonner';

export default function Preview() {
  const navigate = useNavigate();
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
            <Button variant="outline" onClick={() => navigate('/builder')}>
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
                    color: selectedTemplate?.colors.primary || '#1a1a1a' 
                  }}>
                    {resumeData.personalInfo.fullName || 'Your Name'}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {resumeData.personalInfo.email && (
                      <span>{resumeData.personalInfo.email}</span>
                    )}
                    {resumeData.personalInfo.phone && (
                      <span>{resumeData.personalInfo.phone}</span>
                    )}
                    {resumeData.personalInfo.location && (
                      <span>{resumeData.personalInfo.location}</span>
                    )}
                  </div>
                  {(resumeData.personalInfo.linkedIn || resumeData.personalInfo.portfolio) && (
                    <div className="mt-2 flex gap-4 text-sm">
                      {resumeData.personalInfo.linkedIn && (
                        <span style={{ color: selectedTemplate?.colors.accent }}>
                          {resumeData.personalInfo.linkedIn}
                        </span>
                      )}
                      {resumeData.personalInfo.portfolio && (
                        <span style={{ color: selectedTemplate?.colors.accent }}>
                          {resumeData.personalInfo.portfolio}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Summary */}
                {resumeData.personalInfo.summary && (
                  <div className="mb-6">
                    <h2 className="mb-2 text-lg font-semibold" style={{ 
                      color: selectedTemplate?.colors.primary 
                    }}>
                      Professional Summary
                    </h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {resumeData.personalInfo.summary}
                    </p>
                  </div>
                )}

                {/* Experience */}
                {resumeData.experience.length > 0 && (
                  <div className="mb-6">
                    <h2 className="mb-3 text-lg font-semibold" style={{ 
                      color: selectedTemplate?.colors.primary 
                    }}>
                      Experience
                    </h2>
                    <div className="space-y-4">
                      {resumeData.experience.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{exp.position}</h3>
                              <p className="text-sm" style={{ color: selectedTemplate?.colors.accent }}>
                                {exp.company}
                              </p>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                            </span>
                          </div>
                          {exp.description && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Education */}
                {resumeData.education.length > 0 && (
                  <div className="mb-6">
                    <h2 className="mb-3 text-lg font-semibold" style={{ 
                      color: selectedTemplate?.colors.primary 
                    }}>
                      Education
                    </h2>
                    <div className="space-y-3">
                      {resumeData.education.map((edu) => (
                        <div key={edu.id}>
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
                              <p className="text-sm" style={{ color: selectedTemplate?.colors.accent }}>
                                {edu.institution}
                              </p>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                            </span>
                          </div>
                          {edu.gpa && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              GPA: {edu.gpa}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Projects */}
                {resumeData.projects.length > 0 && (
                  <div className="mb-6">
                    <h2 className="mb-3 text-lg font-semibold" style={{ 
                      color: selectedTemplate?.colors.primary 
                    }}>
                      Projects
                    </h2>
                    <div className="space-y-3">
                      {resumeData.projects.map((proj) => (
                        <div key={proj.id}>
                          <h3 className="font-medium">{proj.name}</h3>
                          {proj.technologies.length > 0 && (
                            <p className="text-sm" style={{ color: selectedTemplate?.colors.accent }}>
                              {proj.technologies.join(' • ')}
                            </p>
                          )}
                          {proj.description && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              {proj.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills */}
                {resumeData.skills.length > 0 && (
                  <div>
                    <h2 className="mb-3 text-lg font-semibold" style={{ 
                      color: selectedTemplate?.colors.primary 
                    }}>
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill) => (
                        <span
                          key={skill.id}
                          className="rounded-full px-3 py-1 text-sm"
                          style={{ 
                            backgroundColor: `${selectedTemplate?.colors.accent}15`,
                            color: selectedTemplate?.colors.primary
                          }}
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty state */}
                {!resumeData.personalInfo.fullName && 
                 resumeData.education.length === 0 && 
                 resumeData.experience.length === 0 && (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <FileText className="mx-auto mb-4 h-16 w-16 opacity-20" />
                      <p>Start filling your resume to see the preview</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Info */}
            <div className="mt-8 rounded-lg border border-border bg-card p-6 text-center">
              <h3 className="mb-2 text-lg font-semibold">Ready to Download?</h3>
              <p className="mb-4 text-muted-foreground">
                Download your resume and cover letter as PDF for just ₹10
              </p>
              <Button variant="accent" size="lg" onClick={handlePayAndDownload}>
                <CreditCard className="mr-2 h-5 w-5" />
                Pay ₹10 with Razorpay
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Secure payment • Instant download • Edit anytime
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Preview;
