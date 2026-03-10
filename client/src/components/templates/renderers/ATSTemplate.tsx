import type { ResumeData } from '@/types/resume';
import { formatDate, SectionTitle, ContactLine, LinksLine } from './shared';

export default function ATSTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, experience, education, skills, projects, certifications, languages } = data;
  const summ = p.summary ?? '';

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white p-8 font-sans text-black text-sm print:p-6">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-black">{p.fullName}</h1>
        {p.title && <p className="text-sm text-black">{p.title}</p>}
        <ContactLine data={p} />
        <LinksLine data={p} />
      </header>
      {summ && (
        <section className="mb-4">
          <SectionTitle>Summary</SectionTitle>
          <p className="whitespace-pre-wrap">{summ}</p>
        </section>
      )}
      {experience.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Experience</SectionTitle>
          {experience.map((e) => (
            <div key={e.id} className="mb-3">
              <div className="font-bold">{e.position}</div>
              <div className="text-sm">{e.company} | {formatDate(e.startDate)} – {e.current ? 'Present' : formatDate(e.endDate)} | {e.location}</div>
              <p className="mt-1 whitespace-pre-wrap">{e.description}</p>
            </div>
          ))}
        </section>
      )}
      {education.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Education</SectionTitle>
          {education.map((e) => (
            <div key={e.id} className="mb-2">
              <div className="font-bold">{e.degree}, {e.field}</div>
              <div>{e.institution} | {formatDate(e.startDate)} – {e.current ? 'Present' : formatDate(e.endDate)}</div>
            </div>
          ))}
        </section>
      )}
      {skills.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Skills</SectionTitle>
          <p>{skills.map((s) => s.name).join(', ')}</p>
        </section>
      )}
      {projects.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Projects</SectionTitle>
          {projects.map((pr) => (
            <div key={pr.id} className="mb-2">
              <div className="font-bold">{pr.name}</div>
              <p>{pr.description}</p>
              {pr.technologies?.length > 0 && <p className="text-xs">{pr.technologies.join(', ')}</p>}
            </div>
          ))}
        </section>
      )}
      {certifications.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Certifications</SectionTitle>
          {certifications.map((c) => (
            <div key={c.id}>{c.name}, {c.issuer}, {formatDate(c.date)}</div>
          ))}
        </section>
      )}
      {languages && languages.length > 0 && (
        <section>
          <SectionTitle>Languages</SectionTitle>
          <p>{languages.map((l) => `${l.name}: ${l.proficiency}`).join(' | ')}</p>
        </section>
      )}
    </div>
  );
}
