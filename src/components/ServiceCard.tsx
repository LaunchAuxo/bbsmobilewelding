import type { Service } from "@/lib/site-config";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div
      id={service.slug}
      className="scroll-mt-24 rounded-lg border border-line bg-paper p-6"
    >
      <h3 className="font-display text-lg font-semibold tracking-wide text-ink uppercase">
        {service.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-steel">
        {service.description}
      </p>
    </div>
  );
}
