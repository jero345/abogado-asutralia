import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)

  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const trailConfig = { damping: 30, stiffness: 200 }
  const trailXSpring = useSpring(cursorX, trailConfig)
  const trailYSpring = useSpring(cursorY, trailConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6)
      cursorY.set(e.clientY - 6)
    }

    const clickDown = () => setClicked(true)
    const clickUp = () => setClicked(false)

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select')
      setHovered(!!isInteractive)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousemove', handleHover)
    window.addEventListener('mousedown', clickDown)
    window.addEventListener('mouseup', clickUp)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousemove', handleHover)
      window.removeEventListener('mousedown', clickDown)
      window.removeEventListener('mouseup', clickUp)
    }
  }, [cursorX, cursorY])

  // Only show on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#1e3a5f] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={{ scale: clicked ? 0.5 : hovered ? 1.5 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      {/* Trail */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#1e3a5f]/40 rounded-full pointer-events-none z-[9998]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: '-10px',
          translateY: '-10px',
        }}
        animate={{ scale: clicked ? 0.8 : hovered ? 2 : 1, opacity: hovered ? 0.8 : 0.3 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </>
  )
}
