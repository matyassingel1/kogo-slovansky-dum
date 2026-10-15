// Inline brand glyphs — Lucide removed brand icons (trademark), so we ship our own.
type P = { size?: number; className?: string };

export function InstagramIcon({ size = 20, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

// TripAdvisor "owl" — two eyes; simplified brand-neutral glyph.
export function TripAdvisorIcon({ size = 20, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="7" cy="13" r="4.2" />
      <circle cx="17" cy="13" r="4.2" />
      <circle cx="7" cy="13" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="13" r="1.1" fill="currentColor" stroke="none" />
      <path d="M7 8.8c2.4-2.2 7.6-2.2 10 0" />
    </svg>
  );
}
