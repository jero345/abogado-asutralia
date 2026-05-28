import {
  Image as ImageIcon,
  FileText,
  Quote,
  Link as LinkIcon,
  Bold,
  Heading2,
  List,
  Sparkles,
} from 'lucide-react'

/**
 * Quick-reference guide for non-technical admin users (Siena, etc).
 * Linked from the admin sidebar as "Help".
 */
export function HelpPage() {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-[#1C3A64] text-[28px] font-medium tracking-tight">Help & guide</h1>
        <p className="text-[#888888] text-[14px] mt-1.5">
          A quick reference for writing and publishing articles, cases and investigations.
        </p>
      </div>

      <Section title="Insert an image into an article">
        <Step n={1}>
          Open the article you want to edit (Articles → click on the article, or click <strong>New article</strong>).
        </Step>
        <Step n={2}>
          Click inside the body where you want the image to appear.
        </Step>
        <Step n={3}>
          In the editor toolbar, click the <Chip icon={<ImageIcon size={12} />}>Image</Chip> button.
          A file picker opens. Choose a JPG/PNG/WebP image (max 5 MB).
        </Step>
        <Step n={4}>
          The image uploads automatically and is inserted at your cursor. You can move on
          and keep writing.
        </Step>
        <Note>
          Images are stored in the <code>article-images</code> bucket on Supabase. Once
          uploaded, the same image can be reused — copy its URL from the inserted
          element and paste it elsewhere if needed.
        </Note>
      </Section>

      <Section title="Insert a PDF (shown inline)">
        <Step n={1}>
          Open the article and place your cursor on a new line where the PDF should appear.
        </Step>
        <Step n={2}>
          Click the <Chip icon={<FileText size={12} />}>PDF</Chip> button in the toolbar.
          A file picker opens. Choose a PDF (max 25 MB).
        </Step>
        <Step n={3}>
          The PDF uploads to <code>article-documents</code> and is inserted as a
          full-width inline viewer — readers can scroll through the whole document
          right inside the article, no separate page or download required.
        </Step>
        <Note>
          The same works on Class Action pages. PDFs that already exist on the
          server (eg. case documents migrated from the old site) also display as
          inline viewers automatically.
        </Note>
      </Section>

      <Section title="Format a legal quote">
        <Step n={1}>
          Type or paste the quote on its own line.
        </Step>
        <Step n={2}>
          Click anywhere inside the line.
        </Step>
        <Step n={3}>
          Click the <Chip icon={<Quote size={12} />}>Quote</Chip> button in the toolbar.
          The line becomes a styled blockquote: blue text, italic, with a blue
          left border and a soft blue background.
        </Step>
        <Note>
          Click the same button again to remove the blockquote style.
        </Note>
      </Section>

      <Section title="Other useful toolbar buttons">
        <ul className="space-y-2.5 text-[14px] text-[#555555]">
          <Tip icon={<Bold size={12} />} label="Bold / Italic / Underline">
            Select text first, then click. Same for headings.
          </Tip>
          <Tip icon={<Heading2 size={12} />} label="Headings (H1 / H2 / H3)">
            Use H2 for section titles. H1 is reserved for the article title (already at the top).
          </Tip>
          <Tip icon={<List size={12} />} label="Bullet / Numbered lists">
            Click on a line, then the list icon. Tab to indent a sub-item.
          </Tip>
          <Tip icon={<LinkIcon size={12} />} label="Link">
            Select text, click the link icon, paste a URL. Leave it empty to remove the link.
          </Tip>
        </ul>
      </Section>

      <Section title="Save, schedule or publish">
        <Step n={1}>
          <strong>Save draft</strong>: keeps the article hidden. Use while you're still writing.
        </Step>
        <Step n={2}>
          <strong>Schedule</strong>: picks a future date/time. The article goes live automatically at that moment.
        </Step>
        <Step n={3}>
          <strong>Publish now</strong>: makes the article visible on the public site immediately.
        </Step>
        <Note>
          You can unpublish at any time — click the eye icon on the Articles list.
        </Note>
      </Section>

      <Section title="Class Actions vs Articles">
        <p className="text-[14px] text-[#555555] leading-[1.7] mb-2">
          Two separate sections in the sidebar:
        </p>
        <ul className="space-y-2 text-[14px] text-[#555555] leading-[1.7] list-disc pl-6">
          <li>
            <strong>Articles</strong> are blog posts shown at <code>/blog</code>. Use for case updates, commentary, firm news.
          </li>
          <li>
            <strong>Cases</strong> are the litigation matters at <code>/class-actions/[slug]</code>.
            Each has a status (Active / Settled / On Appeal / Investigating), category,
            key date and a registration form for group members.
          </li>
          <li>
            <strong>Investigations</strong> are pre-litigation matters where the firm is
            evaluating whether to bring a class action.
          </li>
        </ul>
      </Section>

      <div className="mt-12 p-5 bg-[#F4F6FB] border border-[#1C3A64]/15 rounded-2xl flex items-start gap-3">
        <Sparkles size={18} className="text-[#1C3A64] flex-shrink-0 mt-0.5" />
        <p className="text-[#555555] text-[13px] leading-[1.7]">
          <strong className="text-[#1C3A64]">Tip:</strong> use the <em>Preview</em> tab
          inside the editor to see exactly how the article will look on the public site
          before publishing.
        </p>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10 bg-white border border-[#1C3A64]/10 rounded-2xl p-6 md:p-7">
      <h2 className="text-[#1C3A64] text-[18px] font-medium mb-4 pb-3 border-b border-[#1C3A64]/10">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 text-[14px] text-[#555555] leading-[1.7]">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1C3A64] text-white text-[12px] font-medium flex items-center justify-center mt-0.5">
        {n}
      </span>
      <span>{children}</span>
    </div>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 ml-9 text-[13px] text-[#888888] leading-[1.65] italic">
      {children}
    </div>
  )
}

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 bg-[#1C3A64] text-white text-[11px] font-medium px-2 py-0.5 rounded mx-0.5">
      {icon}
      {children}
    </span>
  )
}

function Tip({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex-shrink-0 w-6 h-6 rounded-md bg-[#1C3A64]/10 text-[#1C3A64] flex items-center justify-center mt-0.5">
        {icon}
      </span>
      <span>
        <strong className="text-[#1C3A64]">{label}</strong> — {children}
      </span>
    </li>
  )
}
