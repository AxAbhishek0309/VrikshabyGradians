"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, X, Globe, Moon, Sun, Monitor, Phone, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"

export function SettingsPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸", nativeName: "English" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳", nativeName: "हिंदी" },
    { code: "es", name: "Español", flag: "🇪🇸", nativeName: "Español" },
    { code: "fr", name: "Français", flag: "🇫🇷", nativeName: "Français" },
    { code: "de", name: "Deutsch", flag: "🇩🇪", nativeName: "Deutsch" },
    { code: "ja", name: "日本語", flag: "🇯🇵", nativeName: "日本語" },
    { code: "ar", name: "العربية", flag: "🇸🇦", nativeName: "العربية" },
  ]

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ]

  return (
    <>
      {/* Settings Toggle Button */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gray-800 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 text-white dark:text-gray-800 shadow-2xl"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="settings"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Settings className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 z-50 shadow-2xl"
            >
              <Card className="h-full border-0 rounded-none">
                <CardHeader className="border-b bg-gradient-to-r from-vriksha-green to-green-600 text-white">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Settings
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-6 overflow-y-auto">
                  {/* Language Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-vriksha-green" />
                      <Label className="text-base font-semibold">Language</Label>
                    </div>
                    <div className="grid gap-2 max-h-64 overflow-y-auto">
                      {languages.map((lang) => (
                        <Button
                          key={lang.code}
                          variant={language === lang.code ? "default" : "outline"}
                          className={`justify-start h-12 ${
                            language === lang.code
                              ? "bg-vriksha-green hover:bg-vriksha-green/90 text-white"
                              : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                          } ${lang.code === "ar" ? "text-right" : "text-left"}`}
                          onClick={() => setLanguage(lang.code as any)}
                        >
                          <span className="mr-3 text-lg">{lang.flag}</span>
                          <div className={lang.code === "ar" ? "text-right" : "text-left"}>
                            <div className="font-medium">{lang.nativeName}</div>
                            <div className="text-xs opacity-70">{lang.name}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Theme Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Sun className="h-5 w-5 text-vriksha-green" />
                      <Label className="text-base font-semibold">Appearance</Label>
                    </div>
                    <div className="grid gap-2">
                      {themes.map((themeOption) => {
                        const Icon = themeOption.icon
                        return (
                          <Button
                            key={themeOption.value}
                            variant={theme === themeOption.value ? "default" : "outline"}
                            className={`justify-start h-12 ${
                              theme === themeOption.value
                                ? "bg-vriksha-green hover:bg-vriksha-green/90 text-white"
                                : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                            }`}
                            onClick={() => setTheme(themeOption.value)}
                          >
                            <Icon className="mr-3 h-4 w-4" />
                            {themeOption.label}
                          </Button>
                        )
                      })}
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Support */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-vriksha-green" />
                      <Label className="text-base font-semibold">Support & Contact</Label>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-green-50 dark:bg-green-950 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 dark:text-green-200 mb-3">Get Expert Help</h4>

                        <div className="space-y-3">
                          <a
                            href="tel:+918542986911"
                            className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900 transition-colors"
                          >
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                              <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">Call Support</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">+91 8542986911</div>
                            </div>
                          </a>

                          <a
                            href="mailto:auxinbiotek1986@gmail.com"
                            className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-900 transition-colors"
                          >
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                              <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">Email Support</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">auxinbiotek1986@gmail.com</div>
                            </div>
                          </a>
                        </div>

                        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                          <p className="text-xs text-green-800 dark:text-green-200">
                            <strong>Support Hours:</strong>
                            <br />
                            Monday-Saturday: 9 AM - 7 PM
                            <br />
                            Sunday: 10 AM - 6 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* App Info */}
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">About Vriksha</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Premium curated plant store with expert care guidance. Transform your space into a green paradise.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Version 1.0.0 • Made with 🌱 for plant lovers
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
