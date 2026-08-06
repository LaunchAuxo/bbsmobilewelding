import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

// The logo file has a white background, so it's wrapped in a matching
// white badge everywhere it's placed — including on dark sections —
// rather than letting a stray white box appear uninvited.
export function Logo({
  size = 48,
  variant = "dark",
}: {
  size?: number;
  variant?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label={`${siteConfig.businessName} — home`}
    >
      <span
        className="flex shrink-0 items-center justify-center rounded-md bg-paper p-1 ring-1 ring-line"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.jpg"
          alt={`${siteConfig.businessName} logo`}
          width={1500}
          height={1500}
          className="h-full w-full object-contain"
          priority
        />
      </span>
      <span
        className={`font-display text-lg leading-none font-semibold tracking-wide uppercase ${
          variant === "light" ? "text-paper" : "text-ink"
        }`}
      >
        BB&rsquo;s Mobile
        <br />
        Welding
      </span>
    </Link>
  );
}
