import { Container } from "./Container";
import { CallButton, SmsQuoteButton } from "./CtaButtons";
import { TrustBar } from "./TrustBar";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <div className="border-b border-line bg-fog">
      <Container className="flex flex-col items-start gap-3 py-8 sm:gap-6 sm:py-16 lg:py-20">
        <p className="font-display text-xs font-semibold tracking-[0.2em] text-steel uppercase sm:text-sm">
          {siteConfig.city} &middot; Mobile &amp; In-Shop Welding
        </p>
        <h1 className="max-w-3xl text-balance font-display text-4xl font-semibold tracking-tight text-ink uppercase sm:text-5xl lg:text-6xl">
          Welding repair, wherever your job is stuck.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
          Ben Bjornsen runs BB&rsquo;s Mobile Welding out of Cedar Rapids —
          bringing the rig to your farm, jobsite, or driveway, or fixing it
          at the shop if you&rsquo;d rather bring it in. Text a photo, get a
          straight answer.
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <SmsQuoteButton size="lg" />
          <CallButton size="lg" />
        </div>
        <div className="w-full pt-2 sm:pt-4">
          <TrustBar />
        </div>
      </Container>
    </div>
  );
}
