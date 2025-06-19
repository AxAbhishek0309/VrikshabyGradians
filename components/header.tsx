"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Moon, Sun, Menu, X, Globe, ShoppingCart, Search } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { user, signOut, isAuthenticated } = useAuth()
  const { getTotalItems } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-green-200 dark:border-green-800"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Vriksha Logo" width={40} height={40} className="w-10 h-10" />
              <span className="text-2xl font-bold text-vriksha-green dark:text-green-400">Vriksha</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-vriksha-green dark:hover:text-green-400 transition-colors"
            >
              {t("home")}
            </Link>
            <a
              href="#categories"
              className="text-gray-700 dark:text-gray-300 hover:text-vriksha-green dark:hover:text-green-400 transition-colors"
            >
              {t("categories")}
            </a>
            <a
              href="#about"
              className="text-gray-700 dark:text-gray-300 hover:text-vriksha-green dark:hover:text-green-400 transition-colors"
            >
              {t("about")}
            </a>
            <a
              href="#contact"
              className="text-gray-700 dark:text-gray-300 hover:text-vriksha-green dark:hover:text-green-400 transition-colors"
            >
              {t("contact")}
            </a>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="text-gray-700 dark:text-gray-300 hover:text-vriksha-green dark:hover:text-green-400 transition-colors"
              >
                {t("dashboard")}
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-vriksha-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={language === lang.code ? "bg-green-50 dark:bg-green-900" : ""}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback className="bg-vriksha-green text-white">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">{t("dashboard")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
                  <DropdownMenuItem>{t("orders")}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-red-600">
                    {t("signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="outline" className="border-vriksha-green text-vriksha-green hover:bg-vriksha-green/10">
                    {t("signIn")}
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-vriksha-green hover:bg-vriksha-green/90 text-white">
                    {t("signUp")}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-green-200 dark:border-green-800 pt-4"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-vriksha-green dark:hover:text-green-400 transition-colors"
              >
                {t("home")}
              </Link>
              <a
                href="#categories"
                className="text-gray-700 dark:text-gray-300 hover:text-vriksha-green dark:hover:text-green-400 transition-colors"
              >
                {t("categories")}
              </a>
              <a
                href="#about"
                className="text-gray-700 dark:text-gray-300 hover:text-vriksha-green dark:hover:text-green-400 transition-colors"
              >
                {t("about")}
              </a>
              <a
                href="#contact"
                className="text-gray-700 dark:text-gray-300 hover:text-vriksha-green dark:hover:text-green-400 transition-colors"
              >
                {t("contact")}
              </a>
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="text-gray-700 dark:text-gray-300 hover:text-vriksha-green dark:hover:text-green-400 transition-colors"
                >
                  {t("dashboard")}
                </Link>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-green-200 dark:border-green-800">
                  <Link href="/auth/signin">
                    <Button variant="ghost" className="w-full justify-start">
                      {t("signIn")}
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full bg-vriksha-green hover:bg-vriksha-green/90">{t("signUp")}</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.nav>
        )}
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.header>
  )
}
