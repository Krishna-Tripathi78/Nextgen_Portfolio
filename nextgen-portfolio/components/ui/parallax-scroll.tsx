'use client'

import { useEffect, useRef } from 'react'

interface ParallaxScrollProps {
  children: React.ReactNode
  speed?: number
  className?: string
}

export function ParallaxScroll({ children, speed = 0.5, className = '' }: ParallaxScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const scrolled = window.scrollY
      const rect = ref.current.getBoundingClientRect()
      const elementTop = rect.top + scrolled
      const offset = (scrolled - elementTop) * speed
      ref.current.style.transform = `translateY(${offset}px)`
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
