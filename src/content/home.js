/**
 * Home page narrative — written for this site.
 * Craton invents, protects, and ships AI products for trust-critical work.
 */

export const mindset = Object.freeze({
  id: 'mindset',
  eyebrow: { num: '07', label: 'Why we exist' },
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
  eyebrow: { num: '01', label: 'Where we work' },
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

export const practice = Object.freeze({
  id: 'practice',
  eyebrow: { num: '03', label: 'The work' },
  title: 'How a hard problem',
  titleAccent: 'becomes a product.',
  aside: 'Scroll through how we find the work, build the answer, and keep a person on the decision.',
  hint: 'Keep scrolling',
  panels: [
    {
      id: 'problem',
      num: '01',
      domain: 'Where we start',
      title: 'Find the work',
      titleAccent: 'still done by hand.',
      copy: 'We look for decisions where a wrong answer is expensive and the proof is still scattered — a technical file rebuilt from folders, or a purchase an agent is about to make with nothing to show for it.',
      signal: 'The expensive decision',
      image: {
        src: '/practice/problem.jpg',
        alt: 'A desk still covered in folders and loose pages',
      },
      beats: [
        {
          title: 'A file no one can reopen',
          detail:
            'Regulatory teams spend the week reconstructing how a device was classed and which documents actually support it.',
        },
        {
          title: 'A buy with no reason attached',
          detail:
            'An agent can recommend a product. The person paying still cannot see which reviews the choice rests on.',
        },
        {
          title: 'We start there',
          detail:
            'If the decision is cheap, or the trail is already clear, it is not our product.',
        },
      ],
    },
    {
      id: 'method',
      num: '02',
      domain: 'How we look',
      title: 'Follow the source,',
      titleAccent: 'not the summary.',
      copy: 'The useful answer is the one someone else can check. We ask what has to be true, attach the document or the review that supports it, and leave the gaps in plain sight.',
      signal: 'Same habit, both domains',
      image: {
        src: '/practice/source.jpg',
        alt: 'A source document tied to the papers it supports',
      },
      beats: [
        {
          title: 'Name what “good” means',
          detail:
            'A class a regulatory lead can challenge. A recommendation a buyer can refuse.',
        },
        {
          title: 'Keep the source next to the claim',
          detail:
            'A rule beside the classification. A review beside the reason to buy.',
        },
        {
          title: 'Do not hide what is missing',
          detail:
            'An open gap is more useful than a confident line with nothing behind it.',
        },
      ],
    },
    {
      id: 'products',
      num: '03',
      domain: 'What we ship',
      title: 'Two products.',
      titleAccent: 'One job.',
      copy: 'Each product prepares a case a person can review. Neither one makes the final call.',
      signal: 'RAccelerator · ReviewsIntel',
      image: {
        src: '/practice/products.jpg',
        alt: 'Two products side by side on a quiet desk',
      },
      beats: [
        {
          title: 'RAccelerator',
          detail:
            'Helps device and IVD teams run classification and gap work so an expert reviews an argument, not a pile of files.',
        },
        {
          title: 'ReviewsIntel',
          detail:
            'Connects an agent’s purchase brief to the reviews behind it, so checkout waits for a reason.',
        },
        {
          title: 'Built to be checked',
          detail:
            'If you cannot see how the answer was reached, the product is not finished.',
        },
      ],
    },
    {
      id: 'fix',
      num: '04',
      domain: 'How it stays honest',
      title: 'Fix the work.',
      titleAccent: 'Keep the judgment.',
      copy: 'We protect what is new, put people who have done the job in charge, and ship with someone accountable for the output. Then we use the same method on the next domain.',
      signal: 'Invent · protect · ship',
      image: {
        src: '/practice/judgment.jpg',
        alt: 'A closed notebook, a pen, and a mark that the decision is still human',
      },
      beats: [
        {
          title: 'File it before it scales',
          detail:
            'Novel methods are protected early, so partners can invest without watching the idea walk away.',
        },
        {
          title: 'Operators lead',
          detail:
            'The product is owned by people who have lived the work — not by a bench of advisors passing through.',
        },
        {
          title: 'A person still decides',
          detail:
            'The system prepares the case. A regulatory lead or a buyer decides what happens next.',
        },
      ],
    },
  ],
})

export const products = Object.freeze({
  id: 'products',
  eyebrow: { num: '02', label: 'Products' },
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
      href: '/products/raccelerator',
      fits: 'Device and IVD teams running classification and GSPR gap work under EU MDR and IVDR.',
      limits: [
        'It prepares the case. A regulatory lead makes the call — the product does not sign a classification or close a gap.',
        'It is in development. The first enterprise evaluation was September 2026. This site does not name that customer or publish a result.',
      ],
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
      href: '/products/reviewsintel',
      fits: 'Teams that let an agent recommend a purchase, and still need the reviews behind that recommendation before anyone pays.',
      limits: [
        'It does not place the order. Checkout waits until a person authorizes it.',
        'Patent pending as of June 2026. There is no public store integration to try on this site.',
      ],
      image: {
        src: '/products/ri-composition.jpg',
        alt: 'ReviewsIntel product composition — desktop, mobile, and card',
      },
    },
  ],
})

