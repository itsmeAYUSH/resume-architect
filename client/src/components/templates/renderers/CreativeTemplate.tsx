import type { ResumeData } from '@/types/resume';
import { formatDate, SectionTitle, ContactLine, LinksLine } from './shared';

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, experience, education, skills, projects, certifications, languages } = data;
  const summ = p.summary ?? '';

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white p-8 font-sans text-gray-900 text-sm print:p-6">
      <header className="mb-6 flex items-start gap-6">
        <div className="w-2 bg-teal-500 shrink-0 rounded-full self-stretch min-h-[80px]" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{p.fullName}</h1>
          {p.title && <p className="text-teal-600 font-medium">{p.title}</p>}
          <ContactLine data={p} />
          <LinksLine data={p} />
        </div>
      </header>
      {summ && (
        <section className="mb-4 pl-4 border-l-4 border-teal-400">
          <SectionTitle>About</SectionTitle>
          <p className="text-gray-700 whitespace-pre-wrap">{summ}</p>
        </section>
      )}
      {experience.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Experience</SectionTitle>
          {experience.map((e) => (
            <div key={e.id} className="mb-3">
              <div className="font-semibold text-teal-700">{e.position}</div>
              <div className="text-gray-600">{e.company} · {formatDate(e.startDate)} – {e.current ? 'Present' : formatDate(e.endDate)}</div>
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
              <div className="font-semibold">{e.degree} – {e.field}</div>
              <div className="text-gray-600">{e.institution}</div>
            </div>
          ))}
        </section>
      )}
      {projects.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Projects</SectionTitle>
          {projects.map((pr) => (
            <div key={pr.id} className="mb-2">
              <div className="font-semibold text-teal-700">{pr.name}</div>
              <p className="text-gray-700">{pr.description}</p>
              {pr.technologies?.length > 0 && <p className="text-xs text-gray-500">{pr.technologies.join(' · ')}</p>}
            </div>
          ))}
        </section>
      )}
      {skills.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Skills</SectionTitle>
          <p className="text-gray-700">{skills.map((s) => s.name).join(' · ')}</p>
        </section>
      )}
      {certifications.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((c) => (
            <div key={c.id} className="mb-1"><strong>{c.name}</strong> – {c.issuer}</div>
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
