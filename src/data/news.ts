// Banton Group Blog — Articles
// Amanda / the admin team add articles here as they get published.
// Markdown-ish content is supported as an array of Block entries
// so images, pull quotes, lists and external links can be mixed in.

export type ArticleBlock =
  | { kind: 'p'; text: string }
  | { kind: 'h2'; text: string }
  | { kind: 'h3'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'quote'; text: string; attribution?: string }
  | { kind: 'link'; label: string; href: string }
  | { kind: 'image'; src: string; caption?: string }

export interface NewsArticle {
  /** URL slug — used as the article's route (/blog/:slug) */
  slug: string
  title: string
  /** ISO 8601 date. Example: "2025-03-14" */
  date: string
  /** Short sentence shown on the list and at the top of the article. */
  excerpt: string
  /** Optional short tag. Example: "Class Actions", "Press Release", "Media". */
  category?: string
  /** Optional author byline. Example: "Amanda Banton". */
  author?: string
  /** Source + external link for press pieces. */
  source?: { name: string; url: string }
  /** Cover image shown on the list card and at the top of the article. */
  coverImage?: string
  /** Article body — leave empty if this entry only links out to an external source. */
  content?: ArticleBlock[]
}

// ─────────────────────────────────────────────────────────────
// Blog content approved by the firm.
// Once Sanity has entries, this static list is only used as
// the fallback when the CMS is unreachable.
// ─────────────────────────────────────────────────────────────
export const articles: NewsArticle[] = [
  {
    slug: 'service-outside-australia-hague-convention',
    title: 'Service outside Australia and the Hague Convention',
    date: '2021-09-09',
    category: 'Commentary',
    author: 'Amanda Banton & Robert True',
    coverImage: 'https://bantongroup.com/wp-content/uploads/2021/09/Insights1.jpg',
    excerpt:
      "Justice Delany's ruling in Jabiru Satellite v Société Générale highlights a possible inconsistency between Australia's Hague Convention obligations and the domestic civil-procedure rules enacted to implement them.",
    content: [
      {
        kind: 'p',
        text: 'In ruling to extend the validity of a writ on 2 September 2021, Justice Delany of the Supreme Court of Victoria recently reaffirmed the primacy of Australia’s treaty obligations, specifically the Hague Convention on the Service Abroad of Judicial and Extrajudicial Documents in Civil or Commercial Matters (Hague Convention), over subordinate legislation.',
      },
      {
        kind: 'p',
        text: 'That is hardly surprising. However, what may be surprising is the way His Honour’s judgment highlights a possible inconsistency between the terms of the Hague Convention and the domestic Australian civil procedure framework enacted to facilitate service pursuant to it.',
      },
      {
        kind: 'p',
        text: 'In Jabiru Satellite Limited (In Liquidation) (Receivers and Managers Appointed) & Anor v Société Générale & Ors [2021] VSC 544, Delany J ordered the extension of the validity of a writ filed by the plaintiffs in June 2020. His Honour’s decision stands for the proposition that the Court’s discretion to extend the validity of a writ may be exercised in favour of a plaintiff who takes reasonable steps to serve a defendant before the writ expires, because such reasonable steps are a “good reason” to exercise that discretion. Here the evidence was of the plaintiffs’ determined efforts to bring the writ to the attention of two foreign defendants, the Export-Import Bank of the United States and Citicorp International Limited, just before its expiry, evidence which allowed the judge to conclude that both defendants in question were probably aware of the writ by this time. A balancing of prejudice consequently fell in favour of the Court exercising its discretion to extend the writ.',
      },
      {
        kind: 'p',
        text: 'That the plaintiffs went to such lengths to bring the writ to the attention of foreign defendants, instead of simply serving it on them, was on account of Order 80 of the Supreme Court (General Civil Procedure) Rules 2015 (Vic) (Rules), which requires service pursuant to the Hague Convention (Hague Service) to be completed in accordance with a specific procedure. Order 80 is broadly similar to Part 11A of the Uniform Civil Procedure Rules 2005 (UCPR) in NSW.',
      },
      {
        kind: 'p',
        text: 'Specifically, the plaintiffs said, as both defendants were located in countries signatory to the Hague Convention, Order 80 (specifically O.80, r.02): (a) has the effect of excluding the ordinary provisions for overseas service set out in Order 7; and (b) requires service to be completed by way of application to the Prothonotary as the first step in the reciprocal, intergovernmental service process (of indeterminate duration) which is what the Hague Convention ultimately is understood to stand for.',
      },
      {
        kind: 'p',
        text: 'As to the plaintiffs’ approach, while Delany J noted that the plaintiffs’ application was not the occasion to definitively consider the nexus between Orders 7 and 80 and the Hague Convention, His Honour expressed doubt as to whether the Hague Service procedure described in Order 80 could affect anything set out in the convention itself.',
      },
      {
        kind: 'p',
        text: 'His Honour directed attention to Article 10 of the Hague Convention, which states that the convention does not, if the state of destination does not object (in practice by signing up to this part of the convention), interfere with a party’s freedom to send documents by post directly overseas. His Honour noted that Article 10 operates independently of the intergovernmental process to which Order 80 is directed and concluded that Article 10 “expressly reserves the right of a party to serve a document in a manner that would otherwise have been permitted by the jurisdiction in which service is to be effected”.',
      },
      {
        kind: 'p',
        text: 'This conclusion draws heavily on the Hague Convention preamble, which states that the signatory states (among other things) “desir[e] to create appropriate means to ensure that judicial and extrajudicial documents to be served abroad shall be brought to the notice of the addressee in sufficient time”.',
      },
      {
        kind: 'p',
        text: 'The effect of His Honour’s observations (which, again, were not central to the plaintiffs’ application) may be that although Order 80 of the Rules in Victoria (and its equivalents) are designed to govern the process of effecting Hague Service in Australia, Article 10 of the Hague Convention itself may actually permit service overseas outside of this domestic framework, providing the destination country does not object.',
      },
      {
        kind: 'p',
        text: 'Banton Group acts for the plaintiff in these proceedings, which are brought by the liquidator of Jabiru Satellite Limited and Newsat Limited against a syndicate of foreign banks and the French governmental guarantor entity, COFACE, in relation to the failure of the Jabiru Project in 2015.',
      },
      {
        kind: 'p',
        text: 'For more information, please contact Amanda Banton or Robert True.',
      },
    ],
  },
  {
    slug: 'mdba-unable-to-escape-potential-liability',
    title: 'MDBA unable to escape potential liability',
    date: '2021-10-13',
    category: 'Case Update',
    author: 'Amanda Banton & Melissa Morgan',
    coverImage: 'https://bantongroup.com/wp-content/uploads/2021/10/insight2-scaled.jpg',
    excerpt:
      'The NSW Court of Appeal confirms the Murray Darling Basin Authority and the Commonwealth cannot shelter behind the Civil Liability Act in this Banton Group-led farmers’ class action.',
    content: [
      {
        kind: 'h2',
        text: 'Doyle’s Farm Produce Pty Ltd v Murray Darling Basin Authority (No 2) [2021] NSWCA 246',
      },
      {
        kind: 'p',
        text: 'The Court of Appeal handed down a significant judgment in a Banton Group-led class action, finding that the Murray Darling Basin Authority (MDBA) and the Commonwealth cannot escape potential liability for the alleged mismanagement of the Murray Darling, by relying on a legal defence in the Civil Liability Act. As a result of the Court of Appeal judgment, the MDBA and the Commonwealth will be held to the same standard as any other person in a negligence case. The farmers will have to prove they did not show a reasonable standard of care rather than the higher standard the MDBA and the Commonwealth said should apply.',
      },
      {
        kind: 'p',
        text: 'This was a significant win for the plaintiffs represented by Banton Group as the Court found that the MDBA and the Commonwealth could not rely on the significant protections it purported to rely on in its defence.',
      },
      {
        kind: 'quote',
        text: 'We are very pleased with the result. It significantly reduces the issues in dispute and those savings should be reflected in considerable cost savings in finalising this matter for group members whom we hope to make significant recoveries for.',
        attribution: 'Amanda Banton, Managing Partner, Banton Group',
      },
      {
        kind: 'p',
        text: 'The Banton Group-led class action was launched on 9 April 2020 by Doyle’s Farm Produce, John Doyle, Coobool Downs Pastoral Co, Rodney Dunn and Valerie Dunn on behalf of farmers in Southern New South Wales against the MDBA and the Commonwealth of Australia.',
      },
      {
        kind: 'p',
        text: 'The MDBA is the Commonwealth statutory agency tasked with operating the River Murray system. The MDBA has been subject to great criticism about its operations from Bret Walker SC, the Commissioner of the Murray-Darling Basin Royal Commission.',
      },
      {
        kind: 'p',
        text: 'Part of the plaintiffs’ case against the MDBA is that they should have ensured that the MDBA’s modelling and water accounting practices were updated to the best available data to include, among other matters, the impact of climate change upon the Basin. Bret Walker SC concluded in the Commission that “The MDBA’s failure to heed the advice of the CSIRO, and to follow the requirements of the law, imposed by the Water Act, has not been explained and cannot be justified. Its reasoning for not incorporating climate change into the determination of ESLTs and SDLs is not defensible”.',
      },
      {
        kind: 'p',
        text: 'Bret Walker SC also raises in his report “the habitual behaviour of the Murray-Darling Basin Authority (MDBA), and to a lesser but alarming extent the CSIRO, is marked by an unfathomable predilection for secrecy”.',
      },
      {
        kind: 'p',
        text: 'The case concerns the MDBA’s decisions to drain the Menindee Lakes in 2016/17 and flood the Barmah-Millewa forest at a time when that water was critical to irrigation farmers for growing their crops. The plaintiffs allege that the MDBA breached their duties to the farmers by undertaking these actions which they argue were not in compliance with operation manuals and standing practices. It is argued that had the MDBA and Commonwealth carried out its river operations in accordance with operation manuals and standing practices the Menindee Lakes would not have been drained and the flooding of the forest would not have occurred resulting in the farmers receiving more water between 2017 and 2019. The farmers are represented by Banton Group.',
      },
      {
        kind: 'p',
        text: 'Jack and Maree Doyle are potato farmers in the Berrigan district of NSW. Rodney and Valerie Dunn are rice and cereal farmers in the Mellool district of NSW. By receiving only half of the water they were entitled to in the 2018 financial year and no water in the 2019 financial year, their irrigated operations suffered a financial loss as their irrigated crops are dependent on water reaching them from the great Murray and Darling rivers which are managed by the MDBA.',
      },
      {
        kind: 'p',
        text: 'Banton Group, on behalf of the plaintiffs, filed an application with the Supreme Court in December 2020 to eliminate one of MDBA and the Commonwealth’s significant defences. The plaintiffs argued that the MDBA and Commonwealth cannot have recourse to Part 5 of the Civil Liability Act as, among other arguments, they are not “public authorities” as defined by the New South Wales Civil Liability Act.',
      },
      {
        kind: 'p',
        text: 'On 13 April 2021, Justice Adamson of the New South Wales Supreme Court heard the application and held that the MDBA and the Commonwealth were not “public authorities” as defined by the Civil Liability Act, rejecting the MDBA and Commonwealth’s attempt to limit their liability. Justice Adamson’s decision was appealed by the MDBA and Commonwealth. The MDBA and Commonwealth’s appeal was dismissed by the Court of Appeal on 12 October 2021.',
      },
      {
        kind: 'p',
        text: 'The Court praised the parties for their “high quality” submissions and found that, while the State of New South Wales plays a part in the operations of the MDBA, that did not make the functions performed by the MDBA “public official functions” of New South Wales when these were physically located in the State.',
      },
      {
        kind: 'p',
        text: 'For more information, please contact Amanda Banton or Melissa Morgan.',
      },
    ],
  },
  {
    slug: 'legal-500-ranking-2022',
    title: 'Banton Group ranked again in 2022 by the Legal 500',
    date: '2022-01-19',
    category: 'Firm Update',
    author: 'Banton Group',
    coverImage: 'https://bantongroup.com/wp-content/uploads/2022/01/Legal-500.jpg',
    excerpt:
      'The Legal 500 Asia Pacific 2022 ranks Banton Group in Dispute Resolution: Litigation and Restructuring & Insolvency, and names the firm a “firm to watch” for Class Actions.',
    content: [
      {
        kind: 'p',
        text: 'Banton Group is delighted to announce our ranking by the Legal 500 Asia Pacific for 2022 in two categories: Dispute Resolution: Litigation and Restructuring and Insolvency. The Legal 500 has also earmarked Banton Group as its “firm to watch” in the Class Actions space.',
      },
      {
        kind: 'p',
        text: 'As our firm approaches the end of just its second year of operation, this is a wonderful result of which we are extremely proud.',
      },
      {
        kind: 'p',
        text: 'We take this opportunity to offer our sincere thanks to our clients — you trust us to do your most difficult work every day, and we’re delighted to offer you our best efforts. We also offer our congratulations to the whole team at Banton Group, including partners Elliott Smith and Ross Garland.',
      },
      {
        kind: 'p',
        text: 'The feedback our clients offered to the Legal 500 as part of its review and assessment process has been tremendously rewarding to read. We are grateful for this and share some of it below.',
      },
      { kind: 'h3', text: 'Dispute Resolution: Litigation' },
      {
        kind: 'quote',
        text: 'A leading insolvency class action firm. Innovative and tenacious. They have changed the class action landscape.',
      },
      {
        kind: 'quote',
        text: 'The team at Banton Legal has significant court experience coupled with the subtlety of the fine art of negotiation, which provides firm but fair outcomes built on integrity and strength not machismo.',
      },
      {
        kind: 'quote',
        text: '[Amanda Banton] comes out with clear advice and is honest about what is possible. She is calm, has an eye for detail and is extremely thorough with due diligence. Overall very professional, a great strategist and an excellent litigator.',
      },
      { kind: 'h3', text: 'Restructuring and Insolvency' },
      {
        kind: 'quote',
        text: 'Small boutique team of exceptional quality — class leading and on par with the best large global firms.',
      },
      {
        kind: 'quote',
        text: 'Amanda Banton is an exceptional strategist and lawyer.',
      },
      {
        kind: 'quote',
        text: 'Amanda Banton, the principal of Banton Group, is a very experienced solicitor who practises in the restructuring and insolvency space. She is a shrewd operator with a wealth of experience and has very good client skills. She is well placed to advise clients with respect to their restructuring and insolvency needs.',
      },
    ],
  },
  {
    slug: 'high-court-arrium-shareholders-examination',
    title: 'Banton Group successful in High Court',
    date: '2022-02-16',
    category: 'Case Update',
    author: 'Amanda Banton & Elliott Smith',
    coverImage: 'https://bantongroup.com/wp-content/uploads/2022/02/High_Court_of_Australia.jpg',
    excerpt:
      'In Walton v Arrium, a High Court majority confirms shareholders of companies in external administration may publicly examine former directors under section 596A of the Corporations Act.',
    content: [
      {
        kind: 'p',
        text: 'The High Court of Australia today delivered a seminal judgment in favour of Banton Group’s clients, Michael Walton and Anthony Bogan. A majority of the High Court (per Edelman, Steward and Gageler JJ) held that Banton Group’s clients, shareholders in collapsed mining giant Arrium, were entitled under section 596A of the Corporations Act 2001 (Cth) to publicly examine former directors of the company. The decision overturns a ruling by the NSW Court of Appeal, which had earlier found the proposed examination of former Arrium directors by shareholders would be an abuse of process.',
      },
      {
        kind: 'p',
        text: 'The decision has major implications for the accountability of directors of a publicly listed company to their shareholders.',
      },
      {
        kind: 'p',
        text: 'The decision is Walton & Anor v ACN 004 410 833 Ltd (formerly Arrium Limited) (In Liquidation) & Ors [2022] HCA 3.',
      },
      { kind: 'h2', text: 'The Primary Proceedings' },
      {
        kind: 'p',
        text: 'Banton Group acts for Mr Walton and Mr Bogan in representative proceedings filed in the Victorian Supreme Court in August 2020 (Arrium Class Action). The Arrium Class Action alleges Arrium’s former directors and auditor KPMG made misleading or deceptive statements in the company’s financial reports about its compliance with Australian accounting standards and failed to disclose material impairments in the company’s assets.',
      },
      {
        kind: 'p',
        text: 'In October 2014, Arrium completed a $750 million capital raising, having published its 2014 financial results and provided shareholders with an Information Memorandum for that purpose. In January 2015, Arrium announced the suspension or closure of one of its principal mining operations and wrote down its assets by $1.3 billion. In April 2016, Arrium was placed into administration and, in June 2019, liquidators were appointed.',
      },
      {
        kind: 'p',
        text: 'After Arrium went into administration, the Australian Securities and Investments Commission allowed the shareholders to apply for an examination under s 596A of the Corporations Act. Banton Group, on behalf of its clients, issued a summons to the former Arrium directors which was initially allowed, but subsequently set aside by the NSW Court of Appeal, who found the “private nature” of the shareholders’ claims rendered the proposed examinations an abuse of process.',
      },
      {
        kind: 'p',
        text: 'Banton Group appealed this decision to the High Court.',
      },
      { kind: 'h2', text: 'The High Court Decision' },
      {
        kind: 'p',
        text: 'The High Court’s majority decision found that the examination summons issued by shareholders was not issued for a purpose that was an abuse of process.',
      },
      {
        kind: 'p',
        text: 'In a summary of the judgment, the High Court said:',
      },
      {
        kind: 'quote',
        text: 'In deciding whether the use of a court process authorised by statute is an abuse of process, the question is whether the litigant’s predominant purpose is inconsistent with the scope and purpose of the statutory process. The purpose and concern of s 596A is not confined to the interests of the corporation, its creditors, or its contributories, or to the bringing of criminal or regulatory proceedings in connection with the affairs of the corporation. Examining an officer of a corporation for the purpose of pursuing a claim against the corporation in external administration or one of its officers or advisers for the enforcement of the law can be a legitimate use of the power conferred by s 596A, irrespective of whether it is in the interests of the corporation or whether the claim relates to all or only some of the corporation’s creditors or contributories. The summons was therefore not issued for a purpose that was an abuse of process.',
      },
      { kind: 'h2', text: 'Significance' },
      {
        kind: 'p',
        text: 'This is a landmark decision in respect of the High Court’s interpretation of the Corporations Act that ensures that the statutory powers which enable ASIC to authorise the public examination of directors and officers of a public company may extend to anyone authorised by ASIC as an “Eligible Applicant” without reference to whether the company or its creditors will benefit.',
      },
      {
        kind: 'quote',
        text: 'Banton Group are pleased with the outcome. The majority of the High Court correctly determined that the limitation imposed by the Court of Appeal had unduly constrained the operation of section 596A. Had our clients not appealed, many of those who suffer losses from corporate failure would continue to be deprived of the power to examine and, in that way, to understand the causes of the failure and to identify potential recovery avenues.',
        attribution: 'Amanda Banton, Managing Partner, Banton Group',
      },
      {
        kind: 'p',
        text: 'For more information, please contact Amanda Banton or Elliott Smith.',
      },
    ],
  },
  {
    slug: 'worley-shareholders-successful-on-appeal',
    title: 'Shareholders in Worley successful on appeal',
    date: '2022-03-14',
    category: 'Case Update',
    author: 'Amanda Banton & Elliott Smith',
    coverImage: 'https://bantongroup.com/wp-content/uploads/2022/03/Worley.jpg',
    excerpt:
      'The Full Federal Court allows Crowley v Worley on appeal — a significant decision for misleading-or-deceptive-conduct and continuous-disclosure shareholder class actions in Australia.',
    content: [
      {
        kind: 'p',
        text: 'On 11 March 2022, in an important decision for shareholder class actions in Australia, a three-judge panel of the Federal Court of Australia allowed an appeal of plaintiff/appellant Larry Crowley (appellant) and set aside orders from the primary court — which were part of only the second shareholder class action judgment in Australia’s history — dismissing the originating application and fourth and further amended statement of claim in the matter of Crowley v Worley Ltd ACN 096 090 158 [2022] FCAFC 33.',
      },
      {
        kind: 'p',
        text: 'The issues on appeal included whether the primary court had erred in (i) not finding that the defendant/respondent Worley Ltd. (respondent) had engaged in misleading and deceptive conduct by representing that it expected to achieve net profit after tax (NPAT) in excess of $322 million in the financial year ended 30 June 2014 (FY14) and that it had reasonable grounds to so expect, in contravention of, inter alia, s 1041H of the Corporations Act; (ii) not finding that the respondent had contravened its continuous disclosure obligations under s 674 of the Corporations Act and listing rule 3.1 of the Australian Stock Exchange (ASX); and (iii) finding that the relevant representor of financial disclosures was the board of the corporation and not the corporation itself.',
      },
      {
        kind: 'p',
        text: 'In summary, the decision is important in at least the following respects, particularly for plaintiffs in shareholder class actions in Australia:',
      },
      {
        kind: 'ul',
        items: [
          'Clarifies that, in misleading and deceptive conduct cases, the reasonableness and knowledge of a company’s board alone — even if the board has the final say in approval of company financial announcements or filings — is not the relevant inquiry. Rather, it is the company’s knowledge itself (as the representor), through orthodox principles of agency, that is the key when determining the elements of reasonableness and knowledge. This allows plaintiffs to adduce a broader array of relevant evidence in order to prove these elements.',
          'Primary courts should take into account whether officers, directors or employees who were allegedly central to the alleged misleading and deceptive conduct — particularly if still employed by the defendant — have been called by the defendant to give evidence. In the event that they have not, primary courts are entitled to make an adverse inference against the defendant that the evidence would have been unfavourable.',
          'In cases where the allegation is that the defendant issued overstated profit guidance in violation of continuous disclosure obligations, the proper question is not whether the defendant ought to have held an opinion that its guidance was overstated, but whether the defendant had or ought reasonably to have had information to that effect — a lower threshold for plaintiffs to meet.',
        ],
      },
      { kind: 'h2', text: 'Background' },
      { kind: 'p', text: 'The key facts can be summarised as follows:' },
      {
        kind: 'p',
        text: 'On 14 August 2013, respondent had published to the ASX its earnings guidance for FY2014 of $322 million (August 2013 earnings guidance statement), which was based upon respondent’s internal FY14 budget forecasting an NPAT of $352.1 million. On 9 October 2013, respondent made an additional announcement that its first half results would be lower than the prior year, but affirmed the August 2013 earnings guidance statement. That guidance statement was then reaffirmed in two additional investor presentations in October 2013.',
      },
      {
        kind: 'p',
        text: 'Then, on 20 November 2013, respondent published revised earnings guidance downward, stating that NPAT for FY14 would be in the range of $260 to $300 million (November 2013 revised earnings guidance statement). Upon that publication, respondent’s share price fell approximately 26% and appellant subsequently brought a shareholder class action on behalf of himself and other shareholders during the relevant period.',
      },
      {
        kind: 'p',
        text: 'The November 2013 revised earnings guidance statement led to reflection among respondent’s senior management about what might have gone wrong in respondent’s budgeting process. That reflection led to the preparation of a memorandum by respondent’s Chief Financial Officer Simon Holt (Holt Memorandum). The Holt Memorandum noted, inter alia, that, in the past six years, respondent had underperformed its original budget by 10% or more five times. It also noted that respondent’s budgeting process and disclosures included that it should be a “P50” budget, that is, there should be at least a 50% chance that respondent will achieve its budget. The Holt Memorandum further concluded that expectations of growth at the senior management level had been too optimistic, with insufficient allowance made for potential downsides, and that budgets in prior years had not genuinely been P50 budgets.',
      },
      {
        kind: 'p',
        text: 'Notably, in the proceedings before the primary court, respondent did not call Mr. Holt to give evidence to explain the Holt Memorandum or otherwise. Respondent also did not call several other key executives and employees involved in the budgeting process or the earnings guidance releases and announcements.',
      },
      { kind: 'h2', text: 'Discussion' },
      {
        kind: 'p',
        text: 'The Court framed one of the primary issues on appeal as follows:',
      },
      {
        kind: 'quote',
        text: 'While the FY14 guidance representation was made as a result of a decision of the board to adopt the FY14 budget and give the August 2013 earnings guidance statement to the market, the representor was [respondent], not the board of [respondent]. Accordingly, the issue is whether [respondent] had reasonable grounds for making the FY14 guidance representation. The issue is not whether the board acted reasonably or unreasonably given the information made available to it by [respondent]’s officers.',
      },
      {
        kind: 'p',
        text: 'Thus, the erroneous focus of the primary judge on the conduct and knowledge of respondent’s board, as opposed to the conduct and knowledge of respondent (through its officers and directors under orthodox principles of agency), led the Court to set aside the primary court’s orders. The Court reasoned that, were the law otherwise, any corporation could succeed in defending against a claim of misleading and deceptive conduct merely because the board itself had no reason to know of forecasts that were unreasonably and unrealistically high.',
      },
      {
        kind: 'p',
        text: 'This is significant as it clarifies that knowledge (or lack of knowledge) of a company’s board alone — even if the board has the final say in approval of company announcements or filings — is not the relevant inquiry. Rather, it is the company’s knowledge itself, through orthodox principles of agency, that is the key when determining reasonableness and knowledge in a misleading and deceptive conduct shareholder class action.',
      },
      {
        kind: 'p',
        text: 'The Court also credited the Holt memorandum as being a relatively contemporaneous document — not simply hindsight — prepared by the CFO who was intimately involved in the budgeting process and August 2013 earnings guidance statement. And the Court found that respondent’s failure to call Mr. Holt and numerous other key executives and employees to give evidence could have allowed for the primary court to draw an adverse inference as to what their testimony would have been, but that primary court failed to take those considerations into account in rendering judgment.',
      },
      {
        kind: 'p',
        text: 'Again, this is a significant holding insofar as defendants should strongly consider calling all key witnesses — particularly to explain important documents such as the Holt Memorandum — to put on evidence and plaintiffs should argue strenuously that failure to do so brings to bear an adverse inference as to defendants’ evidence in shareholder class actions. The Court found that the primary judge “found all of the relevant facts but [did] not draw[] the inevitable inference those facts would require to be drawn.”',
      },
      {
        kind: 'p',
        text: 'Finally, as to appellant’s contention that respondent had contravened its continuous disclosure requirements, the Court held:',
      },
      {
        kind: 'quote',
        text: 'In a case like the present, where the allegation[] is that the company issued an overstated profit guidance, the proper question is not whether [respondent] ought to have held an opinion that its NPAT for FY14 was likely to fall materially short of the amount forecast or the market consensus as to the NPAT, but whether the company had or ought reasonably to have had information to that effect.',
      },
      {
        kind: 'p',
        text: 'Thus, the Court found that the primary judge and respondent had set the bar too high for appellant to plead and prove a continuous disclosure requirement violation — another significant holding that may be advantageous for shareholder class action plaintiffs going forward.',
      },
      {
        kind: 'p',
        text: 'For more information, please contact Amanda Banton or Elliott Smith.',
      },
    ],
  },
  {
    slug: 'cbre-third-party-valuation',
    title: 'Can a third party rely on a valuation not addressed to it?',
    date: '2022-04-27',
    category: 'Commentary',
    author: 'Amanda Banton & Melissa Morgan',
    coverImage: '/img/blog/cbre-cover.jpg',
    excerpt:
      'In CBRE v City Pacific, the NSW Court of Appeal confirms a valuer’s standard disclaimers will not necessarily immunise misleading or deceptive conduct from third-party reliance.',
    content: [
      {
        kind: 'p',
        text: 'The matter of CBRE (V) Pty Ltd v City Pacific Ltd (in liq) [2022] NSWCA 54 was heard before the Court of Appeal on 24 and 25 March 2022 by Bell CJ, Leeming JA, and Brereton JA. It concerned an option to purchase land based on a series of valuations prepared by CBRE (V) Pty Ltd which were claimed to have been negligently prepared and misleading and deceptive. City Pacific nominated its wholly owned subsidiary Martha Cove Marina Pty Ltd as purchaser and made payments totalling $11.1 million towards the price, but the sale failed.',
      },
      {
        kind: 'p',
        text: 'At first instance, City Pacific were successful with the Court finding that the valuations were negligently prepared and contained misleading statements regarding the land’s market value and that City Pacific relied on the valuations when advancing the funds. CBRE (V) Pty Ltd appealed this decision. On 11 April 2022, the decision was set aside by the Court of Appeal.',
      },
      {
        kind: 'p',
        text: 'No appeal challenged that the valuations were not based on reasonable grounds, were not a reliable opinion of the value of the Marina and were not the product of due care and skill, and for each of those reasons were misleading and deceptive.',
      },
      {
        kind: 'p',
        text: 'Two interesting points of law are to note from the outcome of this judgment.',
      },
      {
        kind: 'p',
        text: 'Firstly, whether the conduct of supplying the document, being the valuations, was misleading or deceptive, given that the final valuation was not addressed to City Pacific.',
      },
      {
        kind: 'p',
        text: 'The Court of Appeal held that the fact that a named recipient to the valuation is not the person relying on it does not immunise the conduct from characterisation as misleading or deceptive. This is because the question posed by statute is whether there was conduct in trade or commerce that contravened the statutory norm, and it involves error to approach its operation by reference to causes of action such as negligent misrepresentation at law or innocent misrepresentation in equity.',
      },
      {
        kind: 'p',
        text: 'Secondly, whether the misleading or deceptive conduct could be sidelined given that the valuation contained the following disclaimers:',
      },
      {
        kind: 'quote',
        text: 'Assumptions, Disclaimers, Limitations & Qualifications: This valuation report is provided subject to the assumptions, qualifications, limitations and disclaimers detailed throughout this report which are made in conjunction with those included within the Assumptions, Qualifications, Limitations & Disclaimers section located at the beginning of this report. Reliance on this report and extension of our liability is conditional upon the reader’s acknowledgement and understanding of these statements. This valuation is for the use only of the party to whom it is addressed and for no other purpose. No responsibility is accepted to any third party who may use or rely on any party of the content of this valuation. … The assessment of the individual values assumes the development is completed to a satisfactory standard as at the date of valuation having regard to market evidence existing at the time, and does not purport to represent values at any future point in time … This report may only be relied upon by Indigo (Martha Cove Harbour Precinct Land Owner) P/L for first mortgage security purposes.',
      },
      {
        kind: 'p',
        text: 'The court held that this argument is again a departure from the analysis required by statute. Misleading or deceptive conduct must be determined by consideration of all circumstances. Restricting the use of the conduct through disclaimers does not alter the fact that it breached the statutory standard.',
      },
      {
        kind: 'p',
        text: 'The above are important considerations for professional firms when preparing valuations and other documents and who seek to rely on such disclaimers which are commonly used within professional industries. Professional firms should not automatically assume that such disclaimers will limit their liability or that only the named recipients will be able to rely on such documents.',
      },
      {
        kind: 'p',
        text: 'For more information, please contact Amanda Banton or Melissa Morgan.',
      },
    ],
  },
  {
    slug: 'jewel-liquidator-examinations-proceed',
    title: 'Court holds that liquidator examinations are to proceed',
    date: '2022-04-27',
    category: 'Case Update',
    author: 'Amanda Banton & Melissa Morgan',
    coverImage: 'https://bantongroup.com/wp-content/uploads/2022/04/KPMG_Image.png',
    excerpt:
      'Justice Williams holds that the proposed s 596A examinations of the Jewel Fine Foods administrators and liquidators are to proceed — rejecting their abuse-of-process objections.',
    content: [
      {
        kind: 'p',
        text: 'The NSW Supreme Court handed down a judgment in favour of Banton Group’s clients, Mr Kishore Matta and Avia Corporate FS Pty Ltd, which has paved the way for our clients to proceed with their proposed examinations of James Dampney, Peter Gothard and Stephen Parbery, the former administrators (Administrators) and (in the case of Mr Dampney and Mr Gothard) current liquidators (Liquidators) of the Jewel Fine Foods Group (Jewel Group).',
      },
      {
        kind: 'p',
        text: 'The decision is In the matter of Jewel of India Holdings Pty Ltd [2022] NSWSC 356.',
      },
      { kind: 'h2', text: 'Background' },
      {
        kind: 'p',
        text: 'The Jewel Group was founded in 1997 by Mr Matta and his wife and specialised in industrial scale food manufacturing. In 2019, the CBA appointed the Administrators and later, the Liquidators to the Jewel Group.',
      },
      {
        kind: 'p',
        text: 'In November 2020, our clients applied to ASIC to be granted eligible applicant status to conduct examinations of the Administrators (ASIC Application). These examinations were sought for the purpose of investigating claims in relation to:',
      },
      {
        kind: 'ul',
        items: [
          'The Administrators’ apparent failure to undertake appropriate steps in the sale of the business of Jewel Fine Foods.',
          'The Administrators’ apparent failure to investigate and prosecute potential unconscionable conduct and promissory estoppel claims against the Commonwealth Bank of Australia (CBA) on behalf of the Jewel Group.',
        ],
      },
      {
        kind: 'p',
        text: 'The ASIC Application was approved in May 2021 and in July 2021. Banton Group applied on behalf of our clients to the NSW Supreme Court for examination summonses to be issued to the Administrators and for orders for production to be issued to the Administrators and the CBA (Examinations Application). The Examinations Application was granted by the NSW Supreme Court in August 2021.',
      },
      { kind: 'h2', text: 'The Motion to Dismiss' },
      {
        kind: 'p',
        text: 'In August 2021, the Administrators filed a motion to set aside the examination summonses and orders for production, alleging that they were an abuse of process. The applicants’ fundamental contention was that, despite what is contained in the ASIC Application and Examinations Application, our clients sought the examination summonses for the predominant purpose of attempting to secure a position of commercial leverage in relation to potential claims that the Liquidators were pursuing against Mr Matta. The applicants also sought to suggest that our client’s engagement of Banton Group was to strategically serve this improper purpose.',
      },
      {
        kind: 'p',
        text: 'In reaching the decision, Justice Williams referred to the public interest in the external administration of a company that underpins the purpose of s 596A and considered that this was relevant to not only determining whether an examination summons was sought for permitted purpose but also the question whether circumstances that may be burdensome for an examinee are capable of constituting unjustifiable oppression or bringing the administration of justice into disrepute. Ultimately, the Court held that the Liquidators had failed to establish that the examination summonses are an abuse of process and, in reaching this decision, accepted Banton Group’s submission that the notion that our clients’ predominant purpose was to secure commercial leverage against the Liquidators was “fanciful”. In considering the evidence leading to this point, Justice Williams also concluded that Banton Group’s engagement did not give rise to an inference that Mr Matta had an improper purpose but rather merely gave rise to an inference that:',
      },
      {
        kind: 'quote',
        text: 'Mr Matta had greater confidence in Banton Group’s ability to represent his interests in relation to the external administration of the Jewel Group going forward.',
      },
      {
        kind: 'p',
        text: 'The Administrators also challenged the examination summons and orders for production with arguments that were based on cost and disruption, and utility of the examinations. The Administrators alleged that compliance with the examination summons would result in a substantial and costly intrusion into the external administration. However, Justice Williams rejected submissions that it would be oppressive for the Liquidators to incur any costs in complying with the examination summons. In reaching this decision, her Honour noted that each of the liquidators were only required to initially prepare for and attend one day of examinations and, in accordance with the decision in Kimberley Diamonds Limited v Arnautovic (2017) 252 FCR 244, current and former administrators and liquidators are in no different position than any other current or former officer liable to be summoned for examination under s 596A.',
      },
      {
        kind: 'p',
        text: 'For more information, please contact Amanda Banton or Melissa Morgan.',
      },
    ],
  },
]

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getSortedArticles(): NewsArticle[] {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : -1))
}
