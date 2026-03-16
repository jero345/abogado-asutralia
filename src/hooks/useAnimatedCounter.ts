import { useEffect, useState } from 'react'

export function useAnimatedCounter(
  target: number,
  duration: number = 2000,
  active: boolean = true
) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return

    const startTime = performance.now()
    const startValue = 0

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)
      const current = Math.floor(startValue + (target - startValue) * easedProgress)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [target, duration, active])

  return count
}
