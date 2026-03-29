const API_URL = "https://ai-tools-backend-wkam.onrender.com";

async function generateCaption() {
  const input = document.getElementById("captionInput").value;

  if (!input) {
    document.getElementById("captionOutput").innerText = "Enter text!";
    return;
  }

  document.getElementById("captionOutput").innerText = "Loading...";

  try {
    const res = await fetch(`${API_URL}/caption`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: input })
    });

    const data = await res.json();

    document.getElementById("captionOutput").innerText =
      data.result || "No response";

  } catch (err) {
    document.getElementById("captionOutput").innerText =
      "Error connecting API";
  }
}


async function paraphraseText() {
  const input = document.getElementById("paraInput").value;

  if (!input) {
    document.getElementById("paraOutput").innerText = "Enter text!";
    return;
  }

  document.getElementById("paraOutput").innerText = "Loading...";

  try {
    const res = await fetch(`${API_URL}/paraphrase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();

    document.getElementById("paraOutput").innerText =
      data.result || "No response";

  } catch (err) {
    document.getElementById("paraOutput").innerText =
      "Error connecting API";
  }
}
