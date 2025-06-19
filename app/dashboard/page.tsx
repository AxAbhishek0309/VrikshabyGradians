"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { User, ShoppingBag, Heart, Bell, Calendar, TrendingUp, Package, Leaf, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const { user, signOut, isAuthenticated, isLoading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/signin")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-green-950 dark:via-gray-900 dark:to-amber-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-vriksha-green border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect via useEffect
  }

  const handleSignOut = () => {
    signOut()
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account.",
    })
  }

  const stats = [
    { title: "Total Orders", value: "12", icon: ShoppingBag, color: "text-blue-600" },
    { title: "Plants Owned", value: "8", icon: Leaf, color: "text-green-600" },
    { title: "Wishlist Items", value: "5", icon: Heart, color: "text-red-600" },
    { title: "Care Reminders", value: "3", icon: Bell, color: "text-yellow-600" },
  ]

  const recentOrders = [
    { id: "ORD-001", plant: "Monstera Deliciosa", date: "2024-01-15", status: "Delivered", amount: "$45" },
    { id: "ORD-002", plant: "Snake Plant", date: "2024-01-10", status: "Shipped", amount: "$25" },
    { id: "ORD-003", plant: "Peace Lily", date: "2024-01-05", status: "Processing", amount: "$35" },
  ]

  const careReminders = [
    { plant: "Fiddle Leaf Fig", task: "Water", due: "Today", urgent: true },
    { plant: "Rubber Plant", task: "Fertilize", due: "Tomorrow", urgent: false },
    { plant: "Pothos", task: "Prune", due: "In 3 days", urgent: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-green-950 dark:via-gray-900 dark:to-amber-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Leaf className="h-8 w-8 text-vriksha-green" />
                <span className="text-2xl font-bold text-vriksha-green">Vriksha</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {t("dashboard")}
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" onClick={handleSignOut} className="text-red-600 hover:text-red-700">
                <LogOut className="h-5 w-5 mr-2" />
                {t("signOut")}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="bg-gradient-to-r from-vriksha-green to-green-600 text-white border-0">
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20 border-4 border-white/20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-white/20 text-white text-xl">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{t("welcomeToDashboard")}</h1>
                  <p className="text-xl text-white/90">{user.name}</p>
                  <p className="text-white/70">{user.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center ${stat.color}`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-vriksha-green" />
                  {t("myOrders")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{order.plant}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {order.id} • {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">{order.amount}</p>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : order.status === "Shipped"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Care Reminders */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-vriksha-green" />
                  {t("careReminders")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {careReminders.map((reminder, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${reminder.urgent ? "bg-red-500" : "bg-green-500"}`} />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{reminder.plant}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{reminder.task}</p>
                        </div>
                      </div>
                      <Badge variant={reminder.urgent ? "destructive" : "secondary"}>{reminder.due}</Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Manage Reminders
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col space-y-2" onClick={() => router.push("/")}>
                  <ShoppingBag className="h-6 w-6" />
                  <span>Browse Plants</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <User className="h-6 w-6" />
                  <span>{t("myProfile")}</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col space-y-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>Plant Care Tips</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
