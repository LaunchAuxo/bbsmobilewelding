import { siteConfig } from "@/lib/site-config";
import { ClockIcon, MapPinIcon, TruckIcon, WrenchIcon } from "./icons";

const items = [
  {
    icon: TruckIcon,
    title: "Owner-operated",
    detail: "You deal directly with Ben — no dispatcher, no subcontractors.",
  },
  {
    icon: WrenchIcon,
    title: "Mobile or in-shop",
    detail: "Ben comes to you, or you drop the work off in Cedar Rapids.",
  },
  {
    icon: MapPinIcon,
    title: siteConfig.serviceRadiusLabel,
    detail: "Farms, jobsites, and shops across eastern Iowa.",
  },
  {
    icon: ClockIcon,
    title: "Fast replies",
    detail: "Text photos, get a straight answer back — not a runaround.",
  },
];

export function TrustBar() {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ icon: Icon, title, detail }) => (
        <div key={title} className="flex flex-col gap-3 bg-paper p-6">
          <Icon className="size-6 text-ink" />
          <h3 className="font-display text-sm font-semibold tracking-wide text-ink uppercase">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-steel">{detail}</p>
        </div>
      ))}
    </div>
  );
}
