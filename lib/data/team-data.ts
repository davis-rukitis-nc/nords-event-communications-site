export interface TeamMember {
  name: string
  role: string
  image: string
  description: string
  linkedin?: string
  instagram?: string
}

export const teamMembers: TeamMember[] = [
  {
    name: "Aigars Nords",
    role: "CEO & Founder",
    image: "https://rimirigamarathon.com/wp-content/uploads/2025/11/nords.webp",
    description:
      "Aigars is the recipient of the prestigious “Citizen of the Year of Riga City 2025” award! Considered the “Godfather of Running” in Latvia, Aigars (together with this wonderful team, of course) is behind the iconic events of the Latvian capital – from Rimi Riga Marathon to Riga Wine & Champagne, Pink Noise Riga music festival, and many others. Having worked with the leading Latvian and international brands, he is possibly the most experienced and creative sponsorship professionals around! Also a passionate runner, wine & music lover, and book author - check out his award-winning blockbuster “Vīns un Nords”!",
    linkedin: "https://www.linkedin.com/in/aigars-nords/",
  },
  {
    name: "Inese Ķīkule",
    role: "Head of Operations",
    image: "https://rimirigamarathon.com/wp-content/uploads/2023/03/inese.jpg",
    description:
      "Inese is like a glue holding everything together – from finances to production of medals, event production and registration system! Considers New York her favourite City marathon for running and Berlin to meet the best-of-best from the running industry.",
    linkedin: "https://www.linkedin.com/in/inese-kikule/",
  },
  {
    name: "Valda Petrova",
    role: "Sponsorships & Production",
    image: "https://rimirigamarathon.com/wp-content/uploads/2024/01/bilde_Valda.jpeg",
    description:
      "Taking care of ideas and activations of Rimi Riga Marathon’s sponsors is a daunting task, if you consider how much we love our sponsors! Valda is also in charge of EXPO at Rimi Olympic Center, an event in an event, considering that more than 20 000 people wonder through EXPO in just two days!",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Aira Leite",
    role: "Head of Events",
    image: "https://rimirigamarathon.com/wp-content/uploads/2023/03/aira.jpg",
    description:
      "An experienced and a super-efficient event producer, Aira has been an integral part of the Rimi Riga Marathon team for 6 years now. Her heart lies in art and creative event production and management, and she’s done everything from Riga Wine & Champagne to Adwards and Rimi Riga Marathon.",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Rebeka Ozolniece",
    role: "Head of Communications",
    image: "https://rimirigamarathon.com/wp-content/uploads/2024/02/rebeka-aspect-ratio-200-200-3.jpg",
    description:
      "Rebeka takes care of communication strategy development, implementation, and the advancement of the overall vision throughout the season. She manages the creative processes of digital content, marketing, and communications, ensuring that our messages resonate effectively with audiences across all communication channels. Rebeka’s passion for athletics and professional understanding of sports complement the implementation of unique communication solutions.",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Dāvis Rūķītis",
    role: "Digital Marketing & Production",
    image: "https://rimirigamarathon.com/wp-content/uploads/2024/02/davis-aspect-ratio-200-200-1.jpg",
    description:
      "Dāvis’ is the right hand pretty much for everyone in the team, however, his strong suit is event production and digital marketing.",
    linkedin: "", // No LinkedIn – hide icon
  },
  {
    name: "Elīza Lindāne",
    role: "Digital Content Project Manager",
    image: "https://rimirigamarathon.com/wp-content/uploads/2025/03/eliza.jpg",
    description:
      "Elīza manages our social media platforms, developing creative ideas and bringing them to life through unique digital content that captivates our audience and drives engagement. Her ability to present information in an engaging and purposeful way is a key pillar of our communication, and she does it with excellence. With a deep understanding of the latest digital trends and a creative approach.",
    linkedin: "https://linkedin.com",
  },
]
