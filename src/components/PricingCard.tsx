import type { PricingPackage } from "@/lib/site-config";

export function PricingCard({ pkg }: { pkg: PricingPackage }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-line bg-paper p-4 sm:p-6">
      <h4 className="font-display text-xs font-semibold tracking-wide text-ink uppercase sm:text-sm">
        {pkg.name}
      </h4>
      <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">{pkg.price}</p>
      <p className="text-xs leading-relaxed text-steel sm:text-sm">{pkg.description}</p>
    </div>
  );
}
