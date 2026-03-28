async function generateCaption() {
  const input = document.getElementById("captionInput").value;

  const res = await fetch("/api/caption", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ prompt: input })
  });

  const data = await res.json();

  document.getElementById("captionOutput").innerText =
    data.choices[0].message.content;
}
async function paraphraseText() {
  const input = document.getElementById("paraInput").value;

  const res = await fetch("/api/paraphrase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: input })
  });

  const data = await res.json();

  document.getElementById("paraOutput").innerText = data.result;
    }
