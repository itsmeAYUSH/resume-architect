import type { ATSScore } from '@/types/resume';
import { TrendingUp, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  score: ATSScore;
}

function ScoreRing({ value, size = 80 }: { value: number; size?: number }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 75 ? '#22c55e' : value >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={8} />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={color} strokeWidth={8}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text x={size / 2} y={size / 2 + 5} textAnchor="middle" className="rotate-90" style={{ rotate: '90deg', transformOrigin: 'center', fill: color, fontSize: '14px', fontWeight: 700 }}>
        {value}
      </text>
    </svg>
  );
}

function MiniBar({ label, value }: { label: string; value: number }) {
  const color = value >= 75 ? 'bg-green-500' : value >= 50 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div className={cn('h-full rounded-full transition-all duration-700', color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function ATSScorePanel({ score }: Props) {
  const { overall, sections, suggestions, missingKeywords } = score;
  const scoreColor = overall >= 75 ? 'text-green-600' : overall >= 50 ? 'text-amber-600' : 'text-red-600';

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-accent" />
        <h3 className="font-semibold text-sm">ATS Score</h3>
      </div>

      {/* Overall score */}
      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
          <ScoreRing value={overall} />
        </div>
        <div>
          <p className={cn('text-2xl font-bold', scoreColor)}>{overall}</p>
          <p className="text-xs text-muted-foreground">
            {overall >= 80 ? '✨ Excellent' : overall >= 60 ? '👍 Good' : '⚠️ Needs work'}
          </p>
        </div>
      </div>

      {/* Section bars */}
      <div className="mb-4 space-y-2.5">
        <MiniBar label="Keywords" value={sections.keywords} />
        <MiniBar label="Completeness" value={sections.completeness} />
        <MiniBar label="Formatting" value={sections.formatting} />
        <MiniBar label="Readability" value={sections.readability} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-3">
          <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Suggestions</p>
          <ul className="space-y-1 text-xs text-muted-foreground">
            {suggestions.map((sug, i) => (
              <li key={i} className="flex gap-2">
                <span>•</span>
                <span>{sug}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Missing keywords */}
      {missingKeywords.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Add these keywords</p>
          <div className="flex flex-wrap gap-1">
            {missingKeywords.map((kw) => (
              <span key={kw} className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {overall >= 80 && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-50 p-2 text-xs text-green-700">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          Your resume is ATS-ready!
        </div>
      )}
    </div>
  );
}
