import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-fir", async (req, res) => {
  const { complaint } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Convert complaint into FIR in Marathi" },
        { role: "user", content: complaint }
      ]
    })
  });

  const data = await response.json();
  res.json({ fir: data.choices[0].message.content });
});

app.listen(3000, () => console.log("Server running"));