export const approach = Object.freeze({
  id: 'approach',
  eyebrow: { num: '08', label: 'How we work' },
  title: 'A repeatable way to',
  titleAccent: 'enter a domain.',
  lead: 'The story above is one problem becoming a product. This is the order we use when the next domain opens — the same four moves, every time.',
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
  eyebrow: { num: '10', label: 'Company' },
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

export const proof = Object.freeze({
  id: 'proof',
  line: 'Building the evidence layer for regulated work.',
  facts: [
    '22+ years shipping enterprise systems',
    '3 US patents granted · 9 pending',
    'ReviewsIntel — patent pending, June 2026',
    'RAccelerator — first enterprise evaluation, Sept 2026',
    'Frisco, Texas · founder-funded',
  ],
  status: {
    kicker: 'Where this stands',
    title: 'Early, and said plainly.',
    items: [
      {
        label: 'RAccelerator',
        detail:
          'The first enterprise evaluation was September 2026. We are not publishing a customer name or a result from that work here.',
      },
      {
        label: 'ReviewsIntel',
        detail:
          'Patent pending as of June 2026. There is no public checkout integration to try on this site yet.',
      },
      {
        label: 'Patents',
        detail:
          'Three US patents are granted and nine are pending. Titles and numbers stay off this page until they can be shared.',
      },
    ],
  },
})

export const security = Object.freeze({
  id: 'security',
  eyebrow: { num: '04', label: 'Data' },
  title: 'A technical file',
  titleAccent: 'is not a demo.',
  lead: 'People send us work a wrong answer would make expensive. This is how that work is handled — including what we will not claim.',
  items: [
    {
      title: 'Your file stays yours.',
      copy: 'A pilot does not put a technical file or a review set into a public model. We do not train on a customer’s documents.',
    },
    {
      title: 'Only named people see it.',
      copy: 'Access during an engagement is limited to the people named for that work — your team and the Craton people on it.',
    },
    {
      title: 'This website stores no message.',
      copy: 'Send message opens a draft in your email app, addressed to hello@craton.io. Your mail provider delivers it. The site does not keep a copy, and it does not run a marketing or analytics script.',
    },
    {
      title: 'No seal we have not earned.',
      copy: 'We do not show SOC 2, ISO, or similar marks. Ask what a specific engagement covers before you send a file.',
    },
  ],
})

export const pilot = Object.freeze({
  id: 'pilot',
  eyebrow: { num: '05', label: 'A pilot' },
  title: 'What happens',
  titleAccent: 'when you write.',
  lead: 'A pilot is a bounded review of one real decision. It is not a subscription, and it is not a promise that we will take every file.',
  steps: [
    {
      num: '01',
      title: 'You write.',
      copy: 'Name the device, the file, or the purchase decision. A sentence on what “done” looks like is enough to start.',
    },
    {
      num: '02',
      title: 'We say if it fits.',
      copy: 'You get a reply within two business days. If it is outside the work we can do, we say so.',
    },
    {
      num: '03',
      title: 'Your person stays in it.',
      copy: 'A regulatory lead or a buyer reviews with us. You keep the source documents. We do not take the decision away from them.',
    },
    {
      num: '04',
      title: 'You receive a case.',
      copy: 'The argument, the sources, and the gaps that are still open. What happens next is your call.',
    },
  ],
  cta: 'Start a pilot',
})

export const faq = Object.freeze({
  id: 'faq',
  eyebrow: { num: '06', label: 'Questions' },
  title: 'Asked before',
  titleAccent: 'the first call.',
  items: [
    {
      q: 'Does Craton make the regulatory decision?',
      a: 'No. RAccelerator prepares a case a regulatory lead can challenge. It does not sign a classification, close a gap, or replace the person accountable for the file.',
    },
    {
      q: 'Will a shopping agent check out by itself?',
      a: 'No. ReviewsIntel attaches the reviews to the recommendation. A person authorizes the purchase. The product does not place the order.',
    },
    {
      q: 'Are you a consulting firm?',
      a: 'No. We invent and ship products. Domain operators lead them. A pilot is how a team evaluates a product, not a staffed project we leave behind.',
    },
    {
      q: 'Can I read the patents?',
      a: 'You can read the public count: 3 US patents granted, 9 pending, including ReviewsIntel as of June 2026. Publication numbers are not listed on this site until they can be shared.',
    },
    {
      q: 'Where are you based?',
      a: 'Craton Technologies is in Frisco, Texas, and founder-funded. Regulatory leadership is on the company section. AI engineering sits in Palo Alto.',
    },
    {
      q: 'How do I start?',
      a: 'Use Start a pilot and tell us the decision you need checked. If you would rather talk about a partnership, a product to lead, or a role, the same form routes that too.',
    },
  ],
})

export const patents = Object.freeze({
  id: 'patents',
  eyebrow: { num: '09', label: 'Patents' },
  title: 'What we will say',
  titleAccent: 'in public.',
  lead: 'Filing comes before a method scales. This is the record we are willing to put on the site. It is not a docket, and it is not a customer list.',
  figures: [
    { value: '3', label: 'US patents granted' },
    { value: '9', label: 'Still pending' },
    { value: 'June 2026', label: 'ReviewsIntel filed' },
  ],
  notes: [
    {
      title: 'Granted',
      copy: 'Three US patents are granted. Titles and numbers are not published here.',
    },
    {
      title: 'Pending',
      copy: 'Nine applications are pending. ReviewsIntel is one of them, filed June 2026.',
    },
    {
      title: 'Why it is filed first',
      copy: 'A partner should be able to invest without watching the idea walk away. Protection is part of the product, not a press release after launch.',
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
