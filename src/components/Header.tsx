"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { SmsQuoteButton } from "./CtaButtons";
import { navLinks, siteConfig } from "@/lib/site-config";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Logo size={52} />

        <nav className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide whitespace-nowrap text-steel uppercase transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={siteConfig.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap text-ink"
          >
            <PhoneIcon className="size-4 shrink-0" />
            {siteConfig.phoneDisplay}
          </a>
          <SmsQuoteButton size="md" label="Text for a Quote" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex size-11 items-center justify-center rounded-md border border-line text-ink xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-paper xl:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium tracking-wide text-steel uppercase hover:bg-fog hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-line pt-4">
              <a
                href={siteConfig.phoneHref}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-ink"
              >
                <PhoneIcon className="size-4" />
                {siteConfig.phoneDisplay}
              </a>
              <SmsQuoteButton size="md" className="w-full" />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
