"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Leaf, ArrowLeft, Mail, Lock, Sparkles } from "lucide-react"
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

export default function SignInPage() {
  const { signIn, isLoading } = useAuth()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Basic validation
    const newErrors: { [key: string]: string } = {}
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.password) newErrors.password = "Password is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const result = await signIn(formData.email, formData.password)
    if (!result.success) {
      toast({
        title: "Sign In Failed",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Welcome back! 🌱",
        description: "You have been signed in successfully.",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-green-950 dark:via-gray-900 dark:to-amber-950 p-4 relative overflow-hidden">
      <SparkleEffect density={30} className="fixed inset-0" />
      <motion.div
        className="fixed top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-xl"
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 0.8, 1] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10 flex flex-col items-center"
      >
        <Link href="/">
          <MagneticButton
            variant="ghost"
            className="mb-8 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 bg-white/50 backdrop-blur-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </MagneticButton>
        </Link>
        <FloatingSparkles>
          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 overflow-hidden relative px-6 py-8">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
                    "linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                    "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
                  ],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <CardHeader className="text-center pb-8 relative z-10">
                <motion.div
                  className="flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-vriksha-green to-green-600 rounded-full flex items-center justify-center shadow-lg relative">
                    <Leaf className="h-8 w-8 text-white" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-vriksha-green to-green-600 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      style={{ opacity: 0.3 }}
                    />
                  </div>
                </motion.div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {t("welcomeBack")}
                </CardTitle>
                <motion.p
                  className="text-gray-600 dark:text-gray-400 mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Sign in to your Vriksha account
                </motion.p>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <GoogleSignInButton size="lg" className="w-full h-14 text-lg font-medium" />
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
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <EnhancedInput
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=""
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
                      placeholder=""
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

                  <div className="flex items-center justify-between">
                    <Link href="#" className="text-sm text-vriksha-green hover:underline font-medium">
                      {t("forgotPassword")}
                    </Link>
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
                        {t("signIn")}
                      </>
                    )}
                  </MagneticButton>
                </motion.form>

                {/* Demo Credentials */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-4 border border-blue-200 dark:border-blue-800"
                >
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Demo Credentials
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Email:</strong> demo@vriksha.com
                    <br />
                    <strong>Password:</strong> password123
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("dontHaveAccount")}{" "}
                    <Link href="/auth/signup" className="text-vriksha-green hover:underline font-medium">
                      {t("signUp")}
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
