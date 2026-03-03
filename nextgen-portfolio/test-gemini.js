// Test Gemini API Key
// Run: node test-gemini.js

const GEMINI_API_KEY = "AIzaSyDRpNv-B8gnyMdJPWuGApa7-AcSXE6tJik";

async function testGemini() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Say hello in one sentence"
            }]
          }]
        })
      }
    );

    console.log("Status:", response.status);
    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));

    if (data.candidates) {
      console.log("\n✅ API KEY WORKS!");
      console.log("Reply:", data.candidates[0].content.parts[0].text);
    } else {
      console.log("\n❌ API KEY FAILED");
      console.log("Error:", data.error);
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

testGemini();
