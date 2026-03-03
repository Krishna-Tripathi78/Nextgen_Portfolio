import { AI_KNOWLEDGE } from "@/lib/ai-knowledge";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return Response.json({ error: "API key not configured" }, { status: 500 });
    }

    // Fetch live portfolio data
    const portfolioRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/portfolio-data`);
    const { knowledge } = await portfolioRes.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: knowledge },
          { role: "user", content: message }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API error:", errorData);
      return Response.json({ error: "AI service unavailable" }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return Response.json({ reply });
  } catch (error: any) {
    console.error("AI Twin error:", error.message);
    return Response.json({ error: "Failed to get response" }, { status: 500 });
  }
}
