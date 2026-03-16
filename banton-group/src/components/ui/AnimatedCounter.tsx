import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'
import { useInView } from '@/hooks/useInView'

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
  duration = 2200,
  className = '',
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({ threshold: 0.5 })
  const count = useAnimatedCounter(value, duration, inView)

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}
