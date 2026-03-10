'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useResumeStore } from '@/store/resumeStore';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  FolderKanban, 
  Award,
  Sparkles,
  Download,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Education, Experience, Project, Skill } from '@/types/resume';
import { toast } from 'sonner';

const steps = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'skills', label: 'Skills', icon: Award },
];

const Builder = () => {
  const router = useRouter();
  const { resumeData, setResumeData, selectedTemplate, userType } = useResumeStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData({
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    };
    setResumeData({
      education: [...resumeData.education, newEducation],
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData({
      education: resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    setResumeData({
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
    };
    setResumeData({
      experience: [...resumeData.experience, newExperience],
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setResumeData({
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    setResumeData({
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
  };

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
    };
    setResumeData({
      projects: [...resumeData.projects, newProject],
    });
  };

  const updateProject = (id: string, field: string, value: any) => {
    setResumeData({
      projects: resumeData.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    });
  };

  const removeProject = (id: string) => {
    setResumeData({
      projects: resumeData.projects.filter((proj) => proj.id !== id),
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      level: 'intermediate',
      category: 'Technical',
    };
    setResumeData({
      skills: [...resumeData.skills, newSkill],
    });
  };

  const updateSkill = (id: string, field: string, value: any) => {
    setResumeData({
      skills: resumeData.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    });
  };

  const removeSkill = (id: string) => {
    setResumeData({
      skills: resumeData.skills.filter((skill) => skill.id !== id),
    });
  };

  const handleEnhanceWithAI = () => {
    toast.info('AI enhancement requires backend integration to enable this feature.');
  };

  const handleDownload = () => {
    router.push('/preview');
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  placeholder="+91 98765 43210"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Mumbai, India"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedIn">LinkedIn</Label>
                <Input
                  id="linkedIn"
                  placeholder="linkedin.com/in/johndoe"
                  value={resumeData.personalInfo.linkedIn}
                  onChange={(e) => handlePersonalInfoChange('linkedIn', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio/Website</Label>
                <Input
                  id="portfolio"
                  placeholder="johndoe.dev"
                  value={resumeData.personalInfo.portfolio}
                  onChange={(e) => handlePersonalInfoChange('portfolio', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                placeholder="Write a brief summary of your professional background and career objectives..."
                rows={4}
                value={resumeData.personalInfo.summary}
                onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
              />
              <Button variant="outline" size="sm" className="mt-2" onClick={handleEnhanceWithAI}>
                <Sparkles className="mr-2 h-4 w-4 text-accent" />
                Enhance with AI
              </Button>
            </div>
          </div>
        );
      
      case 'education':
        return (
          <div className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="relative rounded-lg border border-border p-4">
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="absolute right-2 top-2 rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Institution *</Label>
                    <Input
                      placeholder="University Name"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree *</Label>
                    <Input
                      placeholder="Bachelor of Technology"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Field of Study</Label>
                    <Input
                      placeholder="Computer Science"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GPA/Percentage</Label>
                    <Input
                      placeholder="8.5 CGPA"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addEducation}>
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </div>
        );
      
      case 'experience':
        return (
          <div className="space-y-6">
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="relative rounded-lg border border-border p-4">
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="absolute right-2 top-2 rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Company *</Label>
                    <Input
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Position *</Label>
                    <Input
                      placeholder="Software Engineer"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      placeholder="Mumbai, India"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                    />
                  </div>
                  <div className="flex items-end gap-4">
                    <div className="flex-1 space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="month"
                        value={exp.endDate}
                        disabled={exp.current}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe your responsibilities and achievements..."
                    rows={3}
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  />
                  <Button variant="outline" size="sm" onClick={handleEnhanceWithAI}>
                    <Sparkles className="mr-2 h-4 w-4 text-accent" />
                    Enhance with AI
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addExperience}>
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
            {userType === 'fresher' || userType === 'student' ? (
              <p className="text-sm text-muted-foreground">
                No work experience? That's okay! You can skip this section and focus on projects and skills.
              </p>
            ) : null}
          </div>
        );
      
      case 'projects':
        return (
          <div className="space-y-6">
            {resumeData.projects.map((proj) => (
              <div key={proj.id} className="relative rounded-lg border border-border p-4">
                <button
                  onClick={() => removeProject(proj.id)}
                  className="absolute right-2 top-2 rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Project Name *</Label>
                    <Input
                      placeholder="E-commerce Platform"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Technologies</Label>
                    <Input
                      placeholder="React, Node.js, MongoDB"
                      value={proj.technologies.join(', ')}
                      onChange={(e) => updateProject(proj.id, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe what the project does and your role in it..."
                    rows={3}
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                  />
                  <Button variant="outline" size="sm" onClick={handleEnhanceWithAI}>
                    <Sparkles className="mr-2 h-4 w-4 text-accent" />
                    Enhance with AI
                  </Button>
                </div>
                <div className="mt-4 space-y-2">
                  <Label>Project Link (Optional)</Label>
                  <Input
                    placeholder="https://github.com/username/project"
                    value={proj.link}
                    onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addProject}>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
        );
      
      case 'skills':
        return (
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resumeData.skills.map((skill) => (
                <div key={skill.id} className="relative rounded-lg border border-border p-4">
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="absolute right-2 top-2 rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="space-y-3">
                    <Input
                      placeholder="Skill name"
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                    />
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={addSkill}>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          {/* Progress Steps */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex min-w-max justify-center gap-2">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    index === currentStep
                      ? "bg-primary text-primary-foreground"
                      : index < currentStep
                      ? "bg-accent/10 text-accent"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  <step.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mx-auto max-w-4xl">
            {/* Step Content */}
            <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8">
              <h2 className="mb-6 text-xl font-semibold">
                {steps[currentStep].label}
              </h2>
              {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => router.push('/preview')}>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                
                {currentStep < steps.length - 1 ? (
                  <Button variant="accent" onClick={handleNext}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="accent" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Preview & Download
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Builder;
