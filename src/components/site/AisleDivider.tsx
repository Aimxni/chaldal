interface AisleDividerProps {
  number: string;
  label: string;
}

/**
 * AisleDivider — chalkboard strip with a marker section number.
 * Visual cue between page sections to reinforce the farmers-market metaphor.
 */
const AisleDivider = ({ number, label }: AisleDividerProps) => (
  <div className="container py-6">
    <div className="aisle-divider">
      <span className="aisle-no">{number}</span>
      <span className="aisle-text">{label}</span>
      <span aria-hidden className="aisle-rule" />
      <span className="font-chalk text-base text-[hsl(45_96%_60%)] sm:text-lg">
        ✦ fresh today ✦
      </span>
    </div>
  </div>
);

export default AisleDivider;
