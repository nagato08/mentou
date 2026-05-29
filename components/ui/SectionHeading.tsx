import { type ReactNode } from "react";
import GoldLine from "./GoldLine";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-5 ${alignClass} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="font-display text-4xl leading-tight text-bone md:text-5xl lg:text-6xl">
        {title}
      </h2>
      <GoldLine />
      {subtitle && (
        <p className="max-w-2xl text-base leading-relaxed text-bone/70 md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
