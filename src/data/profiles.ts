// Hidden barrister/partner profile pages — 7th-Floor-style CV pages that are
// NOT linked anywhere on the site and NOT in the nav. They are reachable ONLY
// by their direct slug (e.g. /amanda-banton) and are marked noindex so search
// engines don't surface them. To add another hidden profile, just add an entry
// here keyed by its slug — a route is registered automatically in main.tsx.

export type ProfileCase = { title: string; citation?: string }

export type Profile = {
  slug: string
  name: string
  /** Small pill above the name in the hero, e.g. "Managing Partner". */
  role: string
  /** Full-bleed hero portrait, path under /public. */
  heroPhoto: string
  contact: {
    phone?: string
    phoneLabel?: string
    email?: string
    linkedin?: string
    /** Link to a full-CV PDF. Leave as '#' until the PDF is uploaded. */
    cvUrl?: string
  }
  /** Overview paragraphs. */
  overview: string[]
  recentCases: ProfileCase[]
  /** Short testimonial-style quote shown under "Perspective". */
  perspective?: { quote: string; attribution?: string }
  admissions?: string[]
  qualifications?: string[]
  practiceAreas?: string[]
  /** Award badge images (path under /public) shown in the recognition strip. */
  awardBadges?: string[]
}

export const profiles: Record<string, Profile> = {
  'amanda-banton': {
    slug: 'amanda-banton',
    name: 'Amanda Banton',
    role: 'Managing Partner',
    heroPhoto: '/img/about/about-us-amanda.jpg',
    contact: {
      phone: '+61 2 8076 8090',
      phoneLabel: 'Sydney HQ',
      email: 'amanda.banton@bantongroup.com',
      linkedin: 'https://linkedin.com/in/amandabanton',
      cvUrl: '#', // TODO: replace with the uploaded CV PDF (e.g. /docs/amanda-banton-cv.pdf)
    },
    overview: [
      'As Managing Partner of Banton Group, established in February 2020, Amanda Banton brings more than 20 years of experience in the legal profession. Prior to founding the firm, she led substantial litigation practices at Squire Patton Boggs and Piper Alderman, and also gained consulting experience at KPMG alongside expertise developed within the federal government.',
      "Under her leadership, Banton Group has developed into one of Australia's leading litigation and insolvency practices, acting in some of the nation's most significant disputes and regulatory matters. Her experience spans complex class actions, competition and consumer law proceedings, breaches of trust and fiduciary duty claims and equity disputes, various negligence and nuisance claims as well as various matters arising under the Corporations Act 2001 (Cth), the ASIC Act 2001 (Cth), the Civil Liability Act 2002 (NSW) and the Competition and Consumer Act 2010 (Cth).",
      'Recognised for her ability to build cases from the ground up, Amanda is known for her strategic thinking and capacity to execute ground-breaking matters in which new law has been created and global precedents triggered. She is highly regarded by clients, litigation funders, insolvency practitioners, and the Court alike.',
      "She has also been at the forefront of the evolving class action funding landscape, establishing a significant capital base to bankroll litigation internally while maintaining strong relationships with Australia's leading litigation funders. The firm acts on a contingency fee basis where appropriate in the Supreme Court of Victoria.",
    ],
    recentCases: [
      {
        title: 'Bogan v The Estate of Peter John Smedley (Deceased) & Ors',
        citation: '[2025] HCA 7 — High Court of Australia',
      },
      {
        title: 'Hunt Leather Pty Ltd v Transport for NSW',
        citation: '[2025] HCA 53 — High Court of Australia',
      },
      {
        title: 'ACN 117 641 004 Pty Ltd (in liquidation) & Anor v S&P Global Inc & Anor',
        citation: 'Federal Court of Australia, NSD 881/2020',
      },
      {
        title: 'Belmont Park Investments Pty Ltd & Anor v Fitch Ratings, Inc & Anor',
        citation: 'Federal Court of Australia, NSD 924/2024',
      },
      {
        title: 'Toner v CuDeco Limited (Receivers and Managers Appointed) (In Liquidation) & Ors',
        citation: 'Federal Court of Australia, VID 176/2022',
      },
      {
        title: "Doyle's Farm Produce Pty Ltd & Ors v Murray Darling Basin Authority & Anor",
        citation: 'Supreme Court of NSW, 2019/00150651',
      },
      {
        title: 'Kupang Resources Pty Ltd v The Commonwealth of Australia',
        citation: 'Supreme Court of NSW, 2020/106859',
      },
    ],
    // Placeholder paraphrase of Amanda's standing — replace with a sourced client
    // testimonial when available.
    perspective: {
      quote:
        'Amanda builds cases from the ground up — her strategic judgement and command of detail are why clients, funders and the Court hold her in such high regard.',
    },
    admissions: [
      'Founder & Managing Partner, Banton Group — since February 2020',
      'Formerly led litigation practices at Squire Patton Boggs and Piper Alderman',
      'Admitted as a Legal Practitioner — (year to confirm)', // TODO: confirm
    ],
    qualifications: [
      'LLB — (institution / year to confirm)', // TODO: confirm
    ],
    practiceAreas: [
      'Class Actions',
      'Securities Litigation',
      'Commercial Litigation',
      'Insolvency & Restructuring',
      'Competition & Consumer Law',
      'Corporations Act & Regulatory',
      'Equity, Trusts & Fiduciary Duties',
      'Contentious Insolvency & Recovery',
    ],
    awardBadges: [
      '/img/marcas-web/2025-chambers-leading-individual-apac-akb.png',
      '/img/marcas-web/2024-legal-500-apac-leading-individual-akb.png',
      '/img/marcas-web/2023-legal-500-leading-individual-akb.png',
    ],
  },
}
