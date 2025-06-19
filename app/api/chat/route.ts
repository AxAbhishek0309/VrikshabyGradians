import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { google } from "@ai-sdk/google"

export async function POST(req: Request) {
  try {
    const { message, image } = await req.json()

    // Try Google Gemini first (supports vision)
    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      try {
        console.log("Attempting to use Google Gemini API...")
        const model = google("gemini-1.5-flash")

        let prompt = message
        let systemPrompt = getSystemPrompt()

        // If image is provided, enhance the prompt for plant analysis
        if (image) {
          systemPrompt += `\n\nIMAGE ANALYSIS EXPERTISE:
- Identify plant species, varieties, and cultivars
- Diagnose plant health issues from visual symptoms
- Assess plant care needs based on appearance
- Recommend treatments for visible problems
- Evaluate plant growth stage and maturity`

          prompt = `Please analyze this plant image and provide detailed insights about:
1. Plant identification (species/variety if possible)
2. Overall health assessment
3. Any visible problems or concerns
4. Care recommendations
5. Suggestions for improvement

User's question: ${message}`
        }

        const { text } = await generateText({
          model,
          system: systemPrompt,
          prompt: image
            ? [
                { type: "text", text: prompt },
                { type: "image", image: image },
              ]
            : prompt,
          maxTokens: 300,
          temperature: 0.7,
        })

        console.log("Google Gemini API successful")
        return Response.json({
          message: text,
          model: "Google Gemini Vision",
          status: "ai",
          hasImage: !!image,
        })
      } catch (error: any) {
        console.log("Google Gemini API failed:", error.message)
        // Continue to try OpenAI
      }
    }

    // Try OpenAI as backup (supports vision with GPT-4)
    if (process.env.OPENAI_API_KEY) {
      try {
        console.log("Attempting to use OpenAI API...")
        const model = openai(image ? "gpt-4o" : "gpt-3.5-turbo") // Use GPT-4 for vision

        let prompt = message
        let systemPrompt = getSystemPrompt()

        if (image) {
          systemPrompt += `\n\nIMAGE ANALYSIS EXPERTISE:
- Identify plant species and varieties
- Diagnose health issues from visual symptoms
- Assess care needs based on plant appearance
- Recommend treatments for problems
- Evaluate growth and development`

          prompt = `Analyze this plant image and provide:
1. Plant identification
2. Health assessment  
3. Visible problems
4. Care recommendations
5. Treatment suggestions

User's question: ${message}`
        }

        const { text } = await generateText({
          model,
          system: systemPrompt,
          prompt: image
            ? [
                { type: "text", text: prompt },
                { type: "image", image: image },
              ]
            : prompt,
          maxTokens: 300,
          temperature: 0.7,
        })

        console.log("OpenAI API successful")
        return Response.json({
          message: text,
          model: image ? "OpenAI GPT-4 Vision" : "OpenAI GPT-3.5",
          status: "ai",
          hasImage: !!image,
        })
      } catch (error: any) {
        console.log("OpenAI API failed:", error.message)
        // Continue to fallback
      }
    }

    // Fallback to simulated response
    console.log("Using simulated response as fallback")
    return Response.json({
      message: image ? getImageAnalysisResponse(message) : getSimulatedResponse(message),
      model: "Vriksha Plant Expert",
      status: "simulated",
      hasImage: !!image,
    })
  } catch (error) {
    console.error("Chat API error:", error)

    try {
      const { message, image } = await req.json()
      return Response.json({
        message: image ? getImageAnalysisResponse(message) : getSimulatedResponse(message),
        model: "Vriksha Plant Expert",
        status: "error_fallback",
        hasImage: !!image,
      })
    } catch {
      return Response.json({
        message: "I'm here to help with your plant questions! Try asking about plant care, watering, or our products.",
        model: "Vriksha Plant Expert",
        status: "error_fallback",
        hasImage: false,
      })
    }
  }
}

function getImageAnalysisResponse(userMessage: string): string {
  return `I can see you've shared a plant image! 📸 While I'd love to analyze it in detail, I'm currently running in expert mode. However, I can still help you with plant identification and care based on your description!\n\n**To get the best help:**\n• Describe what you see (leaf color, shape, size)\n• Mention any problems (yellow leaves, brown spots, drooping)\n• Tell me about your care routine (watering, lighting, location)\n\n**Common plant issues I can help diagnose:**\n• Overwatering vs underwatering symptoms\n• Light-related problems\n• Nutrient deficiencies\n• Pest identification\n• Disease symptoms\n\n**For immediate image analysis, contact our support:**\n📞 **Phone:** +91 8542986911\n📧 **Email:** auxinbiotek1986@gmail.com\n\nWhat specific concerns do you have about your plant? Describe what you're seeing and I'll provide expert guidance! 🌱`
}

