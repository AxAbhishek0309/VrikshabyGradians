"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, Send, X, Bot, User, Leaf, Sparkles, Zap, Camera, ImageIcon, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  image?: string
}

export function ChatWidget() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your Vriksha plant expert! 🌱 I can analyze plant photos and provide expert care advice. Upload a photo of your plant or ask me anything about plant care, watering, lighting, or our collection. How can I help you grow today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [assistantMode, setAssistantMode] = useState<"ai" | "expert" | "error">("ai")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        setSelectedImage(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSendMessage = async () => {
    if ((!inputValue.trim() && !selectedImage) || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue || "Please analyze this plant image",
      isBot: false,
      timestamp: new Date(),
      image: selectedImage || undefined,
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    const currentImage = selectedImage
    setInputValue("")
    setSelectedImage(null)
    setIsLoading(true)

    try {
      const botResponse = await generateAIResponse(currentInput || "Please analyze this plant image", currentImage)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.message,
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])

      // Update assistant mode based on response
      if (botResponse.status === "ai") {
        setAssistantMode("ai")
      } else if (botResponse.status === "simulated") {
        setAssistantMode("expert")
      } else {
        setAssistantMode("error")
      }
    } catch (error) {
      console.error("Error generating response:", error)
      setAssistantMode("error")

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm still here to help! I have extensive plant knowledge built-in. Try asking about watering, lighting, plant recommendations, or troubleshooting plant problems! 🌿\n\nFor photo analysis, contact our support:\n📞 +91 8542986911\n📧 auxinbiotek1986@gmail.com",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = async (
    userInput: string,
    image?: string | null,
  ): Promise<{ message: string; model: string; status: string }> => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
          image: image,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return {
        message: data.message,
        model: data.model || "Plant Expert",
        status: data.status || "simulated",
      }
    } catch (error) {
      console.error("AI response error:", error)
      throw error
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getStatusBadge = () => {
    switch (assistantMode) {
      case "ai":
        return (
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            <Zap className="h-3 w-3 mr-1" />
            AI Vision
          </Badge>
        )
      case "expert":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Leaf className="h-3 w-3 mr-1" />
            Plant Expert
          </Badge>
        )
      case "error":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Bot className="h-3 w-3 mr-1" />
            Smart Mode
          </Badge>
        )
    }
  }

  // Enhanced quick suggestion buttons
  const quickSuggestions = [
    "📸 Upload plant photo for analysis",
    "💧 How often should I water?",
    "🌱 Best beginner plants?",
    "🟡 My plant has yellow leaves",
    "☀️ Low light recommendations",
    "📞 Contact support team",
  ]

  const handleQuickSuggestion = (suggestion: string) => {
    if (suggestion.includes("Upload plant photo")) {
      fileInputRef.current?.click()
    } else if (suggestion.includes("Contact support")) {
      setInputValue("I need to contact support")
    } else {
      setInputValue(suggestion.replace(/[📸💧🌱🟡☀️📞]\s*/u, ""))
    }
  }

  return (
    <>
      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-vriksha-green to-green-600 hover:from-vriksha-green/90 hover:to-green-600/90 text-white shadow-2xl relative group"
          size="icon"
        >
          {/* Enhanced pulse animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-vriksha-green to-green-600 animate-ping opacity-20 group-hover:opacity-30" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-green-400 to-green-500 animate-pulse opacity-30" />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)]"
          >
            <Card className="shadow-2xl border-0 overflow-hidden backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-vriksha-green via-green-600 to-green-700 text-white p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Camera className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Vriksha AI Plant Expert</h3>
                      <p className="text-sm text-white/80">Photo analysis & plant care</p>
                    </div>
                  </div>
                  {getStatusBadge()}
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-green-50/50 via-white to-green-50/30 dark:from-green-950/50 dark:via-gray-900 dark:to-green-950/30">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`flex items-start space-x-2 max-w-[85%] ${message.isBot ? "" : "flex-row-reverse space-x-reverse"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.isBot
                              ? "bg-gradient-to-br from-vriksha-green to-green-600 text-white shadow-sm"
                              : "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm"
                          }`}
                        >
                          {message.isBot ? (
                            assistantMode === "ai" ? (
                              <Sparkles className="h-4 w-4" />
                            ) : (
                              <Leaf className="h-4 w-4" />
                            )
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </div>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            message.isBot
                              ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm border border-green-100 dark:border-green-800"
                              : "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-sm"
                          }`}
                        >
                          {message.image && (
                            <img
                              src={message.image || "/placeholder.svg"}
                              alt="Plant"
                              className="w-full max-w-48 h-32 object-cover rounded-lg mb-2"
                            />
                          )}
                          <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-vriksha-green to-green-600 rounded-full flex items-center justify-center shadow-sm">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-sm border border-green-100 dark:border-green-800">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-vriksha-green rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-vriksha-green rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-vriksha-green rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Enhanced quick suggestions */}
                  {messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-3"
                    >
                      <p className="text-xs text-gray-500 text-center font-medium">💡 Try these options:</p>
                      <div className="grid grid-cols-1 gap-2">
                        {quickSuggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-9 justify-start text-left border-green-200 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                            onClick={() => handleQuickSuggestion(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>

                      {/* Contact info */}
                      <div className="bg-green-50 dark:bg-green-950 rounded-lg p-3 mt-3">
                        <p className="text-xs font-medium text-green-800 dark:text-green-200 mb-2">Direct Support:</p>
                        <div className="space-y-1">
                          <div className="flex items-center text-xs text-green-700 dark:text-green-300">
                            <Phone className="h-3 w-3 mr-2" />
                            +91 8542986911
                          </div>
                          <div className="flex items-center text-xs text-green-700 dark:text-green-300">
                            <Mail className="h-3 w-3 mr-2" />
                            auxinbiotek1986@gmail.com
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Enhanced Input with Image Upload */}
                <div className="p-4 border-t bg-white dark:bg-gray-800">
                  {/* Image Preview */}
                  {selectedImage && (
                    <div className="mb-3 relative">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Selected plant"
                        className="w-20 h-20 object-cover rounded-lg border-2 border-green-200"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                        onClick={() => setSelectedImage(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-green-200 hover:bg-green-50"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isLoading}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        selectedImage ? "Describe your plant concern..." : "Ask about plant care or upload photo..."
                      }
                      className="flex-1 border-green-200 focus:border-green-400 focus:ring-green-400"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={(!inputValue.trim() && !selectedImage) || isLoading}
                      className="bg-gradient-to-r from-vriksha-green to-green-600 hover:from-vriksha-green/90 hover:to-green-600/90 shadow-sm"
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    📸 Upload photos • 🤖 AI analysis • 🌱 Expert advice • 📞 +91 8542986911
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
