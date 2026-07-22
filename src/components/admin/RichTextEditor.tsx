import { useCallback, useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import { Node, Extension, mergeAttributes } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'

// Custom block-level node for an attached PDF. Renders as an outlined "card"
// button (title + opens in a new tab) — NOT an inline viewer. The wrapper div
// keeps data-src / data-title so the node round-trips in the editor and the
// public pages can rebuild the button (with a doc icon) via pdfEmbedsToButtons.
const PdfEmbed = Node.create({
  name: 'pdfEmbed',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,
  addAttributes() {
    return {
      src: { default: null },
      title: { default: 'PDF document' },
    }
  },
  parseHTML() {
    return [
      {
        tag: 'div[data-type="pdf-embed"]',
        getAttrs: (node) => {
          const el = node as HTMLElement
          const iframe = el.querySelector('iframe')
          return {
            src: el.getAttribute('data-src') || iframe?.getAttribute('src') || null,
            title: el.getAttribute('data-title') || iframe?.getAttribute('title') || 'PDF document',
          }
        },
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    const src = HTMLAttributes.src as string
    const title = (HTMLAttributes.title as string) || 'PDF document'
    return [
      'div',
      mergeAttributes({
        'data-type': 'pdf-embed',
        'data-src': src,
        'data-title': title,
        class: 'pdf-embed',
      }),
      [
        'a',
        {
          href: src,
          target: '_blank',
          rel: 'noopener noreferrer',
          class: 'pdf-button',
        },
        title,
      ],
    ]
  },
})

// Tab / Shift-Tab in normal text inserts (or removes) a 4-space indent. Inside
// lists it stays out of the way so Tab still indents/outdents the list item.
const INDENT = '    '
const TabIndent = Extension.create({
  name: 'tabIndent',
  priority: 10,
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        if (this.editor.isActive('listItem')) return false
        return this.editor.commands.insertContent(INDENT)
      },
      'Shift-Tab': () => {
        if (this.editor.isActive('listItem')) return false
        const { state } = this.editor
        const { from, empty } = state.selection
        if (!empty) return false
        const before = state.doc.textBetween(Math.max(0, from - INDENT.length), from)
        const trailing = before.match(/ +$/)
        if (!trailing) return false
        const remove = Math.min(INDENT.length, trailing[0].length)
        return this.editor.commands.deleteRange({ from: from - remove, to: from })
      },
    }
  },
})

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  FileText,
  Undo2,
  Redo2,
  Loader2,
  Minus,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TabIndent,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      PdfEmbed,
      Placeholder.configure({
        placeholder: placeholder ?? 'Write the article…',
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class:
          'prose prose-slate max-w-none min-h-[400px] px-5 py-4 focus:outline-none ' +
          // Quote styling: blue text, left blue border, italic, light blue background —
          // mirrors what the public article page renders so editors see WYSIWYG.
          '[&_blockquote]:border-l-[4px] [&_blockquote]:border-l-[#1C3A64] ' +
          '[&_blockquote]:bg-[#F4F6FB] [&_blockquote]:rounded-r-xl ' +
          '[&_blockquote]:px-5 [&_blockquote]:py-3 [&_blockquote]:my-5 ' +
          '[&_blockquote]:not-italic ' +
          '[&_blockquote_p]:text-[#1C3A64] [&_blockquote_p]:italic ' +
          '[&_blockquote_p]:font-medium [&_blockquote_p]:m-0 ' +
          // PDF attachment shows as a card button inside the editor (WYSIWYG)
          '[&_.pdf-embed]:my-4 ' +
          '[&_.pdf-button]:inline-flex [&_.pdf-button]:items-center [&_.pdf-button]:gap-3 ' +
          '[&_.pdf-button]:bg-white [&_.pdf-button]:border [&_.pdf-button]:border-[#1C3A64]/30 ' +
          '[&_.pdf-button]:text-[#1C3A64] [&_.pdf-button]:text-[14px] [&_.pdf-button]:font-medium ' +
          '[&_.pdf-button]:px-5 [&_.pdf-button]:py-3 [&_.pdf-button]:rounded-md [&_.pdf-button]:no-underline ' +
          // Placeholder
          '[&_p.is-editor-empty:first-child]:before:content-[attr(data-placeholder)] ' +
          '[&_p.is-editor-empty:first-child]:before:text-[#aaa] ' +
          '[&_p.is-editor-empty:first-child]:before:float-left ' +
          '[&_p.is-editor-empty:first-child]:before:pointer-events-none ' +
          '[&_p.is-editor-empty:first-child]:before:h-0',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  // Keep editor in sync if `value` is changed externally (e.g. loading an article)
  useEffect(() => {
    if (!editor) return
    const current = editor.getHTML()
    if (value && value !== current) {
      editor.commands.setContent(value, { emitUpdate: false })
    }
  }, [value, editor])

  if (!editor) return null

  return (
    <div className="border border-[#1C3A64]/15 rounded-lg bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

// ─── Toolbar ──────────────────────────────────────────────────────────

function Toolbar({ editor }: { editor: Editor }) {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const pdfInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState<null | 'image' | 'pdf'>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const onUploadImageClick = useCallback(() => imageInputRef.current?.click(), [])
  const onUploadPdfClick = useCallback(() => pdfInputRef.current?.click(), [])

  const onImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      e.target.value = ''
      if (!file) return
      if (!supabase) {
        setUploadError('Supabase is not configured.')
        return
      }
      if (!file.type.startsWith('image/')) {
        setUploadError('Please choose an image file.')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError('Image is too large (max 5 MB).')
        return
      }

      setUploading('image')
      setUploadError(null)

      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const path = `editor/${filename}`

      const { error: uploadErr } = await supabase.storage
        .from('article-images')
        .upload(path, file, { cacheControl: '3600', upsert: false })

      if (uploadErr) {
        setUploading(null)
        setUploadError(uploadErr.message)
        return
      }

      const { data } = supabase.storage.from('article-images').getPublicUrl(path)
      editor.chain().focus().setImage({ src: data.publicUrl }).run()
      setUploading(null)
    },
    [editor],
  )

  const onPdfChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      e.target.value = ''
      if (!file) return
      if (!supabase) {
        setUploadError('Supabase is not configured.')
        return
      }
      const isPdf =
        file.type === 'application/pdf' ||
        file.name.toLowerCase().endsWith('.pdf')
      if (!isPdf) {
        setUploadError('Only PDF files are accepted.')
        return
      }
      if (file.size > 25 * 1024 * 1024) {
        setUploadError('PDF is too large (max 25 MB).')
        return
      }

      setUploading('pdf')
      setUploadError(null)

      // Keep a sanitised version of the original filename in the URL so it
      // shows up in browser downloads.
      const base = file.name
        .replace(/\.pdf$/i, '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60) || 'document'
      const path = `editor/${Date.now()}-${base}.pdf`

      const { error: uploadErr } = await supabase.storage
        .from('article-documents')
        .upload(path, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: 'application/pdf',
        })

      if (uploadErr) {
        setUploading(null)
        setUploadError(uploadErr.message)
        return
      }

      const { data } = supabase.storage.from('article-documents').getPublicUrl(path)
      const label = file.name.replace(/\.pdf$/i, '') || 'PDF document'
      // Insert as a block-level PDF attachment — shown as a card button that
      // opens the PDF in a new tab (no inline viewer).
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'pdfEmbed',
          attrs: { src: data.publicUrl, title: label },
        })
        .run()
      setUploading(null)
    },
    [editor],
  )

  const setLink = useCallback(() => {
    const previous = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('URL', previous ?? 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  return (
    <div className="sticky top-0 z-10 rounded-t-lg border-b border-[#1C3A64]/15 bg-[#F4F6FB] px-2 py-1.5 flex flex-wrap items-center gap-0.5 shadow-sm">
      <Group>
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          <Heading1 size={15} />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 size={15} />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 size={15} />
        </Btn>
      </Group>

      <Divider />

      <Group>
        <Btn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
          title="Bold (Ctrl+B)"
        >
          <Bold size={14} />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
          title="Italic (Ctrl+I)"
        >
          <Italic size={14} />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon size={14} />
        </Btn>
      </Group>

      <Divider />

      <Group>
        <Btn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
          title="Bullet list"
        >
          <List size={15} />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
          title="Numbered list"
        >
          <ListOrdered size={15} />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
          title="Quote"
        >
          <Quote size={14} />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Divider"
        >
          <Minus size={14} />
        </Btn>
      </Group>

      <Divider />

      <Group>
        <Btn onClick={setLink} active={editor.isActive('link')} title="Link">
          <LinkIcon size={14} />
        </Btn>
        <Btn onClick={onUploadImageClick} title="Insert image" disabled={uploading !== null}>
          {uploading === 'image' ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
        </Btn>
        <Btn onClick={onUploadPdfClick} title="Insert PDF" disabled={uploading !== null}>
          {uploading === 'pdf' ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
        </Btn>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onImageChange}
        />
        <input
          ref={pdfInputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={onPdfChange}
        />
      </Group>

      <Divider />

      <Group>
        <Btn
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo"
        >
          <Undo2 size={14} />
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo"
        >
          <Redo2 size={14} />
        </Btn>
      </Group>

      {uploadError && (
        <span className="ml-auto text-[12px] text-red-600 px-2">{uploadError}</span>
      )}
    </div>
  )
}

function Group({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-0.5">{children}</div>
}

function Divider() {
  return <span className="w-px h-5 bg-[#1C3A64]/15 mx-1" />
}

function Btn({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-pressed={active}
      className={[
        'p-1.5 rounded-md transition-colors',
        active
          ? 'bg-[#1C3A64] text-white'
          : 'text-[#1C3A64] hover:bg-[#1C3A64]/10',
        disabled ? 'opacity-40 cursor-not-allowed hover:bg-transparent' : '',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
