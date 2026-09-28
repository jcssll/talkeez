// ─────────────────────────────────────────────────────────────────────────────
// Talkeez marketing site — central configuration.
// All page copy, navigation, links, and offer details live here, separate from
// layout code. Nothing in this file renders by itself.
//
// OFFER DETAILS — REVIEW QUEUE
// The entries in `offerReviewQueue` are unconfirmed business decisions. They are
// intentionally NOT shown anywhere on the site until the owner confirms them.
// Do not invent pricing, discounts, trial terms, testimonials, integrations,
// security certifications, or outcome claims.
// ─────────────────────────────────────────────────────────────────────────────

export const links = {
  myDailyActivity: "https://www.mydailyactivity.org/",
  demoBooking: "https://calendly.com/subscriptions-talkeez",
  contactEmail: "subscriptions@talkeez.org",
  tools: {
    aac: "/aac.html",
    sensoryTimer: "/sensory-timer.html",
    pictureCards: "/picture-cards.html",
  },
  legacy: {
    dailyActivityDemo: "/daily-activity-demo.html",
    aiInsights: "/ai-insights.html",
    districtSolutions: "/district-solutions.html",
    about: "/about.html",
    help: "/help.html",
    contact: "/contact.html",
    donate: "/donate.html",
    privacy: "/privacy.html",
    terms: "/terms.html",
    hipaa: "/hipaa.html",
    ferpa: "/ferpa.html",
    accessibility: "/accessibility.html",
  },
} as const;

// ── Review queue: missing business decisions, consolidated ───────────────────
export const offerReviewQueue = [
  {
    id: "mda-pricing",
    topic: "My Daily Activity subscription pricing",
    status: "REVIEW — not published anywhere on the site",
  },
  {
    id: "mda-trial",
    topic: "Trial length and terms for My Daily Activity",
    status: "REVIEW — no trial claims published",
  },
  {
    id: "signup-flow",
    topic: "Exact signup/trial entry URL on mydailyactivity.org",
    status: "REVIEW — CTAs link to the top-level domain only",
  },
  {
    id: "trust-accuracy",
    topic: "Accuracy of the existing HIPAA / FERPA statement pages",
    status: "REVIEW — linked under “Privacy & policies” only; never presented as badges or certifications",
  },
  {
    id: "districts-placement",
    topic: "District Solutions page placement",
    status: "REVIEW — linked from schools context and footer until the audience pages exist (milestone 2)",
  },
] as const;

// ── Navigation ───────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  internal?: boolean; // internal = React Router route; everything else is a plain <a>
  testId: string;
}

export const mainNav: NavItem[] = [
  { label: "Free tools", href: "/#free-tools", testId: "nav-link-free-tools" },
  { label: "My Daily Activity", href: "/my-daily-activity", internal: true, testId: "nav-link-mda" },
  { label: "FAQ", href: "/#faq", testId: "nav-link-faq" },
  { label: "Contact", href: links.legacy.contact, testId: "nav-link-contact" },
];

export const audienceNav: NavItem[] = [
  { label: "For families", href: "/for-families", internal: true, testId: "nav-link-families" },
  { label: "For educators & schools", href: "/for-educators", internal: true, testId: "nav-link-educators" },
  { label: "For providers & support teams", href: "/for-providers", internal: true, testId: "nav-link-providers" },
];