function getSystemPrompt(): string {
  return `You are an expert plant care assistant for Vriksha, a premium curated plant store. You have extensive knowledge about:

🌱 PLANT CARE EXPERTISE:
- Watering schedules and techniques for different plant types
- Lighting requirements (bright indirect, low light, direct sun)
- Soil types, drainage, and repotting guidance
- Fertilizing schedules and organic options
- Humidity requirements for tropical plants
- Seasonal care adjustments (winter/summer)

🔍 PROBLEM DIAGNOSIS:
- Yellow leaves, brown spots, drooping, wilting
- Pest identification (spider mites, aphids, scale, fungus gnats)
- Root rot, overwatering, underwatering symptoms
- Light burn, nutrient deficiencies

🛍️ PRODUCT RECOMMENDATIONS:
- Beginner plants: Pothos, Snake Plant, ZZ Plant, Rubber Plant
- Statement plants: Fiddle Leaf Fig, Monstera, Bird of Paradise
- Low-light options: Snake Plant, Pothos, Peace Lily
- Air-purifying plants and their benefits

📞 SUPPORT CONTACT:
- Phone: +91 8542986911
- Email: auxinbiotek1986@gmail.com

TONE: Friendly, encouraging, and knowledgeable. Use plant emojis occasionally. Keep responses under 250 words but comprehensive. Always offer to help with follow-up questions.

STORE INFO: Vriksha offers same-day city delivery, nationwide shipping, 30-day plant guarantee, and free care guides with every purchase.`
}

function getSimulatedResponse(userInput: string): string {
  const lowerInput = userInput.toLowerCase()

  // Contact/support questions
  if (
    lowerInput.includes("contact") ||
    lowerInput.includes("support") ||
    lowerInput.includes("help") ||
    lowerInput.includes("phone") ||
    lowerInput.includes("email") ||
    lowerInput.includes("call")
  ) {
    return `Need direct support? We're here to help! 📞\n\n**CONTACT VRIKSHA SUPPORT:**\n📞 **Phone:** +91 8542986911\n📧 **Email:** auxinbiotek1986@gmail.com\n\n**SUPPORT HOURS:**\n• Monday-Saturday: 9 AM - 7 PM\n• Sunday: 10 AM - 6 PM\n\n**WE CAN HELP WITH:**\n• Plant identification from photos\n• Detailed care consultations\n• Order tracking and delivery\n• Plant health emergencies\n• Custom plant recommendations\n• Bulk orders for offices/events\n\n**CHAT SUPPORT:**\nI'm also here 24/7 for immediate plant care advice! Ask me about watering, lighting, problems, or product recommendations.\n\nHow can I assist you right now? 🌱`
  }

  // Greeting responses
  if (
    lowerInput.includes("hello") ||
    lowerInput.includes("hi") ||
    lowerInput.includes("hey") ||
    lowerInput.includes("start") ||
    lowerInput.length < 10
  ) {
    return "Hello! Welcome to Vriksha! 🌱 I'm your plant care expert, ready to help you create a thriving green space. Whether you're a complete beginner or experienced plant parent, I can assist with:\n\n• Plant care tips & schedules\n• Problem diagnosis & solutions\n• Product recommendations\n• Repotting & fertilizing guidance\n\n**Need direct support?**\n📞 Phone: +91 8542986911\n📧 Email: auxinbiotek1986@gmail.com\n\nWhat would you like to know about plants today?"
  }

  // Watering questions
  if (
    lowerInput.includes("water") ||
    lowerInput.includes("drink") ||
    lowerInput.includes("thirsty") ||
    lowerInput.includes("how often")
  ) {
    return "Great watering question! 💧 Here's the golden rule:\n\n**Check the soil first** - stick your finger 1-2 inches deep. If dry, it's time to water!\n\n**General schedule:**\n• Most houseplants: Every 7-10 days\n• Succulents: Every 2-3 weeks\n• Tropical plants: 2-3 times per week\n\n**Pro tips:**\n• Water deeply until it drains out the bottom\n• Empty saucers after 30 minutes\n• Overwatering kills more plants than underwatering!\n\nWhat specific plant are you caring for? I can give you exact guidance! 🌿\n\n**Need expert consultation?** Call us: +91 8542986911"
  }

  // Light questions
  if (
    lowerInput.includes("light") ||
    lowerInput.includes("sun") ||
    lowerInput.includes("bright") ||
    lowerInput.includes("dark") ||
    lowerInput.includes("window")
  ) {
    return "Lighting is crucial for happy plants! ☀️\n\n**Bright Indirect Light** (most houseplants):\n• Near a window but not in direct sun rays\n• East or north-facing windows are perfect\n\n**Low Light Champions:**\n• Snake Plant, Pothos, ZZ Plant, Peace Lily\n• Can handle darker corners\n\n**Bright Light Lovers:**\n• Fiddle Leaf Fig, Rubber Plant, Monstera\n• Need those bright spots!\n\n**Warning signs:**\n• Leggy growth = too little light\n• Scorched leaves = too much direct sun\n\nWhere are you planning to place your plant? I can recommend the perfect match! 🪟"
  }

  // Default comprehensive response
  return "I'm your Vriksha plant expert, ready to help with any plant questions! 🌿\n\n**I CAN HELP WITH:**\n• 💧 Watering schedules & techniques\n• ☀️ Lighting requirements & placement\n• 🌱 Plant recommendations for any space\n• 🔍 Problem diagnosis & solutions\n• 🪴 Repotting & fertilizing guidance\n• 🐛 Pest identification & treatment\n\n**NEED DIRECT SUPPORT?**\n📞 **Phone:** +91 8542986911\n📧 **Email:** auxinbiotek1986@gmail.com\n\n**OUR COLLECTION:**\n• Beginner-friendly: Pothos ($20), Snake Plant ($25)\n• Statement pieces: Fiddle Leaf Fig ($85), Monstera ($45)\n\nWhat specific plant topic interests you most today? 🌱"
}
