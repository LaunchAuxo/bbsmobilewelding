import { ClockIcon, MapPinIcon, TruckIcon, WrenchIcon } from "./icons";

// Short titles only — full context (radius, mobile-vs-shop, etc.) is
// covered elsewhere on the page, this strip is just a quick trust signal.
const items = [
  {
    icon: TruckIcon,
    title: "Owner-operated",
  },
  {
    icon: WrenchIcon,
    title: "Mobile or in-shop",
  },
  {
    icon: MapPinIcon,
    title: "2-Hour Radius",
  },
  {
    icon: ClockIcon,
    title: "Fast replies",
  },
];

// Compact single-row strip — lives inside the Hero rather than its own
// section, so it doesn't cost a full section's worth of padding and
// "How It Works" stays reachable without scrolling on typical screens.
export function TrustBar() {
  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      {items.map(({ icon: Icon, title }) => (
        <div
          key={title}
          className="flex flex-col items-center gap-1.5 rounded-lg border border-line bg-paper px-1.5 py-3 text-center sm:gap-2 sm:px-3 sm:py-4"
        >
          <Icon className="size-5 shrink-0 text-ink sm:size-6" />
          <span className="text-[10px] leading-tight font-semibold text-ink uppercase sm:text-xs">
            {title}
          </span>
        </div>
      ))}
    </div>
  );
}
