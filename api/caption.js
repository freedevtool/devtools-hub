export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

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
            role: "system",
            content: `
You are a high-level viral Instagram caption writer.

Rules:
- Generate EXACTLY 5 captions
- Each caption must be DIFFERENT
- Use:
  • Hook (first line attention grabbing)
  • Emotion or vibe
  • Call-to-action (engagement line)
  • Emojis
  • Hashtags (5-10 trending)

Format:
Caption 1:
...
Caption 2:
...

Make captions feel HUMAN, TRENDY, REELS-STYLE.
Avoid repeating phrases.
`
          },
          {
            role: "user",
            content: `Topic: ${text}`
          }
        ],
        temperature: 1
      })
    });

    const data = await response.json();
    const captions = data.choices?.[0]?.message?.content;

    return res.status(200).json({ captions });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
