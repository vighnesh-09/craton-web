/** Home page section copy — sourced from craton-v2 content. */

export const mindset = Object.freeze({
  id: 'mindset',
  eyebrow: { num: '01', label: 'The Craton mindset' },
  title: 'The next breakthrough starts with a',
  titleAccent: 'better question.',
  lead: 'What if complex information could become clearer decisions? We bring bold thinking, deep research, and thoughtful architecture together to build products for work where trust is the hard part.',
  beliefs: [
    {
      title: 'Trust is the product.',
      copy: 'In regulated work, a recommendation is worth exactly as much as the evidence behind it. We build so the evidence is always in view.',
    },
    {
      title: 'Protect before you build.',
      copy: 'Novel ideas are filed first, then engineered. That discipline is what lets an enterprise trust a young company with critical work.',
    },
    {
      title: 'Experts own what they build.',
      copy: 'Every product is led by people who have done the work for decades, with product-level ownership — not consultants passing through.',
    },
  ],
})

export const products = Object.freeze({
  id: 'products',
  eyebrow: { num: '02', label: 'Intelligence, applied' },
  title: 'Complexity meets',
  titleAccent: 'clarity.',
  aside:
    'Two products, two domains, one conviction: deep problems deserve purpose-built intelligence with the reasoning shown.',
  foot: {
    lead: 'One company. Two frontiers.',
    copy: 'Built around real decisions, not technology for its own sake.',
    cta: { label: 'Explore our approach', href: '#approach' },
  },
  items: [
    {
      id: 'ra',
      num: '01',
      name: 'RAccelerator',
      domain: 'MedTech regulatory affairs',
      badge: 'In development',
      kicker: 'AI-enabled MedTech platform',
      title: 'Regulatory complexity.',
      titleAccent: 'Connected clarity.',
      description:
        'RAccelerator streamlines EU MDR and IVDR work for medical-device and IVD manufacturers — device classification and GSPR gap assessment today, with the reasoning traceable to the rule and the evidence.',
      facts: [
        {
          label: 'Problem',
          value:
            'A GSPR gap assessment means reading thousands of pages of evidence against Annex I requirements, by hand, under deadline.',
        },
        {
          label: 'What changes',
          value:
            'Evidence is mapped to each requirement with the reasoning shown, so the team reviews an argument instead of building one.',
        },
        {
          label: 'Proof',
          value:
            'First enterprise evaluation · global device manufacturer · Sept 2026',
          mono: true,
        },
      ],
      preview: {
        label: 'GSPR gap assessment',
        note: 'Illustrative view',
        stats: [
          { label: 'GSPR gaps', value: '7', hint: 'of 23' },
          { label: 'Critical gaps', value: '2' },
          { label: 'Evidence docs', value: '41', hint: 'mapped' },
        ],
        rows: [
          {
            req: 'GSPR 1',
            name: 'Performance and safety',
            status: 'Covered',
            tone: 'ok',
            evidence: 'CER-04 · RMF-02',
          },
          {
            req: 'GSPR 3',
            name: 'Risk management system',
            status: 'Gap',
            tone: 'gap',
            evidence: 'RMF-02 · partial',
          },
          {
            req: 'GSPR 10.4',
            name: 'Substances (CMR / ED)',
            status: 'Critical gap',
            tone: 'crit',
            evidence: 'No evidence linked',
          },
          {
            req: 'GSPR 23.4',
            name: 'Instructions for use',
            status: 'Gap',
            tone: 'gap',
            evidence: 'IFU-01 · rev. pending',
          },
        ],
        foot: [
          'Expert review remains central',
          'Rule + evidence traceability on every row',
        ],
      },
    },
    {
      id: 'ri',
      num: '02',
      name: 'ReviewsIntel',
      domain: 'Evidence for agentic commerce',
      badge: 'Patent pending',
      kicker: 'Evidence for agentic commerce',
      title: 'Every decision',
      titleAccent: 'deserves evidence.',
      description:
        'ReviewsIntel binds an autonomous agent’s purchase decision to independent product-review evidence, so agents buy on proof — with the rationale visible to the person they act for.',
      facts: [
        {
          label: 'Problem',
          value:
            'Shopping agents act on prompts and listings. The evidence that a product actually performs sits in reviews nobody has verified or connected.',
        },
        {
          label: 'What changes',
          value:
            'A recommendation arrives with its evidence and context attached, so a purchase can be authorized on what the evidence supports.',
        },
        {
          label: 'Proof',
          value: 'US provisional filed June 2026 · built with an AI-native SDLC',
          mono: true,
        },
      ],
      preview: {
        label: 'The decision layer',
        note: 'Conceptual flow',
        request:
          'Cordless drill for a home workshop · budget ≤ $180 · needed by Friday',
        chips: [
          { title: 'Battery life under load', meta: '412 reviews · 3 sources' },
          { title: 'Chuck durability', meta: '168 reviews · 2 sources' },
          { title: 'Warranty response', meta: '77 reviews · 1 source' },
        ],
        context:
          'Weekend use, occasional masonry, price ceiling honored. Two candidates meet the evidence bar; one exceeds budget.',
        verdict: {
          title: 'Authorized on evidence',
          detail: 'Rationale attached · reviewable by the buyer before checkout',
        },
        foot: ['Connected rationale', 'Not just another recommendation'],
      },
    },
  ],
})

