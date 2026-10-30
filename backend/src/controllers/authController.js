
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { performance } = require("node:perf_hooks");
const db = require("../db");

async function writeLoginLog({
  username,
  ipAddress,
  status,
  httpStatus,
  responseTimeMs,
}) {
  try {
    await db.execute(
      `INSERT INTO login_logs
       (username, ip_address, status, http_status, response_time_ms)
       VALUES (?, ?, ?, ?, ?)`,
      [username, ipAddress, status, httpStatus, responseTimeMs]
    );
  } catch (error) {
    console.error("Gagal menyimpan login log:", error.message);
  }
}

async function login(req, res) {
  const startTime = performance.now();
  const { username, password } = req.body || {};
  const ipAddress = req.ip || "unknown";

  const safeUsername =
    typeof username === "string"
      ? username.trim().slice(0, 100)
      : null;

  async function respond(status, body, logStatus = null) {
    if (logStatus) {
      await writeLoginLog({
        username: safeUsername,
        ipAddress,
        status: logStatus,
        httpStatus: status,
        responseTimeMs: Number(
          (performance.now() - startTime).toFixed(2)
        ),
      });
    }

    return res.status(status).json(body);
  }

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username.trim() ||
    !password
  ) {
    return respond(400, {
      message: "Username dan password wajib diisi.",
    }, "failed");
  }

  try {
    const [users] = await db.execute(
      `SELECT id, username, password_hash, role
       FROM users
       WHERE username = ?
       LIMIT 1`,
      [safeUsername]
    );

    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return respond(401, {
        message: "Username atau password salah.",
      }, "failed");
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET belum dikonfigurasi.");

      return respond(500, {
        message: "Konfigurasi server belum lengkap.",
      });
    }

    const token = jwt.sign(
      {
        sub: String(user.id),
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return respond(200, {
      message: "Login berhasil.",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    }, "success");
  } catch (error) {
    console.error("Login error:", error.message);

    return respond(500, {
      message: "Terjadi kesalahan pada server.",
    });
  }
}

module.exports = { login };
