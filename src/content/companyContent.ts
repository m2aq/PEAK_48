/**
 * Single source of truth for all copy on the site.
 * `confirmed: true`  -> taken from the client's brief / existing site.
 * `confirmed: false` -> proposed placeholder copy, PENDING client approval.
 * Nothing here states years of experience, project counts, clients,
 * awards, licenses or testimonials: do not add them unless verified.
 */

export const brand = {
  name: "PEAK 48",
  full: "PEAK 48 CONSTRUCTION",
  tagline: "Innovative Construction Solutions", // confirmed (existing site)
  region: "Arizona", // confirmed: logo uses an Arizona silhouette
  contactEmail: "", // PENDING: leave empty until confirmed
  contactPhone: "", // PENDING
  address: "", // PENDING
};

export const nav = [
  { id: "about", label: "Company" },
  { id: "philosophy", label: "Philosophy" },
  { id: "capabilities", label: "Capabilities" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Innovative Construction Solutions",
  title: ["BUILT WITH", "PURPOSE."],
  subtitle:
    "Building the future through quality and precision. A construction company shaped by two commitments: craftsmanship and innovation.",
  cta: "Start a project",
  cta2: "Explore capabilities",
};

export const about = {
  label: "01 — Company",
  heading: "Quality and innovation, built into every detail.",
  body: [
    "PEAK 48 Construction approaches every project with a clear point of view: the future is built through quality and precision.",
    "Our values are simple and non-negotiable. Quality guides the work. Innovation moves it forward.",
  ],
  confirmed: true,
};

export const philosophy = {
  label: "02 — Philosophy",
  steps: [
    {
      key: "Quality",
      text: "Work that is held to a standard before it is held to a schedule. Quality is where every decision starts.",
      confirmed: true,
    },
    {
      key: "Precision",
      text: "Measured, coordinated and documented. Precision is how a plan becomes a structure without surprises.",
      confirmed: false,
    },
    {
      key: "Innovation",
      text: "Better methods, better materials, better outcomes. Innovation is how we keep building forward.",
      confirmed: true,
    },
  ],
};

/** PENDING verification of real services — categories are configurable. */
export const capabilities = {
  label: "03 — Capabilities",
  heading: "Capabilities",
  note: "Service categories are placeholders pending confirmation.",
  items: [
    { n: "01", title: "Commercial Construction", text: "Ground-up and tenant build-outs delivered with disciplined coordination.", scene: 0 },
    { n: "02", title: "Residential Construction", text: "Custom homes and renovations built around the way people live.", scene: 1 },
    { n: "03", title: "Design-Build", text: "One accountable team from first sketch to final walkthrough.", scene: 2 },
    { n: "04", title: "Preconstruction", text: "Scope, budget and schedule aligned before the first shovel.", scene: 3 },
  ],
};

/** Conceptual illustrations only. These are NOT PEAK 48 projects. */
export const work = {
  label: "04 — Work",
  heading: "Selected work",
  disclaimer:
    "Conceptual illustrations shown for layout purposes. Project photography will be added once supplied and approved by PEAK 48.",
  items: [
    { title: "Project Name 01", meta: "Category · Location", scene: 4, size: "lg" },
    { title: "Project Name 02", meta: "Category · Location", scene: 1, size: "sm" },
    { title: "Project Name 03", meta: "Category · Location", scene: 2, size: "sm" },
    { title: "Project Name 04", meta: "Category · Location", scene: 0, size: "md" },
  ],
};

/** Proposed process copy — PENDING approval. */
export const process = {
  label: "05 — Process",
  heading: "How we build.",
  steps: [
    { n: "01", title: "Discover", text: "We listen first: goals, site, constraints and budget." },
    { n: "02", title: "Plan", text: "Scope, schedule and cost defined before work begins." },
    { n: "03", title: "Build", text: "Coordinated execution with clear, regular communication." },
    { n: "04", title: "Deliver", text: "Final inspection, walkthrough and a clean handoff." },
  ],
};

export const contact = {
  label: "06 — Contact",
  heading: "Let's build what's next.",
  text: "Tell us about your project. We'll follow up with next steps.",
  demoNotice:
    "Demo mode: this form is not connected to an email service and does not send messages.",
};
