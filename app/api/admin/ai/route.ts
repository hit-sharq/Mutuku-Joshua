import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ""
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash"

const SYSTEM_PROMPT = `You are an AI assistant for the J·M admin panel. You help the administrator manage their website content, answer questions about the admin features, and provide guidance on using the system. Be concise, helpful, and professional. Respond in the same language the user writes in.`

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const adminIds = process.env.ADMIN_USER_IDS?.split(",") || []
    if (!adminIds.includes(userId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { message } = body as { message: string }

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json(
        { reply: "AI assistant is not configured. Please set the GEMINI_API_KEY environment variable." },
        { status: 200 }
      )
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `${SYSTEM_PROMPT}\n\nUser question: ${message}` },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 2048,
          },
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Gemini API error:", errorData)
      return NextResponse.json(
        { reply: "I encountered an error while processing your request. Please try again." },
        { status: 200 }
      )
    }

    const data = await response.json()

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't generate a response."

    return NextResponse.json({ reply })
  } catch (error) {
    console.error("AI route error:", error)
    return NextResponse.json(
      { reply: "I encountered an unexpected error. Please try again." },
      { status: 200 }
    )
  }
}