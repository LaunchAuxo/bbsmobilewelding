import { Container } from "./Container";
import { CallButton, SmsQuoteButton } from "./CtaButtons";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <div className="border-b border-line bg-fog">
      <Container className="flex flex-col items-start gap-6 py-20 lg:py-28">
        <p className="font-display text-sm font-semibold tracking-[0.2em] text-steel uppercase">
          {siteConfig.city} &middot; Mobile &amp; In-Shop Welding
        </p>
        <h1 className="max-w-3xl text-balance font-display text-5xl font-semibold tracking-tight text-ink uppercase sm:text-6xl">
          Welding repair, wherever your job is stuck.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-steel">
          Ben Bjornsen runs BB&rsquo;s Mobile Welding out of Cedar Rapids —
          bringing the rig to your farm, jobsite, or driveway, or fixing it
          at the shop if you&rsquo;d rather bring it in. Text a photo, get a
          straight answer.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SmsQuoteButton size="lg" />
          <CallButton size="lg" />
        </div>
      </Container>
    </div>
  );
}
