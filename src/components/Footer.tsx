import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { services, siteConfig, navLinks } from "@/lib/site-config";
import { MailIcon, MapPinIcon, PhoneIcon } from "./icons";

export function Footer() {
  return (
    <footer className="bg-black text-fog">
      <Container className="grid gap-10 py-16 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo size={52} variant="light" />
          <p className="max-w-sm text-sm leading-relaxed text-mist">
            {siteConfig.tagline} Owner-operated out of {siteConfig.city} —
            mobile welding within a {siteConfig.serviceRadiusLabel}, or bring
            it to the shop.
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-widest text-paper uppercase">
            Site
          </h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-mist hover:text-paper">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold tracking-widest text-paper uppercase">
            Contact
          </h2>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-mist">
            <li>
              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-2 hover:text-paper"
              >
                <PhoneIcon className="size-4 shrink-0" />
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-paper"
              >
                <MailIcon className="size-4 shrink-0" />
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPinIcon className="size-4 shrink-0" />
              {siteConfig.city}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.businessName}. All
            rights reserved.
          </p>
          <p className="max-w-md sm:text-right">
            {services.length} core services &middot; serving{" "}
            {siteConfig.serviceRadiusLabel.toLowerCase()}
          </p>
        </Container>
      </div>
    </footer>
  );
}
