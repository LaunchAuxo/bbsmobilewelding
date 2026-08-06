export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className="font-display text-sm font-semibold tracking-[0.2em] text-steel uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-ink uppercase sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-steel">{description}</p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-line bg-fog">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8 lg:py-20">
        <p className="font-display text-sm font-semibold tracking-[0.2em] text-steel uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-2 max-w-3xl text-balance font-display text-4xl font-semibold tracking-tight text-ink uppercase sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-steel">
          {description}
        </p>
      </div>
    </div>
  );
}
