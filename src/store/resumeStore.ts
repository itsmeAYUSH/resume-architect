import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, UserType, Template } from '@/types/resume';

interface ResumeStore {
  userType: UserType | null;
  selectedTemplate: Template | null;
  resumeData: ResumeData;
  currentStep: number;
  
  setUserType: (type: UserType) => void;
  setSelectedTemplate: (template: Template) => void;
  setResumeData: (data: Partial<ResumeData>) => void;
  setCurrentStep: (step: number) => void;
  resetStore: () => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    portfolio: '',
    summary: '',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
  languages: [],
  interests: [],
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      userType: null,
      selectedTemplate: null,
      resumeData: initialResumeData,
      currentStep: 0,
      
      setUserType: (type) => set({ userType: type }),
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      setResumeData: (data) => set((state) => ({ 
        resumeData: { ...state.resumeData, ...data } 
      })),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetStore: () => set({ 
        userType: null, 
        selectedTemplate: null, 
        resumeData: initialResumeData,
        currentStep: 0 
      }),
    }),
    {
      name: 'resume-storage',
    }
  )
);
