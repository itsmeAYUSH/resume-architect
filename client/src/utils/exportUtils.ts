import type { ResumeData } from '@/types/resume';
import { checkRateLimit } from '@/lib/security';
import { toast } from 'sonner';

// ─── PDF Export (print-based, works without backend) ─────────────────────────

export async function exportAsPDF(resumeElementId = 'resume-preview-root'): Promise<void> {
  const allowed = checkRateLimit('pdf-export', 3, 60_000);
  if (!allowed.allowed) {
    toast.error(`Rate limited. Try again in ${Math.ceil((allowed.remainingMs || 0) / 1000)}s`);
    return;
  }

  const el = document.getElementById(resumeElementId);
  if (!el) {
    toast.error('Resume element not found');
    return;
  }

  // Inject print-only styles, trigger print dialog
  const style = document.createElement('style');
  style.id = '__resume_print_style';
  style.textContent = `
    @media print {
      body > *:not(#__resume_print_wrapper) { display: none !important; }
      #__resume_print_wrapper {
        display: block !important;
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        z-index: 99999;
        background: white;
      }
      @page { size: A4; margin: 0; }
    }
  `;
  document.head.appendChild(style);

  const wrapper = document.createElement('div');
  wrapper.id = '__resume_print_wrapper';
  wrapper.style.cssText = 'display:none; width:210mm; min-height:297mm;';
  wrapper.appendChild(el.cloneNode(true));
  document.body.appendChild(wrapper);

  window.print();

  // Cleanup after print dialog closes
  setTimeout(() => {
    document.head.removeChild(style);
    document.body.removeChild(wrapper);
  }, 1000);
}

// ─── JSON Export ──────────────────────────────────────────────────────────────

export function exportAsJSON(data: ResumeData, filename = 'resume'): void {
  const allowed = checkRateLimit('json-export', 10, 60_000);
  if (!allowed.allowed) {
    toast.error(`Rate limited. Try again in ${Math.ceil((allowed.remainingMs || 0) / 1000)}s`);
    return;
  }

  const sanitizedFilename = filename.replace(/[^a-z0-9-_]/gi, '_').slice(0, 50);
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${sanitizedFilename}.json`;
  a.click();

  URL.revokeObjectURL(url);
  toast.success('Resume exported as JSON');
}

// ─── DOCX Export (client-side stub using html-docx-js) ───────────────────────
// In production, this should be a server-side endpoint using docx npm package

export async function exportAsDOCX(data: ResumeData, filename = 'resume'): Promise<void> {
  const allowed = checkRateLimit('docx-export', 3, 60_000);
  if (!allowed.allowed) {
    toast.error(`Rate limited. Try again in ${Math.ceil((allowed.remainingMs || 0) / 1000)}s`);
    return;
  }

  // Build a minimal HTML string that html-docx-js can convert
  const html = buildSimpleHTMLResume(data);
  const sanitizedFilename = filename.replace(/[^a-z0-9-_]/gi, '_').slice(0, 50);

  try {
    // For now, export as HTML (can be opened in Word)
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${sanitizedFilename}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Resume exported as HTML (editable in Word)');
  } catch (error) {
    toast.error('Failed to export as DOCX');
    console.error(error);
  }
}

// ─── Simple HTML Resume Builder ───────────────────────────────────────────────

function fmt(d: string): string {
  if (!d) return '';
  const [y, m] = d.split('-');
  return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function buildSimpleHTMLResume(data: ResumeData): string {
  const { personalInfo: p, experience, education, skills, projects, certifications, languages } = data;

  const secTitle = (t: string) =>
    `<h2 style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #000;padding-bottom:2px;margin:12px 0 6px;">${t}</h2>`;

  const sections: string[] = [];

  if (p.summary) sections.push(`${secTitle('Summary')}<p>${p.summary}</p>`);

  if (experience.length) {
    sections.push(secTitle('Experience'));
    experience.forEach((e) => {
      sections.push(
        `<div style="margin-bottom:8px;"><strong>${e.position}</strong> at ${e.company} (${fmt(e.startDate)} – ${e.current ? 'Present' : fmt(e.endDate)})<p style="margin:2px 0; font-size:12px;">${e.description}</p></div>`,
      );
    });
  }

  if (education.length) {
    sections.push(secTitle('Education'));
    education.forEach((e) => {
      sections.push(
        `<div style="margin-bottom:8px;"><strong>${e.degree} in ${e.field}</strong> from ${e.institution} (${fmt(e.startDate)} – ${e.current ? 'Present' : fmt(e.endDate)})</div>`,
      );
    });
  }

  if (skills.length) {
    sections.push(secTitle('Skills'));
    sections.push(`<p>${skills.map((s) => s.name).join(', ')}</p>`);
  }

  if (certifications.length) {
    sections.push(secTitle('Certifications'));
    certifications.forEach((c) => {
      sections.push(`<div style="margin-bottom:4px;"><strong>${c.name}</strong> - ${c.issuer} (${fmt(c.date)})</div>`);
    });
  }

  if (languages.length) {
    sections.push(secTitle('Languages'));
    sections.push(`<p>${languages.map((l) => `${l.name} (${l.proficiency})`).join(', ')}</p>`);
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${p.fullName} - Resume</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.4; margin: 20px; font-size: 11px; }
        h1 { font-size: 18px; margin: 0 0 8px 0; }
        h2 { font-size: 13px; margin: 12px 0 6px 0; }
        p { margin: 6px 0; }
      </style>
    </head>
    <body>
      <h1>${p.fullName}</h1>
      ${p.title ? `<p style="font-style:italic;">${p.title}</p>` : ''}
      <p>${[p.email, p.phone, p.location].filter(Boolean).join(' • ')}</p>
      ${p.linkedIn ? `<p><a href="${p.linkedIn}">LinkedIn</a></p>` : ''}
      
      ${sections.join('')}
    </body>
    </html>
  `;
}
