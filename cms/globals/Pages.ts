import type { Field, GlobalConfig } from "payload"
import { anyone, authenticated } from "../access"
import { revalidateGlobalAfterChange } from "../hooks/revalidate"
import { aboutDefaults, contactDefaults } from "../../lib/cms/page-defaults"

// Fixed pages (About, Contact, Privacy, Terms). Each is a single document ("global"): the layout
// stays in code, the texts are edited here. Defaults are the texts the site launched with.

const access = { read: anyone, update: authenticated }
const hooks = { afterChange: [revalidateGlobalAfterChange] }
const admin = { group: "Pages" }

function header(defaults: { title: string; subtitle: string }): Field[] {
  return [
    { name: "title", type: "text", required: true, defaultValue: defaults.title },
    { name: "subtitle", type: "textarea", defaultValue: defaults.subtitle },
    {
      name: "headerImage",
      type: "upload",
      relationTo: "media",
      admin: { description: "Leave empty to keep the current photo." },
    },
  ]
}

const paragraphsHint = { description: "Separate paragraphs with an empty line." }

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "About",
  admin: { ...admin, description: "The four number blocks (years, participants, impact, team) stay as they are." },
  access,
  hooks,
  fields: [
    ...header(aboutDefaults),
    {
      type: "collapsible",
      label: "Our Mission",
      fields: [
        { name: "missionHeading", label: "Heading", type: "text", required: true, defaultValue: aboutDefaults.missionHeading },
        { name: "missionText", label: "Text", type: "textarea", required: true, defaultValue: aboutDefaults.missionText },
        { name: "missionTagline", label: "Tagline (italic)", type: "text", defaultValue: aboutDefaults.missionTagline },
      ],
    },
    {
      type: "collapsible",
      label: "What We Do",
      fields: [
        { name: "whatWeDoHeading", label: "Heading", type: "text", required: true, defaultValue: aboutDefaults.whatWeDoHeading },
        { name: "whatWeDoText", label: "Text", type: "textarea", required: true, defaultValue: aboutDefaults.whatWeDoText, admin: paragraphsHint },
      ],
    },
    {
      type: "collapsible",
      label: "Our Approach",
      fields: [
        { name: "approachHeading", label: "Heading", type: "text", required: true, defaultValue: aboutDefaults.approachHeading },
        { name: "approachText", label: "Text", type: "textarea", required: true, defaultValue: aboutDefaults.approachText, admin: paragraphsHint },
      ],
    },
  ],
}

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "Contact",
  admin: { ...admin, description: "The “years of experience” block stays as it is." },
  access,
  hooks,
  fields: [
    ...header(contactDefaults),
    { name: "heading", type: "text", required: true, defaultValue: contactDefaults.heading },
    { name: "intro", type: "textarea", required: true, defaultValue: contactDefaults.intro, admin: paragraphsHint },
    { name: "email", type: "email", required: true, defaultValue: contactDefaults.email },
    {
      name: "office",
      type: "textarea",
      required: true,
      defaultValue: contactDefaults.office,
      admin: { description: "One line per row (company, address, registration number)." },
    },
    { name: "expertiseHeading", type: "text", required: true, defaultValue: contactDefaults.expertiseHeading },
    {
      name: "expertise",
      type: "array",
      defaultValue: contactDefaults.expertise.map((item) => ({ item })),
      fields: [{ name: "item", type: "text", required: true }],
    },
    { name: "ctaHeading", label: "Email box heading", type: "text", required: true, defaultValue: contactDefaults.ctaHeading },
  ],
}

function legalPage(slug: string, label: string, defaults: { title: string; subtitle: string }): GlobalConfig {
  return {
    slug,
    label,
    admin,
    access,
    hooks,
    fields: [
      ...header(defaults),
      {
        name: "lastUpdated",
        type: "date",
        required: true,
        admin: { date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" } },
      },
      { name: "content", type: "richText", required: true },
    ],
  }
}

export const PrivacyPage = legalPage("privacy-page", "Privacy Policy", {
  title: "Privacy Policy",
  subtitle: "How we collect, use, and protect information",
})

export const TermsPage = legalPage("terms-page", "Terms of Service", {
  title: "Terms of Service",
  subtitle: "The rules for using this website",
})
