import type { ResumeData } from '@/types/resume';
import { formatDate, SectionTitle, ContactLine, LinksLine } from './shared';

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, experience, education, skills, projects, certifications, languages } = data;
  const summ = p.summary ?? '';

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white p-8 font-sans text-gray-900 text-sm print:p-6">
      <header className="border-b-2 border-indigo-600 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{p.fullName}</h1>
        {p.title && <p className="text-indigo-600 font-medium">{p.title}</p>}
        <ContactLine data={p} />
        <LinksLine data={p} />
      </header>
      {summ && (
        <section className="mb-4">
          <SectionTitle>Summary</SectionTitle>
          <p className="text-gray-700 whitespace-pre-wrap">{summ}</p>
        </section>
      )}
      {experience.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Experience</SectionTitle>
          {experience.map((e) => (
            <div key={e.id} className="mb-3 pl-2 border-l-2 border-indigo-200">
              <div className="font-semibold text-gray-900">{e.position} · {e.company}</div>
              <div className="text-xs text-gray-500">{formatDate(e.startDate)} – {e.current ? 'Present' : formatDate(e.endDate)} {e.location && ` · ${e.location}`}</div>
              <p className="mt-1 text-gray-700 whitespace-pre-wrap">{e.description}</p>
            </div>
          ))}
        </section>
      )}
      {education.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Education</SectionTitle>
          {education.map((e) => (
            <div key={e.id} className="mb-2">
              <div className="font-semibold">{e.degree} in {e.field}</div>
              <div className="text-xs text-gray-500">{e.institution} · {formatDate(e.startDate)} – {e.current ? 'Present' : formatDate(e.endDate)}</div>
            </div>
          ))}
        </section>
      )}
      {projects.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Projects</SectionTitle>
          {projects.map((pr) => (
            <div key={pr.id} className="mb-2">
              <div className="font-semibold">{pr.name}</div>
              <p className="text-gray-700">{pr.description}</p>
              {pr.technologies?.length > 0 && <p className="text-xs text-gray-500">{pr.technologies.join(' · ')}</p>}
            </div>
          ))}
        </section>
      )}
      {skills.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s.id} className="px-2 py-0.5 bg-indigo-50 text-indigo-800 rounded text-xs">{s.name}</span>
            ))}
          </div>
        </section>
      )}
      {certifications.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((c) => (
            <div key={c.id} className="mb-1 text-gray-700"><strong>{c.name}</strong> – {c.issuer}</div>
          ))}
        </section>
      )}
      {languages && languages.length > 0 && (
        <section>
          <SectionTitle>Languages</SectionTitle>
          <p className="text-gray-700">{languages.map((l) => `${l.name} (${l.proficiency})`).join(', ')}</p>
        </section>
      )}
    </div>
  );
}
