import { useEffect } from 'react';

interface SEMeta {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const BASE_TITLE = 'Resume Architect';
const BASE_DESC = 'Build professional, ATS-optimized resumes in minutes with AI-powered suggestions and beautiful templates.';
const BASE_URL = 'https://resumearchitect.app';
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export default function SEOMeta({
  title,
  description = BASE_DESC,
  canonical,
  ogImage = OG_IMAGE,
  noIndex = false,
}: SEMeta) {
  const fullTitle = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;

  useEffect(() => {
    // Title
    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('robots', noIndex ? 'noindex,nofollow' : 'index,follow');

    // Open Graph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:type', 'website', true);
    setMeta('og:site_name', BASE_TITLE, true);
    if (canonical) setMeta('og:url', `${BASE_URL}${canonical}`, true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  }, [fullTitle, description, canonical, ogImage, noIndex]);

  return null;
}
