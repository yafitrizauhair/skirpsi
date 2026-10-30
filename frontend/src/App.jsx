
import React, { useState } from "react";
import "./index.css";

export default function App() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username dan password wajib diisi.");
      return;   
    }

    // Login masih simulasi, belum terhubung ke backend.
    setError("");
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
    setPassword("");
    setError("");
  }

  if (loggedIn) {
    return (
      <main className="dashboard">
        <header className="dashboard-header">
          <div className="brand">
            <span className="brand-icon">S</span>
            <div>
              <h2>SentriWeb</h2>
              <p>Security Console</p>
            </div>
          </div>

          <button className="logout-button" onClick={handleLogout}>
            Keluar
          </button>
        </header>

        <section className="welcome">
          <span className="eyebrow">SECURITY OVERVIEW</span>
          <h1>Ringkasan Keamanan</h1>
          <p>
            Selamat datang, {username}. Pantau aktivitas login
            dan perlindungan dari serangan brute force.
          </p>
        </section>

        <div className="demo-alert">
          <strong>Mode demo</strong>
          <span>
            Data berikut masih contoh dan belum berasal dari database.
          </span>
        </div>

        <section className="stats-grid">
          <article className="stat-card">
            <span>Total Percobaan Login</span>
            <h2>1.284</h2>
            <p>Seluruh permintaan</p>
          </article>

          <article className="stat-card">
            <span>Login Berhasil</span>
            <h2 className="green">946</h2>
            <p>Autentikasi berhasil</p>
          </article>

          <article className="stat-card">
            <span>Login Gagal</span>
            <h2 className="orange">267</h2>
            <p>Autentikasi ditolak</p>
          </article>

          <article className="stat-card">
            <span>Permintaan Diblokir</span>
            <h2 className="purple">71</h2>
            <p>Rate limiting</p>
          </article>
        </section>

        <section className="content-card">
          <div className="section-heading">
            <div>
              <h2>Status Perlindungan</h2>
              <p>Rancangan konfigurasi rate limiting</p>
            </div>
            <span className="status-badge">PROTOTIPE</span>
          </div>

          <div className="config-row">
            <span>Batas percobaan login</span>
            <strong>5 percobaan</strong>
          </div>

          <div className="config-row">
            <span>Jendela waktu</span>
            <strong>60 detik</strong>
          </div>

          <div className="config-row">
            <span>Respons saat dibatasi</span>
            <strong>HTTP 429</strong>
          </div>

          <div className="config-row">
            <span>Database log</span>
            <strong>MySQL</strong>
          </div>
        </section>

        <section className="content-card">
          <div className="section-heading">
            <div>
              <h2>Aktivitas Login Terbaru</h2>
              <p>Contoh log keamanan</p>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>WAKTU</th>
                  <th>USERNAME</th>
                  <th>STATUS</th>
                  <th>HTTP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>22:14:08</td>
                  <td>admin</td>
                  <td>
                    <span className="log-blocked">Diblokir</span>
                  </td>
                  <td>429</td>
                </tr>
                <tr>
                  <td>22:13:51</td>
                  <td>admin</td>
                  <td>
                    <span className="log-failed">Gagal</span>
                  </td>
                  <td>401</td>
                </tr>
                <tr>
                  <td>22:12:43</td>
                  <td>operator</td>
                  <td>
                    <span className="log-success">Berhasil</span>
                  </td>
                  <td>200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <footer className="footer">
          SentriWeb Security Console · Prototype Skripsi
        </footer>
      </main>
    );
  }

  return (
    <main className="login-page">
      <section className="login-intro">
        <div className="brand">
          <span className="brand-icon">S</span>
          <div>
            <h2>SentriWeb</h2>
            <p>Security Console</p>
          </div>
        </div>

        <div className="intro-content">
          <span className="eyebrow">WEB SECURITY MONITORING</span>
          <h1>
            Lindungi akses.
            <br />
            <span>Kenali ancaman.</span>
          </h1>
          <p>
            Panel monitoring keamanan login untuk mengidentifikasi
            percobaan akses mencurigakan dan mengevaluasi rate limiting.
          </p>

          <div className="feature-list">
            <div>
              <span className="feature-icon">01</span>
              <div>
                <strong>Pemantauan aktivitas</strong>
                <p>Ringkasan aktivitas autentikasi</p>
              </div>
            </div>

            <div>
              <span className="feature-icon">02</span>
              <div>
                <strong>Perlindungan brute force</strong>
                <p>Konsep pembatasan percobaan login</p>
              </div>
            </div>

            <div>
              <span className="feature-icon">03</span>
              <div>
                <strong>Audit log</strong>
                <p>Riwayat login berhasil dan gagal</p>
              </div>
            </div>
          </div>
        </div>

        <p className="intro-footer">
          PROTOTIPE PENELITIAN · RATE LIMITING
        </p>
      </section>

      <section className="login-section">
        <form className="login-card" onSubmit={handleLogin}>
          <div className="login-symbol">↗</div>
          <span className="eyebrow">SELAMAT DATANG</span>
          <h2>Masuk ke dashboard</h2>
          <p className="description">
            Masukkan username dan password untuk melanjutkan.
          </p>

          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Masukkan username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
          />

          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Sembunyikan" : "Lihat"}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">
            Masuk <span>→</span>
          </button>

          <p className="security-note">
            Antarmuka demo — autentikasi belum terhubung ke backend.
          </p>
        </form>

        <p className="copyright">
          © 2026 SentriWeb · Sistem Monitoring Keamanan Web
        </p>
      </section>
    </main>
  );
}
