import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  accentWord?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

/**
 * SectionHeading — FR-102
 * Reusable H2 component for section titles on all public pages.
 *
 * Usage:
 *   <SectionHeading title="Unsere Kernziele" subtitle="Die Säulen unserer Gemeinschaft." />
 *   <SectionHeading title="Verein" centered={false} />
 */
export function SectionHeading({
  title,
  accentWord,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  const titleNode = accentWord
    ? buildTitleWithAccent(title, accentWord)
    : title;

  return (
    <div
      className={cn(
        centered ? "text-center mx-auto max-w-3xl" : "text-left",
        "mb-10",
        className,
      )}
    >
      <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight text-sage-800 text-wrap-balance">
        {titleNode}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg leading-relaxed text-charcoal-700 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function buildTitleWithAccent(title: string, accentWord: string) {
  const idx = title.indexOf(accentWord);
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span className="text-sage-700">{accentWord}</span>
      {title.slice(idx + accentWord.length)}
    </>
  );
}
