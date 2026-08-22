// Remaining placeholder data (hours, service list, service-area city list)
// still needs Ben's confirmation. See README.md "Before you launch" checklist.

export const siteConfig = {
  businessName: "BB's Mobile Welding",
  ownerName: "Ben Bjornsen",
  tagline: "Mobile welding repair, on your site or in the shop.",
  domain: "https://bbsmobilewelding.com",

  phoneDisplay: "(319) 573-7507",
  phoneHref: "tel:+13195737507",
  smsNumber: "+13195737507",

  email: "benbj@bbsmobilewelding.com",

  facebookUrl: "https://www.facebook.com/profile.php?id=61579404106617",

  // Web3Forms access key — managed under Launch Auxo's Web3Forms account.
  // This key's notification email is set to benbj@bbsmobilewelding.com,
  // so contact-form submissions land in Ben's inbox. The key itself
  // doesn't change if the destination email is edited from the Web3Forms
  // dashboard — only swap this value if a genuinely different form/key
  // is created.
  web3formsAccessKey: "e0863328-8191-427d-8c99-661b0f04877d",

  city: "Cedar Rapids, Iowa",
  addressLocality: "Cedar Rapids",
  addressRegion: "IA",
  postalCode: "52401",

  serviceRadiusMiles: 120,
  serviceRadiusLabel: "2-hour radius of Cedar Rapids",

  hours: [
    { day: "Monday – Friday", time: "7:00 AM – 6:00 PM" },
    { day: "Saturday", time: "By appointment" },
    { day: "Sunday", time: "Closed" },
  ],
} as const;

export const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#service-area", label: "Service Area" },
  { href: "#gallery", label: "Gallery" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

// The SMS pre-filled quote template — Ben's favorite feature, adapted from
// True Repair Welding's version. Kept in one place so it's consistent
// wherever the "Text Photos" button appears.
export const smsQuoteTemplate = `Hi, I'd like a quote for a welding repair.

Please include:
- Wide photo
- Close-up photo
- Extra photos if helpful

Brief description:


Repair location:
- In-shop
- Mobile welding (address):


Your name:`;

// Cross-platform sms: link — the "?&body=" combo works on both iOS and Android.
export const smsQuoteHref = `sms:${siteConfig.smsNumber}?&body=${encodeURIComponent(
  smsQuoteTemplate
)}`;

export type GalleryPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type BeforeAfterPair = {
  before: GalleryPhoto;
  after: GalleryPhoto;
};

// Real jobsite photos — the "Finished Work" carousel.
export const galleryPhotos: GalleryPhoto[] = [
  {
    src: "/gallery/01-stair-railing.jpg",
    width: 720,
    height: 960,
    alt: "Custom black metal stair railing, interior residential install",
  },
  {
    src: "/gallery/02-aluminum-fabrication.jpg",
    width: 2048,
    height: 1536,
    alt: "Custom aluminum frame fabrication in the shop",
  },
  {
    src: "/gallery/03-commercial-crane.jpg",
    width: 1536,
    height: 2048,
    alt: "Commercial jobsite with cranes setting steel on a storefront",
  },
  {
    src: "/gallery/04-commercial-bracket.jpg",
    width: 1536,
    height: 2048,
    alt: "Steel bracket installed on a commercial building exterior",
  },
  {
    src: "/gallery/05-weld-detail.jpg",
    width: 1536,
    height: 2048,
    alt: "Close-up of a finished weld seam on fabricated equipment",
  },
  {
    src: "/gallery/06-trailer-repair.jpg",
    width: 1536,
    height: 2048,
    alt: "Trailer frame weld repair",
  },
  {
    src: "/gallery/07-gate-repair.jpg",
    width: 1152,
    height: 2048,
    alt: "Gate frame corner weld repair, outdoor",
  },
];

// The "Before & After" carousel — empty until real pairs exist. To add
// one, drop both files in public/gallery/ and add an entry like:
//
// {
//   before: { src: "/gallery/08-trailer-before.jpg", width, height, alt: "Before: ..." },
//   after: { src: "/gallery/08-trailer-after.jpg", width, height, alt: "After: ..." },
// },
export const beforeAfterPairs: BeforeAfterPair[] = [];

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
};

