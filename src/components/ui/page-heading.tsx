import { cn } from "@/lib/utils";

interface PageHeadingProps {
  title: string;
  accentWord?: string;
  subtitle?: string;
  className?: string;
}

/**
 * PageHeading — FR-101
 * Reusable H1 component for all public pages.
 * Renders title with optional accent word (in sage-700) and optional subtitle.
 *
 * Usage:
 *   <PageHeading title="Über Muslimin" accentWord="Muslimin" subtitle="Wir sind..." />
 */
export function PageHeading({
  title,
  accentWord,
  subtitle,
  className,
}: PageHeadingProps) {
  const titleNode = accentWord
    ? buildTitleWithAccent(title, accentWord)
    : title;

  return (
    <div className={cn("text-center", className)}>
      <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight tracking-tight text-charcoal-800 text-wrap-balance [max-width:60ch] mx-auto">
        {titleNode}
      </h1>
      {subtitle && (
        <p className="mt-4 text-xl md:text-2xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
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
