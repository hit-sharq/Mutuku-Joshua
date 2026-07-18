export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mutuku Joshua",
  "url": "https://www.lumyn.co.ke",
  "image": "https://www.lumyn.co.ke/jm.png",
  "jobTitle": "Fullstack Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Lumyn Technologies"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Nairobi",
    "addressCountry": "Kenya"
  },
  "sameAs": [
    "https://github.com/hit-sharq",
    "https://www.linkedin.com/in/joshua-mwendwa-b183b5287/",
    "https://www.instagram.com/j_lee087"
  ]
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Lumyn Technologies",
  "url": "https://www.lumyn.co.ke",
  "logo": "https://www.lumyn.co.ke/jm.png",
  "description": "Professional fullstack development services",
  "founder": {
    "@type": "Person",
    "name": "Mutuku Joshua"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Nairobi",
    "addressCountry": "Kenya"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "joshua@lumyn.co.ke",
    "telephone": "+254794773452",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://github.com/hit-sharq",
    "https://www.linkedin.com/in/joshua-mwendwa-b183b5287/"
  ]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mutuku Joshua - Fullstack Developer",
  "url": "https://www.lumyn.co.ke",
  "description": "Crafting Code That Works - Professional fullstack development services",
  "author": {
    "@type": "Person",
    "name": "Mutuku Joshua"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.lumyn.co.ke/?s={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
