// The texts the fixed pages launched with. Used as CMS default values, as a fallback while a
// page has never been saved in the CMS, and as the source for the first import of Privacy/Terms.
// In the Markdown below, a line ending in a backslash is a line break within the paragraph.

export const aboutDefaults = {
  title: "About Us",
  subtitle:
    "Nords Event Communications (NECom) is an event production, marketing and sponsorship agency creating experiences that are moving Riga and Latvia - literally and figuratively! Can you keep up?",
  headerImage: "/images/pages/about-header.jpg",
  missionHeading: "Our Mission",
  missionText: "Events that move, inspire, elevate Riga and Latvia.",
  missionTagline: "Notikumi, kas (ie)kustina Rīgu!",
  whatWeDoHeading: "What We Do",
  whatWeDoText:
    "26 years in the business of creating, shaping, selling, packaging, re-inventing the Baltic region's most celebrated events.",
  approachHeading: "Our Approach",
  approachText:
    "We know our way with the sponsors. We help them grow once they join our events. No bullshit. A proven track record. Wanna try us out?",
}

export const contactDefaults = {
  title: "Contact Us",
  subtitle:
    "Get in touch with NECom for inquiries about event marketing, sponsorship opportunities, or general questions. We're here to help.",
  headerImage: "/images/pages/contact-header.webp",
  heading: "Reach out if you dream big!",
  intro:
    "Feel free to reach out with your ideas, interests in creating a partnership with our events, fine-tuning your sponsorship portfolio, generating impactful ideas to activate your sponsorship & charity initiatives, launching a product with a bang, or maybe finding a way to appear cool with your audiences!\n\nIn doubt? No worries, we’ll find a way to help you. For a budget, of course. Or just for the sake of it and fun ... if we like you too much.",
  email: "info@necom.lv",
  office: "Nords Event Communications SIA\nBrīvības iela 40–24, Rīga, LV-1050, Latvia\nReg. No. 50003981501",
  expertiseHeading: "Our Expertise",
  expertise: [
    "Ideas, Impact & Large-Scale Events",
    "Sponsorship & Brand Activations",
    "Mass Sports, Wine & Gastronomy, Music",
  ],
  ctaHeading: "Get in touch",
}

const companyBox = `**Nords Event Communications SIA**\\
Email: info@necom.lv\\
Registration Number: 50003981501\\
Location: Brīvības iela 40–24, Rīga, LV-1050, Latvia`

