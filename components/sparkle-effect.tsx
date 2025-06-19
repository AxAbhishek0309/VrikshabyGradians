"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface SparkleProps {
  className?: string
  density?: number
}

export function SparkleEffect({ className = "", density = 20 }: SparkleProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sparkles, setSparkles] = useState<{
    id: number
    x: number
    y: number
    size: number
    delay: number
    duration: number
  }[]>([])

  useEffect(() => {
    const generated = Array.from({ length: density }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    }))
    setSparkles(generated)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 2,
          }}
        >
          <div
            className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full blur-sm"
            style={{
              width: sparkle.size,
              height: sparkle.size,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export function FloatingSparkles({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <SparkleEffect density={15} />
      {children}
    </div>
  )
}
