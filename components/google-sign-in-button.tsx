"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { toast } from "@/hooks/use-toast"
import { MagneticButton } from "@/components/magnetic-button"
import { FloatingSparkles } from "@/components/sparkle-effect"
import { motion } from "framer-motion"

interface GoogleSignInButtonProps {
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  className?: string
  children?: React.ReactNode
}

export function GoogleSignInButton({
  variant = "outline",
  size = "default",
  className = "",
  children,
}: GoogleSignInButtonProps) {
  const { signInWithGoogle, isGoogleConfigured } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    console.log("Google Sign-In Button: Clicked")

    setIsLoading(true)
    try {
      console.log("Google Sign-In Button: Attempting sign in...")
      const result = await signInWithGoogle()
      console.log("Google Sign-In Button: Result", result)

      if (!result.success) {
        toast({
          title: "Sign In Failed",
          description: result.error || "Failed to sign in with Google",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Welcome! 🎉",
          description: "Successfully signed in with Google",
        })
      }
    } catch (error) {
      console.error("Google Sign-In Button: Error", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FloatingSparkles>
      <MagneticButton
        variant={variant}
        size={size}
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className={`relative group bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 transition-all duration-300 ${className}`}
        strength={0.4}
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full"
          />
        ) : (
          <>
            <motion.svg
              className="w-5 h-5 mr-3"
              viewBox="0 0 24 24"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </motion.svg>
            <motion.span
              className="font-medium"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {children || "Continue with Google"}
            </motion.span>
          </>
        )}

        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg opacity-0 group-hover:opacity-100"
          initial={false}
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
              "linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
              "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
            ],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </MagneticButton>
    </FloatingSparkles>
  )
}
