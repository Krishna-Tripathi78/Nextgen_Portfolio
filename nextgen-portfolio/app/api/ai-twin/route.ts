export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Validate messages input
    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: "Messages array is required" }, { status: 400 });
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

    // Fetch live portfolio data for the system prompt
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
            ...messages.slice(-10), // Keep last 10 messages for context
          ],
          max_tokens: 512, // Increased for longer context
          temperature: 0.7,
          stream: true, // Enable streaming
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

    // Create a ReadableStream to pipe the Groq response to the client
    const stream = new ReadableStream({
      async start(controller) {
        if (!response.body) {
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.trim() === "" || line.includes("[DONE]")) continue;
              if (line.startsWith("data: ")) {
                try {
                  const data = JSON.parse(line.slice(6));
                  const content = data.choices?.[0]?.delta?.content || "";
                  if (content) {
                    controller.enqueue(encoder.encode(content));
                  }
                } catch (e) {
                  // Silent catch for incomplete JSON chunks
                }
              }
            }
          }
        } catch (error) {
          controller.error(error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive"
        }
    });
  } catch (error) {
    console.error(
      "AI Twin error:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return Response.json({ error: "Failed to get response" }, { status: 500 });
  }
}