export const approach = Object.freeze({
  id: 'approach',
  eyebrow: { num: '03', label: 'How we move forward' },
  title: 'Curious by nature.',
  titleAccent: 'Rigorous by design.',
  steps: [
    {
      num: '01',
      phase: 'Ideas',
      title: 'Question deeply.',
      copy: 'Start with a real problem. Understand the domain, the people, and the decisions that matter before defining a solution.',
      tag: 'Discovery & research',
    },
    {
      num: '02',
      phase: 'Focus',
      title: 'Protect the idea.',
      copy: 'Novel approaches are filed before they are built, so the company and its partners can invest with confidence.',
      tag: 'Invention & IP',
    },
    {
      num: '03',
      phase: 'Innovation',
      title: 'Bring in the domain’s best.',
      copy: 'Product leaders with decades in the field own what they build, with product-level equity — credibility an enterprise can check.',
      tag: 'Domain leadership',
    },
    {
      num: '04',
      phase: 'Forward',
      title: 'Ship. Refine. Repeat.',
      copy: 'Develop, evaluate, and refine with human judgment in the loop. Then apply the same method to the next domain.',
      tag: 'Development & refinement',
    },
  ],
})

export const company = Object.freeze({
  id: 'company',
  eyebrow: { num: '04', label: 'Craton Technologies' },
  title: 'Bold thinking.',
  titleAccent: 'Grounded execution.',
  story: [
    'Craton Technologies is an innovation-driven product company based in Frisco, Texas. We identify hard, high-trust problems in regulated or evidence-heavy industries, invent a novel approach, protect it, assemble the domain leadership to make it credible, and ship it as a product — then repeat the method in the next domain.',
    'A craton is the ancient, stable core of a continent — the bedrock everything else is built on. That is the idea: one method, one engineering discipline, one patent-first habit, from which restless, domain-specific products rise.',
  ],
  chips: [
    'Artificial intelligence',
    'Domain expertise',
    'Evidence-led thinking',
    'Patent-first',
  ],
  founder: {
    name: 'Sheik Ahamed Ali',
    role: 'Founder & CEO',
    bio: 'Twenty-two years building enterprise systems where failure was expensive — retail integration at national scale, then platform and architecture leadership — with the habit of inventing from inside operating roles.',
    facts: ['3 granted US patents', '9 pending', 'Judge, R&D 100 Awards', 'TOGAF 9.1'],
  },
  roster: [
    {
      title: 'Chief Regulatory Affairs Officer',
      detail: 'Co-founder · EU MDR / IVDR',
    },
    {
      title: 'Chief Product Officer',
      detail: 'Co-founder · product & user acceptance',
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
    { title: 'AI engineering team', detail: 'Palo Alto' },
  ],
  rosterNote: 'Roles shown; names appear with each person’s consent.',
  impact: [
    {
      eyebrow: 'Next generation',
      title: 'DiscoverSTEM Foundation',
      copy: 'A 501(c)(3) our founder helped establish, supporting underprivileged children in STEM, entrepreneurship, and innovation.',
    },
    {
      eyebrow: 'Recognition',
      title: 'R&D 100 Awards',
      copy: 'Our founder serves on the judging panel for one of the longest-running recognitions of applied research and innovation.',
    },
  ],
})

export const contact = Object.freeze({
  id: 'contact',
  kicker: 'A question worth exploring?',
  title: 'The future doesn’t build itself.',
  titleAccent: 'Let’s move it forward.',
  lead: 'Tell us who you are and we’ll route you to the right conversation.',
  doors: [
    {
      id: 'pilot',
      label: 'Start a pilot',
      copy: 'Evaluate RAccelerator on your own technical file, with your regulatory team in the loop.',
    },
    {
      id: 'partner',
      label: 'Partner with Craton',
      copy: 'Co-develop or distribute a product with a team that files first and ships.',
    },
    {
      id: 'lead',
      label: 'Lead a product',
      copy: 'Bring decades of domain expertise and own the product you build.',
    },
    {
      id: 'join',
      label: 'Join Craton',
      copy: 'Serious problems, a modern AI-native stack, and a founder who has shipped.',
    },
  ],
  topics: [
    'Start a pilot',
    'Partner with Craton',
    'Lead a product',
    'Join Craton',
    'Something else',
  ],
  form: {
    nameLabel: 'Name',
    nameError: 'Enter your name so we know who to reply to.',
    emailLabel: 'Work email',
    emailError: 'Enter a work email so we can reply from the right team.',
    companyLabel: 'Company',
    topicLabel: 'Conversation',
    messageLabel: 'One line on what you’re working on',
    messagePlaceholder: 'e.g. Class IIb device, MDR technical file due Q2',
    submit: 'Start a conversation',
    note: 'Opens your email client addressed to Craton. We reply within two business days.',
    success: 'Your email draft is ready — send it and we’ll reply within two business days.',
  },
})

export const footerCopy = Object.freeze({
  boiler:
    'Craton Technologies is an innovation-driven product company based in Frisco, Texas. It invents, protects, and ships AI-enabled products for regulated and evidence-heavy industries — beginning with RAccelerator, a regulatory-affairs platform for medical device and IVD manufacturers navigating EU MDR and IVDR — and applies the same method across agentic commerce and new domains.',
})
