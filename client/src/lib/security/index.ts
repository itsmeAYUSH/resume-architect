// ─── Client-side Security Utilities ──────────────────────────────────────────
// NOTE: In a real deployment you'd add server-side Helmet, CSRF tokens via
// a /api/csrf endpoint, and proper rate limiting middleware.
// These are the client-enforceable layers.

// ─── XSS Sanitization ────────────────────────────────────────────────────────

const DANGEROUS_PATTERNS = [
  /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
  /<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi,
  /javascript\s*:/gi,
  /on\w+\s*=\s*["'][^"']*["']/gi,
  /on\w+\s*=\s*[^"'\s>]*/gi,
  /data\s*:\s*text\/html/gi,
  /vbscript\s*:/gi,
];

export function sanitizeString(input: string): string {
  let output = input;
  for (const pattern of DANGEROUS_PATTERNS) {
    output = output.replace(pattern, '');
  }
  return output.trim();
}

export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const result = {} as T;
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'string') {
      result[key] = sanitizeString(value) as T[Extract<keyof T, string>];
    } else if (Array.isArray(value)) {
      result[key] = value.map((v) =>
        typeof v === 'string' ? sanitizeString(v) : v
      ) as T[Extract<keyof T, string>];
    } else if (typeof value === 'object' && value !== null) {
      result[key] = sanitizeObject(value as Record<string, unknown>) as T[Extract<keyof T, string>];
    } else {
      result[key] = value as T[Extract<keyof T, string>];
    }
  }
  return result;
}

// ─── File Upload Validation ───────────────────────────────────────────────────

const ALLOWED_JSON_SIZE_BYTES = 500 * 1024; // 500 KB max

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

export function validateJsonUpload(file: File): FileValidationResult {
  if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
    return { valid: false, error: 'Only JSON files are allowed.' };
  }
  if (file.size > ALLOWED_JSON_SIZE_BYTES) {
    return { valid: false, error: 'File must be under 500 KB.' };
  }
  return { valid: true };
}

export async function parseJsonFile(file: File): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        resolve(json);
      } catch {
        reject(new Error('Invalid JSON'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

// ─── Client-side Rate Limiting ────────────────────────────────────────────────
// Prevents spam export/import operations in the browser

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
): { allowed: boolean; remainingMs?: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remainingMs: entry.resetAt - now };
  }

  entry.count++;
  return { allowed: true };
}

// ─── Secure Local Storage ─────────────────────────────────────────────────────
// Wraps localStorage with JSON parse safety & size limits

const MAX_STORAGE_SIZE = 2 * 1024 * 1024; // 2 MB

export const secureStorage = {
  set(key: string, value: unknown): boolean {
    try {
      const str = JSON.stringify(value);
      const size = new Blob([str]).size;
      if (size > MAX_STORAGE_SIZE) return false;
      localStorage.setItem(key, str);
      return true;
    } catch {
      return false;
    }
  },
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  },
  remove(key: string): void {
    localStorage.removeItem(key);
  },
};

// ─── Content Security Policy nonce helper ─────────────────────────────────────
// In Next.js, set this via middleware and inject via <Script nonce={nonce}>

export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}
