const steps = [
  {
    number: "01",
    title: "Text your photos",
    detail:
      "Tap the quote button, send a wide shot and a close-up of what needs fixing, and a quick description.",
  },
  {
    number: "02",
    title: "Get a straight answer",
    detail:
      "Ben looks at the damage and tells you what it'll take — in-shop or out at your location.",
  },
  {
    number: "03",
    title: "Get it welded right",
    detail:
      "Mobile rig comes to you, or bring it by the shop. Either way, it gets fixed to last.",
  },
];

export function HowItWorks() {
  return (
    <ol className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {steps.map((step) => (
        <li key={step.number} className="flex flex-col gap-3">
          <span className="font-display text-4xl font-semibold text-line">
            {step.number}
          </span>
          <h3 className="font-display text-lg font-semibold tracking-wide text-ink uppercase">
            {step.title}
          </h3>
          <p className="text-sm leading-relaxed text-steel">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
