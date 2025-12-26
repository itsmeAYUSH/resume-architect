import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/store/resumeStore';
import { ArrowLeft, Download, CreditCard, FileText } from 'lucide-react';
import { toast } from 'sonner';

const Preview = () => {
  const navigate = useNavigate();
  const { resumeData, selectedTemplate } = useResumeStore();

  const handlePayAndDownload = () => {
    toast.info('Payment integration requires backend setup. Connect to Lovable Cloud to enable Razorpay payments.');
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-secondary/30">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="outline" onClick={() => navigate('/builder')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Button>
            <div className="flex gap-2">
              <Button variant="accent" onClick={handlePayAndDownload}>
                <CreditCard className="mr-2 h-4 w-4" />
                Pay ₹10 & Download PDF
              </Button>
            </div>
          </div>

          <div className="mx-auto max-w-4xl">
            {/* Resume Preview */}
            <div className="overflow-hidden rounded-lg bg-card shadow-elevated">
              <div className="aspect-[8.5/11] p-8 md:p-12" style={{ 
                backgroundColor: selectedTemplate?.colors.secondary || '#ffffff' 
              }}>
                {/* Header */}
                <div className="mb-6 border-b-2 pb-4" style={{ 
                  borderColor: selectedTemplate?.colors.accent || '#0d9488' 
                }}>
                  <h1 className="mb-2 text-3xl font-bold" style={{ 
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
