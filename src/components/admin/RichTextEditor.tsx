import { useCallback, useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
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
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({
        placeholder: placeholder ?? 'Write the article…',
      }),
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class:
          'prose prose-slate max-w-none min-h-[400px] px-5 py-4 focus:outline-none ' +
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
    <div className="border border-[#1C3A64]/15 rounded-lg overflow-hidden bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

// ─── Toolbar ──────────────────────────────────────────────────────────

function Toolbar({ editor }: { editor: Editor }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const onUploadClick = useCallback(() => fileInputRef.current?.click(), [])

  const onFileChange = useCallback(
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

      setUploading(true)
      setUploadError(null)

      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
      const path = `editor/${filename}`

      const { error: uploadErr } = await supabase.storage
        .from('article-images')
        .upload(path, file, { cacheControl: '3600', upsert: false })

      if (uploadErr) {
        setUploading(false)
        setUploadError(uploadErr.message)
        return
      }

      const { data } = supabase.storage.from('article-images').getPublicUrl(path)
      editor.chain().focus().setImage({ src: data.publicUrl }).run()
      setUploading(false)
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
    <div className="border-b border-[#1C3A64]/15 bg-[#F4F6FB] px-2 py-1.5 flex flex-wrap items-center gap-0.5">
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
        <Btn onClick={onUploadClick} title="Insert image" disabled={uploading}>
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
        </Btn>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
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
