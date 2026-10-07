/**
 * Home page narrative — written for this site.
 * Craton invents, protects, and ships AI products for trust-critical work.
 */

export const mindset = Object.freeze({
  id: 'mindset',
  eyebrow: { num: '01', label: 'Why we exist' },
  title: 'Hard problems deserve',
  titleAccent: 'honest systems.',
  lead: 'Craton builds AI-enabled products for work where a wrong answer is expensive — regulated industries, evidence-heavy decisions, and teams that must show their reasoning.',
  beliefs: [
    {
      title: 'Evidence in plain sight.',
      copy: 'We do not hide the trail. Every material output should point back to the rule, the document, or the review that supports it.',
    },
    {
      title: 'Invent, then protect.',
      copy: 'Novel methods are filed before they scale. That habit protects partners and keeps the company durable as domains expand.',
    },
    {
      title: 'Operators at the core.',
      copy: 'Products are led by people who have lived the domain — not by a temporary bench of advisors passing through.',
    },
  ],
})

export const domains = Object.freeze({
  id: 'focus',
  eyebrow: { num: '02', label: 'Where we work' },
  title: 'Two frontiers.',
  titleAccent: 'One discipline.',
  lead: 'We start where trust is non-negotiable, then reuse the same invention habit as the next domain opens.',
  items: [
    {
      num: '01',
      title: 'MedTech regulation',
      copy: 'EU MDR and IVDR work for device and IVD manufacturers — classification, GSPR gaps, and evidence mapped for expert review.',
      signal: 'RAccelerator',
    },
    {
      num: '02',
      title: 'Agentic commerce',
      copy: 'Purchase decisions made by autonomous agents still need independent review evidence the buyer can inspect before checkout.',
      signal: 'ReviewsIntel',
    },
  ],
})

export const products = Object.freeze({
  id: 'products',
  eyebrow: { num: '03', label: 'Products' },
  title: 'Built for decisions',
  titleAccent: 'that need proof.',
  aside: 'Two products. Same discipline — evidence you can inspect before you act.',
  hint: 'Scroll to stack',
  items: [
    {
      id: 'ra',
      num: '01',
      name: 'RAccelerator',
      badge: 'In development',
      kicker: 'Regulatory affairs platform',
      tagline:
        'Turn technical files into arguments experts can review — with the evidence still attached.',
      description:
        'Built for medical-device and IVD teams running classification and GSPR gap work under MDR and IVDR. Every material finding points back to the rule and the document that supports it.',
      points: [
        'EU MDR / IVDR technical files',
        'Classification & GSPR gap assessment',
        'Traceability for expert review',
      ],
      cta: 'Explore RAccelerator',
      image: {
        src: '/products/ra-composition.jpg',
        alt: 'RAccelerator product composition — desktop, mobile, and card',
      },
    },
    {
      id: 'ri',
      num: '02',
      name: 'ReviewsIntel',
      badge: 'Patent pending',
      kicker: 'Evidence layer for agents',
      tagline:
        'Let shopping agents recommend only what the reviews can support — and show why.',
      description:
        'Connects review evidence to an agent’s purchase context so a recommendation arrives with rationale a human can authorize before checkout.',
      points: [
        'Agent purchase context',
        'Review evidence binding',
        'Human authorization in the loop',
      ],
      cta: 'Explore ReviewsIntel',
      image: {
        src: '/products/ri-composition.jpg',
        alt: 'ReviewsIntel product composition — desktop, mobile, and card',
      },
    },
  ],
})

export const approach = Object.freeze({
  id: 'approach',
  eyebrow: { num: '04', label: 'How we work' },
  title: 'A repeatable way to',
  titleAccent: 'enter a domain.',
  lead: 'We do not chase every idea. We run a method that can survive diligence — from the first question to the product in market.',
  steps: [
    {
      num: '01',
      phase: 'Discover',
      title: 'Find the expensive decision.',
      copy: 'Map the domain, the people accountable for outcomes, and the moment where evidence is still assembled by hand.',
      tag: 'Research',
    },
    {
      num: '02',
      phase: 'Protect',
      title: 'File what is novel.',
      copy: 'Protect the approach early so customers, partners, and the company can invest without watching the idea walk away.',
      tag: 'IP',
    },
    {
      num: '03',
      phase: 'Staff',
      title: 'Put operators in charge.',
      copy: 'Domain leaders with decades in the field own the product — credibility an enterprise can verify.',
      tag: 'Leadership',
    },
    {
      num: '04',
      phase: 'Ship',
      title: 'Release with judgment in the loop.',
      copy: 'Build, evaluate, and refine with humans accountable for the output. Then carry the method into the next domain.',
      tag: 'Delivery',
    },
  ],
})

