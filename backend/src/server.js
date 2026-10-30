
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API Skripsi Rate Limiting berjalan",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend berhasil dijalankan",
    mysql: "running",
  });
});

// Route autentikasi
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Backend berjalan di http://localhost:${PORT}`);
});
