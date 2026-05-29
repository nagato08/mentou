type GoldLineProps = {
  className?: string;
  width?: number;
};

export default function GoldLine({ className = "", width = 64 }: GoldLineProps) {
  return (
    <span
      aria-hidden="true"
      className={`block h-px bg-gold ${className}`}
      style={{ width: `${width}px` }}
    />
  );
}
