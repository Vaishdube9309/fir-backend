import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Smart Hybrid FIR Backend चालू आहे (India Time Enabled)");
});

// ✅ HYBRID SMART FIR GENERATOR
app.post("/generate-fir", (req, res) => {
  const { complaint } = req.body;

  if (!complaint) {
    return res.status(400).json({ error: "Complaint required" });
  }

  let crimeType = "सामान्य तक्रार";
  let section = "N/A";
  let priority = "LOW";

  const text = complaint.toLowerCase();

  // 🔍 Smart Detection (Marathi + English)
  if (
    text.includes("mobile") ||
    text.includes("मोबाईल") ||
    text.includes("चोरी") ||
    text.includes("theft") ||
    text.includes("stolen")
  ) {
    crimeType = "चोरी";
    section = "IPC 379";
    priority = "MEDIUM";
  } 
  else if (
    text.includes("fraud") ||
    text.includes("फसवणूक") ||
    text.includes("scam") ||
    text.includes("cheat")
  ) {
    crimeType = "फसवणूक";
    section = "IPC 420";
    priority = "HIGH";
  }
  else if (
    text.includes("भांडण") ||
    text.includes("maramari") ||
    text.includes("fight")
  ) {
    crimeType = "मारामारी";
    section = "IPC 323";
    priority = "MEDIUM";
  }
  else if (
    text.includes("attack") ||
    text.includes("murder") ||
    text.includes("हत्या")
  ) {
    crimeType = "गंभीर गुन्हा";
    section = "IPC 302";
    priority = "HIGH";
  }

  // 🔢 FIR Number
  const firNumber = "FIR-" + Date.now();

  // 🇮🇳 INDIA DATE & TIME FIX
  const currentDate = new Date().toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata"
  });

  const currentTime = new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata"
  });

  // 🤖 AI-style FIR
  const fir = `
📄 प्रथम माहिती अहवाल (FIR)

FIR क्रमांक: ${firNumber}

तक्रारदाराने खालीलप्रमाणे माहिती दिली आहे:
"${complaint}"

प्राथमिक तपासानुसार, ही घटना "${crimeType}" प्रकारात मोडते.
सदर प्रकरणावर ${section} अंतर्गत गुन्हा नोंदविण्यात येत आहे.

घटनेची तारीख: ${currentDate}
वेळ: ${currentTime}

प्राधान्य स्तर: ${priority}

पुढील कारवाई:
सदर प्रकरणाचा तपास संबंधित अधिकाऱ्याकडे सोपविण्यात येत आहे.

नोंद:
ही FIR प्रणालीद्वारे स्वयंचलितरीत्या (Hybrid Smart Logic) तयार करण्यात आली आहे.
`;

  res.json({ fir });
});

// ✅ PORT (Render साठी)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("✅ Server running on port " + PORT);
});
