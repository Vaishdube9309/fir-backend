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
  res.send("🚀 FIR Backend चालू आहे");
});

// ✅ FIR Generate (Demo)
app.post("/generate-fir", (req, res) => {
  const { complaint } = req.body;

  if (!complaint) {
    return res.status(400).json({ error: "Complaint required" });
  }

  const fir = `
📄 FIR REPORT

तक्रार: ${complaint}

दिनांक: ${new Date().toLocaleDateString()}

वेळ: ${new Date().toLocaleTimeString()}

तक्रारीचा प्रकार: चोरी / गुन्हा (Demo)

तपास स्थिती: Pending

नोंद:
ही एक demo FIR आहे. पुढील तपास सुरू आहे.
`;

  res.json({ fir });
});

// ✅ PORT fix
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("✅ Server running on port " + PORT);
});
