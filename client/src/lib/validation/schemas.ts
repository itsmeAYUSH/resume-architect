import { z } from 'zod';
import { sanitizeString } from '@/lib/security';
import type { ResumeData } from '@/types/resume';

// ─── Helper Refinements ──────────────────────────────────────────────────────

const sanitizedString = (maxLength: number) =>
  z.string().transform(sanitizeString).max(maxLength);

const optionalUrl = z
  .string()
  .url('Invalid URL')
  .optional()
  .or(z.literal(''));

const dateField = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$|^$/, 'Invalid date format (YYYY-MM-DD)')
  .optional()
  .or(z.literal(''));

// ─── Individual Section Schemas ──────────────────────────────────────────────

export const personalInfoSchema = z.object({
  fullName: sanitizedString(120).min(1, 'Full name is required'),
  title: sanitizedString(120),
  email: z.string().email('Invalid email address').max(254),
  phone: z
    .string()
    .max(20)
    .regex(/^[+\d\s\-().]*$/, 'Invalid phone number'),
  location: sanitizedString(120),
  linkedIn: optionalUrl,
  github: optionalUrl,
  portfolio: optionalUrl,
  summary: sanitizedString(2000),
});

export const educationSchema = z.object({
  id: z.string(),
  institution: sanitizedString(200).min(1, 'Institution name required'),
  degree: sanitizedString(200).min(1, 'Degree required'),
  field: sanitizedString(200),
  startDate: dateField,
  endDate: dateField,
  current: z.boolean().optional(),
  gpa: sanitizedString(20).optional(),
  achievements: sanitizedString(1000).optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  company: sanitizedString(200).min(1, 'Company name required'),
  position: sanitizedString(200).min(1, 'Position required'),
  location: sanitizedString(120),
  startDate: dateField,
  endDate: dateField,
  current: z.boolean(),
  description: sanitizedString(3000),
  achievements: z.array(sanitizedString(500)).max(10),
});

export const projectSchema = z.object({
  id: z.string(),
  name: sanitizedString(200).min(1, 'Project name required'),
  description: sanitizedString(1500),
  technologies: z.array(sanitizedString(50)).max(20),
  link: optionalUrl,
  github: optionalUrl,
  startDate: dateField.optional(),
  endDate: dateField.optional(),
});

export const skillSchema = z.object({
  id: z.string(),
  name: sanitizedString(100).min(1, 'Skill name required'),
  level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  category: sanitizedString(100),
});

export const certificationSchema = z.object({
  id: z.string(),
  name: sanitizedString(200).min(1, 'Certification name required'),
  issuer: sanitizedString(200),
  date: dateField,
  expiryDate: dateField.optional(),
  credentialId: sanitizedString(100).optional(),
  link: optionalUrl,
});

export const languageSchema = z.object({
  id: z.string(),
  name: sanitizedString(100).min(1, 'Language name required'),
  proficiency: z.enum(['native', 'fluent', 'professional', 'conversational', 'basic']),
});

export const customSectionItemSchema = z.object({
  id: z.string(),
  title: sanitizedString(200).min(1, 'Title required'),
  subtitle: sanitizedString(200).optional(),
  date: sanitizedString(100).optional(),
  description: sanitizedString(2000).optional(),
});

export const customSectionSchema = z.object({
  id: z.string(),
  title: sanitizedString(100).min(1, 'Section title required'),
  items: z.array(customSectionItemSchema).max(20),
});

// ─── Full Resume Schema ──────────────────────────────────────────────────────

export const resumeDataSchema = z.object({
  personalInfo: personalInfoSchema,
  education: z.array(educationSchema).max(10),
  experience: z.array(experienceSchema).max(20),
  projects: z.array(projectSchema).max(20),
  skills: z.array(skillSchema).max(50),
  certifications: z.array(certificationSchema).max(20),
  languages: z.array(languageSchema).max(20),
  interests: z.array(sanitizedString(100)).max(20),
  customSections: z.array(customSectionSchema).max(5),
  sectionOrder: z.array(z.string()).optional(),
});

// ─── Import Schema (all optional for partial data) ──────────────────────────

export const importJsonSchema = resumeDataSchema.partial();

// ─── Validation Helper ──────────────────────────────────────────────────────

export function validateAndSanitize<T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; errors: string[] } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors = result.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
  return { success: false, errors };
}
