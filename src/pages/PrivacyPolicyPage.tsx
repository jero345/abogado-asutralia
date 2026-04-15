import { PageHero } from '@/components/ui/PageHero'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

type Section = { heading?: string; subheading?: string; paragraphs?: string[]; list?: string[] }

const sections: Section[] = [
  {
    paragraphs: [
      'Banton Group ("BG") is an incorporated legal practice. We are committed to safeguarding the privacy of information provided to us and information about visitors to our BG website and any other associated websites under our control (together our "Websites"). BG is the data controller of any personal information provided to us when you use our services.',
      'This Privacy Policy explains how we may collect and use information that we obtain about you, and your rights in relation to that information. Your use of our online services or your provision of information to us constitutes your acknowledgment of the terms of this Privacy Policy. Please do not send us any of your information if you do not want it to be used in the ways described in this Privacy Policy.',
      'Our contact details are set out below.',
    ],
  },
  {
    heading: 'Scope of Privacy Policy',
    paragraphs: [
      'This Privacy Policy applies when we receive any personal information from you, our clients or other third-parties, including in the following circumstances:',
    ],
    list: [
      'when you request information from us or provide information to us;',
      'when you or the organisation you work for engages our legal and other services;',
      'when you or the organisation you work for are a counterparty, or provide services to a counterparty, of one or more of our clients;',
      'as a result of your relationship with one or more of our clients, including when you or the organisation you work for is a regulator, government agency, court, tribunal or other law enforcement agency;',
      'when you apply for a role or work placement opportunity, open day or recruitment event with us;',
      'when you complete application forms on our Websites;',
      'when you attend our seminars or other hosted events;',
      'when we conduct open source searches on you in connection with our business acceptance or business development processes;',
      'when you visit our Websites and online services (including our mobile apps);',
      'if you are an alumni of the firm; and',
      'when you are entered onto our mailing lists to receive publications and other marketing emails.',
    ],
  },
  {
    heading: 'Information Collection',
    subheading: 'General',
    paragraphs: [
      'We will collect personal information directly from you, from our clients or their counterparties and authorised representatives.',
      'We may also collect personal information from third parties such as regulatory authorities, your employer, other organisations with whom you have dealings, government agencies, credit reporting agencies, recruitment agencies, information or service providers, publicly available records and third parties described in this Privacy Policy.',
      'We may collect current and historical personal information including your name (including name prefix or title), contact details (such as your postal address, email address and phone number(s)), nationality, identification, gender, organisation, business interests, employment, positions held, special categories of data (such as race and ethnicity, trade union membership, information about health or information, political opinions or religious beliefs), billing and financial information (such as billing address, bank account and payment information) and enquiry/complaint details. We may also collect personal information about your other dealings with us and our clients, including any contact we have with you in person, by telephone, email or online.',
    ],
  },
  {
    subheading: 'Online Services',
    paragraphs: ['When you use our online services, we may collect the following:'],
    list: [
      'information you provide by completing subscription, registration and application forms (including when you submit material or request further services);',
      'information you provide to us if you contact us, for example to report a problem with our online services or raise a query or comment; and',
      'details of visits made to our online services such as the volume of traffic received, logs (including, the internet protocol (IP) address and location of the device connecting to the online services and other identifiers about the device and the nature of the visit) and the resources accessed.',
    ],
  },
  {
    subheading: 'Careers and Recruitment',
    paragraphs: [
      'If you apply for a job or work placement you may need to provide information about your education, employment, racial background and state of health. Your application will constitute your express consent to our use of this information to assess your application and to allow us to carry out both recruitment analytics and any monitoring activities which may be required of us under applicable law as an employer. We may also carry out screening checks (including reference, background, directorship, financial probity, identity, eligibility to work, vocational suitability and criminal record checks) and consider you for other positions. We may disclose your personal information (including diversity and equal opportunities data) to academic institutions, recruiters, screening check providers, health service providers, professional and trade associations, law enforcement agencies, recruitment analytics and diversity research providers, referees and your current and previous employers. We may also collect your personal information from these parties in some circumstances. Without your personal information we may not be able to progress considering you for positions with us.',
    ],
  },
  {
    subheading: 'CCTV',
    paragraphs: [
      'Our offices are protected by CCTV and you may be recorded when you visit. We use CCTV to help provide a safe and secure environment for our visitors.',
    ],
  },
  {
    heading: 'Use of your information',
    paragraphs: ['We may use your personal information if:'],
    list: [
      'it is necessary for the performance of a contract with you or the organisation you work for; or',
      'necessary in connection with a legal or regulatory obligation; or',
      'you have provided your consent (where necessary) to such use or the organisation that you work for has obtained your consent (where necessary); or',
      'we (or a third-party) have a legitimate interest which is not overridden by your interests or your rights and freedoms; or',
      'we are otherwise required or authorised by law.',
    ],
  },
  {
    paragraphs: ['We may use your information to:'],
    list: [
      'provide and improve our services and products to you or the organisation you work for (including auditing and monitoring use of those services and products);',
      'maintain and develop our relationship with you and our clients;',
      'monitor and analyse our business;',
      'facilitate our internal business operations;',
      'fulfil our legal, regulatory (including in relation to anti-money laundering or sanction requirements), accounting, reporting, risk management or professional obligations;',
      'identify services you may be interested in;',
      'send you legal updates, publications, marketing and details of events (please see below for more information);',
      'protect, establish, exercise or defend legal rights; and',
      'process and respond to requests, enquiries or complaints received from you.',
    ],
  },
  {
    paragraphs: [
      'We may not be able to do these things without your personal information.',
      "We will only retain your personal information for as long as is reasonably necessary in the circumstances. Personal information provided in connection with the provision of our legal services will be retained in accordance with the firm's retention policies unless we agree otherwise with you, in writing. Our online services may have different retention periods which you will be notified of separately when you access those services. If you wish to know more about the firm's retention policies or any of the firm's different retention periods, please contact info@bantongroup.com.",
    ],
  },
  {
    heading: 'Disclosure of your information',
    paragraphs: ['We may share your information with third parties including:'],
    list: [
      'our clients, your professional advisers and your employers or place of business;',
      'third parties involved in the provisions of services to clients including barristers, local counsel and other professional advisers;',
      'our professional advisers, auditors and insurers;',
      'third party service providers to whom we outsource services, for example archival, auditing, reference checking, professional advisory (including legal, accounting, financial and business consulting), IT support, mailing house, delivery, website, social media, research, banking, payment, client contact, data processing, insurance, forensic, litigation support, data room, marketing and security services;',
      'third party technology organisations, including cloud service providers, such as data storage platforms;',
      'third parties with whom we have co-promotional arrangements (such as jointly sponsored events);',
      'third parties who carry out research and analyses of our services and products on our behalf; or',
      'regulatory authorities, courts, tribunals, government agencies, law enforcement agencies and other third parties.',
    ],
  },
  {
    paragraphs: [
      'Please be aware that your personal information may be accessed by third parties and by our team of international BG employees and consultants who may be based in countries whose laws provide various levels of protection for personal data which are not always equivalent to the level of protection that may be provided in your own country. Where we transfer your information internationally, we will take reasonable steps to ensure that your information is treated securely and the means of transfer provides adequate safeguards.',
      'Some of your personal information may be stored with and managed by a cloud service provider located in a country other than Australia.',
      'If you have any questions in relation to the transfer of your personal information, please contact us at info@bantongroup.com.',
    ],
  },
  {
    heading: 'Security',
    paragraphs: [
      'We take reasonable steps to hold information securely in electronic or physical form and to prevent unauthorised access, modification or disclosure. Our information security policy is supported by a number of security standards, processes and procedures and we store information in access controlled premises or in electronic databases requiring logins and passwords. We require our third party data storage providers to comply with appropriate information security industry standards. All partners and staff and third party providers with access to confidential information are subject to confidentiality obligations.',
      'The transmission of information via the internet is not completely secure. We cannot guarantee the security of your data transmitted to our online services; any transmission is at your own risk.',
    ],
  },
  {
    heading: 'Cookies',
    paragraphs: ['We use cookies on our online services.'],
  },
  {
    heading: 'Third Party Sites',
    paragraphs: [
      'Our Websites may contain links to other sites which are controlled by third parties.',
      "Visitors should consult these other sites' privacy policies and please be aware that we do not accept responsibility for their use of information about you.",
    ],
  },
  {
    heading: 'Your Rights',
    paragraphs: [
      'The privacy laws of some jurisdictions may give you the right to access, amend or erase your personal information or, in some circumstances, to restrict or object to the processing of your personal information.',
      'If you would like to request a copy of your data or would like to take steps to exercise any of your rights, please contact us in writing as set out below. We may refuse to provide access and may charge a fee for access if the relevant legislation allows us to do so, in which case we will provide reasons for our decision as required by law.',
      'In the limited circumstances where you have provided your consent to the collection, processing and transfer of your personal information for a specific purpose, you have the rights to withdraw your consent for that specific processing at any time.',
      'Information we hold about you should be up-to-date and accurate. Please advise us in writing of any changes to your information using the contact details set out below.',
    ],
  },
  {
    heading: 'Marketing Information',
    paragraphs: [
      'If you receive marketing materials relating to our services by email or post, you may withdraw your consent for us to send these to you at any time, by sending an email to info@bantongroup.com.',
    ],
  },
  {
    heading: 'Status of this Policy',
    paragraphs: [
      'We review this Privacy Policy regularly and reserve the right to revise it or any part of it from time to time to reflect changes in the law or technology practices. It is your responsibility to review the amended Privacy Policy.',
    ],
  },
  {
    heading: 'Contact and Further Information',
    paragraphs: [
      'To find out more about BG, please visit www.bantongroup.com.',
      'If you have any questions about this Privacy Policy, or want to submit a written complaint to us about how we handle your personal information, please contact us at:',
      'Level 12, 60 Martin Place, Sydney NSW 2000',
      'Email: info@bantongroup.com',
      'Ph: +61 2 8076 8090',
      'You may also have the right to submit a complaint to the relevant supervisory authority in your jurisdiction.',
      'If you make a privacy complaint, we will respond to let you know how your complaint will be handled. We may ask you for further details, consult with other parties and keep records regarding your complaint.',
    ],
  },
]

export function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        italicTitle="Policy."
        subtitle="How Banton Group collects, uses and protects your personal information — and the rights you have over it."
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <section className="relative py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="space-y-10">
              {sections.map((s, i) => (
                <div key={i}>
                  {s.heading && (
                    <h2 className="text-[#1C3A64] text-[20px] md:text-[22px] font-medium mb-4 leading-[1.25] tracking-tight">
                      {s.heading}
                    </h2>
                  )}
                  {s.subheading && (
                    <h3 className="text-[#1C3A64] text-[15px] md:text-[16px] font-medium mb-3 leading-[1.3]">
                      {s.subheading}
                    </h3>
                  )}
                  {s.paragraphs && (
                    <div className="space-y-4 text-[#555555] text-[14px] md:text-[15px] leading-[1.75]">
                      {s.paragraphs.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  )}
                  {s.list && (
                    <ul className="list-disc pl-6 mt-3 space-y-2 text-[#555555] text-[14px] md:text-[15px] leading-[1.7]">
                      {s.list.map((li, j) => (
                        <li key={j}>{li}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
