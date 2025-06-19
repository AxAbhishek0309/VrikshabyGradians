"use client"

import React, { useState } from "react";
import { useCart } from "../../contexts/cart-context";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { ParticleBackground } from "../../components/particle-background";
import { Plant3D } from "../../components/plant-3d";
import { motion } from "framer-motion";

const CheckoutPage = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-green-950 dark:via-gray-900 dark:to-amber-950 relative overflow-hidden flex items-center justify-center">
      <ParticleBackground />
      {/* Decorative 3D Plant (bottom right, floating) */}
      <div className="hidden md:block fixed bottom-0 right-0 w-[350px] h-[350px] z-10 pointer-events-none opacity-80">
        <Plant3D />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 w-full max-w-4xl mx-auto mt-12 p-6 bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-2xl backdrop-blur-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-vriksha-green">Cart & Checkout</h1>
        {orderPlaced ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto mt-16 p-8 bg-white/80 dark:bg-gray-800/80 rounded shadow text-center"
          >
            <h2 className="text-2xl font-bold mb-4 text-vriksha-green">Thank you for your order!</h2>
            <p>We have received your order and will process it soon.</p>
          </motion.div>
        ) : items.length === 0 ? (
          <p className="text-center text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Cart Items */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="md:col-span-2"
              >
                <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-4 p-4 border rounded bg-white/80 dark:bg-gray-800/80 shadow"
                    >
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                        <span className="px-2">{item.quantity}</span>
                        <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                      </div>
                      <div className="w-20 text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                      <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Summary & Proceed Button */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span>Total Items:</span>
                    <span>{getTotalItems()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                {!showCheckout && (
                  <Button className="w-full mt-4" onClick={() => setShowCheckout(true)}>
                    Proceed to Checkout
                  </Button>
                )}
              </motion.div>
            </div>

            {/* Checkout Form (shown after clicking Proceed) */}
            {showCheckout && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mt-10"
              >
                <Separator className="my-4" />
                <h2 className="text-xl font-semibold mb-4">Checkout</h2>
                <form onSubmit={handlePlaceOrder} className="space-y-3 max-w-md mx-auto">
                  <Input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="address"
                    placeholder="Shipping Address"
                    value={form.address}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <Button type="submit" className="w-full mt-2">
                    Place Order
                  </Button>
                </form>
              </motion.div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default CheckoutPage; 