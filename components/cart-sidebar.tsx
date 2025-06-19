"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart()
  const router = useRouter();

  const handleCheckout = () => {
    toast({
      title: "Proceeding to Checkout",
      description: "Redirecting to secure payment page...",
    });
    onClose();
    router.push("/checkout");
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-96 max-w-[90vw] bg-white dark:bg-gray-900 z-50 shadow-2xl"
          >
            <Card className="h-full border-0 rounded-none">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5" />
                    Shopping Cart ({items.length})
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col h-full p-0">
                {items.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-center p-8">
                    <div>
                      <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
                      <p className="text-gray-500 mb-4">Add some beautiful plants to get started!</p>
                      <Button onClick={onClose} className="bg-vriksha-green hover:bg-vriksha-green/90">
                        Continue Shopping
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                        >
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                            <p className="text-vriksha-green font-bold">${item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Cart Footer */}
                    <div className="border-t p-4 space-y-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-vriksha-green">${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="space-y-2">
                        <Button onClick={handleCheckout} className="w-full bg-vriksha-green hover:bg-vriksha-green/90">
                          Proceed to Checkout
                        </Button>
                        <Button variant="outline" onClick={clearCart} className="w-full">
                          Clear Cart
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
