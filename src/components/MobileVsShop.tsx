import { siteConfig } from "@/lib/site-config";
import { TruckIcon, WrenchIcon } from "./icons";

export function MobileVsShop() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-4 rounded-lg border border-line bg-paper p-8">
        <TruckIcon className="size-8 text-ink" />
        <h3 className="font-display text-xl font-semibold tracking-wide text-ink uppercase">
          Ben comes to you
        </h3>
        <p className="text-sm leading-relaxed text-steel">
          The mobile rig handles field repairs on farms, jobsites, and
          driveways anywhere within {siteConfig.serviceRadiusLabel.toLowerCase()}.
          If it&rsquo;s too big, too heavy, or too broken to move — that&rsquo;s
          exactly what mobile welding is for.
        </p>
      </div>
      <div className="flex flex-col gap-4 rounded-lg border border-line bg-paper p-8">
        <WrenchIcon className="size-8 text-ink" />
        <h3 className="font-display text-xl font-semibold tracking-wide text-ink uppercase">
          Bring it to the shop
        </h3>
        <p className="text-sm leading-relaxed text-steel">
          Smaller pieces and parts can be dropped off in {siteConfig.city}{" "}
          instead of waiting on a truck roll. Text ahead so it&rsquo;s ready
          to go when you get there.
        </p>
      </div>
    </div>
  );
}
