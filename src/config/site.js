export const site = {
  name: 'Craton Technologies',
  legalName: 'Craton Technologies LLC',
  url: 'https://craton.io',
  email: 'hello@craton.io',
  location: 'Frisco, Texas',
  logo: '/brand/craton-logo.png',
  founder: {
    name: 'Sheik Ahamed Ali',
    role: 'Founder & CEO',
    bio: 'Twenty-two years building enterprise systems where failure was expensive — retail integration at national scale, then platform and architecture leadership — with the habit of inventing from inside operating roles.',
  },
  bookingUrl: import.meta.env.VITE_BOOKING_URL || '',
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
  seo: {
    title: 'Craton Technologies | AI for EU MDR & IVDR Regulatory Affairs',
    description:
      'Craton invents and ships AI-enabled products for regulated work — starting with RAccelerator for EU MDR/IVDR device classification and GSPR gap assessment.',
    keywords:
      'EU MDR, IVDR, GSPR gap assessment, regulatory AI, MedTech, RAccelerator, ReviewsIntel, Craton Technologies',
  },
  nav: [
    { label: 'Domain', href: '#domain' },
    { label: 'RAccelerator', href: '#raccelerator' },
    { label: 'ReviewsIntel', href: '#reviewsintel' },
    { label: 'How it works', href: '#approach' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],

  proof: [
    { value: '22+', label: 'Years shipping enterprise systems' },
    { value: '3 · 9', label: 'US patents granted · pending (Aug 2026)' },
    { value: 'Sept 2026', label: 'First RAccelerator enterprise evaluation' },
    { value: 'Frisco, TX', label: 'Founder-funded product company' },
  ],

  /**
   * Illustrative diligence voices (Whyphy-style proof rows + expand media).
   * Not named customer endorsements — swap when partners consent.
   */
  voices: [
    {
      id: 'elena',
      logo: '/voices/logos/clarityra.svg',
      logoAlt: 'ClarityRA',
      name: 'Elena Voss',
      role: 'VP, Regulatory Affairs · illustrative',
      quote:
        'We do not need another black-box score. We need every GSPR row tied to a document we can defend in a Notified Body meeting — with the expert still in the loop. My only regret is waiting this long to demand evidence-first tooling.',
      image: '/voices/elena.jpg',
      glow: 'rgba(196,93,74,0.28)',
    },
    {
      id: 'marcus',
      logo: '/voices/logos/axiom.svg',
      logoAlt: 'Axiom IVD',
      name: 'Marcus Chen',
      role: 'Head of Quality · illustrative',
      quote:
        'Classification and gap assessment still burn months of senior time. If the argument is visible — rule, evidence, exception — we can review in days instead of rebuilding the file by hand.',
      image: '/voices/marcus.jpg',
      glow: 'rgba(30,42,58,0.22)',
    },
    {
      id: 'priya',
      logo: '/voices/logos/trustlane.svg',
      logoAlt: 'TrustLane',
      name: 'Priya Nair',
      role: 'Director, Product Trust · illustrative',
      quote:
        'When an agent recommends a purchase, the rationale has to travel with it. Independent review evidence before checkout is the difference between automation and liability.',
      image: '/voices/priya.jpg',
      glow: 'rgba(0,122,150,0.28)',
    },
    {
      id: 'jonas',
      logo: '/voices/logos/northform.svg',
      logoAlt: 'Northform',
      name: 'Jonas Berger',
      role: 'Director, Regulatory · illustrative',
      quote:
        'Enterprise evaluation only moves when the system shows its work. Traceable mapping beats a polished demo every time — especially when a wrong citation costs months.',
      image: '/voices/jonas.jpg',
      glow: 'rgba(47,63,84,0.25)',
    },
    {
      id: 'amira',
      logo: '/voices/logos/lumen.svg',
      logoAlt: 'Lumen Devices',
      name: 'Amira Solé',
      role: 'Program Lead · illustrative',
      quote:
        'We bought time for the experts — not another dashboard. The gap list has to be something a reviewer can own in a meeting, with human judgment still central.',
      image: '/voices/amira.jpg',
      glow: 'rgba(58,109,140,0.28)',
    },
    {
      id: 'derek',
      logo: '/voices/logos/harbor.svg',
      logoAlt: 'Harbor Cart',
      name: 'Derek Mills',
      role: 'Head of Platform · illustrative',
      quote:
        'Agents will buy. The question is whether the evidence arrives with the cart — or after the chargeback. That is the bar for trust systems in agentic commerce.',
      image: '/voices/derek.jpg',
      glow: 'rgba(0,168,196,0.28)',
    },
  ],
  beliefs: [
    {
      title: 'Trust is the product.',
      body: 'In regulated work, a recommendation is worth exactly as much as the evidence behind it. We build so the evidence is always in view.',
    },
    {
      title: 'Protect before you build.',
      body: 'Novel ideas are filed first, then engineered — so enterprises can invest with confidence in a young company.',
    },
    {
      title: 'Experts own what they build.',
      body: 'Every product is led by people who have done the work for decades, with product-level ownership — not consultants passing through.',
    },
  ],
  steps: [
    {
      n: '01',
      name: 'Ideas',
      title: 'Question deeply.',
      body: 'Start with a real problem. Understand the domain, the people, and the decisions that matter before defining a solution.',
      tag: 'Discovery & research',
    },
    {
      n: '02',
      name: 'Focus',
      title: 'Protect the idea.',
      body: 'Novel approaches are filed before they are built, so the company and its partners can invest with confidence.',
      tag: 'Invention & IP',
    },
    {
      n: '03',
      name: 'Innovation',
      title: 'Bring in the domain’s best.',
      body: 'Product leaders with decades in the field own what they build — credibility an enterprise can check.',
      tag: 'Domain leadership',
    },
    {
      n: '04',
      name: 'Forward',
      title: 'Ship. Refine. Repeat.',
      body: 'Develop, evaluate, and refine with human judgment in the loop. Then apply the same method to the next domain.',
      tag: 'Development & refinement',
    },
  ],
  products: {
    ra: {
      id: 'raccelerator',
      name: 'RAccelerator',
      status: 'In development',
      domain: 'MedTech regulatory affairs',
      headline: 'AI for EU MDR & IVDR technical documentation and GSPR gap assessment.',
      summary:
        'RAccelerator streamlines EU MDR and IVDR work for medical-device and IVD manufacturers — device classification and GSPR gap assessment today, with reasoning traceable to the rule and the evidence.',
      problem:
        'A GSPR gap assessment means reading thousands of pages of evidence against Annex I requirements, by hand, under deadline.',
      change:
        'Evidence is mapped to each requirement with the reasoning shown, so the team reviews an argument instead of building one.',
      today: [
        'Device classification (MDR / IVDR) with traceable rule reasoning',
        'GSPR gap assessment mapped to Annex I chapters',
        'Critical gaps and evidence documents at a glance',
      ],
      next: [
        'MDD→MDR and IVDD→IVDR remediation workflows',
        'Regulatory intelligence and lifecycle management',
      ],
      disclaimer:
        'Development-stage product. Illustrations are conceptual, not production screenshots, and do not represent regulatory approval or guaranteed compliance.',
    },
    ri: {
      id: 'reviewsintel',
      name: 'ReviewsIntel',
      status: 'Patent pending',
      domain: 'Evidence for agentic commerce',
      headline: 'Bind autonomous purchase decisions to independent review evidence.',
      summary:
        'ReviewsIntel connects product-review evidence with agentic purchase decisions, so the relationship between a recommendation, its context, and its supporting evidence is clear before anything is bought.',
      problem:
        'Shopping agents act on prompts and listings. The evidence that a product actually performs sits in reviews nobody has verified or connected.',
      change:
        'A recommendation arrives with its evidence and context attached, so a purchase can be authorized on what the evidence supports.',
      today: [
        'Review evidence enters the decision as structured proof',
        'Decision context tied to real buyer needs',
        'Evidence-backed authorization with visible rationale',
      ],
      next: [
        'Broader agent frameworks and commerce integrations',
        'Enterprise evaluation pathways',
      ],
      disclaimer:
        'Development-stage product. US provisional patent filed June 2026. Visuals illustrate the concept; not a claim about deployed capabilities.',
    },
  },
  doors: [
    {
      id: 'pilot',
      title: 'Start a pilot',
      body: 'Evaluate RAccelerator on your own technical file, with your regulatory team in the loop.',
      audience: 'customer',
    },
    {
      id: 'partner',
      title: 'Partner with Craton',
      body: 'Co-develop or distribute a product with a team that files first and ships.',
      audience: 'customer',
    },
    {
      id: 'lead',
      title: 'Lead a product',
      body: 'Bring decades of domain expertise and own the product you build.',
      audience: 'talent',
    },
    {
      id: 'join',
      title: 'Join Craton',
      body: 'Serious problems, a modern AI-native stack, and a founder who has shipped.',
      audience: 'talent',
    },
  ],
}
