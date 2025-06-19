"use client"

import type React from "react"

import { useState, forwardRef } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const EnhancedInput = forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const handleFocus = () => setIsFocused(true)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(e.target.value.length > 0)
      props.onBlur?.(e)
    }

    return (
      <div className="relative group">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            animate={isFocused ? { opacity: 0.3 } : { opacity: 0 }}
            style={{ padding: "2px" }}
          >
            <div className="w-full h-full bg-white dark:bg-gray-900 rounded-lg" />
          </motion.div>

          <div className="relative">
            {icon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">{icon}</div>
            )}

            <Input
              ref={ref}
              className={cn(
                "relative z-10 transition-all duration-300 border-2",
                icon ? "pl-10" : "",
                isFocused
                  ? "border-vriksha-green shadow-lg shadow-vriksha-green/20"
                  : "border-gray-200 hover:border-gray-300",
                error ? "border-red-500" : "",
                className,
              )}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />

            {/* Floating label */}
            {label && (
              <motion.label
                className={cn(
                  "absolute left-3 pointer-events-none transition-all duration-300 z-10",
                  icon ? "left-10" : "left-3",
                  isFocused || hasValue || props.value
                    ? "top-0 text-xs bg-white dark:bg-gray-900 px-2 text-vriksha-green font-medium"
                    : "top-1/2 transform -translate-y-1/2 text-gray-500",
                )}
                animate={{
                  y: isFocused || hasValue || props.value ? -12 : 0,
                  scale: isFocused || hasValue || props.value ? 0.85 : 1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {label}
              </motion.label>
            )}

            {/* Shimmer effect on focus */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-lg"
              initial={{ x: "-100%" }}
              animate={isFocused ? { x: "100%" } : { x: "-100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Error message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 mt-1 ml-1"
          >
            {error}
          </motion.p>
        )}
      </div>
    )
  },
)

EnhancedInput.displayName = "EnhancedInput"