export const company = Object.freeze({
  id: 'company',
  eyebrow: { num: '05', label: 'Company' },
  title: 'A stable core for',
  titleAccent: 'restless products.',
  story: [
    'Craton Technologies is based in Frisco, Texas. We invent AI-enabled products for regulated and evidence-heavy work, protect what is novel, assemble domain leadership, and ship — then apply the same habit elsewhere.',
    'A craton is the ancient bedrock of a continent. That is our metaphor: one engineering discipline and patent-first culture, from which domain-specific products can rise.',
  ],
  chips: [
    'Artificial intelligence',
    'Domain expertise',
    'Evidence-led',
    'Patent-first',
  ],
  founder: {
    name: 'Sheik Ahamed Ali',
    role: 'Founder & CEO',
    bio: 'Twenty-two years building enterprise systems where failure was expensive — national-scale retail integration, then platform and architecture leadership — inventing from inside operating roles.',
    facts: [
      '3 granted US patents',
      '9 pending',
      'Judge, R&D 100 Awards',
      'TOGAF 9.1',
    ],
  },
  roster: [
    {
      title: 'Chief Regulatory Affairs Officer',
      detail: 'Co-founder · EU MDR / IVDR',
    },
    {
      title: 'Chief Product Officer',
      detail: 'Co-founder · product & acceptance',
    },
    {
      title: 'Head of Regulatory Affairs, IVD',
      detail: 'In vitro diagnostics',
    },
    { title: 'Chief Commercial Officer', detail: 'Go-to-market' },
    {
      title: 'Regulatory consultants',
      detail: 'Independent MD and IVD specialists',
    },
    { title: 'AI engineering', detail: 'Palo Alto' },
  ],
  rosterNote: 'Roles shown; names appear with each person’s consent.',
  impact: [
    {
      eyebrow: 'Community',
      title: 'DiscoverSTEM Foundation',
      copy: 'A 501(c)(3) our founder helped establish, supporting underprivileged children in STEM and entrepreneurship.',
    },
    {
      eyebrow: 'Recognition',
      title: 'R&D 100 Awards',
      copy: 'Our founder serves on the judging panel for a long-running recognition of applied research.',
    },
  ],
})

export const contact = Object.freeze({
  id: 'contact',
  kicker: 'Ready when you are',
  title: 'Tell us what you are',
  titleAccent: 'working through.',
  lead: 'Choose how you want to engage — we will route you to the right conversation.',
  doors: [
    {
      id: 'pilot',
      label: 'Start a pilot',
      copy: 'Evaluate RAccelerator on your technical file with your RA team in the loop.',
    },
    {
      id: 'partner',
      label: 'Partner with Craton',
      copy: 'Co-develop or distribute with a team that files first and ships.',
    },
    {
      id: 'lead',
      label: 'Lead a product',
      copy: 'Bring deep domain expertise and own the product you build.',
    },
    {
      id: 'join',
      label: 'Join the team',
      copy: 'Hard problems, an AI-native stack, and a founder who has shipped.',
    },
  ],
  topics: [
    'Start a pilot',
    'Partner with Craton',
    'Lead a product',
    'Join the team',
    'Something else',
  ],
  form: {
    nameLabel: 'Name',
    nameError: 'Enter your name so we know who to reply to.',
    emailLabel: 'Work email',
    emailError: 'Enter a work email so we can reply from the right team.',
    companyLabel: 'Company',
    topicLabel: 'Conversation',
    messageLabel: 'What are you working on?',
    messagePlaceholder: 'e.g. Class IIb device, MDR technical file due Q2',
    submit: 'Send message',
    note: 'Opens your email client to Craton. We reply within two business days.',
    success: 'Your email draft is ready — send it and we will reply soon.',
  },
})

export const footerCopy = Object.freeze({
  boiler:
    'Craton Technologies invents, protects, and ships AI-enabled products for regulated and evidence-heavy industries — beginning with RAccelerator for MedTech regulatory affairs, and applying the same method to agentic commerce and new domains.',
})
