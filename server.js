import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Root route (browser test साठी)
app.get("/", (req, res) => {
  res.send("🚀 FIR Backend चालू आहे");
});

// ✅ FIR Generate API
app.post("/generate-fir", async (req, res) => {
  const { complaint } = req.body;

  if (!complaint) {
    return res.status(400).json({ error: "Complaint required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "Convert complaint into proper FIR format in Marathi with headings"
          },
          {
            role: "user",
            content: complaint
          }
        ]
      })
    });

    const data = await response.json();

    // Debug log (Render logs मध्ये दिसेल)
    console.log("OpenAI Response:", data);

    if (!data.choices) {
      return res.status(500).json({ error: "AI response error" });
    }

    res.json({
      fir: data.choices[0].message.content
    });

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server error आला ❌" });
  }
});

// ✅ IMPORTANT: PORT fix (Render साठी)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("✅ Server running on port " + PORT);
});
