import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { HowItWorks } from "@/components/HowItWorks";
import { MobileVsShop } from "@/components/MobileVsShop";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { PricingCard } from "@/components/PricingCard";
import { PhotoCarousel, BeforeAfterCarousel } from "@/components/Gallery";
import { ContactForm } from "@/components/ContactForm";
import { CallButton, SmsQuoteButton } from "@/components/CtaButtons";
import {
  beforeAfterPairs,
  galleryPhotos,
  inShopPackages,
  mobilePackages,
  services,
  serviceAreaCities,
  siteConfig,
} from "@/lib/site-config";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, UserIcon } from "@/components/icons";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="py-10 sm:py-14 lg:py-20">
        <Container>
          <TrustBar />
        </Container>
      </section>

      <section className="border-t border-line bg-fog py-10 sm:py-14 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="How It Works"
            title="Three steps to a repair"
            description="No forms, no waiting on a callback. Send photos and Ben takes it from there."
          />
          <div className="mt-8 lg:mt-12">
            <HowItWorks />
          </div>
        </Container>
      </section>

      <section id="services" className="scroll-mt-24 py-10 sm:py-14 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="What Ben works on"
            description="A rough rundown of the most common jobs — if it doesn't fit neatly into a category, text a photo and ask."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-fog py-10 sm:py-14 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Mobile or In-Shop"
            title="Two ways to get it fixed"
          />
          <div className="mt-8 lg:mt-12">
            <MobileVsShop />
          </div>
        </Container>
      </section>

      <section id="pricing" className="scroll-mt-24 border-t border-line py-10 sm:py-14 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Pricing"
            title="Flat-rate packages, no surprises"
            description="Fixed pricing instead of an hourly guess — you know the cost before Ben starts. Bigger or smaller than these? Text a photo and Ben will work out a price."
          />

          <div className="mt-8 sm:mt-10">
            <h3 className="font-display text-xs font-semibold tracking-widest text-ink uppercase sm:text-sm">
              In-Shop Packages
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-4">
              {inShopPackages.map((pkg) => (
                <PricingCard key={pkg.name} pkg={pkg} />
              ))}
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <h3 className="font-display text-xs font-semibold tracking-widest text-ink uppercase sm:text-sm">
              Mobile Packages
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-4">
              {mobilePackages.map((pkg) => (
                <PricingCard key={pkg.name} pkg={pkg} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id="service-area" className="scroll-mt-24 py-10 sm:py-14 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Service Area"
            title={`Based in ${siteConfig.city}`}
            description={`Ben travels within a ${siteConfig.serviceRadiusLabel.toLowerCase()} for mobile jobs — roughly ${siteConfig.serviceRadiusMiles} miles out in any direction. Outside that range? Shop drop-off is always on the table.`}
          />
          <div className="mt-8 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-3">
            {serviceAreaCities.map((group) => (
              <div key={group.region}>
                <h3 className="font-display text-xs font-semibold tracking-widest text-ink uppercase sm:text-sm">
                  {group.region}
                </h3>
                <ul className="mt-2 flex flex-col gap-1 text-xs text-steel sm:mt-3 sm:gap-1.5 sm:text-sm">
                  {group.towns.map((town) => (
                    <li key={town}>{town}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="gallery" className="scroll-mt-24 border-t border-line bg-fog py-10 sm:py-14 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Gallery"
            title="Recent work"
            description="A few jobs Ben's finished recently — swipe through, or tap a photo for the full-size view."
          />
          <div className="mt-6 sm:mt-10">
            <h3 className="font-display text-xs font-semibold tracking-widest text-ink uppercase sm:text-sm">
              Finished Work
            </h3>
            <div className="mt-3 sm:mt-4">
              <PhotoCarousel photos={galleryPhotos} />
            </div>
          </div>
          <div className="mt-6 sm:mt-10">
            <h3 className="font-display text-xs font-semibold tracking-widest text-ink uppercase sm:text-sm">
              Before &amp; After
            </h3>
            <div className="mt-3 sm:mt-4">
              <BeforeAfterCarousel pairs={beforeAfterPairs} />
            </div>
          </div>
        </Container>
      </section>

      <section id="about" className="scroll-mt-24 py-10 sm:py-14 lg:py-20">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-12">
          <div>
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-steel uppercase sm:text-sm">
              About
            </p>
            <h2 className="mt-1 text-balance font-display text-2xl font-semibold tracking-tight text-ink uppercase sm:text-3xl lg:text-4xl">
              One welder. No middlemen.
            </h2>
            <div className="mt-4 flex flex-col gap-3 text-base leading-relaxed text-steel sm:mt-6 sm:gap-4 sm:text-lg">
              <p>
                BB&rsquo;s Mobile Welding is Ben Bjornsen, working solo out of
                Cedar Rapids. There&rsquo;s no dispatcher, no rotating crew,
                no upsell — the person who quotes the job is the person who
                welds it.
              </p>
              <p>
                That means fewer jobs running at once, but it also means
                every repair gets Ben&rsquo;s direct attention, from the
                first text photo to the final pass.
              </p>
              <p>
                If it&rsquo;s stuck in a field, Ben brings the rig out. If
                it&rsquo;s small enough to load up, bring it by the shop.
                Either way, you&rsquo;re talking to the guy doing the work.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 rounded-lg border border-line bg-fog p-5 sm:gap-4 sm:p-8">
              <h3 className="font-display text-sm font-semibold tracking-widest text-ink uppercase">
                Hours
              </h3>
              <ul className="flex flex-col gap-3">
                {siteConfig.hours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between gap-4 text-sm">
                    <span className="flex items-center gap-2 text-steel">
                      <ClockIcon className="size-4 shrink-0" />
                      {h.day}
                    </span>
                    <span className="font-medium text-ink">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex aspect-[3/4] w-full max-w-80 flex-col items-center justify-center gap-1 self-center rounded-lg border border-dashed border-line text-steel sm:self-start lg:mx-auto lg:max-w-none lg:self-stretch">
            <UserIcon className="size-8" />
            <span className="text-sm">Coming soon</span>
          </div>
        </Container>
      </section>

      <section id="contact" className="scroll-mt-20 border-t border-line bg-black py-10 sm:py-14 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
            <div className="flex flex-col items-start gap-4 sm:gap-6">
              <p className="font-display text-xs font-semibold tracking-[0.2em] text-mist uppercase sm:text-sm">
                Contact
              </p>
              <h2 className="max-w-xl text-balance font-display text-2xl font-semibold tracking-tight text-paper uppercase sm:text-3xl lg:text-4xl">
                Got something that needs welded?
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-mist sm:text-lg">
                Text a wide photo and a close-up of the damage, plus whether
                it needs to be mobile or can come to the shop. Ben will tell
                you what it takes to fix it.
              </p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <SmsQuoteButton size="lg" />
                <CallButton
                  size="lg"
                  className="border-paper text-paper hover:bg-paper hover:text-black"
                />
              </div>
              <a href="#contact-form" className="text-sm text-mist underline underline-offset-2 hover:text-paper">
                Prefer email? Skip to the form ↓
              </a>
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-charcoal p-5 sm:gap-4 sm:p-8">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-3 text-paper"
              >
                <PhoneIcon className="size-5 shrink-0 text-mist" />
                {siteConfig.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-paper"
              >
                <MailIcon className="size-5 shrink-0 text-mist" />
                {siteConfig.email}
              </a>
              <div className="flex items-center gap-3 text-paper">
                <MapPinIcon className="size-5 shrink-0 text-mist" />
                {siteConfig.city} &middot; {siteConfig.serviceRadiusLabel}
              </div>
            </div>
          </div>

          <div id="contact-form" className="mt-8 scroll-mt-36 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
            <p className="font-display text-xs font-semibold tracking-[0.2em] text-mist uppercase sm:text-sm">
              Or send the details here
            </p>
            <div className="mt-4 max-w-2xl sm:mt-6">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
