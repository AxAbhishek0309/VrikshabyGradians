"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Plant3D } from "@/components/plant-3d"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              {t("heroTitle")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
            >
              {t("heroSubtitle")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              size="lg"
              className="bg-vriksha-green hover:bg-vriksha-green/90 text-white px-8 py-6 text-lg rounded-full group"
              onClick={() => {
                document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {t("shopNow")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-vriksha-green text-vriksha-green hover:bg-vriksha-green hover:text-white px-8 py-6 text-lg rounded-full group"
              onClick={() => {
                document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <Play className="mr-2 h-5 w-5" />
              {t("exploreCategories")}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-8 pt-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-vriksha-green">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Plant Varieties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-vriksha-green">10k+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-vriksha-green">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction Rate</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Content - 3D Plant */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[600px] lg:h-[700px]"
        >
          <Plant3D />

          {/* Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute top-20 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-green-100 dark:border-green-800"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                🌱
              </div>
              <div>
                <div className="font-semibold text-sm">Free Care Guide</div>
                <div className="text-xs text-gray-500">With every purchase</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-32 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-green-100 dark:border-green-800"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                🚚
              </div>
              <div>
                <div className="font-semibold text-sm">Fast Delivery</div>
                <div className="text-xs text-gray-500">Same day in city</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
