import { env } from '@/config/env'
import { site } from '@/config/site'

export const privacy = Object.freeze({
  path: '/privacy',
  title: 'Privacy',
  description: `How ${env.appName} handles information on this website, and what a pilot covers separately.`,
  kicker: 'Privacy',
  updated: 'Updated 8 October 2026',
  lede: `${site.legalName} is in ${site.foundingLocation.locality}, ${site.foundingLocation.region}. This page covers the public website only. A pilot or any other engagement is governed by what we agree in writing, not by this page.`,
  sections: [
    {
      title: 'What this site collects',
      body: [
        'The site does not ask you to create an account. It does not run a marketing or analytics script, and it does not set a cookie for advertising.',
        'Like most sites, the host may keep ordinary server logs — such as an IP address, the page requested, and the time — so the site can run and so abuse can be stopped. We do not use those logs to build a profile of you.',
      ],
    },
    {
      title: 'The contact form',
      body: [
        `Send message does not post your words to a Craton server. It opens a draft in your own email app, addressed to ${env.contactEmail}, with the name, email, company, topic, and message you typed.`,
        'From that moment your mail provider delivers the message. We receive it as email. We use it to reply, and to route you to the right conversation. We do not use it to train a model.',
      ],
    },
    {
      title: 'A pilot is separate',
      body: [
        'If you later send a technical file, a review set, or other customer material, that exchange is not this website. We agree access, retention, and purpose in writing before that work starts.',
        'We do not put customer documents into a public model, and we do not train on them.',
      ],
    },
    {
      title: 'Asking us',
      body: [
        `Questions about this page, or a request to delete an email you sent us, go to ${env.contactEmail}.`,
      ],
    },
  ],
})

export const terms = Object.freeze({
  path: '/terms',
  title: 'Terms',
  description: `Terms for using the ${env.appName} website. The products do not make the final decision.`,
  kicker: 'Terms',
  updated: 'Updated 8 October 2026',
  lede: `These terms cover your use of the ${env.appName} website. They are not a contract for a pilot, a license to a product, or a regulatory opinion.`,
  sections: [
    {
      title: 'The site',
      body: [
        'The pages describe Craton, the work, and two products that are still early. RAccelerator is in development. ReviewsIntel is patent pending. Nothing on the site is an offer to sell a finished product, and nothing here guarantees that we will accept a pilot.',
      ],
    },
    {
      title: 'Not a decision',
      body: [
        'RAccelerator prepares material for a regulatory professional. It does not classify a device, close a gap, or act as a notified body, a lawyer, or the person accountable for a technical file.',
        'ReviewsIntel attaches review evidence to a recommendation. It does not place an order. A person authorizes checkout.',
        'Do not rely on this website as regulatory, legal, or purchasing advice.',
      ],
    },
    {
      title: 'A pilot',
      body: [
        'Writing to us starts a conversation. A pilot begins only when both sides agree what will be reviewed, who may see it, and what you will receive back. Until then, nothing on the site obliges either side.',
      ],
    },
    {
      title: 'Our material',
      body: [
        'The writing, the mark, and the product names on this site belong to Craton Technologies. You may link to the site. You may not copy the pages or the mark and present them as your own.',
      ],
    },
    {
      title: 'Liability',
      body: [
        'The site is provided as published. We do not warrant that it is complete or free of error. To the extent the law allows, we are not liable for decisions you make from reading it.',
        `Questions go to ${env.contactEmail}. ${site.legalName} is based in ${site.foundingLocation.locality}, ${site.foundingLocation.region}, ${site.foundingLocation.country}.`,
      ],
    },
  ],
})
