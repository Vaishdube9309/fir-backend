import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Root route (test)
app.get("/", (req, res) => {
  res.send("🚀 Smart FIR Backend चालू आहे");
});

// ✅ SMART FIR GENERATOR (FREE LOGIC)
app.post("/generate-fir", (req, res) => {
  const { complaint } = req.body;

  if (!complaint) {
    return res.status(400).json({ error: "Complaint required" });
  }

  let crimeType = "सामान्य तक्रार";
  let section = "N/A";
  let priority = "LOW";

  const text = complaint.toLowerCase();

  // 🔍 Smart Detection
  if (text.includes("mobile") || text.includes("चोरी")) {
    crimeType = "चोरी";
    section = "IPC 379";
    priority = "MEDIUM";
  } 
  else if (text.includes("fraud") || text.includes("फसवणूक")) {
    crimeType = "फसवणूक";
    section = "IPC 420";
    priority = "HIGH";
  }
  else if (text.includes("maramari") || text.includes("भांडण")) {
    crimeType = "मारामारी";
    section = "IPC 323";
    priority = "MEDIUM";
  }
  else if (text.includes("attack") || text.includes("murder")) {
    crimeType = "गंभीर गुन्हा";
    section = "IPC 302";
    priority = "HIGH";
  }

  // 🔢 FIR Number Generate
  const firNumber = "FIR-" + Date.now();

  const fir = `
📄 FIR REPORT

FIR क्रमांक: ${firNumber}

तक्रार: ${complaint}

दिनांक: ${new Date().toLocaleDateString()}
वेळ: ${new Date().toLocaleTimeString()}

गुन्ह्याचा प्रकार: ${crimeType}
लागू कलम: ${section}
प्राधान्य (Priority): ${priority}

तपास स्थिती: Pending

नोंद:
ही Smart FIR system logic वापरून तयार केली आहे (Free Version).
`;

  res.json({ fir });
});

// ✅ PORT (Render साठी important)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("✅ Server running on port " + PORT);
});