export const privacyDefaults = {
  title: "Privacy Policy",
  subtitle: "How we collect, use, and protect information",
  headerImage: "/images/pages/about-header.jpg",
  lastUpdated: "2026-01-20",
  markdown: `## 1. Introduction

Nords Event Communications SIA ("NECom", "we", "us", or "our") operates this website to share information about our projects, work, and partners. We take privacy seriously and aim to be clear about what data is collected and why.

**Company Details:**\\
Nords Event Communications SIA\\
Registration Number: 50003981501\\
Address: Brīvības iela 40–24, Rīga, LV-1050, Latvia\\
Contact Email: info@necom.lv

## 2. Information We Collect

### 2.1 Information you provide

If you contact us by email, we will receive the information you include in your message (for example: your email address, name/signature, and the content of your request).

This website does not offer user accounts, registrations, or newsletter subscriptions.

### 2.2 Information collected automatically

Like most websites, basic technical data may be processed when you visit (for example: device and browser information, approximate location derived from IP address, pages viewed, and referring/exit pages). This is used to operate the site, keep it secure, and understand overall usage.

### 2.3 Performance and analytics

We use Vercel tools to understand site performance and improve reliability:

- **Vercel Web Analytics:** aggregated, privacy-focused analytics to understand general traffic patterns and pages visited. It is designed to work without cookies.
- **Vercel Speed Insights:** performance measurement (for example: page load and Core Web Vitals) to help us keep the site fast.

## 3. Cookies and Embedded Content

### 3.1 Cookies

We do not set advertising cookies on this website, and Vercel Web Analytics is designed to operate without cookies. However, third-party embedded content may set cookies or use similar technologies.

### 3.2 YouTube embeds

Some pages include embedded YouTube videos. When a page loads an embedded video (or when you play it), your browser connects to YouTube/Google and they may collect information such as your IP address and video interaction data, and may set cookies depending on your settings.

If you prefer not to share data with YouTube, you can avoid playing embedded videos or adjust your browser and Google account privacy settings.

## 4. How We Use Information

- To respond to emails and communicate with you
- To operate, maintain, and secure the website
- To measure performance and improve content and user experience
- To comply with legal obligations

## 5. Legal Bases (GDPR)

When GDPR applies, we process personal data on these bases:

- **Legitimate interests** (operating and securing our website; understanding aggregate usage; improving performance).
- **Consent** (when you choose to contact us by email and provide information).
- **Legal obligation** (where processing is required by applicable law).

## 6. Sharing and International Transfers

We do not sell personal data. We may share limited data with service providers who help us run the site, such as our hosting/analytics provider (Vercel). Embedded content providers (like YouTube/Google) may receive data directly from your browser when you view embedded videos.

These providers may process data outside Latvia/the EEA. Where required, transfers rely on appropriate safeguards.

## 7. Data Retention

We keep email correspondence only as long as needed to respond and for reasonable record-keeping. Analytics and performance data is used in aggregate to improve the site.

## 8. Your Rights Under GDPR

If you are in the EEA, you may have rights including access, rectification, erasure, restriction, portability, and objection. To exercise your rights, contact us at info@necom.lv.

You can also lodge a complaint with Latvia’s supervisory authority: Datu valsts inspekcija (Data State Inspectorate).

## 9. Contact Us

If you have any questions about this Privacy Policy, contact:

${companyBox}
`,
}

export const termsDefaults = {
  title: "Terms of Service",
  subtitle: "The rules for using this website",
  headerImage: "/images/pages/about-header.jpg",
  lastUpdated: "2026-01-20",
  markdown: `## 1. Agreement to Terms

By accessing or using this website, you agree to these Terms of Service ("Terms"). If you do not agree, please do not use the website.

**Company Details:**\\
Nords Event Communications SIA ("NECom")\\
Registration Number: 50003981501\\
Address: Brīvības iela 40–24, Rīga, LV-1050, Latvia\\
Contact Email: info@necom.lv

## 2. What this website is (and isn’t)

This website provides general information about NECom and our work. It does not provide user accounts, sign-ups, registrations, or paid checkout on this domain.

## 3. Acceptable Use

You agree to use the website lawfully and not to:

- Try to gain unauthorized access to the website, servers, or networks
- Introduce malware, scrape the site aggressively, or disrupt normal operation
- Use the website in a way that infringes someone else’s rights
- Misrepresent your identity when contacting us

## 4. Third-Party Links and Embedded Content

This website may link to third-party websites and may embed content (for example, YouTube videos). Third-party sites and services are not operated by us, and their terms and privacy practices apply.

We do not control third-party content and are not responsible for it. Linking or embedding does not imply endorsement.

## 5. Intellectual Property

Unless otherwise stated, the website and its content (text, images, branding, and design) are owned by NECom or used with permission and are protected by applicable intellectual property laws. You may view and share pages for personal, non-commercial use, but you may not copy, modify, or reuse content for commercial purposes without written permission.

## 6. Disclaimers

The website is provided on an “as is” and “as available” basis. We make reasonable efforts to keep the information accurate, but we do not guarantee it will always be complete, current, or error-free.

## 7. Limitation of Liability

To the fullest extent permitted by law, NECom will not be liable for indirect, incidental, special, or consequential damages arising from your use of (or inability to use) the website.

## 8. Changes to These Terms

We may update these Terms from time to time. The “Last updated” date above indicates when changes were last made.

## 9. Governing Law

These Terms are governed by the laws of the Republic of Latvia. Any disputes will be handled by the competent courts in Riga, Latvia.

## 10. Contact

Questions about these Terms? Email us:

${companyBox}
`,
}
