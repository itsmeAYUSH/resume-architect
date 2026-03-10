import type { ResumeData } from '@/types/resume';
import { formatDate, SectionTitle, ContactLine, LinksLine } from './shared';

export default function ProfessionalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo: p, experience, education, skills, projects, certifications, languages } = data;
  const summ = p.summary ?? '';

  return (
    <div className="min-h-[297mm] w-[210mm] bg-white p-8 font-serif text-gray-900 text-sm print:p-6">
      <header className="text-center mb-8 border-b border-gray-300 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{p.fullName}</h1>
        {p.title && <p className="text-gray-600 mt-1">{p.title}</p>}
        <ContactLine data={p} />
        <LinksLine data={p} />
      </header>
      {summ && (
        <section className="mb-5">
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{summ}</p>
        </section>
      )}
      {experience.length > 0 && (
        <section className="mb-5">
          <SectionTitle>Work Experience</SectionTitle>
          {experience.map((e) => (
            <div key={e.id} className="mb-4">
              <div className="font-semibold text-gray-900">{e.position}</div>
              <div className="text-gray-600">{e.company}{e.location ? `, ${e.location}` : ''}</div>
              <div className="text-xs text-gray-500">{formatDate(e.startDate)} – {e.current ? 'Present' : formatDate(e.endDate)}</div>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap">{e.description}</p>
            </div>
          ))}
        </section>
      )}
      {education.length > 0 && (
        <section className="mb-5">
          <SectionTitle>Education</SectionTitle>
          {education.map((e) => (
            <div key={e.id} className="mb-2">
              <div className="font-semibold">{e.degree} in {e.field}</div>
              <div className="text-gray-600">{e.institution}</div>
              <div className="text-xs text-gray-500">{formatDate(e.startDate)} – {e.current ? 'Present' : formatDate(e.endDate)}</div>
            </div>
          ))}
        </section>
      )}
      {skills.length > 0 && (
        <section className="mb-5">
          <SectionTitle>Skills</SectionTitle>
          <p className="text-gray-700">{skills.map((s) => s.name).join(' · ')}</p>
        </section>
      )}
      {projects.length > 0 && (
        <section className="mb-5">
          <SectionTitle>Projects</SectionTitle>
          {projects.map((pr) => (
            <div key={pr.id} className="mb-2">
              <div className="font-semibold">{pr.name}</div>
              <p className="text-gray-700">{pr.description}</p>
            </div>
          ))}
        </section>
      )}
      {(certifications.length > 0 || (languages && languages.length > 0)) && (
        <section className="mb-5">
          {certifications.length > 0 && (
            <>
              <SectionTitle>Certifications</SectionTitle>
              {certifications.map((c) => (
                <div key={c.id} className="mb-1"><strong>{c.name}</strong> – {c.issuer}</div>
              ))}
            </>
          )}
          {languages && languages.length > 0 && (
            <>
              <SectionTitle>Languages</SectionTitle>
              <p className="text-gray-700">{languages.map((l) => `${l.name} (${l.proficiency})`).join(', ')}</p>
            </>
          )}
        </section>
      )}
    </div>
  );
}
