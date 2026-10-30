
const rateLimit = require("express-rate-limit");
const db = require("../db");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,

  handler: async (req, res) => {
    try {
      await db.execute(
        `INSERT INTO login_logs
          (username, ip_address, status, http_status, response_time_ms)
         VALUES (?, ?, 'blocked', 429, 0)`,
        [
          typeof req.body?.username === "string"
            ? req.body.username.trim().slice(0, 100)
            : null,
          req.ip || "unknown",
        ]
      );
    } catch (error) {
      console.error("Gagal mencatat login yang diblokir:", error.message);
    }

    return res.status(429).json({
      message: "Terlalu banyak percobaan login. Coba lagi setelah satu menit.",
    });
  },
});

module.exports = loginLimiter;
