import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { HowItWorks } from "@/components/HowItWorks";
import { MobileVsShop } from "@/components/MobileVsShop";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { PhotoCarousel, BeforeAfterCarousel } from "@/components/Gallery";
import { ContactForm } from "@/components/ContactForm";
import { CallButton, SmsQuoteButton } from "@/components/CtaButtons";
import { beforeAfterPairs, galleryPhotos, services, serviceAreaCities, siteConfig } from "@/lib/site-config";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="py-16 lg:py-20">
        <Container>
          <TrustBar />
        </Container>
      </section>

      <section className="border-t border-line bg-fog py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="How It Works"
            title="Three steps to a repair"
            description="No forms, no waiting on a callback. Send photos and Ben takes it from there."
          />
          <div className="mt-12">
            <HowItWorks />
          </div>
        </Container>
      </section>

      <section id="services" className="scroll-mt-24 py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="What Ben works on"
            description="A rough rundown of the most common jobs — if it doesn't fit neatly into a category, text a photo and ask."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-fog py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Mobile or In-Shop"
            title="Two ways to get it fixed"
          />
          <div className="mt-12">
            <MobileVsShop />
          </div>
        </Container>
      </section>

      <section id="service-area" className="scroll-mt-24 py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Service Area"
            title={`Based in ${siteConfig.city}`}
            description={`Ben travels within a ${siteConfig.serviceRadiusLabel.toLowerCase()} for mobile jobs — roughly ${siteConfig.serviceRadiusMiles} miles out in any direction. Outside that range? Shop drop-off is always on the table.`}
          />
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreaCities.map((group) => (
              <div key={group.region}>
                <h3 className="font-display text-sm font-semibold tracking-widest text-ink uppercase">
                  {group.region}
                </h3>
                <ul className="mt-3 flex flex-col gap-1.5 text-sm text-steel">
                  {group.towns.map((town) => (
                    <li key={town}>{town}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="gallery" className="scroll-mt-24 border-t border-line bg-fog py-16 lg:py-20">
        <Container>
          <SectionHeading
            eyebrow="Gallery"
            title="Recent work"
            description="A few jobs Ben's finished recently — swipe through, or tap a photo for the full-size view."
          />
          <div className="mt-10">
            <h3 className="font-display text-sm font-semibold tracking-widest text-ink uppercase">
              Finished Work
            </h3>
            <div className="mt-4">
              <PhotoCarousel photos={galleryPhotos} />
            </div>
          </div>
          <div className="mt-10">
            <h3 className="font-display text-sm font-semibold tracking-widest text-ink uppercase">
              Before &amp; After
            </h3>
            <div className="mt-4">
              <BeforeAfterCarousel pairs={beforeAfterPairs} />
            </div>
          </div>
        </Container>
      </section>

      <section id="about" className="scroll-mt-24 py-16 lg:py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="font-display text-sm font-semibold tracking-[0.2em] text-steel uppercase">
              About
            </p>
            <h2 className="mt-2 text-balance font-display text-3xl font-semibold tracking-tight text-ink uppercase sm:text-4xl">
              One welder. No middlemen.
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-lg leading-relaxed text-steel">
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
          </div>
          <div className="flex flex-col gap-4 rounded-lg border border-line bg-fog p-8">
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
        </Container>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-line bg-black py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col items-start gap-6">
              <p className="font-display text-sm font-semibold tracking-[0.2em] text-mist uppercase">
                Contact
              </p>
              <h2 className="max-w-xl text-balance font-display text-3xl font-semibold tracking-tight text-paper uppercase sm:text-4xl">
                Got something that needs welded?
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-mist">
                Text a wide photo and a close-up of the damage, plus whether
                it needs to be mobile or can come to the shop. Ben will tell
                you what it takes to fix it.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <SmsQuoteButton size="lg" />
                <CallButton
                  size="lg"
                  className="border-paper text-paper hover:bg-paper hover:text-black"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border border-white/10 bg-charcoal p-8">
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

          <div className="mt-12 border-t border-white/10 pt-12">
            <p className="font-display text-sm font-semibold tracking-[0.2em] text-mist uppercase">
              Or send the details here
            </p>
            <div className="mt-6 max-w-2xl">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
