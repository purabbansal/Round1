'use client'

import { ReactNode, useEffect, useRef } from "react"

type Props = {
  children: ReactNode
  delay?: number      // in seconds
  duration?: number   // in seconds
  distance?: string   // how far to slide (e.g., '50px')
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function SlideIn({
  children,
  delay = 0,
  duration = 0.6,
  distance = '50px',
  direction = 'up'
}: Props) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.style.animation = `slide-in-${direction} ${duration}s ease ${delay}s forwards`
        observer.unobserve(element)
      }
    }, { threshold: 0, rootMargin: '-150px' })

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay, duration, direction])

  return (
    <div
      ref={elementRef}
      style={{ '--slide-distance': distance } as React.CSSProperties}
      className={`slide-in-hidden slide-in-${direction}`}
    >
      {children}
    </div>
  )
}
