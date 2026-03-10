import type { ResumeData } from '@/types/resume';
import { validateJsonUpload, parseJsonFile } from '@/lib/security';
import { importJsonSchema, validateAndSanitize } from '@/lib/validation/schemas';
import { toast } from 'sonner';

// ─── Import from JSON file ────────────────────────────────────────────────────

export async function importFromJSONFile(
  file: File,
): Promise<Partial<ResumeData> | null> {
  const validation = validateJsonUpload(file);
  if (!validation.valid) {
    toast.error(validation.error ?? 'Invalid file.');
    return null;
  }

  let raw: unknown;
  try {
    raw = await parseJsonFile(file);
  } catch {
    toast.error('Could not read JSON file. Make sure it is valid JSON.');
    return null;
  }

  const result = validateAndSanitize(importJsonSchema, raw);
  if (!result.success) {
    toast.error('Invalid resume JSON format: ' + result.errors.slice(0, 2).join(', '));
    return null;
  }

  return result.data as Partial<ResumeData>;
}

// ─── Import from GitHub (mocked — real impl would use GitHub API v3) ──────────

export async function importFromGitHub(username: string): Promise<Partial<ResumeData> | null> {
  if (!/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
    toast.error('Invalid GitHub username.');
    return null;
  }

  try {
    // Real implementation: fetch https://api.github.com/users/{username}
    // and https://api.github.com/users/{username}/repos
    // Mock response for demo:
    await new Promise((r) => setTimeout(r, 800));

    const mockData: Partial<ResumeData> = {
      personalInfo: {
        fullName: username,
        title: 'Software Engineer',
        email: '',
        phone: '',
        location: '',
        github: `github.com/${username}`,
        portfolio: '',
        linkedIn: '',
        summary: `Open source developer. View work at github.com/${username}`,
      },
      projects: [
        {
          id: `gh_${Date.now()}`,
          name: `${username}/sample-project`,
          description: 'Imported from GitHub. Edit description to match your project.',
          technologies: ['JavaScript', 'Node.js'],
          github: `github.com/${username}/sample-project`,
        },
      ],
    };

    toast.success('GitHub profile imported. Please review and complete your details.');
    return mockData;
  } catch {
    toast.error('Failed to import from GitHub. Please try again.');
    return null;
  }
}

// ─── Import from LinkedIn (mocked — real impl requires OAuth + API) ──────────

export async function importFromLinkedIn(): Promise<Partial<ResumeData> | null> {
  // Real implementation would:
  // 1. Open OAuth popup to LinkedIn
  // 2. Get access token
  // 3. Call /v2/me and /v2/positions etc.
  // 4. Map LinkedIn schema → ResumeData

  toast.info('LinkedIn import requires OAuth setup. In production, connect your LinkedIn account via Settings.');

  // Return mock data to show the flow
  await new Promise((r) => setTimeout(r, 600));

  const mock: Partial<ResumeData> = {
    personalInfo: {
      fullName: 'Your Name',
      title: 'Professional Title',
      email: 'you@example.com',
      phone: '',
      location: 'City, Country',
      linkedIn: 'linkedin.com/in/yourprofile',
      github: '',
      portfolio: '',
      summary: 'Imported from LinkedIn. Edit your summary here.',
    },
  };

  return mock;
}
