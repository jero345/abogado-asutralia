// Hidden barrister/partner profile pages — 7th-Floor-style CV pages that are
// NOT linked anywhere on the site and NOT in the nav. They are reachable ONLY
// by their direct slug (e.g. /amanda-banton) and are marked noindex so search
// engines don't surface them. To add another hidden profile, just add an entry
// here keyed by its slug — a route is registered automatically in main.tsx.

export type ProfileCase = { title: string; citation?: string }
export type RecognitionGroup = { category: string; items: string[] }

export type Profile = {
  slug: string
  name: string
  /** Small pill above the name in the hero, e.g. "Managing Partner". */
  role: string
  /** Full-bleed hero portrait, path under /public. Shown uncropped on a black hero. */
  heroPhoto: string
  contact: {
    phone?: string
    phoneLabel?: string
    email?: string
  }
  /** Overview paragraphs. */
  overview: string[]
  recentCases: ProfileCase[]
  recognitions?: RecognitionGroup[]
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
    },
    overview: [
      "Amanda Banton is the Managing Partner and founder of Banton Group, which she established in February 2020. She brings more than 20 years' experience in the legal profession, with prior roles at Squire Patton Boggs and Piper Alderman, where she led substantial litigation practices, and consulting experience at KPMG and in the Federal Government.",
      "Amanda's practice encompasses complex insolvency, regulatory, corporate and commercial disputes and litigation, including securities class actions. Her work spans a broad range of legal issues including contract, corporations and ASIC legislation, competition and consumer law, and breaches of trust and fiduciary duties. She has established a track record of investigating and developing class actions from inception, reconstructing complex factual histories and building cases in circumstances where key documentation or witnesses may initially be unavailable.",
      'Under Amanda\'s leadership, Banton Group has achieved a number of landmark results, including: a unanimous High Court victory in Bogan v The Estate of Peter John Smedley (Deceased) [2025] HCA 7, confirming the relevance of Victorian group costs orders to transfer applications; the highest group costs order rate (40%) ever awarded in Australia in Bogan v Estate of Peter Smedley (Deceased) [2022] VSC 201; a High Court victory in Hunt Leather Pty Ltd v Transport for NSW [2025] HCA 53, reinstating the trial judge\'s finding of liability for private nuisance; a ~$46 million recovery against the Commonwealth in Kupang Resources Pty Ltd v Commonwealth of Australia (No 4) [2025] NSWSC 1477; and a successful settlement with KPMG in the CuDeco class action in December 2025.',
      "Amanda is known for her capacity to establish cases from the ground up for those seeking legal recourse for significant losses. She carefully manages the interests of all stakeholders — clients, funders, the court and defendants' solicitors — and is recognised for her strategic thinking and meticulous attention to detail across all her matters.",
    ],
    recentCases: [
      {
        title: 'Bogan v The Estate of Peter John Smedley (Deceased) & Ors',
        citation: '[2025] HCA 7 — High Court of Australia',
      },
      {
        title: 'Bogan v Estate of Peter John Smedley (Deceased) & Ors',
        citation: 'Supreme Court of Victoria, S ECI 2020 03281',
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
        title: 'Hunt Leather Pty Ltd v Transport for NSW',
        citation: '[2025] HCA 53 — High Court of Australia',
      },
      {
        title: 'Kupang Resources Pty Ltd v The Commonwealth of Australia',
        citation: 'Supreme Court of NSW, 2020/106859',
      },
      {
        title: "Doyle's Farm Produce Pty Ltd & Ors v Murray Darling Basin Authority & Anor",
        citation: 'Supreme Court of NSW, 2019/00150651',
      },
      {
        title: 'Toner v CuDeco Limited (Receivers and Managers Appointed) (In Liquidation) & Ors',
        citation: 'Federal Court of Australia, VID 176/2022',
      },
      {
        title: 'MDC v NSW Ports Operations Hold Co Pty Ltd & Ors',
        citation:
          'Federal Court, NSD 862/2019; Mayfield Development Corporation Pty Ltd v NSW Ports Operations Hold Co Pty Ltd & Ors, Full Federal Court, NSD 840/2024',
      },
    ],
    recognitions: [
      {
        category: 'Chambers Asia Pacific',
        items: [
          'Dispute Resolution — Ranked 2022, 2023, 2025 & 2026',
          'Dispute Resolution — Leading Individual 2023, 2025 & 2026',
        ],
      },
      {
        category: 'Asia Pacific Legal 500',
        items: [
          'Recommended Lawyer — Dispute Resolution: Class Actions 2022 & 2023',
          'Leading Individual — Class Action Dispute Resolution 2023',
          'Dispute Resolution: Class Actions — Band 4 (2024), Band 2 (2026)',
          'Recommended Lawyer — Restructuring & Insolvency 2022',
          'Restructuring & Insolvency — Band 3 (2024), Band 4 (2026)',
        ],
      },
      {
        category: "Doyle's Guide",
        items: ['Recommended Lawyer — Commercial Litigation & Dispute Resolution 2022'],
      },
      {
        category: 'Australasian Law Awards',
        items: ['Excellence Award — Law Firm Leader of the Year 2022'],
      },
      {
        category: 'Australasian Lawyers',
        items: ['Elite Women Award 2022'],
      },
      {
        category: 'APAC Insider',
        items: ['Complex Litigator of the Year (Australia) 2022'],
      },
      {
        category: 'Leaders in Law',
        items: ['Commercial Litigation Expert of the Year (Australia) 2022'],
      },
      {
        category: 'Global 100',
        items: ['Complex Litigator of the Year (Australia) 2023'],
      },
    ],
    practiceAreas: [
      'Complex insolvency',
      'Regulatory disputes',
      'Corporate & commercial disputes',
      'Commercial litigation',
      'Securities class actions',
      'Contract disputes',
      'Corporations & ASIC legislation',
      'Competition & consumer law',
      'Breaches of trust & fiduciary duties',
      'Class action dispute resolution',
      'Restructuring & insolvency',
    ],
    awardBadges: [
      '/img/marcas-web/2025-chambers-leading-individual-apac-akb.png',
      '/img/marcas-web/2024-legal-500-apac-leading-individual-akb.png',
      '/img/marcas-web/2023-legal-500-leading-individual-akb.png',
    ],
  },
}