// Rough list — Ben will refine this later.
export const services: Service[] = [
  {
    slug: "mobile-onsite-welding",
    title: "Mobile On-Site Welding",
    short: "Ben brings the rig to your farm, jobsite, or driveway.",
    description:
      "If it can't be moved, Ben comes to it. The mobile rig handles field repairs on equipment, structures, and anything else too big or too broken to haul in — anywhere within about 2 hours of Cedar Rapids.",
  },
  {
    slug: "farm-ag-equipment-repair",
    title: "Farm & Ag Equipment Repair",
    short: "Cracked implements, worn hitches, broken attachments.",
    description:
      "Planters, wagons, augers, hitches, loader buckets — ag equipment takes a beating. Ben repairs and reinforces it in the field so you're not waiting on a shop appointment during planting or harvest.",
  },
  {
    slug: "trailer-repair-fabrication",
    title: "Trailer Repair & Fabrication",
    short: "Frames, hitches, ramps, cross-members, axles.",
    description:
      "Trailer frame cracks, busted ramps, rusted-out cross-members, hitch repair — Ben fixes what's there or fabricates a replacement piece when patching it isn't the right call.",
  },
  {
    slug: "structural-custom-fabrication",
    title: "Structural & Custom Fabrication",
    short: "Brackets, supports, one-off steel builds.",
    description:
      "Custom brackets, supports, railings, or a one-off piece built from a rough sketch — Ben fabricates to fit, not off a shelf.",
  },
  {
    slug: "fencing-gate-repair",
    title: "Fencing & Gate Repair",
    short: "Sagging gates, broken pipe fence, damaged panels.",
    description:
      "Pipe fence, livestock panels, gate frames that have sagged or gotten bent — welded back square and solid, on-site.",
  },
  {
    slug: "steel-aluminum-stainless",
    title: "Steel, Aluminum & Stainless Welding",
    short: "MIG, TIG, and stick — whatever the material calls for.",
    description:
      "Mild steel, aluminum, or stainless — Ben works across materials and picks the right process for the job instead of forcing one process on everything.",
  },
];

export type PricingPackage = {
  name: string;
  price: string;
  description: string;
};

// Flat-rate packages, replacing hourly/estimate-based pricing. In-shop
// packages cover shop time + consumables; mobile packages add travel.
export const inShopPackages: PricingPackage[] = [
  { name: "Quick Fix", price: "$90", description: "1 hour of shop welding + consumables" },
  { name: "Half Day", price: "$325", description: "Up to 4 hours of welding + consumables" },
  { name: "Full Day", price: "$625", description: "Up to 8 hours of welding + consumables" },
  { name: "Project Package", price: "$1,200", description: "Up to 16 hours of welding + consumables" },
];

export const mobilePackages: PricingPackage[] = [
  { name: "Mobile Quick Fix", price: "$265", description: "1 hour welding + travel + consumables" },
  { name: "Mobile Half Day", price: "$655", description: "4 hours welding + travel + consumables" },
  { name: "Mobile Full Day", price: "$1,185", description: "8 hours welding + travel + consumables" },
  { name: "Mobile Project Package", price: "$2,245", description: "16 hours welding + travel + consumables" },
];

// Rough list of towns within ~2 hours of Cedar Rapids, grouped loosely by direction.
// Ben should confirm/trim this list before launch.
export const serviceAreaCities: { region: string; towns: string[] }[] = [
  {
    region: "Cedar Rapids Metro",
    towns: ["Cedar Rapids", "Marion", "Hiawatha", "Robins", "Fairfax"],
  },
  {
    region: "Iowa City Area",
    towns: ["Iowa City", "Coralville", "North Liberty", "Solon", "Tiffin"],
  },
  {
    region: "East",
    towns: ["Dubuque", "Maquoketa", "Manchester", "Monticello", "Anamosa"],
  },
  {
    region: "Quad Cities & Southeast",
    towns: ["Davenport", "Bettendorf", "Muscatine", "Tipton", "Washington"],
  },
  {
    region: "North",
    towns: ["Waterloo", "Cedar Falls", "Waverly", "Independence", "Vinton"],
  },
  {
    region: "West",
    towns: ["Marshalltown", "Grinnell", "Newton", "Williamsburg", "Des Moines"],
  },
];
