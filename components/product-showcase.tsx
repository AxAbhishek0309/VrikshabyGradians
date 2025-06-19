"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"

const products = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    price: 45,
    originalPrice: 60,
    image: "https://images.unsplash.com/photo-1545239705-1564e58b9e4a?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 124,
    category: "Indoor Plants",
    isNew: true,
    isBestseller: false,
    description:
      "The Swiss Cheese Plant is perfect for beginners. Known for its distinctive split leaves and easy care requirements.",
    careLevel: "Easy",
    lightRequirement: "Bright, indirect light",
    wateringFrequency: "Weekly",
  },
  {
    id: 2,
    name: "Fiddle Leaf Fig",
    price: 85,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1586093248292-4e6636b4e3b8?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 89,
    category: "Indoor Plants",
    isNew: false,
    isBestseller: true,
    description: "A stunning statement plant with large, violin-shaped leaves. Perfect for bright corners.",
    careLevel: "Moderate",
    lightRequirement: "Bright, indirect light",
    wateringFrequency: "Bi-weekly",
  },
  {
    id: 3,
    name: "Snake Plant",
    price: 25,
    originalPrice: 35,
    image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 156,
    category: "Low Maintenance",
    isNew: false,
    isBestseller: false,
    description: "Nearly indestructible plant that thrives on neglect. Perfect for beginners and low-light spaces.",
    careLevel: "Very Easy",
    lightRequirement: "Low to bright light",
    wateringFrequency: "Monthly",
  },
  {
    id: 4,
    name: "Peace Lily",
    price: 35,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 78,
    category: "Flowering Plants",
    isNew: true,
    isBestseller: false,
    description: "Elegant flowering plant that purifies air and blooms beautiful white flowers.",
    careLevel: "Easy",
    lightRequirement: "Medium to bright light",
    wateringFrequency: "Weekly",
  },
  {
    id: 5,
    name: "Rubber Plant",
    price: 55,
    originalPrice: 70,
    image: "https://images.unsplash.com/photo-1509423350716-97f2360af2e4?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 92,
    category: "Indoor Plants",
    isNew: false,
    isBestseller: true,
    description: "Glossy, dark green leaves make this plant a stunning addition to any room.",
    careLevel: "Easy",
    lightRequirement: "Bright, indirect light",
    wateringFrequency: "Weekly",
  },
  {
    id: 6,
    name: "Pothos Golden",
    price: 20,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 203,
    category: "Hanging Plants",
    isNew: false,
    isBestseller: false,
    description: "Trailing vine with heart-shaped leaves. Perfect for hanging baskets or shelves.",
    careLevel: "Very Easy",
    lightRequirement: "Low to bright light",
    wateringFrequency: "Weekly",
  },
]

export function ProductShowcase() {
  const { t } = useLanguage()
  const { addToCart } = useCart()
  const [favorites, setFavorites] = useState<number[]>([])
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null)

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
    toast({
      title: favorites.includes(productId) ? "Removed from favorites" : "Added to favorites",
      description: favorites.includes(productId) ? "Item removed from your wishlist" : "Item added to your wishlist",
    })
  }

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const handleBuyNow = (product: (typeof products)[0]) => {
    handleAddToCart(product)
    // Navigate to checkout (you can implement routing here)
    toast({
      title: "Redirecting to checkout",
      description: "Taking you to complete your purchase",
    })
  }

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">Featured Plants</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Handpicked plants that bring life and beauty to your space
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800">
                <CardContent className="p-0">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && <Badge className="bg-green-500 hover:bg-green-600 text-white">New</Badge>}
                      {product.isBestseller && (
                        <Badge className="bg-amber-500 hover:bg-amber-600 text-white">Bestseller</Badge>
                      )}
                      {product.originalPrice && <Badge className="bg-red-500 hover:bg-red-600 text-white">Sale</Badge>}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="bg-white/90 hover:bg-white shadow-lg"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                          }`}
                        />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white shadow-lg"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <Eye className="h-4 w-4 text-gray-600" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{product.name}</DialogTitle>
                          </DialogHeader>
                          {selectedProduct && (
                            <div className="grid md:grid-cols-2 gap-6">
                              <img
                                src={selectedProduct.image || "/placeholder.svg"}
                                alt={selectedProduct.name}
                                className="w-full h-64 object-cover rounded-lg"
                              />
                              <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-300">{selectedProduct.description}</p>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="font-medium">Care Level:</span>
                                    <span>{selectedProduct.careLevel}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="font-medium">Light:</span>
                                    <span>{selectedProduct.lightRequirement}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="font-medium">Watering:</span>
                                    <span>{selectedProduct.wateringFrequency}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl font-bold text-vriksha-green">
                                    ${selectedProduct.price}
                                  </span>
                                  {selectedProduct.originalPrice && (
                                    <span className="text-lg text-gray-500 line-through">
                                      ${selectedProduct.originalPrice}
                                    </span>
                                  )}
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleAddToCart(selectedProduct)}
                                    className="flex-1 bg-vriksha-green hover:bg-vriksha-green/90"
                                  >
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    {t("addToCart")}
                                  </Button>
                                  <Button
                                    onClick={() => handleBuyNow(selectedProduct)}
                                    variant="outline"
                                    className="flex-1 border-vriksha-green text-vriksha-green hover:bg-vriksha-green hover:text-white"
                                  >
                                    {t("buyNow")}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>

                    {/* Quick Add to Cart */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-vriksha-green hover:bg-vriksha-green/90 text-white"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {t("addToCart")}
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-gray-500">({product.reviews})</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-vriksha-green">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <Button
                        onClick={() => handleBuyNow(product)}
                        variant="outline"
                        size="sm"
                        className="border-vriksha-green text-vriksha-green hover:bg-vriksha-green hover:text-white"
                      >
                        {t("buyNow")}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-vriksha-green text-vriksha-green hover:bg-vriksha-green hover:text-white px-8 py-6 text-lg rounded-full"
            onClick={() => toast({ title: "Coming Soon", description: "Full catalog page is under development" })}
          >
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
