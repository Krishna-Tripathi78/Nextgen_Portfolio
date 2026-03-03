export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Validate message input
    if (!message || typeof message !== "string") {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.length > 500) {
      return Response.json(
        { error: "Message too long (max 500 characters)" },
        { status: 400 },
      );
    }

    // Validate API key
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY environment variable is not configured");
      return Response.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    // Validate site URL
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) {
      console.error(
        "NEXT_PUBLIC_SITE_URL environment variable is not configured",
      );
      return Response.json(
        { error: "Site URL not configured" },
        { status: 500 },
      );
    }

    // Fetch live portfolio data
    const portfolioRes = await fetch(`${siteUrl}/api/portfolio-data`);

    if (!portfolioRes.ok) {
      console.error("Failed to fetch portfolio data:", portfolioRes.status);
      return Response.json(
        { error: "Failed to load portfolio data" },
        { status: 500 },
      );
    }

    const { knowledge } = await portfolioRes.json();

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: knowledge },
            { role: "user", content: message },
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API error:", errorData);
      return Response.json(
        { error: "AI service unavailable" },
        { status: 500 },
      );
    }

    const data = await response.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    return Response.json({ reply });
  } catch (error) {
    console.error(
      "AI Twin error:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return Response.json({ error: "Failed to get response" }, { status: 500 });
  }
}
