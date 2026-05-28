import { useEffect, useRef, useState } from 'react'
import { FieldLabel, FieldHelper, FieldError } from './FormField'

/**
 * Canvas-based signature pad. Outputs a base64 PNG data URL on every stroke.
 * Supports mouse + touch + pointer events. No external dependency.
 */
export function SignaturePad({
  label,
  helper,
  required,
  value,
  onChange,
  error,
  height = 160,
}: {
  label: string
  helper?: string
  required?: boolean
  value: string
  onChange: (dataUrl: string) => void
  error?: string
  height?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const drawingRef = useRef(false)
  const lastRef = useRef<{ x: number; y: number } | null>(null)
  const [hasDrawn, setHasDrawn] = useState(Boolean(value))

  // Set up DPR-aware backing store on mount and on resize.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
        ctx.lineWidth = 1.6
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = '#1C3A64'
      }
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const pointerFromEvent = (e: PointerEvent | React.PointerEvent): { x: number; y: number } => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const start = (e: React.PointerEvent) => {
    e.preventDefault()
    const canvas = canvasRef.current!
    canvas.setPointerCapture(e.pointerId)
    drawingRef.current = true
    lastRef.current = pointerFromEvent(e)
  }

  const move = (e: React.PointerEvent) => {
    if (!drawingRef.current) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const current = pointerFromEvent(e)
    const last = lastRef.current
    if (!last) return
    ctx.beginPath()
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(current.x, current.y)
    ctx.stroke()
    lastRef.current = current
    setHasDrawn(true)
  }

  const end = () => {
    drawingRef.current = false
    lastRef.current = null
    const canvas = canvasRef.current
    if (!canvas) return
    onChange(canvas.toDataURL('image/png'))
  }

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
    onChange('')
  }

  return (
    <div className="col-span-full">
      <FieldLabel label={label} required={required} />
      <div className="relative bg-white border border-[#1C3A64]/25 rounded-xl overflow-hidden">
        <canvas
          ref={canvasRef}
          style={{ height, width: '100%', touchAction: 'none', display: 'block' }}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
        />
        {!hasDrawn && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[#888888] text-[12px]">
            Use your mouse or finger to draw your signature above
          </div>
        )}
        <button
          type="button"
          onClick={clear}
          className="absolute top-2 right-3 text-[11px] text-[#1C3A64] hover:underline"
        >
          clear
        </button>
      </div>
      <FieldHelper text={helper} />
      <FieldError message={error} />
    </div>
  )
}
