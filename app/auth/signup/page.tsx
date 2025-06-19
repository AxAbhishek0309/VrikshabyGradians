"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Leaf, ArrowLeft, Mail, Lock, User, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { GoogleSignInButton } from "@/components/google-sign-in-button"
import { EnhancedInput } from "@/components/enhanced-input"
import { MagneticButton } from "@/components/magnetic-button"
import { FloatingSparkles, SparkleEffect } from "@/components/sparkle-effect"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function SignUpPage() {
  const { signUp, isLoading } = useAuth()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Basic validation
    const newErrors: { [key: string]: string } = {}
    if (!formData.name) newErrors.name = "Name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const result = await signUp(formData.email, formData.password, formData.name)
    if (!result.success) {
      toast({
        title: "Sign Up Failed",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Welcome to Vriksha! 🌱",
        description: "Your account has been created successfully.",
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-green-950 dark:via-gray-900 dark:to-amber-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background sparkles */}
      <SparkleEffect density={30} className="fixed inset-0" />

      {/* Floating orbs */}
      <motion.div
        className="fixed top-20 right-20 w-36 h-36 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl"
        animate={{
          x: [0, -120, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-20 left-20 w-44 h-44 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -70, 0],
          scale: [1, 0.7, 1],
        }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Back to Home */}
        <Link href="/">
          <MagneticButton
            variant="ghost"
            className="mb-6 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 bg-white/50 backdrop-blur-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </MagneticButton>
        </Link>

        <FloatingSparkles>
          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 overflow-hidden relative">
              {/* Card glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 rounded-lg"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                    "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))",
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(34, 197, 94, 0.1))",
                  ],
                }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              <CardHeader className="text-center pb-8 relative z-10">
                <motion.div
                  className="flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-vriksha-green to-green-600 rounded-full flex items-center justify-center shadow-lg relative">
                    <Leaf className="h-8 w-8 text-white" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-vriksha-green to-green-600 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      style={{ opacity: 0.2 }}
                    />
                  </div>
                </motion.div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {t("createAccount")}
                </CardTitle>
                <motion.p
                  className="text-gray-600 dark:text-gray-400 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Join the Vriksha plant community
                </motion.p>
              </CardHeader>

              <CardContent className="space-y-6 relative z-10">
                {/* Google Sign Up */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <GoogleSignInButton size="lg" className="w-full h-14 text-lg font-medium">
                    Sign up with Google
                  </GoogleSignInButton>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white dark:bg-gray-900 px-4 text-gray-500 font-medium">
                        Or continue with email
                      </span>
                    </div>
                  </div>
                </motion.div>

                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <EnhancedInput
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    label={t("fullName")}
                    error={errors.name}
                    icon={<User className="h-4 w-4" />}
                  />

                  <EnhancedInput
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    label={t("email")}
                    error={errors.email}
                    icon={<Mail className="h-4 w-4" />}
                  />

                  <div className="relative">
                    <EnhancedInput
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="At least 6 characters"
                      label={t("password")}
                      error={errors.password}
                      icon={<Lock className="h-4 w-4" />}
                    />
                    <MagneticButton
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-10 w-10 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </MagneticButton>
                  </div>

                  <div className="relative">
                    <EnhancedInput
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      label={t("confirmPassword")}
                      error={errors.confirmPassword}
                      icon={<Lock className="h-4 w-4" />}
                    />
                    <MagneticButton
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2 h-10 w-10 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      type="button"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </MagneticButton>
                  </div>

                  <MagneticButton
                    type="submit"
                    className="w-full bg-gradient-to-r from-vriksha-green to-green-600 hover:from-vriksha-green/90 hover:to-green-600/90 text-white h-12 text-lg font-medium"
                    disabled={isLoading}
                    strength={0.2}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        {t("signUp")}
                      </>
                    )}
                  </MagneticButton>
                </motion.form>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("alreadyHaveAccount")}{" "}
                    <Link href="/auth/signin" className="text-vriksha-green hover:underline font-medium">
                      {t("signIn")}
                    </Link>
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </FloatingSparkles>
      </motion.div>
    </div>
  )
}
