"use client"

import React from "react"
import { motion } from "framer-motion"
import { ParticleBackground } from "@/components/particle-background"
import { Plant3D } from "@/components/plant-3d"
import { Card } from "@/components/ui/card"
import { Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    name: "Abhishek Tiwari",
    role: "Leader / MLOps / AI / Dev",
    github: "https://github.com/abhishek",
    linkedin: "https://linkedin.com/in/abhishek",
    email: "mailto:abhishek@example.com"
  },
  {
    name: "Adit Katiyar",
    role: "Full Stack Developer",
    github: "https://github.com/adit",
    linkedin: "https://linkedin.com/in/adit",
    email: "mailto:adit@example.com"
  },
  {
    name: "Shreya Shukla",
    role: "UI/UX Designer",
    github: "https://github.com/shreya",
    linkedin: "https://linkedin.com/in/shreya",
    email: "mailto:shreya@example.com"
  },
  {
    name: "Shreyansh Sinha",
    role: "Frontend Developer",
    github: "https://github.com/shreyansh",
    linkedin: "https://linkedin.com/in/shreyansh",
    email: "mailto:shreyansh@example.com"
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-green-950 dark:via-gray-900 dark:to-amber-950 relative overflow-hidden pt-24">
      <ParticleBackground />
      <motion.div
        className="fixed top-20 right-20 w-36 h-36 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl"
        animate={{ x: [0, -120, 0], y: [0, 80, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-20 left-20 w-44 h-44 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
        animate={{ x: [0, 100, 0], y: [0, -70, 0], scale: [1, 0.7, 1] }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
      />
      <div className="hidden md:block fixed bottom-0 right-0 w-[350px] h-[350px] z-10 pointer-events-none opacity-80">
        <Plant3D />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-12 relative z-20"
      >
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-8 px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm transition-colors"
            >
              Back to Home
            </motion.button>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              About Vriksha
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Vriksha is your premier destination for curated plants, bringing nature's beauty into your space. 
              Our platform offers a carefully selected collection of plants, expert care guidance, and a seamless 
              shopping experience to help you create your perfect green sanctuary.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * (index + 3) }}
                >
                  <Card className="p-6 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 hover:bg-white/100 dark:hover:bg-gray-900/100 transition-all">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">{member.role}</p>
                        <div className="flex space-x-4">
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                          >
                            <Github className="h-6 w-6" />
                          </motion.a>
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                          >
                            <Linkedin className="h-6 w-6" />
                          </motion.a>
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            href={member.email}
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                          >
                            <Mail className="h-6 w-6" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
} 