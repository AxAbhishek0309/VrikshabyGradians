"use client"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCategories } from "@/components/featured-categories"
import { ProductShowcase } from "@/components/product-showcase"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"
import { ChatWidget } from "@/components/chat-widget"
import { ParticleBackground } from "@/components/particle-background"
import { SettingsPanel } from "@/components/settings-panel"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-green-950 dark:via-gray-900 dark:to-amber-950 relative overflow-hidden">
      <ParticleBackground />
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <ProductShowcase />
        <TestimonialsCarousel />
        <NewsletterSection />
      </main>
      <Footer />
      <ChatWidget />
      <SettingsPanel />
    </div>
  )
}
