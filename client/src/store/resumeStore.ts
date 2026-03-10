import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, UserType, Template } from '@/types/resume';

export interface ResumeVersion {
  id: string;
  resumeData: ResumeData;
  createdAt: number;
  label?: string;
}

interface ResumeStore {
  userType: UserType | null;
  selectedTemplate: Template | null;
  resumeData: ResumeData;
  currentStep: number;
  versions: ResumeVersion[];
  lastSaved: number | null;
  isDirty: boolean;

  setUserType: (type: UserType) => void;
  setSelectedTemplate: (template: Template) => void;
  setResumeData: (data: Partial<ResumeData>) => void;
  setCurrentStep: (step: number) => void;
  saveVersion: (label?: string) => void;
  restoreVersion: (id: string) => void;
  importData: (data: Partial<ResumeData>) => void;
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

const MAX_VERSIONS = 20;

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      userType: null,
      selectedTemplate: null,
      resumeData: initialResumeData,
      currentStep: 0,
      versions: [],
      lastSaved: null,
      isDirty: false,

      setUserType: (type) => set({ userType: type }),
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      setResumeData: (data) =>
        set((state) => ({
          resumeData: { ...state.resumeData, ...data },
          isDirty: true,
        })),
      setCurrentStep: (step) => set({ currentStep: step }),

      saveVersion: (label) =>
        set((state) => {
          const versions = [
            {
              id: `v_${Date.now()}`,
              resumeData: { ...state.resumeData },
              createdAt: Date.now(),
              label: label ?? `Saved ${new Date().toLocaleString()}`,
            },
            ...state.versions,
          ].slice(0, MAX_VERSIONS);
          return {
            versions,
            lastSaved: Date.now(),
            isDirty: false,
          };
        }),

      restoreVersion: (id) => {
        const state = get();
        const version = state.versions.find((v) => v.id === id);
        if (version) {
          set({ resumeData: { ...version.resumeData }, isDirty: false });
        }
      },

      importData: (data) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            ...data,
            personalInfo: { ...state.resumeData.personalInfo, ...(data.personalInfo ?? {}) },
            education: data.education ?? state.resumeData.education,
            experience: data.experience ?? state.resumeData.experience,
            projects: data.projects ?? state.resumeData.projects,
            skills: data.skills ?? state.resumeData.skills,
            certifications: data.certifications ?? state.resumeData.certifications,
            languages: data.languages ?? state.resumeData.languages,
            interests: data.interests ?? state.resumeData.interests,
          },
          isDirty: true,
        })),

      resetStore: () =>
        set({
          userType: null,
          selectedTemplate: null,
          resumeData: initialResumeData,
          currentStep: 0,
          versions: [],
          lastSaved: null,
          isDirty: false,
        }),
    }),
    {
      name: 'resume-storage',
      partialize: (state) => ({
        userType: state.userType,
        selectedTemplate: state.selectedTemplate,
        resumeData: state.resumeData,
        currentStep: state.currentStep,
        versions: state.versions,
        lastSaved: state.lastSaved,
      }),
    }
  )
);
