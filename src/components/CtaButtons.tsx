import { siteConfig, smsQuoteHref } from "@/lib/site-config";
import { MessageIcon, PhoneIcon } from "./icons";

const sizeClasses = {
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
} as const;

// The button Ben specifically asked for — a prefilled SMS template so a
// customer can text photos straight away instead of filling out a form.
export function SmsQuoteButton({
  size = "md",
  className = "",
  label = "Text Photos, Get a Fast Quote",
  variant = "solid",
}: {
  size?: keyof typeof sizeClasses;
  className?: string;
  label?: string;
  variant?: "solid" | "glow";
}) {
  if (variant === "glow") {
    return (
      <a
        href={smsQuoteHref}
        className={`cta-glow group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-display font-semibold tracking-wide text-paper uppercase ${sizeClasses[size]} ${className}`}
      >
        <span className="cta-glow__shimmer pointer-events-none" aria-hidden="true" />
        <MessageIcon className="relative z-10 size-5 shrink-0" />
        <span className="cta-glow__label relative z-10">{label}</span>
      </a>
    );
  }

  return (
    <a
      href={smsQuoteHref}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-ink font-display font-semibold tracking-wide text-paper uppercase transition-colors hover:bg-black ${sizeClasses[size]} ${className}`}
    >
      <MessageIcon className="size-5 shrink-0" />
      {label}
    </a>
  );
}

// tone picks a complete, non-overlapping set of border/text/hover
// classes rather than letting a caller override individual hover
// classes via className — two same-specificity hover utilities
// targeting the same property (e.g. a passed-in hover:text-black
// fighting this component's own hover:text-paper) resolve by
// stylesheet order, not by which one "looks more specific," and that
// previously produced white-on-white invisible text on dark sections.
const toneClasses = {
  dark: "border-ink text-ink hover:bg-ink hover:text-paper",
  light: "border-paper text-paper hover:bg-paper hover:text-black",
} as const;

export function CallButton({
  size = "md",
  tone = "dark",
  className = "",
}: {
  size?: keyof typeof sizeClasses;
  tone?: keyof typeof toneClasses;
  className?: string;
}) {
  return (
    <a
      href={siteConfig.phoneHref}
      className={`inline-flex items-center justify-center gap-2 rounded-md border font-display font-semibold tracking-wide uppercase transition-all hover:-translate-y-px ${toneClasses[tone]} ${sizeClasses[size]} ${className}`}
    >
      <PhoneIcon className="size-5 shrink-0" />
      Call {siteConfig.phoneDisplay}
    </a>
  );
}