export const footerGroups: { title: string; items: NavItem[] }[] = [
  {
    title: "Products",
    items: [
      { label: "Free AAC", href: links.tools.aac, testId: "footer-link-aac" },
      { label: "Sensory Timer", href: links.tools.sensoryTimer, testId: "footer-link-timer" },
      { label: "Picture Cards", href: links.tools.pictureCards, testId: "footer-link-cards" },
      { label: "My Daily Activity", href: "/my-daily-activity", internal: true, testId: "footer-link-mda" },
      { label: "Interactive demo", href: links.legacy.dailyActivityDemo, testId: "footer-link-demo" },
      { label: "AI Insights", href: links.legacy.aiInsights, testId: "footer-link-ai-insights" },
      { label: "District Solutions", href: links.legacy.districtSolutions, testId: "footer-link-districts" },
    ],
  },
  {
    title: "Who it’s for",
    items: [
      { label: "For families", href: "/for-families", internal: true, testId: "footer-link-families" },
      { label: "For educators & schools", href: "/for-educators", internal: true, testId: "footer-link-educators" },
      { label: "For providers & support teams", href: "/for-providers", internal: true, testId: "footer-link-providers" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", href: links.legacy.about, testId: "footer-link-about" },
      { label: "Help & FAQ", href: links.legacy.help, testId: "footer-link-help" },
      { label: "Contact", href: links.legacy.contact, testId: "footer-link-contact" },
      { label: "Donate", href: links.legacy.donate, testId: "footer-link-donate" },
    ],
  },
  {
    title: "Privacy & policies",
    items: [
      { label: "Privacy Policy", href: links.legacy.privacy, testId: "footer-link-privacy" },
      { label: "Terms of Service", href: links.legacy.terms, testId: "footer-link-terms" },
      { label: "HIPAA Statement", href: links.legacy.hipaa, testId: "footer-link-hipaa" },
      { label: "FERPA Notice", href: links.legacy.ferpa, testId: "footer-link-ferpa" },
      { label: "Accessibility", href: links.legacy.accessibility, testId: "footer-link-accessibility" },
    ],
  },
];

// ── Trust facts (accurate, sourced from the existing site — no certifications) ─
export const trustFacts = [
  "Independent software company — Maryland, USA",
  "Born from a parent’s experience, built with care",
  "The free tools stay free — no account, no sign-up",
  "My Daily Activity is a paid subscription, clearly separate from the free tools",
] as const;

// ── Audience pages (reusable template — see components/site/AudiencePage.tsx) ─
export interface AudienceConfig {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headlinePre: string;
  headlineAccent: string;
  headlinePost: string;
  lead: string;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta: { label: string; href: string };
  benefits: { n: string; title: string; text: string }[];
  demo: { title: string; text: string; img: string; imgAlt: string; caption: string; ctaLabel: string; ctaHref: string };
  faqs: FaqEntry[];
  band: { title: string; body: string; secondary: { label: string; href: string; external?: boolean } };
}

export const audiences: AudienceConfig[] = [
  {
    slug: "families",
    name: "For families",
    metaTitle: "For families — Talkeez · A clearer picture of your child’s day",
    metaDescription:
      "My Daily Activity, by Talkeez, gives families one calm place to document care, behavior, learning, and progress — for everyone who shares a child’s day.",
    eyebrow: "For families",
    headlinePre: "One clear picture of",
    headlineAccent: "your child’s day,",
    headlinePost: "for everyone who shares it.",
    lead: "Between home, school, therapy, and grandparents, the details of a child’s day end up scattered across texts, notebooks, and memory. My Daily Activity, by Talkeez, gives your family one calm place to document care, behavior, learning, and progress — together.",
    primaryCta: { label: "Explore My Daily Activity", href: links.myDailyActivity, external: true },
    secondaryCta: { label: "Open the free AAC", href: links.tools.aac },
    benefits: [
      { n: "01", title: "Log the day as it happens", text: "Care tasks, behavior notes, and learning moments — recorded in the moment, not reconstructed at night." },
      { n: "02", title: "Share one calm summary", text: "A clear end-of-day picture for everyone who helps — instead of a flood of texts and secondhand updates." },
      { n: "03", title: "Bring a real record to meetings", text: "Notes and progress you can revisit before appointments, planning conversations, and school meetings." },
    ],
    demo: {
      title: "See the family view.",
      text: "The interactive demo runs entirely on sample data. Check off activities, add a note, and watch the family summary update — just like a real day.",
      img: "/assets/screenshots/daily-activity-demo.png",
      imgAlt: "The My Daily Activity interactive demo showing the family view with sample data",
      caption: "Interactive demo · family view · sample data",
      ctaLabel: "Try the interactive demo",
      ctaHref: links.legacy.dailyActivityDemo,
    },
    faqs: [
      {
        q: "Is My Daily Activity free for families?",
        a: "No. It’s a paid subscription application. The Talkeez tools — the AAC board, Sensory Timer, and Picture Cards — stay free, with no account and no sign-up.",
      },
      {
        q: "Can we see it before subscribing?",
        a: "Yes. The interactive demo on this site runs with sample data, so you can explore the daily routine, activity notes, and the family summary view first. Signup happens at mydailyactivity.org.",
      },
      {
        q: "Do the free tools sync with My Daily Activity?",
        a: "No. They’re separate products, and nothing syncs between them automatically. The free tools stand on their own; My Daily Activity is there when you need a documented record.",
      },
      {
        q: "Who is it built for?",
        a: "Families first — and the people around them. My Daily Activity is designed for families, educators, caregivers, and support teams who all share part of a child’s day.",
      },
    ],
    band: {
      title: "A clearer picture of your child’s day starts here.",
      body: "Explore the paid application for documenting care, behavior, learning, and progress — or try the demo with sample data first.",
      secondary: { label: "Try the interactive demo", href: links.legacy.dailyActivityDemo },
    },
  },
  {
    slug: "educators",
    name: "For educators & schools",
    metaTitle: "For educators & schools — Talkeez · My Daily Activity demos and pilots",
    metaDescription:
      "My Daily Activity, by Talkeez, gives classrooms one calm workflow for documenting care, behavior, learning, and progress. Book a demo or pilot for your school.",
    eyebrow: "For educators & schools",
    headlinePre: "Less time documenting the day.",
    headlineAccent: "More time",
    headlinePost: "teaching it.",
    lead: "Paper logs, group texts, and scattered spreadsheets eat the hours around actual teaching. My Daily Activity, by Talkeez, gives your classroom one calm workflow for care, behavior, learning, and progress — and a clear summary for families at the end of it.",
    primaryCta: { label: "Book a demo or pilot", href: links.demoBooking, external: true },
    secondaryCta: { label: "Start a free sensory timer", href: links.tools.sensoryTimer },
    benefits: [
      { n: "01", title: "Document without disrupting class", text: "Quick, structured entries for care, behavior, and learning — designed to fit the flow of the room, not fight it." },
      { n: "02", title: "Send one clear summary home", text: "Day-end summaries for families replace handwritten notebooks and end-of-day message threads." },
      { n: "03", title: "Keep everyone in the room aligned", text: "Teachers, aides, and specialists contribute to the same record of the day — one picture, not five versions." },
    ],
    demo: {
      title: "Explore a sample classroom.",
      text: "The interactive demo runs entirely on sample data — a classroom day with routines, activity notes, and the family summary it produces.",
      img: "/assets/screenshots/daily-activity-demo.png",
      imgAlt: "The My Daily Activity interactive demo showing a sample classroom day",
      caption: "Interactive demo · sample classroom",
      ctaLabel: "Try the interactive demo",
      ctaHref: links.legacy.dailyActivityDemo,
    },
    faqs: [
      {
        q: "How do we arrange a demo or pilot?",
        a: "Book a time directly with the Talkeez team through our demo booking page. We’ll walk your team through My Daily Activity and discuss what a pilot looks like for your setting.",
      },
      {
        q: "Is there pricing for schools?",
        a: "We don’t list school pricing on this site. Mention your setting when you book a demo, and the team will follow up with details.",
      },
      {
        q: "What about FERPA?",
        a: "We publish a FERPA notice alongside our other policies — you’ll find it linked below. District teams can also start with our district solutions page or contact us directly.",
      },
      {
        q: "Can we use the free tools in class?",
        a: "Yes. The Sensory Timer, Picture Cards, and AAC board are free for classroom use — no account, no sign-up. They’re separate from My Daily Activity, and nothing syncs between them automatically.",
      },
    ],
    band: {
      title: "Bring a calmer workflow to your classroom.",
      body: "Book a demo or pilot with the Talkeez team — or explore the application on your own first.",
      secondary: { label: "Explore My Daily Activity", href: links.myDailyActivity, external: true },
    },
  },
  {
    slug: "providers",
    name: "For providers & support teams",
    metaTitle: "For providers & support teams — Talkeez · One shared record of the day",
    metaDescription:
      "My Daily Activity, by Talkeez, keeps care, behavior, learning, and progress in one shared place for caregivers, therapists, and support teams. Book a demo or pilot.",
    eyebrow: "For providers & support teams",
    headlinePre: "Care that spans shifts",
    headlineAccent: "deserves a record",
    headlinePost: "that keeps up.",
    lead: "Caregivers, therapists, and support staff each hold part of the day — and handoffs are where the details get lost. My Daily Activity, by Talkeez, keeps care, behavior, learning, and progress in one shared place, so every handoff starts informed.",
    primaryCta: { label: "Book a demo or pilot", href: links.demoBooking, external: true },
    secondaryCta: { label: "Create a free picture board", href: links.tools.pictureCards },
    benefits: [
      { n: "01", title: "Quick entries during care", text: "Log what matters in the moment, from the room you’re in — care tasks, behavior notes, and progress as they happen." },
      { n: "02", title: "Handoffs without gaps", text: "The next person on sees the same picture you left — no re-telling, no lost details between shifts and settings." },
      { n: "03", title: "Families stay in the loop", text: "One calm daily summary keeps families informed without scattered updates from every direction." },
    ],
    demo: {
      title: "Walk through a day of care.",
      text: "The interactive demo runs entirely on sample data — routines, activity notes, and the summary families see at the end of the day.",
      img: "/assets/screenshots/daily-activity-demo.png",
      imgAlt: "The My Daily Activity interactive demo showing a sample day of care",
      caption: "Interactive demo · sample data",
      ctaLabel: "Try the interactive demo",
      ctaHref: links.legacy.dailyActivityDemo,
    },
    faqs: [
      {
        q: "How do we arrange a demo or pilot?",
        a: "Book a time directly with the Talkeez team through our demo booking page. We’ll walk your team through My Daily Activity and discuss a pilot for your setting.",
      },
      {
        q: "Does it work across shifts and settings?",
        a: "That’s what it’s built for: one shared record of care, behavior, learning, and progress that the whole support team works from across the day.",
      },
      {
        q: "Do the free Talkeez tools sync with it?",
        a: "No. The AAC board, Sensory Timer, and Picture Cards are separate, free products — nothing syncs automatically. They stay free whether or not you use My Daily Activity.",
      },
      {
        q: "Where can we see pricing?",
        a: "Plan and signup details live at mydailyactivity.org. For team and organizational arrangements, book a demo and we’ll follow up with details.",
      },
    ],
    band: {
      title: "Give every handoff the full picture.",
      body: "Book a demo or pilot with the Talkeez team — or explore the application on your own first.",
      secondary: { label: "Explore My Daily Activity", href: links.myDailyActivity, external: true },
    },
  },
];

// ── Homepage copy ────────────────────────────────────────────────────────────
export const homeCopy = {
  eyebrow: "Independent software · Personal purpose",
  // Headline rendered line-by-line in the hero; keep the full sentence intact.
  headline: "Software for communication, daily routines, and a clearer picture of the day.",
  supporting:
    "Talkeez builds free AAC, visual timers, and picture-card tools for families and educators. My Daily Activity is our paid subscription application for documenting care, behavior, learning, and progress.",
  primaryCta: { label: "Explore My Daily Activity", href: links.myDailyActivity },
  secondaryCta: { label: "Use our free tools", href: "#free-tools" },
  clarityNote: "Free tools: no account, no sign-up. My Daily Activity: a separate paid subscription.",
} as const;

export const marqueePhrases = [
  "For families",
  "For educators",
  "For caregivers",
  "For support teams",
  "For everyday life",
] as const;

// ── Free tools (bento) ───────────────────────────────────────────────────────
export interface Tool {
  name: string;
  tag: string;
  blurb: string;
  href: string;
  img: string;
  imgAlt: string;
  chipClass: string;
  featured?: boolean;
  testId: string;
}

export const tools: Tool[] = [
  {
    name: "Free AAC",
    tag: "Free · No sign-up",
    blurb:
      "A tap-to-speak communication board with everyday vocabulary and a sentence builder. Open it and it works — no account, no installation.",
    href: links.tools.aac,
    img: "/assets/screenshots/aac.png",
    imgAlt: "The Talkeez free AAC communication board in use",
    chipClass: "bg-bubble-blue-soft text-bubble-blue",
    featured: true,
    testId: "tool-card-aac",
  },
  {
    name: "Sensory Timer",
    tag: "Free · No sign-up",
    blurb: "Gentle, visual countdowns for classroom activities, breaks, and transitions.",
    href: links.tools.sensoryTimer,
    img: "/assets/screenshots/sensory-timer.png",
    imgAlt: "The Talkeez sensory timer counting down",
    chipClass: "bg-[#E7F4EA] text-bubble-green",
    testId: "tool-card-timer",
  },
  {
    name: "Picture Cards",
    tag: "Free · No sign-up",
    blurb: "Personal picture boards for choices, routines, and what comes next.",
    href: links.tools.pictureCards,
    img: "/assets/screenshots/picture-cards.png",
    imgAlt: "A board of Talkeez digital picture cards",
    chipClass: "bg-[#FCF3D7] text-[#8a6d00]",
    testId: "tool-card-cards",
  },
];

export const freeToolsInvite = {
  text: "Using the free tools with your family or classroom? My Daily Activity is our separate paid application for documenting the day — care, behavior, learning, and progress. Nothing syncs automatically; it’s simply the next step when you need a record.",
  cta: { label: "See how it works", href: "/my-daily-activity" },
} as const;

// ── My Daily Activity (featured product) ─────────────────────────────────────
export const mdaCopy = {
  badge: "Paid subscription · by Talkeez",
  name: "My Daily Activity",
  tagline: "A clearer picture of the day, documented.",
  description:
    "My Daily Activity, by Talkeez, helps families, educators, caregivers, and support teams document care, behavior, learning, and progress — in one calm place instead of scattered notes and threads.",
  benefits: [
    "Document care tasks, behavior, learning, and progress as the day happens.",
    "Share a clear daily summary with families — no more handwritten notebooks.",
    "Built for home routines, classrooms, clinics, and support teams alike.",
  ],
  separateNote:
    "My Daily Activity is a separate product from the free tools. The tools stay free, and nothing syncs between them automatically.",
  primaryCta: { label: "Explore My Daily Activity", href: links.myDailyActivity },
  demoCta: { label: "Try the interactive demo", href: links.legacy.dailyActivityDemo },
  demoImg: "/assets/screenshots/daily-activity-demo.png",
  demoImgAlt: "The My Daily Activity interactive demo with sample data",
} as const;

export const mdaDocumentRows = [
  { n: "01", title: "Care tasks", text: "Toileting, feeding, medication, and sensory needs — logged without disrupting the day." },
  { n: "02", title: "Behavior notes", text: "Quick, structured entries that capture what happened, when, and in what context." },
  { n: "03", title: "Learning & progress", text: "Wins, goals, and moments worth remembering — documented as they happen." },
  { n: "04", title: "Daily summaries", text: "One clear picture of the day to share between home, school, and support teams." },
] as const;

export const mdaAudiences = [
  {
    title: "For families",
    text: "Keep a shared record of care, routines, and progress across everyone who helps at home.",
    cta: { label: "Start at mydailyactivity.org", href: links.myDailyActivity, external: true },
    testId: "mda-audience-families",
  },
  {
    title: "For educators & schools",
    text: "Document the day across classrooms and keep families in the loop. District teams can start with our district solutions page.",
    cta: { label: "Book a demo or pilot", href: links.demoBooking, external: true },
    extra: { label: "District solutions", href: links.legacy.districtSolutions },
    testId: "mda-audience-schools",
  },
  {
    title: "For providers & support teams",
    text: "Give caregivers, therapists, and support staff one calm place to record the day.",
    cta: { label: "Book a demo or pilot", href: links.demoBooking, external: true },
    testId: "mda-audience-providers",
  },
] as const;

// ── FAQs (facts only — no invented claims) ───────────────────────────────────
export interface FaqEntry {
  q: string;
  a: string;
}

export const homeFaqs: FaqEntry[] = [
  {
    q: "Are the Talkeez tools really free?",
    a: "Yes. The AAC board, Sensory Timer, and Picture Cards are free to use, with no account, no sign-up, and no installation. Open the page and start.",
  },
  {
    q: "What’s the difference between the free tools and My Daily Activity?",
    a: "The free tools help in the moment — speaking, timing, and showing what comes next. My Daily Activity is our separate paid subscription application for documenting care, behavior, learning, and progress over time.",
  },
  {
    q: "Do the free tools sync with My Daily Activity?",
    a: "No. They are separate products, and nothing syncs between them automatically. The free tools stand on their own; My Daily Activity is there when you need a documented record of the day.",
  },
  {
    q: "I’m a school or provider — how do I arrange a demo or pilot?",
    a: "Book a time directly with the Talkeez team through our demo booking page. We’ll walk through My Daily Activity with you and discuss a pilot for your setting.",
  },
  {
    q: "Where do I sign up for My Daily Activity?",
    a: "At mydailyactivity.org — our paid subscription application. Every “Explore My Daily Activity” button on this site takes you there.",
  },
];

export const mdaFaqs: FaqEntry[] = [
  {
    q: "Is My Daily Activity free?",
    a: "No. My Daily Activity is a paid subscription application. The Talkeez free tools — AAC, Sensory Timer, and Picture Cards — remain free and separate.",
  },
  {
    q: "Where can I see pricing?",
    a: "Plan and signup details live on the My Daily Activity website at mydailyactivity.org. We don’t list figures on this page yet.",
  },
  {
    q: "Who is My Daily Activity for?",
    a: "Families, educators and schools, caregivers, and support teams — anyone who needs a clear, shared record of care, behavior, learning, and progress across the day.",
  },
  {
    q: "Can I try it before subscribing?",
    a: "Yes — the interactive demo on this site runs with sample data, so you can explore the workflow first. Schools and providers can also book a guided demo or pilot with our team.",
  },
  {
    q: "Does it replace the free Talkeez tools?",
    a: "No. The free tools stay free and continue on their own. My Daily Activity is a separate product, and nothing syncs between them automatically.",
  },
];

// ── Shared CTA band copy ─────────────────────────────────────────────────────
export const ctaBandCopy = {
  eyebrow: "My Daily Activity, by Talkeez",
  title: "Ready for a clearer picture of the day?",
  body: "Explore the paid application for documenting care, behavior, learning, and progress — or keep using the free tools for as long as they help.",
  primary: { label: "Explore My Daily Activity", href: links.myDailyActivity, external: true },
  secondary: { label: "Book a demo", href: links.demoBooking, external: true },
} as const;
