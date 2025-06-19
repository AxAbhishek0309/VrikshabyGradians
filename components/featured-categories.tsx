"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { toast } from "@/hooks/use-toast"

const categories = [
  {
    id: "indoor",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
    icon: "🏠",
    gradient: "from-green-400 to-emerald-600",
  },
  {
    id: "rare",
    image: "https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=400&h=300&fit=crop",
    icon: "🌺",
    gradient: "from-purple-400 to-pink-600",
  },
  {
    id: "gifts",
    image: "https://images.unsplash.com/photo-1545239705-1564e58b9e4a?w=400&h=300&fit=crop",
    icon: "🎁",
    gradient: "from-amber-400 to-orange-600",
  },
  {
    id: "accessories",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop",
    icon: "🪴",
    gradient: "from-blue-400 to-cyan-600",
  },
]

export function FeaturedCategories() {
  const { t } = useLanguage()

  const getCategoryName = (id: string) => {
    const names = {
      indoor: t("indoorPlants"),
      rare: t("rarePlants"),
      gifts: t("gifts"),
      accessories: t("accessories"),
    }
    return names[id as keyof typeof names]
  }

  const handleCategoryClick = (categoryId: string) => {
    toast({
      title: "Category Selected",
      description: `Browsing ${getCategoryName(categoryId)} - Full catalog coming soon!`,
    })
  }

  return (
    <section id="categories" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our carefully curated collection of plants for every space and occasion
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-0 relative">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={getCategoryName(category.id)}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`} />
                  <div className="relative z-10 p-8 text-center text-white">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{getCategoryName(category.id)}</h3>
                    <p className="text-white/80 mb-6">Premium quality plants for your needs</p>
                    <Button
                      variant="secondary"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30 group-hover:scale-105 transition-transform duration-300"
                    >
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
