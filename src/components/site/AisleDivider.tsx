interface AisleDividerProps {
  number: string;
  label: string;
}

/**
 * AisleDivider — clean tomato-red strip with a marker section number.
 * Visual cue between page sections, themed to match the hero.
 */
const AisleDivider = ({ number, label }: AisleDividerProps) => (
  <div className="container py-6">
    <div className="flex items-center gap-5 rounded-xl bg-[hsl(8_72%_42%)] px-6 py-4 text-[hsl(38_45%_96%)] shadow-[0_8px_24px_-12px_hsl(8_72%_20%/0.45)]">
      <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.32em] text-[hsl(38_90%_72%)]">
        {number}
      </span>
      <span className="whitespace-nowrap font-display text-lg font-semibold uppercase tracking-tight">
        {label}
      </span>
      <span aria-hidden className="h-px flex-1 bg-[hsl(38_45%_96%)]/30" />
      <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.28em] text-[hsl(38_90%_72%)]">
        ✦ Fresh today ✦
      </span>
    </div>
  </div>
);

export default AisleDivider;
