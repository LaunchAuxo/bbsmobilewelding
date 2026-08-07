import type { Service } from "@/lib/site-config";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      id={service.slug}
      className="scroll-mt-24 rounded-lg border border-line bg-paper p-4 sm:p-6"
    >
      <h3 className="font-display text-base leading-tight font-semibold tracking-wide text-ink uppercase sm:text-lg">
        {service.title}
      </h3>
      {/* Shorter blurb on mobile/tablet where cards are narrower — full
          description only once there's enough width (lg: 3-col grid) to
          hold it without wrapping into many more lines than it saves. */}
      <p className="mt-2 text-sm leading-relaxed text-steel lg:hidden">
        {service.short}
      </p>
      <p className="mt-3 hidden text-sm leading-relaxed text-steel lg:block">
        {service.description}
      </p>
    </div>
  );
}
