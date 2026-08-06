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
}: {
  size?: keyof typeof sizeClasses;
  className?: string;
  label?: string;
}) {
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

export function CallButton({
  size = "md",
  className = "",
}: {
  size?: keyof typeof sizeClasses;
  className?: string;
}) {
  return (
    <a
      href={siteConfig.phoneHref}
      className={`inline-flex items-center justify-center gap-2 rounded-md border border-ink font-display font-semibold tracking-wide text-ink uppercase transition-colors hover:bg-ink hover:text-paper ${sizeClasses[size]} ${className}`}
    >
      <PhoneIcon className="size-5 shrink-0" />
      Call {siteConfig.phoneDisplay}
    </a>
  );
}
