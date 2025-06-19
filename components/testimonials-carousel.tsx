"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 5,
    text: "Absolutely love my plants from Vriksha! The quality is exceptional and they arrived in perfect condition. My home feels so much more alive now.",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=80&h=80&facepad=2&q=80",
    purchase: "Monstera Deliciosa",
  },
  {
    id: 2,
    name: "Raj Patel",
    location: "Mumbai, India",
    rating: 5,
    text: "वृक्षा से मिले पौधे बहुत ही बेहतरीन हैं। घर में हरियाली आ गई है और हवा भी साफ लगती है। बहुत खुश हूं!",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&w=80&h=80&facepad=2&q=80",
    purchase: "Snake Plant Collection",
  },
  {
    id: 3,
    name: "Maria Garcia",
    location: "Barcelona, Spain",
    rating: 5,
    text: "Las plantas llegaron perfectas y el servicio al cliente es excepcional. Definitivamente volveré a comprar aquí.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=80&h=80&facepad=2&q=80",
    purchase: "Peace Lily",
  },
  {
    id: 4,
    name: "David Chen",
    location: "Toronto, Canada",
    rating: 5,
    text: "The care instructions were so helpful! My plants are thriving and I've learned so much about plant care. Highly recommend Vriksha.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=80&h=80&facepad=2&q=80",
    purchase: "Fiddle Leaf Fig",
  },
  {
    id: 5,
    name: "Emma Wilson",
    location: "London, UK",
    rating: 5,
    text: "Fast delivery, beautiful packaging, and healthy plants. The whole experience was delightful from start to finish.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=80&h=80&facepad=2&q=80",
    purchase: "Pothos Collection",
  },
]

export function TestimonialsCarousel() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">{t("testimonialTitle")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real stories from our happy plant parents around the world
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-white dark:from-green-950 dark:to-gray-900">
                  <CardContent className="p-12 text-center">
                    {/* Stars */}
                    <div className="flex justify-center mb-6">
                      {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed font-light italic">
                      "{testimonials[currentIndex].text}"
                    </blockquote>

                    {/* Customer Info */}
                    <div className="flex items-center justify-center space-x-4">
                      <img
                        src={testimonials[currentIndex].image || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="text-left">
                        <div className="font-bold text-lg text-gray-900 dark:text-white">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">{testimonials[currentIndex].location}</div>
                        <div className="text-sm text-vriksha-green font-medium">
                          Purchased: {testimonials[currentIndex].purchase}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-vriksha-green scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
