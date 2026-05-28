import { useRef, useState, type DragEvent } from 'react'
import { Upload, X, FileText } from 'lucide-react'
import { FieldLabel, FieldHelper } from './FormField'

export function FileUploadField({
  label,
  helper,
  required,
  maxSizeMb,
  accept,
  files,
  onChange,
}: {
  label: string
  helper?: string
  required?: boolean
  maxSizeMb: number
  accept?: string
  files: File[]
  onChange: (files: File[]) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [rejected, setRejected] = useState<string | null>(null)

  const maxBytes = maxSizeMb * 1024 * 1024

  const accept_files = (incoming: File[]) => {
    setRejected(null)
    const ok: File[] = []
    for (const f of incoming) {
      if (f.size > maxBytes) {
        setRejected(`"${f.name}" exceeds the ${maxSizeMb} MB limit.`)
        continue
      }
      ok.push(f)
    }
    onChange([...files, ...ok])
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files?.length) accept_files(Array.from(e.dataTransfer.files))
  }

  const remove = (idx: number) => {
    onChange(files.filter((_, i) => i !== idx))
  }

  return (
    <div className="col-span-full">
      <FieldLabel label={label} required={required} />
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer border-2 border-dashed rounded-xl px-6 py-8 text-center transition-colors ${
          dragOver
            ? 'border-[#1C3A64] bg-[#1C3A64]/[0.04]'
            : 'border-[#1C3A64]/25 hover:border-[#1C3A64]/50 bg-[#FAFBFD]'
        }`}
      >
        <Upload size={20} className="mx-auto text-[#1C3A64]/60 mb-2" />
        <p className="text-[#1C3A64] text-[13px] font-medium">
          Drag and drop here or <span className="underline">browse files</span>
        </p>
        <p className="text-[#888888] text-[11px] mt-1">Max file size: {maxSizeMb} MB</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={(e) => {
            if (e.target.files) accept_files(Array.from(e.target.files))
            e.target.value = ''
          }}
        />
      </div>
      <FieldHelper text={helper} />
      {rejected && (
        <p className="text-red-600 text-[11px] mt-2">{rejected}</p>
      )}
      {files.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center gap-2 bg-white border border-[#1C3A64]/15 rounded-lg px-3 py-2"
            >
              <FileText size={13} className="text-[#1C3A64]/60 flex-shrink-0" />
              <span className="text-[#1C3A64] text-[12px] truncate flex-1">{f.name}</span>
              <span className="text-[#888888] text-[11px] tabular-nums flex-shrink-0">
                {(f.size / 1024 / 1024).toFixed(2)} MB
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  remove(i)
                }}
                className="text-[#888888] hover:text-red-600 p-1"
                aria-label={`Remove ${f.name}`}
              >
                <X size={13} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
