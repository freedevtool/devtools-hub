export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { text } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `Generate 5 viral captions with emojis and hashtags for: ${text}`
          }
        ]
      })
    });

const data = await response.json();

    res.status(200).json({
      captions: data.choices?.[0]?.message?.content || "No captions"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
