// Bulk setter for cases.body_html — re-structures the migrated case bodies
// so the public site matches the firm's live bantongroup.com pages:
//
//   • Listing card (/class-actions): the intro paragraphs that sit BEFORE
//     the first heading.
//   • Detail page (/class-actions/<slug>): everything from the first heading
//     onwards, with real <h3> section headings, PDF links as <p> buttons,
//     and the WordPress "Register Now" link (rewritten to the internal
//     /register route by buttonizeRegisterLinks).
//
// All copy is the firm's own text (taken verbatim from the existing DB body /
// the screenshots they supplied) — only the HTML structure is fixed.
//
// Re-runnable / idempotent. Run with:
//   node scripts/set-case-bodies.mjs            (all cases in BODY)
//   node scripts/set-case-bodies.mjs cudeco     (only the listed slugs)

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

function loadEnv(file) {
  try {
    const t = readFileSync(file, 'utf8')
    for (const l of t.split(/\r?\n/)) {
      const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  } catch {}
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
loadEnv(path.join(root, '.env.local'))

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const STORAGE = 'https://ehymdracjodyxiyeimfb.supabase.co/storage/v1/object/public/article-documents/cases'
const DOCS = `${STORAGE}/cudeco`
const FITCH = `${STORAGE}/fitch-scdo`
const PHOS = `${STORAGE}/phoslock`
const FITCHUK = `${STORAGE}/fitch-ratings-uk`
const SPUK_CLAIM_FORM = 'https://bantongroup.com/wp-content/uploads/2026/04/2026.30.01-Amended-Claim-Form-SP-sealed-30-January-2025.pdf'

// slug -> body_html
const BODY = {
  cudeco: `
<p>Banton Group acts on behalf of shareholders in a class action against the former directors, officers and auditor (KPMG) of a previously ASX listed company CuDeco Limited (In Liquidation) (ASX:CDU).</p>

<p>The class action alleges the contravention of various provisions of the Corporations Act 2001 including, inter alia, their continuous disclosure obligations.</p>

<p><a href="/class-actions/cudeco">Click here for more information about the CuDeco Class Action</a></p>

<h3>Recent Court Orders</h3>

<p><a href="${DOCS}/2026-03-19_Federal-Court-Order-Justice-Moshinsky.pdf" target="_blank" rel="noopener">The Court&rsquo;s orders dated 19 March 2026</a></p>

<h3>Key Documents</h3>

<p><a href="${DOCS}/2025-08-08-Further-Amended-Statement-of-Claim-dated-8-August-2025-sealed-1.pdf" target="_blank" rel="noopener">The Further Amended Statement of Claim</a></p>
<p><a href="#" target="_blank" rel="noopener">The Second Respondent&rsquo;s Defence</a></p>
<p><a href="${DOCS}/2023-03-28-Defence-of-Third-Respondent-Sealed.pdf" target="_blank" rel="noopener">The Third Respondent&rsquo;s Defence</a></p>
<p><a href="${DOCS}/2023-04-11-Defence-of-Fourth-Respondent-Sealed.pdf" target="_blank" rel="noopener">KPMG&rsquo;s Defence</a></p>
<p><a href="${DOCS}/Cudeco-Notice-of-Settlement.pdf" target="_blank" rel="noopener">The Notice of Proposed Settlement</a></p>
<p><a href="${DOCS}/2025-10-09_Federal-Court-Order-Justice-Bennett_E4791847_v1.pdf" target="_blank" rel="noopener">The Court&rsquo;s orders</a></p>

<h3>Registration in the CuDeco Class Action</h3>

<p><em>Are you a group member and can you register in the class action?</em></p>

<p>If you have received the Court approved notice, you did so because you have been identified as a potential group member in the CuDeco Class Action. You should read the following information carefully. <strong>Any questions you have concerning the matters set out below should not be directed to the Court.</strong> If there is anything you do not understand, you should contact Banton Group at <a href="mailto:CuDeco@bantongroup.com">CuDeco@bantongroup.com</a> or seek your own legal advice.</p>

<p>This page provides important information about:</p>

<ul>
  <li>your status as a group member in the CuDeco Class Action;</li>
  <li>what you need to do if you have not already registered by wish to do so in order to participate in the proposed Settlement described below (and potentially received some compensation);</li>
  <li>what will happen if you do not register to participate in the proposed Settlement; and</li>
  <li>what you need to do if you wish to object to the proposed Settlement.</li>
</ul>

<p>You are a group member if you acquired an interest in fully paid ordinary shares in CuDeco Limited during the period between 11 April 2016 and 13 March 2018. While that is the case, you will only be entitled to make a claim in the settlement against KPMG if you purchased CuDeco Shares on or after 17 November 2016. That is because that is the date on which the Applicant&rsquo;s claim against KPMG commences.</p>

<p>You will only be excluded from being a group member if you are:</p>

<ul>
  <li>a related party of CuDeco (i.e. Directors, relatives, controlling entities);</li>
  <li>a related body corporate of CuDeco (i.e. holding company, subsidiary company, subsidiary of holding company);</li>
  <li>an associated entity of CuDeco (i.e. An entity is associated with another entity if they are members of the same corporate group, or if one entity has a certain degree of control over the other);</li>
  <li>an officer or a close associate of CuDeco (e.g. director, secretary, receiver, administrator, liquidator, trustee);</li>
  <li>a Justice, Registrar, District Registrar or Deputy District Registrar of the Federal Court of Australia or the High Court of Australia;</li>
  <li>Sinosteel Equipment &amp; Engineering Ltd (Sinosteel);</li>
  <li>China Oceanwide International Investment Co. Limited, Oceanwide International Resources Investment Co., Limited, China Oceanwide Holdings Group Co., Ltd, Oceanwide Group Co., Ltd, Oceanwide Holdings Co., Ltd, or Zhiqlang Lu;</li>
  <li>Rich Lead Investments Pte Ltd.; or</li>
  <li>New Apex Asia Investment Limited.</li>
</ul>

<p>If you are unsure whether or not you are a Group Member, you should contact Banton Group at <a href="mailto:CuDeco@bantongroup.com">CuDeco@bantongroup.com</a> or alternatively seek your own legal advice.</p>

<p><em>Are Group Members liable for legal costs?</em></p>

<p>The Applicant and some Group Members have retained Banton Group to act as their solicitors but it is not necessary for you or other Group Members to retain Banton Group to participate as a Group Member.</p>

<p>The costs of the CuDeco Class Action are funded by Equite Capital No 4 Pte Ltd (Equite, or the Funder) pursuant to funding agreements entered into between the Funder and the Applicant and some Group Members. During the course of the CuDeco Class Action, the Funder has paid the legal costs, and indemnified the Applicant against potential adverse costs orders and provided security against the possibility of any such adverse costs orders. If the proposed settlement of the claim against KPMG is approved by the Court, it is likely that the Court will order that the legal and finding costs of conducting the CuDeco Class Action be deducted from the aggregate Settlement Sum, before calculating each Group Member&rsquo;s entitlement ie the legal and funding costs of conducting the CuDeco Class Action will be spread equitable among all Group Members participating in the Settlement. Therefore, if you are eligible to participate as a Group Member in the distribution of the Settlement Sum, your share of the settlement (if any) will be calculated and paid to you after deduction of legal and funding costs &ndash; under no circumstances will you, by registering to participate in the proposed Settlement, be liable for &ldquo;out of pocket&rdquo; costs, whether to Banton Group, or the Funder, or otherwise.</p>

<p>You can register online by clicking on the REGISTER NOW button below</p>

<p><a href="https://bantongroup.com/registration-process-for-cudeco-class-action/" target="_blank" rel="noopener">Register Now</a></p>

<h3>KPMG Settlement</h3>

<p>Please find <a href="${DOCS}/KPMG-Settlement-Confirmation-CuDeco-Class-Action-VID176-of-2022.pdf" target="_blank" rel="noopener">attached</a> a notice issued by order of the Federal Court of Australia. This notice relates to the Court approved settlement with KPMG.</p>

<h3>The KPMG Settlement</h3>

<p>In September 2025, Leo Toner (the Applicant) reached a settlement with KPMG, the former auditor of CuDeco Limited, resolving the claims that KPMG&rsquo;s audit opinions for the financial years ending 30 June 2016 and 30 June 2017 were misleading or deceptive. KPMG paid the settlement sum on 16 January 2026.</p>

<p>On 10 March 2026, Justice Bennett of the Federal Court approved how the KPMG settlement sum is to be distributed. The Court&rsquo;s orders were made on 16 March 2026.</p>

<h3>What do you need to do?</h3>

<p>Nothing right now.</p>

<p>If you have already registered as a Participating Group Member (i.e. you registered by 27 November 2025), your registration is complete. You do not need to do anything further in relation to the KPMG settlement at this stage.</p>

<p>However, please read the section below about the ongoing claims against the directors &mdash; you may need to re-register for those claims.</p>

<h3>Frequently Asked Questions</h3>

<p><em>Q: What is the attached notice?</em></p>

<p>The attached KPMG Settlement Confirmation is a formal court notice confirming that the Federal Court has approved the settlement with KPMG and how the settlement sum is to be applied. It was sent to you because you registered as a Participating Group Member in the KPMG settlement.</p>

<p><em>Q: How is the KPMG settlement sum being applied?</em></p>

<p>The Court approved the KPMG settlement sum to be applied in the following order:</p>

<ol>
  <li>$2,125 to the Applicant (Leo Toner) for his time and expenses incurred in representing Group Members;</li>
  <li>Payment to the litigation funder, Equite Capital No. 4 Pte Ltd (EquiteCap4), for the costs of the independent costs referee (Ms Rosati) who assessed the legal costs in the proceeding;</li>
  <li>Reimbursement to EquiteCap4 of all legal costs it funded throughout the proceedings &mdash; covering both the KPMG claim and the directors claim &mdash; as assessed and approved by the Court; and</li>
  <li>30% of the balance remaining after the above deductions, paid to EquiteCap4 as a partial remuneration for the risks it took in funding the proceedings on behalf of Group Members.</li>
</ol>

<p>The remaining balance of the KPMG settlement sum will be held in an interest-bearing account by Banton Group, pending the outcome of the ongoing claims against the directors and further order of the Court.</p>

<p><em>Q: Will I receive a payment from the KPMG settlement now?</em></p>

<p>No &mdash; not at this stage. The Court carefully considered whether to distribute the remaining balance to Group Members now, but concluded that doing so would not be in Group Members&rsquo; best interests. The main reasons were:</p>

<ul>
  <li>The cost of running a distribution process at this stage would be substantial and would significantly reduce the amount available to Group Members;</li>
  <li>The claims against the directors are ongoing, and a single final distribution combining any recovery from the directors with the retained KPMG settlement balance will be far more efficient and cost-effective for Group Members; and</li>
  <li>Any interim distribution now could potentially be subject to clawback at the end of the overall proceedings, creating unnecessary uncertainty.</li>
</ul>

<p>The retained balance will continue to earn interest while held in the controlled monies account.</p>

<p><em>Q: Does the KPMG settlement affect my claim against the directors?</em></p>

<p>No. Although the KPMG settlement sum has been applied predominantly to reimburse legal costs incurred to date, with little or no direct payment flowing to Group Members at this stage, your claim remains fully intact.</p>

<p>The claims against the directors continue for the full relevant period (11 April 2016 to 13 March 2018), which is longer than the KPMG claim period meaning some Group Members may have additional losses that can only be recovered against the directors.</p>

<p>Importantly, because all legal costs incurred to date have already been recovered from the KPMG settlement sum and approved by the Court, those costs will not be deducted again from any future recovery against the directors. This means that any future settlement with, or judgment against, the directors would be directed toward recovering your principal losses, together with any further costs and funding fees incurred from now until the conclusion of the proceeding (whether by settlement or after the trial hearing commencing 29 June 2026).</p>

<p>In short, much of the hard work already done, and the costs of doing it to date, have been paid for. What remains is the pursuit of your actual losses against the directors.</p>

<p><em>Q: Do I need to re-register for the directors claim?</em></p>

<p>Possibly. The directors claim covers a longer period, and you may be contacted and asked to register, particularly if you only registered for the KPMG claim period. We will contact you directly if this is required. Please ensure your contact details are up to date by emailing us at <a href="mailto:CuDeco@bantongroup.com">CuDeco@bantongroup.com</a>.</p>

<p><em>Q: What does this mean for any future recovery from the directors?</em></p>

<p>This is important. All legal costs incurred to date &mdash; covering the work done on both the KPMG claims and the directors claims &mdash; have now been assessed, approved by the Court, and repaid to EquiteCap4.</p>

<p>This means those costs cannot be deducted again from any future settlement or judgment against the directors. As a result, if a settlement or judgment is achieved against the directors, a greater proportion of any recovery is likely to be available for distribution to Group Members who are registered for the directors claim.</p>

<h3>How did we get here?</h3>

<p>The CuDeco Class Action was commenced in April 2022. It arose from allegations that CuDeco Limited made misleading statements about its Rocklands copper mine in north-west Queensland including representations about ore reserves, feasibility and the mine&rsquo;s net present value which caused the price of CuDeco shares to be artificially inflated.</p>

<p>KPMG audited CuDeco&rsquo;s financial reports for the years ending 30 June 2016 and 30 June 2017. The claim against KPMG alleged that its audit opinions were misleading or deceptive, in circumstances where CuDeco&rsquo;s financial reports did not give a true and fair view of the company&rsquo;s financial position.</p>

<p>After a number of mediations, a settlement with KPMG was reached in September 2025 and approved by the Federal Court in December 2025.</p>

<p>The claims against the directors who are alleged to have been responsible for the misleading statements about the mine remain on foot and are proceeding to trial.</p>

<h3>What&rsquo;s next?</h3>

<p>We will keep you updated as the proceedings against the directors progress toward the hearing commencing 29 June 2026. We will also contact you separately if you are required to take any steps in relation to that claim, including any re-registration process.</p>

<p>If you have any questions, please contact us at:</p>

<p><a href="mailto:CuDeco@bantongroup.com">CuDeco@bantongroup.com</a></p>
`.trim(),

  'fitch-scdo': `
<p>Banton Group acts on behalf of investors in a class action against Fitch Ratings, Inc (A Company Incorporated in Delaware, USA) and Fitch Ratings, Ltd (A Company Incorporated in the United Kingdom (<strong>Fitch</strong>) concerning synthetic collateralised debt obligations (<strong>SCDOs</strong>) assigned a credit rating of &lsquo;<strong>AAA</strong>&rsquo;, &lsquo;<strong>AA+</strong>&rsquo;, &lsquo;<strong>AA</strong>&rsquo; or &lsquo;<strong>AA-</strong>&rsquo; by Fitch in and around the period 2005 to 2007.</p>

<p><a href="/class-actions/fitch-scdo">Click here for more information about the Fitch SCDO Class Action</a></p>

<h3>Update: Opt-out and registration has been extended</h3>

<p>On 9 March 2026, The Federal Court of Australia made orders to extend the deadline for group members to either register or opt-out. This deadline is now set for <strong>4.00pm</strong> on <strong>4 April 2026</strong>.</p>

<p>If you wish to either register or opt-out of these proceedings, please do so before <strong>4.00pm</strong> on <strong>4 April 2026</strong>. While we will take your information after this date, please note, we are unable to confirm whether or not any late registrations will be accepted by the Court. Ultimately it is up to the Court&rsquo;s discretion as to whether late registrations will be accepted.</p>

<h3>Background</h3>

<p>Banton Group acts on behalf of investors in a class action against Fitch Ratings, Inc (A Company Incorporated in Delaware, USA) and Fitch Ratings, Ltd (A Company Incorporated in the United Kingdom (<strong>Fitch</strong>). The class action concerns synthetic collateralised debt obligations (<strong>SCDOs</strong>) assigned a credit rating of &lsquo;AAA&rsquo;, &lsquo;AA+&rsquo;, &lsquo;AA&rsquo; or &lsquo;AA-&rsquo; by Fitch in and around the period 2005 to 2007. A list of the SCDOs rated by Fitch during this period is available here.</p>

<p><a href="https://bantongroup.com/wp-content/uploads/2025/11/20250904-Updated-Global-list-of-SCDOs.pdf" target="_blank" rel="noopener">Product List</a></p>

<p>At a high level, the applicants allege that:</p>

<ul>
  <li>Fitch&rsquo;s ratings of certain SCDOs were not reliable or were not based on reasonable grounds; and</li>
  <li>Fitch knew this, or was recklessly indifferent to this, and therefore deceitfully induced investors to purchase their interest in those SCDOs.</li>
</ul>

<p>Fitch denies the allegations and is defending the class action.</p>

<h3>Key Documents</h3>

<p><a href="${FITCH}/Amended-Originating-Application.pdf" target="_blank" rel="noopener">Amended Originating Application</a></p>
<p><a href="${FITCH}/Amended-Statement-of-Claim.pdf" target="_blank" rel="noopener">Amended Statement of Claim</a></p>
<p><a href="${FITCH}/2025-06-10-Respondents-Defence-to-the-Amended-Statement-of-Claim-10-June-2025-v1.pdf" target="_blank" rel="noopener">Fitch&rsquo;s Defence to the Amended Statement of Claim</a></p>
<p><a href="${FITCH}/Fitch-Further-Opt-out-Notice.pdf" target="_blank" rel="noopener">Notice to Opt Out, Register or Do Nothing</a></p>

<h3>Group Member Definition</h3>

<p>You are a group member if you:</p>

<ol>
  <li>acquired interests in one or more SCDO assigned credit ratings AAA, AA+, AA or AA- by Fitch using:</li>
  <li>VECTOR 2.2; and/or</li>
  <li>VECTOR 3.0; and/or</li>
  <li>VECTOR 3.1</li>
</ol>

<p>(together, the <strong>Claim SCDOs</strong>); or</p>

<ol>
  <li>facilitated the acquisition of interests by other persons in the Claim SCDOs, or provided services to other persons to acquire interests in the Claim SCDOs, or advised other persons to acquire interests in the Claim SCDOs, or promoted the Claim SCDOs to others, or acquired the Claim SCDOs on behalf of others, or sold the Claim SCDOs, or otherwise dealt in the Claim SCDOs (<strong>contributed to the acquisition by other persons of interests in the Claim SCDOs</strong>); and</li>
  <li>acquired their interest in the Claim SCDOs, or contributed to the acquisition by other persons of interests in the Claim SCDOs, by reason of the publication or dissemination of the ratings for those products in Australia or receipt of the ratings for those products in Australia; and</li>
  <li>have suffered loss or damage by reason of their acquisition of interests in the Claim SCDOs, or contribution to the acquisition by other persons of interests in the Claim SCDOs, excluding those persons whose claims against the Respondents have been extinguished by final orders made in Mid-Coast Council &amp; Anor v Fitch Ratings, Inc &amp; Ors Federal Court Proceeding NSD 995 of 2014 on 25 July 2019.</li>
</ol>

<p>How you acquired an interest in a Claim SCDO or otherwise contributed to the acquisition by other persons of interests in the Claim SCDOs does not necessarily prevent you from being a group member: this includes acquisition of interests in the Claim CSDO in the initial issue or in a re-sale on a secondary market, or any other acquisition.</p>

<p><em>Are Group Members liable for legal costs?</em></p>

<p>The costs of the Fitch Ratings Class Action are funded by Equite Capital No 2 Pte Ltd (Equite, or the Funder) pursuant to funding agreements entered into between the Funder and the lead applicants. During the course of the Fitch Ratings Class Action, the Funder has paid the legal costs and indemnified the applicants against potential adverse costs orders and provided security against the possibility of any such adverse costs orders. Therefore, if you are eligible to participate as a Group Member in the distribution of any proceeds of the proceedings, your share of the proceeds (if any) will be calculated and paid to you after deduction of legal and funding costs &ndash; under no circumstances will you, by registering as a Group Member, be liable for &ldquo;out of pocket&rdquo; costs, whether to Banton Group, or the Funder, or otherwise.</p>

<h3>Current Status</h3>

<ul>
  <li>The Applicants and Fitch have given discovery.</li>
  <li>The Applicants have filed and served their lay evidence.</li>
  <li>The date by which any Group Member may opt out of the proceedings is <strong>4:00pm 4 April 2026</strong>. Further, the date by which Group Members must register in order to ensure that they can participate in any settlement reached prior to the commencement of the trial is <strong>4.00pm 4 April 2026</strong>.</li>
  <li>The Applicants must file and serve their expert evidence by <strong>6 March 2026</strong>.</li>
  <li>Fitch must file and serve its lay evidence by <strong>22 May 2026</strong>.</li>
  <li>Fitch must file and serve its expert evidence by <strong>3 July 2026</strong>.</li>
  <li>The Applicants must file and serve their reply expert and lay evidence by <strong>14 August 2026</strong>.</li>
  <li>The parties&rsquo; experts must provide any joint expert reports by <strong>11 September 2026</strong>.</li>
  <li>The parties are to attend mediation no later than <strong>9 October 2026</strong>.</li>
  <li>The proceedings are listed for hearing commencing on <strong>3 May 2027</strong> for an estimate of six weeks.</li>
</ul>

<h3>Contact Us</h3>

<p>If you are uncertain whether you are a Group Member, or you would like further information, you can contact Banton Group by email at <a href="mailto:fitchcdos@bantongroup.com">fitchcdos@bantongroup.com</a>.</p>

<p><a href="https://bantongroup.com/registration-process-for-fitch-scdo-class-action/" target="_blank" rel="noopener">Register Now</a></p>
`.trim(),

  phoslock: `
<p>Banton Group acts on behalf of shareholders in class action proceedings against Phoslock Environmental Technologies Ltd (ASX:PET), former Chairman Mr Laurence Freedman, former Managing Director Mr Robert Schuitema and Phoslock&rsquo;s former auditor, KPMG (together the <strong>Respondents</strong>). The proceeding is in the Federal Court of Australia.</p>

<p><a href="/class-actions/phoslock">Click here for more information about the Phoslock Class Action</a></p>

<h3>Information about Registration and Opt Out of Phoslock Class Action</h3>

<h3>Court&rsquo;s Orders</h3>

<p>The Federal Court of Australia has ordered an Opt Out and Registration process for Group Members in the Phoslock Class Action.</p>

<p>For further information about the Opt Out and Registration process, please see the Opt Out and Registration Notice attached below</p>

<p><a href="${PHOS}/Phoslock-Class-Action-Opt-Out-and-Registration-Notice.pdf" target="_blank" rel="noopener">Opt Out and Registration Notice</a></p>

<p><strong>Please also see below for further information about registration.</strong></p>

<h3>Background</h3>

<p>This class action is brought by the Applicant on his behalf and on behalf of all persons who are &ldquo;Group Members&rdquo; as defined in the proceedings. In summary, the Applicant alleges that:</p>

<ol>
  <li>Phoslock (First Respondent) failed to disclose to the ASX important information about its business operations in China which meant that Phoslock&rsquo;s Financial Statements during the Relevant Period did not give a fair and true view of Phoslock&rsquo;s financial position.</li>
  <li>Mr Freedman and Mr Schuitema (Second and Third Respondents respectively) breached their obligations as directors of Phoslock by authorising and making representations to the market that Phoslock&rsquo;s financial reports gave a true and fair representation of the company&rsquo;s financial position and complied with accounting standards.</li>
  <li>KPMG (Fourth Respondent) failed to properly audit the accounts of Phoslock.</li>
</ol>

<h3>Group Members</h3>

<p>Group Members are persons who acquired:</p>

<ol>
  <li>an interest in fully paid ordinary shares in Phoslock:<br />a) during the period between 11 October 2018 and 17 September 2020 (inclusive) (<strong>Relevant Period</strong>); or<br />b) prior to the Relevant Period, which you retained throughout the Relevant Period; or</li>
  <li>long exposure to Phoslock Shares by entering into equity swap confirmations in respect of Phoslock Shares during the Relevant Period.</li>
</ol>

<h3>Key Documents</h3>

<p><em>Pleadings and Defences</em></p>

<p><a href="${PHOS}/Phoslock-Class-Action-FASOC.pdf" target="_blank" rel="noopener">Further Amended Statement of Claim</a></p>
<p><a href="${PHOS}/Phoslock-Class-Action-First-Respondent-Amended-Defence.pdf" target="_blank" rel="noopener">First Respondent&rsquo;s Amended Defence</a></p>
<p><a href="${PHOS}/Phoslock-Class-Action-Second-Respondent-Defence.pdf" target="_blank" rel="noopener">Second Respondent&rsquo;s Defence</a></p>
<p><a href="${PHOS}/Phoslock-Class-Action-Third-Respondent-Amended-Defence.pdf" target="_blank" rel="noopener">Third Respondent&rsquo;s Amended Defence</a></p>
<p><a href="${PHOS}/Phoslock-Class-Action-Fourth-Respondent-Amended-Defence.pdf" target="_blank" rel="noopener">Fourth Respondent&rsquo;s Amended Defence</a></p>

<p><em>Cross Claim</em></p>

<p><a href="${PHOS}/Phoslock-Class-Action-Statement-of-Cross-Claim.pdf" target="_blank" rel="noopener">Fourth Respondent&rsquo;s Statement of Cross Claim</a></p>
<p><a href="${PHOS}/Phoslock-Class-Action-First-Respondent-Defence-to-Cross-Claim.pdf" target="_blank" rel="noopener">First Respondent&rsquo;s Defence to Cross Claim</a></p>
<p><a href="${PHOS}/Phoslock-Class-Action-Second-Respondent-Defence-to-Cross-Claim.pdf" target="_blank" rel="noopener">Second Respondent&rsquo;s Defence to Cross Claim</a></p>
<p><a href="${PHOS}/Phoslock-Class-Action-Third-Respondent-Defence-to-Cross-Claim.pdf" target="_blank" rel="noopener">Third Respondent&rsquo;s Defence to Cross Claim</a></p>
<p><a href="${PHOS}/Phoslock-Class-Action-Third-Respondent-Defence-to-Cross-Claim%20(1).pdf" target="_blank" rel="noopener">Fourth Respondent&rsquo;s Defence to Cross Claim</a></p>

<h3>Funding</h3>

<p>This class action is being funded by Equite Capital No 6 Pte Ltd (<strong>Equite</strong>), meaning that Equite has agreed to pay the Applicant&rsquo;s legal costs, including paying the lawyers engaged by the Applicant as well as barristers and other experts under a Funding Agreement. Equite has taken on the financial risks of the proceeding, including by indemnifying the Applicant against adverse costs, and furnishing any security ordered by the Court.</p>

<p>The Court may order that Group Members who benefit from a class action but who have not signed a Funding Agreement with Equite should contribute equally with Group Members who have signed a Funding Agreement. There are two ways that the Court may order for this to happen. One is known as a Common Fund Order (<strong>CFO</strong>) and the other is known as a Funding Equalisation Order (<strong>FEO</strong>). Further details regarding CFOs and FEOs can be found within the Opt Out and Registration Notice.</p>

<h3>Current Status</h3>

<ul>
  <li>A mediation between the parties is set down for 11 June 2026 (<strong>Mediation</strong>).</li>
  <li>The parties are currently reviewing documents produced during the discovery process.</li>
  <li>The Court has ordered that Group Members who wish to Opt Out of the Class Action must do so by <strong>27 May 2026</strong>. <a href="#">Click here</a> for a word version of the Opt Out Form.</li>
  <li>The Applicant is to file and serve any lay evidence on which he intends to rely at trial by 10 June 2026.</li>
  <li>The Applicant is to file and serve any expert evidence on which he intends to rely at trial including a list of documents and any further particulars to the Further Amended Statement of Claim.</li>
</ul>

<h3>Registration in the Phoslock Class Action</h3>

<p>If you wish to be eligible to receive any compensation that may become available through an in-principle settlement of this class action at a forthcoming Mediation on 11 June 2026, or before 11 August 2026, you <strong>should</strong> register your interest in accordance with this Notice by <strong>27 May 2026</strong> (<strong>Deadline</strong>).</p>

<p>Should an in-principle settlement be reached at the Mediation or by 11 August 2026, the parties will then seek orders which, if made, have the effect of providing that Group Members who did not:</p>

<p>(a) register; or</p>

<p>(b) Opt Out in accordance with the orders made by the Court,</p>

<p>by the Deadline will remain a Group Member for all purposes of this proceeding but shall not, without leave of the Court, be permitted to seek any benefit pursuant to any in-principle settlement reached at the Mediation or before 11 August 2026.</p>

<p>The Court will then decide whether to approve the settlement on that basis.</p>

<p>There is no cost to register your claim.</p>

<p><strong>You can register online by clicking on the REGISTER NOW button below</strong></p>

<p><a href="https://bantongroup.com/registration-process-for-phoslock-class-action/" target="_blank" rel="noopener">Register Now</a></p>
`.trim(),

  'fitch-ratings-uk': `
<p>Banton Group, together with UK counsel and solicitors, acts on behalf of Equite Capital Pte Limited (<strong>Equite</strong>) as Representative Claimant in a representative action against Fitch Ratings Ltd (a company incorporated in the United Kingdom) (<strong>Fitch</strong>) in the High Court of Justice of England and Wales, Business and Property Courts, King&rsquo;s Bench Division, Commercial Court.</p>

<p><a href="/class-actions/fitch-ratings-uk">Click here for more information about the Fitch Ratings UK Representative Action</a></p>

<h3>Background</h3>

<p>Banton Group, together with UK counsel and solicitors, acts on behalf of Equite Capital Pte Limited (<strong>Equite</strong>) as Representative Claimant in a representative action against Fitch Ratings Ltd (a company incorporated in the United Kingdom) (<strong>Fitch</strong>) in the High Court of Justice of England and Wales, Business and Property Courts, King&rsquo;s Bench Division, Commercial Court.</p>

<p>The claim was issued on 3 October 2025 and amended on 30 January 2026. It proceeds as Claim No CL-2025-000451.</p>

<p>Equite brings the claim in its own right, as assignee of four Bear Stearns structured credit fund entities (the Bear Stearns High-Grade Structured Credit Strategies Master Fund Ltd, the Bear Stearns High-Grade Structured Credit Strategies Enhanced Leverage Master Fund Ltd, and their two Cayman feeder funds, all now dissolved or in official liquidation), and, pursuant to Civil Procedure Rule 19.8, on behalf of all persons with the same interest as Equite.</p>

<p style="background-color:#7a1414;color:#ffffff;padding:8px 14px;border-radius:4px;display:inline-block;font-weight:500;">We encourage you to register your interest as soon as possible.</p>

<h3>The Subject Matter of the Claim</h3>

<p>The claim concerns synthetic collateralised debt obligations (<strong>SCDOs</strong>) which, at any time on or after 15 April 2005, were assigned a credit rating of &lsquo;AAA&rsquo;, &lsquo;AA+&rsquo;, &lsquo;AA&rsquo;, &lsquo;AA-&rsquo;, &lsquo;A+&rsquo;, &lsquo;A&rsquo; or &lsquo;A-&rsquo; by Fitch, by its Delaware affiliate Fitch Ratings, Inc, or by any other affiliate (together, the <strong>Fitch Entities</strong>), using one or more of the following quantitative rating models:</p>

<ul>
  <li>VECTOR 2.2 (released on or around 15 April 2005);</li>
  <li>VECTOR 3.0 (released on or around October 2006); and</li>
  <li>VECTOR 3.1 (released on or around March 2007),</li>
</ul>

<p>(together, the <strong>Claim SCDOs</strong>).</p>

<h3>Who the Claim is Brought on Behalf of</h3>

<p>The claim is brought on behalf of three groups of persons, each of whom dealt with the Claim SCDOs in a different capacity but who share the same interest in the claim. The three groups are:</p>

<p><strong><em>1. Investors</em></strong></p>

<p>Persons who acquired interests in, or obtained exposure to, one or more Claim SCDO.</p>

<p><strong><em>2. Intermediaries</em></strong></p>

<p>Persons who contributed to the acquisition by others of interests in Claim SCDOs, including by:</p>

<ul>
  <li>facilitating the acquisition by another person of interests in Claim SCDOs;</li>
  <li>providing services to another person to acquire interests in Claim SCDOs;</li>
  <li>advising another person to acquire interests in Claim SCDOs;</li>
  <li>promoting the Claim SCDOs to others;</li>
  <li>acquiring Claim SCDOs on behalf of others;</li>
  <li>selling Claim SCDOs; or</li>
  <li>otherwise dealing in Claim SCDOs.</li>
</ul>

<p><strong><em>3. Underwriters</em></strong></p>

<p>Persons who issued, underwrote, managed, novated, assumed, or otherwise provided financial-guarantee insurance, surety wraps, credit-default protection or any other form of credit enhancement or credit protection in respect of a Claim SCDO.</p>

<p><em>Further conditions</em></p>

<p>A person is a represented person in the UK claim only if:</p>

<ol>
  <li>they are an Investor, an Intermediary or an Underwriter in respect of a Claim SCDO;</li>
  <li>they have suffered loss or damage by reason of their acquisition of interests in, contribution to the acquisition by others of interests in, or underwriting of, a Claim SCDO;</li>
  <li>their claim against Fitch has not otherwise been extinguished; and</li>
  <li>they are <strong>not</strong> a Group Member in the Australian class action <em>Belmont Park Investments Pty Ltd &amp; Anor v Fitch Ratings, Inc and Fitch Ratings Limited</em> (Federal Court of Australia, NSD 924 of 2024).</li>
</ol>

<p>How a person acquired an interest in, or otherwise dealt with, a Claim SCDO does not of itself prevent them from being a represented person: the class includes initial issue, secondary market and any other means of acquisition or dealing.</p>

<h3>What is Alleged</h3>

<p>At a high level, the Representative Claimant alleges that:</p>

<ul>
  <li>the VECTOR Models contained serious hidden errors (the <strong>VECTOR Hidden Adjustments</strong>) which caused the models materially to underestimate the risk that highly-rated tranches of SCDOs would default, particularly in stressed conditions, and thereby caused the Fitch ratings business to assign artificially high ratings to the Claim SCDOs;</li>
  <li>Fitch deliberately concealed the VECTOR Hidden Adjustments from those who relied on the ratings and, from no later than 15 April 2005, knew or will be taken to have known that the ratings were artificially high and that Investors, Intermediaries and Underwriters would rely on the ratings in their dealings with the Claim SCDOs;</li>
  <li>Fitch, together with Fitch Ratings, Inc and others, combined or conspired by unlawful means to continue to issue the ratings, to encourage investors to rely on them, and to refrain from withdrawing the ratings or the VECTOR Models, with the intention (or reckless indifference as to whether) that harm would result to Investors, Intermediaries and Underwriters; and</li>
  <li>by continuing to issue and not withdrawing the ratings, Fitch made continuing representations (the <strong>Continuing Representations</strong>) to Investors, Intermediaries and Underwriters that the ratings were accurate, which were false to Fitch&rsquo;s knowledge, giving rise to the tort of deceit.</li>
</ul>

<p>Fitch is expected to defend the claim and will have an opportunity to respond to these allegations in its Defence.</p>

<h3>Relief Sought</h3>

<p>The Representative Claimant claims, on its own behalf and on behalf of the represented persons:</p>

<ul>
  <li>damages;</li>
  <li>declaratory relief as to (i) Fitch&rsquo;s involvement in an unlawful means conspiracy with the intent to injure Investors, Intermediaries and Underwriters; and (ii) Fitch&rsquo;s involvement in the commission of the tort of deceit by reason of its involvement in the making of the Continuing Representations;</li>
  <li>statutory and/or equitable interest;</li>
  <li>further or other relief; and</li>
  <li>costs</li>
</ul>

<h3>Relationship with the Australian Class Action</h3>

<p>The UK claim runs in parallel with the Australian class action in the Federal Court of Australia, <em>Belmont Park Investments Pty Ltd &amp; Anor v Fitch Ratings, Inc &amp; Fitch Ratings Ltd</em> (Proceeding NSD 924 of 2024). Group Members in the Australian proceeding are expressly excluded from the class of represented persons in the UK claim.</p>

<p>Further information on the Australian class action is available at <a href="/class-actions/fitch-scdo"><em>AU Fitch class action page</em></a>.</p>

<h3>Key Document</h3>

<p><a href="${FITCHUK}/2026.30.01-Amended-Claim-Form-Fitch-sealed-30-January-2025.pdf" target="_blank" rel="noopener">Amended Claim Form (CL-2025-000451), sealed 30 January 2026</a></p>

<h3>Current Status</h3>

<ul>
  <li>The Claim Form was issued on 3 October 2025 and amended on 30 January 2026.</li>
  <li>Equite must file and serve its Particulars of Claim by 19 May 2026, subject to an extension of time being granted by the Court.</li>
</ul>

<h3>How to Register Your Interest</h3>

<p>Because the UK claim is brought as a representative action under CPR 19.8, if you fall within one of the three categories of represented persons described above (Investor, Intermediary or Underwriter), and the further conditions are satisfied, you are already represented in the claim by Equite and you do not need to take any step to be included. You will, however, need to make yourself known to us in order to be identified for the purpose of any distribution of damages if the claim succeeds.</p>

<p>Moreover, it is possible that Fitch may challenge whether the UK claim can properly proceed as a representative action under CPR 19.8. If any such challenge were to succeed, it may be necessary, as a fall-back, for individual claims to be filed by affected persons in order to pursue their losses. It is therefore important that we know of your interest as soon as possible.</p>

<p><strong>We encourage you to register your interest as soon as possible.</strong> Registration is free, is without obligation, and allows us to confirm your eligibility, keep you informed as the claim progresses, and identify you at the distribution stage.</p>

<p><a href="https://bantongroup.com/registration-process-for-fitch-ratings-uk-class-action/" target="_blank" rel="noopener">Register Now</a></p>
`.trim(),

  'sp-global-uk': `
<p>Banton Group, together with UK counsel and solicitors, acts on behalf of Equite Capital Pte Limited (<strong>Equite</strong>) as Representative Claimant in a representative action against S&amp;P Global UK Limited (a company incorporated in the United Kingdom) (<strong>S&amp;P</strong>) in the High Court of Justice of England and Wales, Business and Property Courts, King&rsquo;s Bench Division, Commercial Court.</p>

<p><a href="/class-actions/sp-global-uk">Click here for more information about the S&amp;P Global UK Representative Action</a></p>

<h3>Background</h3>

<p>Banton Group, together with UK counsel and solicitors, acts on behalf of Equite Capital Pte Limited (<strong>Equite</strong>) as Representative Claimant in a representative action against S&amp;P Global UK Limited (a company incorporated in the United Kingdom) (<strong>S&amp;P</strong>) in the High Court of Justice of England and Wales, Business and Property Courts, King&rsquo;s Bench Division, Commercial Court.</p>

<p>The claim was issued on 3 October 2025 and amended on 30 January 2026. It proceeds as Claim No CL-2025-000450.</p>

<p>Equite brings the claim in its own right, as assignee of four Bear Stearns structured credit fund entities (the Bear Stearns High-Grade Structured Credit Strategies Master Fund Ltd, the Bear Stearns High-Grade Structured Credit Strategies Enhanced Leverage Master Fund Ltd, and their two Cayman feeder funds, all now dissolved or in official liquidation), and, pursuant to Civil Procedure Rule 19.8, on behalf of all persons with the same interest as Equite.</p>

<p style="background-color:#7a1414;color:#ffffff;padding:8px 14px;border-radius:4px;display:inline-block;font-weight:500;">We encourage you to register your interest as soon as possible.</p>

<h3>The Subject Matter of the Claim</h3>

<p>The claim concerns collateralised debt obligations (<strong>CDOs</strong>) and constant proportion debt obligations (<strong>CPDOs</strong>) which, at any time on or after 19 December 2005, were assigned a credit rating of &lsquo;AAA&rsquo;, &lsquo;AA+&rsquo;, &lsquo;AA&rsquo;, &lsquo;AA-&rsquo;, &lsquo;A+&rsquo;, &lsquo;A&rsquo; or &lsquo;A-&rsquo; by S&amp;P, by its New York affiliate S&amp;P Global, Inc, by its Delaware affiliate Standard &amp; Poor&rsquo;s International LLC, or by any other affiliate (together, the <strong>S&amp;P Entities</strong>), using one or more of the following quantitative rating models:</p>

<ul>
  <li>CDO Evaluator 2.4.3 (released on or around 2 December 2004);</li>
  <li>CDO Evaluator 3.0 (released on or around 19 December 2005);</li>
  <li>CDO Evaluator 3.1 (released on or around 4 April 2006);</li>
  <li>CDO Evaluator 3.2 (released on or around 19 June 2006); and</li>
  <li>the CPDO Evaluator (released on or around 19 March 2007),</li>
</ul>

<p>(together, the <strong>Claim CDOs</strong>).</p>

<h3>Who the Claim is Brought on Behalf of</h3>

<p>The claim is brought on behalf of three groups of persons, each of whom dealt with the Claim CDOs in a different capacity but who share the same interest in the claim. The three groups are:</p>

<p><strong><em>1. Investors</em></strong></p>

<p>Persons who acquired interests in, or obtained exposure to, one or more Claim CDO.</p>

<p><strong><em>2. Intermediaries</em></strong></p>

<p>Persons who contributed to the acquisition by others of interests in Claim CDOs, including by:</p>

<ul>
  <li>facilitating the acquisition by another person of interests in Claim CDOs;</li>
  <li>providing services to another person to acquire interests in Claim CDOs;</li>
  <li>advising another person to acquire interests in Claim CDOs;</li>
  <li>promoting the Claim CDOs to others;</li>
  <li>acquiring Claim CDOs on behalf of others;</li>
  <li>selling Claim CDOs; or</li>
  <li>otherwise dealing in Claim CDOs.</li>
</ul>

<p><strong><em>3. Underwriters</em></strong></p>

<p>Persons who issued, underwrote, managed, novated, assumed, or otherwise provided financial-guarantee insurance, surety wraps, credit-default protection or any other form of credit enhancement or credit protection in respect of a Claim CDO.</p>

<p><em>Further conditions</em></p>

<p>A person is a represented person in the UK claim only if:</p>

<ol>
  <li>they are an Investor, an Intermediary or an Underwriter in respect of a Claim CDO; and</li>
  <li>they have suffered loss or damage by reason of their acquisition of interests in, contribution to the acquisition by others of interests in, or underwriting of, a Claim CDO.</li>
</ol>

<p>How a person acquired an interest in, or otherwise dealt with, a Claim CDO does not of itself prevent them from being a represented person: the class includes initial issue, secondary market and any other means of acquisition or dealing.</p>

<h3>What is Alleged</h3>

<p>At a high level, the Representative Claimant alleges that:</p>

<ul>
  <li>the CDO Evaluator and CPDO Evaluator models contained at least six serious errors in assumptions and data (the <strong>Evaluator Errors</strong>), which caused the models materially to underestimate the risk that highly-rated tranches of CDOs would default, particularly in stressed conditions, and thereby caused the S&amp;P ratings business to assign artificially high ratings to the Claim CDOs;</li>
  <li>from no later than 19 December 2005, S&amp;P knew or will be taken to have known that the Evaluator Models were affected by the Evaluator Errors, that the ratings assigned to the Claim CDOs were artificially high, and that Investors, Intermediaries and Underwriters would rely on the ratings in their dealings with the Claim CDOs;</li>
  <li>S&amp;P, together with its affiliates S&amp;P Global, Inc (New York) and Standard &amp; Poor&rsquo;s International LLC (Delaware) and others, combined or conspired by unlawful means to continue to issue the ratings, to encourage investors to rely on them, and to refrain from withdrawing the ratings or the Evaluator Models, with the intention (or reckless indifference as to whether) that harm would result to Investors, Intermediaries and Underwriters; and</li>
  <li>by continuing to issue and not withdrawing the ratings, S&amp;P made continuing representations (the <strong>Continuing Representations</strong>) to Investors, Intermediaries and Underwriters that the ratings were accurate, which were false to S&amp;P&rsquo;s knowledge, giving rise to the tort of deceit.</li>
</ul>

<p>S&amp;P is expected to defend the claim and will have an opportunity to respond to these allegations in its Defence.</p>

<h3>Relief Sought</h3>

<p>The Representative Claimant claims, on its own behalf and on behalf of the represented persons:</p>

<ul>
  <li>damages;</li>
  <li>declaratory relief as to (i) S&amp;P&rsquo;s involvement in an unlawful means conspiracy with the intent to injure Investors, Intermediaries and Underwriters; and (ii) S&amp;P&rsquo;s involvement in the commission of the tort of deceit by reason of its involvement in the making of the Continuing Representations;</li>
  <li>statutory and/or equitable interest;</li>
  <li>further or other relief; and</li>
  <li>costs</li>
</ul>

<h3>Relationship with the Australian Class Action</h3>

<p>The UK claim runs in parallel with the Australian class action in the Federal Court of Australia, <em>ACN 117 641 004 Pty Ltd (in liquidation) &amp; Anor v S&amp;P Global, Inc &amp; Anor</em> (Proceeding NSD 881 of 2020). That class action was tried over 40 sitting days before Shariff J between July and November 2025 and judgment is reserved.</p>

<p>Further information on the Australian class action is available at <a href="/class-actions/sp-cdo-cpdo"><em>AU S&amp;P class action page</em></a>.</p>

<h3>Key Document</h3>

<p><a href="${SPUK_CLAIM_FORM}" target="_blank" rel="noopener">Amended Claim Form (CL-2025-000450), sealed 30 January 2026</a></p>

<h3>Current Status</h3>

<ul>
  <li>The Claim Form was issued on 3 October 2025 and amended on 30 January 2026.</li>
  <li>Equite must file and serve its Particulars of Claim by 19 May 2026.</li>
</ul>

<h3>How to Register Your Interest</h3>

<p>Because the UK claim is brought as a representative action under CPR 19.8, if you fall within one of the three categories of represented persons described above (Investor, Intermediary or Underwriter), and the further conditions are satisfied, you are already represented in the claim by Equite and you do not need to take any step to be included. You will, however, need to make yourself known to us in order to be identified for the purpose of any distribution of damages if the claim succeeds.</p>

<p>Moreover, it is possible that S&amp;P may challenge whether the UK claim can properly proceed as a representative action under CPR 19.8. If any such challenge were to succeed, it may be necessary, as a fall-back, for individual claims to be filed by affected persons in order to pursue their losses. It is therefore important that we know of your interest as soon as possible.</p>

<p><strong>We encourage you to register your interest as soon as possible.</strong> Registration is free, is without obligation, and allows us to confirm your eligibility, keep you informed as the claim progresses, and identify you at the distribution stage.</p>

<p><a href="https://bantongroup.com/registration-process-for-sp-global-uk-class-action/" target="_blank" rel="noopener">Register Now</a></p>
`.trim(),

  'murray-darling': `
<p>Banton Group acts on behalf of Doyle&rsquo;s Farm Produce Pty Ltd and the other lead Plaintiffs in New South Wales Supreme Court Proceedings No. 2019/00150651 (Proceedings) in representative proceedings (i.e., a class action) against Murray Darling Basin Authority (MDBA) and the Commonwealth of Australia (together, Defendants).</p>

<p><a href="/class-actions/murray-darling">Click here for more information about the Murray Darling Basin Class Action</a></p>

<h3>Background</h3>

<p>Banton Group acts on behalf of Doyle&rsquo;s Farm Produce Pty Ltd and the other lead Plaintiffs in New South Wales Supreme Court Proceedings No. 2019/00150651 (Proceedings) in representative proceedings (i.e., a class action) against Murray Darling Basin Authority (MDBA) and the Commonwealth of Australia (together, Defendants).</p>

<p>The Plaintiffs claim that the Defendants breached their alleged duty of care owed to the Plaintiffs (and group members). The Plaintiffs further claim that MDBA and its delegates mismanaged the operation and maintenance of the Murray Darling Basin by causing or permitting &ldquo;overbank transfers&rdquo; through the Barmah-Millewa Forest in the periods between 3 October 2017 and 20 January 2018; and 31 August 2018 and 7 January 2019.</p>

<p>The Plaintiffs also claim that the Defendants&rsquo; conduct resulted in NSW Murray Regulated River general security water entitlement holders, Victorian Murray high reliability water share holders within the Murray declared water system and related parties receiving less water than they would otherwise have received, and suffering damage, including a reduction in the market value of their water, increased costs of water on the temporary market and business losses.</p>

<p>For more information about the allegations made in the claim, you can read the Plaintiffs&rsquo; Third Further Amended Statement of Claim filed 18 April 2024 (and all pleadings) when it is made available <a href="#">here</a>.</p>

<h3>Opt Out Notice</h3>

<p>The MDBA Class action is ran on an &ldquo;opt out&rdquo; basis. This means that all eligible group members are automatically included in the class action unless they formally opt out.</p>

<p>At a directions hearing on 12 April 2024, the Court ordered that 4.00pm (AEST) on 31 May 2024 is the date by which a Group Member (see below) may opt out of the Proceedings (Opt Out Deadline). Group Members who opt out will not be bound by the outcome of the MDBA Class Action and will not receive any money from the MDBA Class Action if it wins or settles. To opt out of this class action you will need to complete the Opt Out Notice (may be accessed <a href="#">here</a>) and then return it to the Registrar of the Supreme Court of New South Wales at the address on the form. The Opt Out Notice must reach the Registrar by no later than 4.00pm (AEST) on 31 May 2024, otherwise it will not be effective. Group Members should seek legal advice before opting out.</p>

<h3>Registering as a Group Member</h3>

<p>If you are interested in registering to be a Group Member or have a query, click <a href="#">here</a> or contact Banton Group by emailing <a href="mailto:mdbaclassaction@bantongroup.com">mdbaclassaction@bantongroup.com</a>. While registering is not required to be a Group Member, by registering, you may help the Plaintiffs negotiate a better settlement for Group Members because the more information they have about Group Members&rsquo; claims the better a position they will be at the mediation of the MDBA Class Action which is currently scheduled on 19 July 2024.</p>

<h3>Am I a Group Member?</h3>

<p>You are a Group Member in the MDBA Class Action if you are a person or entity who, for all or part of the period between 1 July 2017 and 30 June 2020:</p>

<p>(a) held NSW Murray Regulated River general security water entitlements under the Water Management Act 2000 (NSW) or high reliability water shares issued under the Water Act 1989 (Vic) for the Murray declared water system; and/or</p>

<p>(b) held water supply entitlements under contractual arrangement with the holder of a NSW Murray Regulated River general security bulk water access licence under the Water Management Act 2000 (NSW) or held water supply entitlements under contractual arrangement with Goulburn-Murray Water as the bulk entitlement holder of WSE000139;</p>

<p>(the persons or entities described in subparagraphs (a) and (b) are together described as <strong>Water Entitlement Holders</strong>); or, not being Water Entitlement Holders,</p>

<p>(c) conducted irrigated agriculture operations in the NSW Central Murray or the Goulburn-Murray irrigation region using water entitlements owned by Water Entitlement Holders (<strong>Related Parties</strong>); and</p>

<p>(d) in the case of Water Entitlement Holders and Related Parties, or both, received and/or utilised an allocation of water in:</p>

<ol>
  <li>the 2017/2018 year;</li>
  <li>the 2018/2019 year; and/or</li>
  <li>the 2019/20 year;</li>
</ol>

<p>which was lower than the allocation which they would have received and/or utilised had the conduct the subject of complaint in the representative plaintiffs&rsquo; claim not occurred; and</p>

<p>(e) suffered loss or damage by reason of the conduct of the Defendants set out in the representative Plaintiffs&rsquo; claim.</p>

<h3>Legal or other costs</h3>

<p>Group members in a representative proceeding are not individually responsible for the legal costs associated with bringing the representative proceedings or for the costs of the Defendants if the claim is unsuccessful. In a representative proceeding, it is the Plaintiffs that are responsible for such costs.</p>

<p>The Plaintiffs in the MDBA Class Action are presently being funded by a company called International Litigation Partners No. 8 Pte Ltd (ILP). ILP pays the Plaintiffs costs of bringing and running the MDBA Class Action. If the MDBA Class Action is unsuccessful, ILP will pay any order made against the Plaintiffs to pay the Defendant&rsquo;s costs.</p>

<p>You will not become liable for any legal costs associated with the MDBA Class Action simply by remaining a Group Member during the determination of the common questions. However:</p>

<ul>
  <li>if the preparation or finalisation of your personal claim requires work to be done in relation to issues that are specific to your claim, you can engage Banton Group or other solicitors to do that work for you. You may be liable for costs associated with determination of issues concerned only with your claim;</li>
  <li>if any compensation becomes payable to the class members including you as a result of any order, judgment or settlement in the MDBA Class Action, the Court may make an order that some of that compensation be used to help pay a share of the legal costs and other costs which are incurred by the Plaintiffs in running the MDBA Class Action. The Plaintiffs propose to ask the Court to make such an order. Further, either the Plaintiffs or the funder (ILP) may ask the court for an order approving payment to ILP of an amount the Court considers reasonable for funding the MDBA Class Action. The Court will not make such an order without giving you notice and an opportunity to tell the Court if you agree or disagree with what is proposed. If the Court does not make such an order, it might be asked to make a different order requiring all group members to contribute to the litigation funding costs incurred by the Plaintiffs and those group members who have signed contracts with ILP. The total of any amounts deducted will never exceed the amount a group member receives;</li>
</ul>

<p>That is, group members will never be out of pocket by participating in the MDBA Class Action;</p>

<ul>
  <li>representative proceedings are often settled out of Court. If this occurs in the MDBA Class Action, you may be able to claim from the settlement amount without retaining a lawyer.</li>
</ul>

<h3>Key Documents</h3>

<p>You can access the following key documents in the matter through the <a href="#">Supreme Court of NSW website</a>:</p>

<ol>
  <li>Statement of Claim filed 14 May 2019.</li>
  <li>Amended Statement of Claim filed 9 April 2020.</li>
  <li>Defence to Amended Statement of Claim filed 17 July 2020.</li>
  <li>Further Amended Statement of Claim filed 1 December 2020.</li>
  <li>Defence to Further Amended Statement of Claim filed 11 December 2020</li>
  <li>Interlocutory Judgment dated 13 April 2021.</li>
  <li>Second Further Amended Statement of Claim filed 11 April 2022.</li>
  <li>Points of Claim filed 12 April 2022.</li>
  <li>Defence to Second Further Amended Statement of Claim filed 29 April 2022.</li>
  <li>Points of Defence filed 29 April 2022.</li>
</ol>
`.trim(),

  // Blue Sky has no detail page: just the description, no section headings,
  // so the listing card renders the full text and (via the hasDetail check
  // in CaseRow) shows no "read more" button.
  'blue-sky': `
<p>Banton Group acts together with Shine Lawyers for the Lead Applicants in a consolidated class action brought on behalf of shareholders of Blue Sky against Blue Sky, its former directors and auditor, Ernst &amp; Young.</p>

<p>The shareholder class action alleges that Blue Sky lodged with the ASX and published in FY2016, FY2017 and FY2018 audited financial reports (and interim reports) which were not compliant with the Australian Accounting Standards and misrepresented, among other matters, Blue Sky&rsquo;s financial performance and position.</p>

<p>The claim arises from representations made in the financial reports, which the applicants allege materially overstated Blue Sky&rsquo;s financial performance and overstated Blue Sky&rsquo;s assets. It is alleged the overstatement of Blue Sky&rsquo;s performance resulted in the market being misinformed and Blue Sky&rsquo;s share price being inflated. Had the financial reports been prepared in accordance with the Australian Accounting Standards and the <em>Corporations Act 2001</em> (Cth) (<strong>Corporations Act</strong>), Blue Sky&rsquo;s financial position would have been materially worse.</p>

<p>The case is premised that it is the failure to report accurately, and the failure by Blue Sky&rsquo;s auditors to detect the misstatements, that caused investors to suffer loss and damage. The contraventions alleged include contraventions by Blue Sky and the director respondents of ss 674, 1041H and 1041E of the Corporations Act, alternatively 12DA(1) of the <em>Australian Securities and Investments Commissions Act 2001</em> (Cth) (ASIC Act), alternatively s 18 of the Australian Consumer Law set out in Schedule 2 of the <em>Competition and Consumer Act 2010</em> (Cth) (<strong>ACL</strong>) and contraventions by Ernst &amp; Young of ss 1041H and/or 1041E of the Corporations Act and/or s 12DA(1) of the ASIC Act and/or s 18 of the ACL.</p>
`.trim(),

  'sp-cdo-cpdo': `
<p>Banton Group acts on behalf of investors in a class action against S&amp;P Global, Inc and Standard &amp; Poor&rsquo;s International, LLC (<strong>S&amp;P</strong>). The class action concerns collateralised debt obligations (<strong>CDOs</strong>) and constant proportion debt obligations (<strong>CPDOs</strong>) assigned a credit rating of &lsquo;AAA&rsquo;, &lsquo;AA+&rsquo;, &lsquo;AA&rsquo; or &lsquo;AA-&rsquo; by S&amp;P in and around the period 2005 to 2007.</p>

<p><a href="/class-actions/sp-cdo-cpdo">Click here for more information about the S&amp;P CDO &amp; CPDO Ratings Class Action</a></p>

<h3>Background</h3>

<p>Banton Group acts on behalf of investors in a class action against S&amp;P Global, Inc and Standard &amp; Poor&rsquo;s International, LLC (<strong>S&amp;P</strong>). The class action concerns collateralised debt obligations (<strong>CDOs</strong>) and constant proportion debt obligations (<strong>CPDOs</strong>) assigned a credit rating of &lsquo;AAA&rsquo;, &lsquo;AA+&rsquo;, &lsquo;AA&rsquo; or &lsquo;AA-&rsquo; by S&amp;P in and around the period 2005 to 2007.</p>

<h3>Group Member Definition</h3>

<p>You are a group member if you:</p>

<ol>
  <li>acquired interests in one or more CDOs or CPDOs assigned credit ratings AAA, AA+, AA or AA- by S&amp;P using:<br />a. CDO Evaluator 2.4.3 on or after 19 December 2005; and/or<br />b. CDO Evaluator 3.0, 3.1 or 3.2; and/or<br />c. CPDO Evaluator<br />(together, the <strong>Claim CDOs</strong>);</li>
  <li>acquired interests in the Claim CDOs by reason of the publication or dissemination of the ratings for those products in Australia; and</li>
  <li>have suffered loss or damage by reason of your acquisition of interests in the Claim CDOs.</li>
</ol>

<p>You may be a group member if you acquired an interest in a Claim CDO, even if you acquired it after 2007. How you acquired the interest does not necessarily prevent you from being a group member: this includes buying interests in the Claim CDO in the initial issue or in a re-sale on a secondary market, or any other acquisition.</p>

<p>If you are uncertain whether you are a group member, or you would like further information, you can contact Banton Group by email at <a href="mailto:sandpcdos@bantongroup.com">sandpcdos@bantongroup.com</a>.</p>

<h3>The Proceeding</h3>

<p>The proceedings are a class action in the Federal Court of Australia concerning a claim against S&amp;P for deceit, unconscionable conduct and contraventions of ss 1041F and G of the Corporations Act.</p>

<p>The claims are premised on representations made by S&amp;P in assigning the Claim CDOs ratings of AA- or higher, when S&amp;P knew or ought to have known that these ratings were wrong (and S&amp;P&rsquo;s decision to use those ratings was influenced by business considerations).</p>

<h3>Next Steps</h3>

<p>If you have any questions or would likely any additional information or if you are interested in registering your claim, <a href="/class-actions/sp-cdo-cpdo/register">click here</a>.</p>
`.trim(),
}

const only = process.argv.slice(2)
const slugs = only.length ? only : Object.keys(BODY)

let ok = 0
for (const slug of slugs) {
  const html = BODY[slug]
  if (!html) {
    console.error(`  ⚠ no body defined for "${slug}" — skipping`)
    continue
  }
  const { data, error } = await supabase
    .from('cases')
    .update({ body_html: html })
    .eq('slug', slug)
    .select('slug')
  if (error) {
    console.error(`  ❌ ${slug}: ${error.message}`)
  } else if (!data || data.length === 0) {
    console.error(`  ⚠ ${slug}: no matching row in cases (check the slug)`)
  } else {
    console.log(`  ✔ ${slug}: body_html updated`)
    ok++
  }
}

console.log(`\nUpdated ${ok} case(s).`)
