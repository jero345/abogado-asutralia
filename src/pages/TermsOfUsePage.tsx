import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

type Section = { heading?: string; paragraphs: string[] }

const sections: Section[] = [
  {
    paragraphs: [
      'Visitors to this website are bound by the following Terms so please read these carefully before proceeding.',
      'This website is only a general guide to legal issues and it is not a substitute for legal advice.',
      'Welcome to our website. This website with URL address www.bantongroup.com is owned and operated by The Banton Group Pty Ltd ACN 632 702 919 and/or its subsidiaries/related parties ("Banton Group").',
      "The term 'The Banton Group Pty Ltd', 'Banton Group', 'BG', 'the Company' or 'us' or 'our' or 'we' refers to The Banton Group Pty Ltd ACN 632 702 919 and/or its subsidiaries and related parties, the owner of the website, whose registered office is Level 12, 60 Martin Place, Sydney NSW 2000. The term 'you' or 'your' refers to the website user.",
      'This "website" means the whole or any part of the web pages located at or directed to www.bantongroup.com, and includes the website layout; individual elements of the design of the website; underlying code elements of the website; or text, sounds, graphics, animated items or any other content of this website.',
      'By using the Banton Group website, you agree to be bound by these terms of use. We may amend these terms of use at any time. Your continued use of the website is deemed to be acceptance of the amended terms of use.',
    ],
  },
  {
    heading: 'Not Legal Advice',
    paragraphs: [
      'The content of the Banton Group website is not legal advice. If you want legal advice, you must seek specific advice tailored to your circumstances. You cannot rely on the content of this website as legal advice.',
      'The content of the Banton Group website is general information on (mostly) legal subject areas. It should be viewed as current only at the time of first publication.',
      'While efforts will be made to update information available on the website, it may be out of date. You must make your own assessment of the information on this website and rely on it wholly at your own risk.',
    ],
  },
  {
    heading: 'Use of Website',
    paragraphs: [
      'You are provided with access to this website only for your personal and non-commercial use.',
      'You may only use the website for lawful purposes and in a reasonable manner consistent with the nature and purpose of the website.',
      "You shall not 'frame' or 'mirror' any materials or third party content contained on or accessible from the Banton Group site on any other server or internet based device without the advanced written authorisation of Banton Group.",
    ],
  },
  {
    heading: 'Limited Liability',
    paragraphs: [
      'Banton Group makes no warranties or representations about this website or any of its content. We are not responsible to you or anyone else for any direct or consequential loss suffered in connection with the use of this website.',
      'Banton Group cannot and does not guarantee that the content and the provision of the content of this website will always be correct or fault, error and virus free or that access to the website or third-party websites will be uninterrupted.',
      'Banton Group will not be liable for any damages (including direct, indirect, consequential, incidental and exemplary) in the event that this site is unavailable to users (by virtue of interruption, suspension or termination) for any reason, including due to computer or communications link downtime attributable to malfunction, upgrades or preventative or remedial maintenance activities.',
      'We exclude, to the extent permitted by law, any liability which may arise as a result of use of this website. By using the Banton Group website, you agree to indemnify us for any loss or liability arising out of your use of this site.',
    ],
  },
  {
    heading: 'Copyright',
    paragraphs: [
      'Banton Group owns the intellectual property, including copyright, in all content of the Banton Group website.',
      'If you wish to reproduce any of our content, you must first request our permission. If we grant our permission, you must give appropriate attribution to the author, firm and date of first publication. Please contact info@bantongroup.com.',
    ],
  },
  {
    heading: 'Cookies',
    paragraphs: ['This website uses cookies to monitor browsing preferences.'],
  },
  {
    heading: 'External Links',
    paragraphs: [
      'This website may include links to other websites which are not controlled by us. These links are provided for your convenience only. Banton Group does not endorse, recommend or approve of any information, products or services referred to on such linked sites, nor does it suggest any relationship with the linked organisation. We do not take responsibility for the content in, or currency of, any externally linked sites.',
    ],
  },
  {
    heading: 'Governing Law',
    paragraphs: ['This website and its use are governed by the laws of New South Wales.'],
  },
  {
    heading: 'Privacy Policy',
    paragraphs: [
      'These Terms incorporate, and should be read together with, the Banton Group Privacy Policy. Banton Group will use the personal data which you submit to us via this website in accordance with our Privacy Policy.',
    ],
  },
  {
    heading: 'Complaints Procedure',
    paragraphs: [
      'If you have a question or complaint about this website, please contact us at info@bantongroup.com.',
    ],
  },
  {
    paragraphs: ['These terms and conditions are subject to change at the sole discretion of Banton Group.'],
  },
]

export function TermsOfUsePage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Website"
        italicTitle="Terms of Use."
        subtitle="The rules that govern your use of bantongroup.com. Please read carefully before proceeding."
        breadcrumbs={[{ label: 'Terms of Use' }]}
      />

      <section className="relative py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="space-y-10">
              {sections.map((s, i) => (
                <div key={i}>
                  {s.heading && (
                    <h2 className="text-[#1C3A64] text-[20px] md:text-[22px] font-medium mb-4 leading-[1.25]">
                      {s.heading}
                    </h2>
                  )}
                  <div className="space-y-4 text-[#555555] text-[14px] md:text-[15px] leading-[1.75]">
                    {s.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
