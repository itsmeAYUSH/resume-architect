import type { ResumeData, ATSScore } from '@/types/resume';

const ATS_KEYWORDS = [
  'led', 'managed', 'developed', 'built', 'designed', 'implemented', 'improved',
  'increased', 'reduced', 'delivered', 'collaborated', 'architected', 'optimized',
  'launched', 'scaled', 'automated', 'integrated', 'migrated', 'deployed',
  'ownership', 'cross-functional', 'stakeholder', 'roadmap', 'metrics', 'impact',
];

export function calculateATSScore(data: ResumeData): ATSScore {
  const { personalInfo, education, experience, projects, skills, certifications } = data;

  // ── Completeness ────────────────────────────────────────────────────────────
  const completenessChecks = [
    !!personalInfo.fullName,
    !!personalInfo.email,
    !!personalInfo.phone,
    !!personalInfo.location,
    !!personalInfo.summary && personalInfo.summary.length > 50,
    education.length > 0,
    experience.length > 0 || projects.length > 0,
    skills.length >= 3,
    !!personalInfo.linkedIn,
  ];
  const completeness = Math.round((completenessChecks.filter(Boolean).length / completenessChecks.length) * 100);

  // ── Keywords ────────────────────────────────────────────────────────────────
  const fullText = [
    personalInfo.summary,
    ...experience.map((e) => e.description + ' ' + e.achievements.join(' ')),
    ...projects.map((p) => p.description),
  ]
    .join(' ')
    .toLowerCase();

  const foundKeywords = ATS_KEYWORDS.filter((kw) => fullText.includes(kw));
  const missingKeywords = ATS_KEYWORDS.filter((kw) => !fullText.includes(kw)).slice(0, 8);
  const keywords = Math.round((foundKeywords.length / ATS_KEYWORDS.length) * 100);

  // ── Formatting (ATS parseable) ───────────────────────────────────────────────
  const formattingChecks = [
    education.every((e) => !!e.startDate && !!e.endDate),
    experience.every((e) => !!e.startDate),
    skills.length > 0,
    personalInfo.summary.length < 1200,
    !/<[^>]+>/.test(personalInfo.summary),
  ];
  const formatting = Math.round((formattingChecks.filter(Boolean).length / formattingChecks.length) * 100);

  // ── Readability ──────────────────────────────────────────────────────────────
  const summaryWords = personalInfo.summary.split(/\s+/).length;
  const readabilityChecks = [
    summaryWords >= 30 && summaryWords <= 120,
    experience.every((e) => e.description.length > 30),
    skills.length >= 5 && skills.length <= 30,
    certifications.length > 0,
  ];
  const readability = Math.round((readabilityChecks.filter(Boolean).length / readabilityChecks.length) * 100);

  // ── Overall ──────────────────────────────────────────────────────────────────
  const overall = Math.round((completeness * 0.3 + keywords * 0.25 + formatting * 0.25 + readability * 0.2));

  // ── Suggestions ─────────────────────────────────────────────────────────────
  const suggestions: string[] = [];
  if (completeness < 80) suggestions.push('Fill in missing sections to boost your score.');
  if (!personalInfo.summary || personalInfo.summary.length < 50)
    suggestions.push('Add a professional summary (50–120 words).');
  if (keywords < 50)
    suggestions.push('Use more action verbs: led, built, improved, delivered, scaled.');
  if (skills.length < 5)
    suggestions.push('Add at least 5 skills to improve keyword matching.');
  if (!personalInfo.linkedIn)
    suggestions.push('Add a LinkedIn URL to increase recruiter confidence.');
  if (experience.some((e) => !e.achievements.length))
    suggestions.push('Add quantified achievements to your experience entries.');

  return {
    overall,
    sections: { completeness, keywords, formatting, readability },
    suggestions,
    missingKeywords,
  };
}
