"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login-page.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3333/api/auth/login",
        {
          username,
          password
        },
        {
          withCredentials: true // penting agar cookie tersimpan
        }
      );

      alert(response.data.message || "Login berhasil");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-image-section">
          <div className="logo">IQRAStudent</div>
          <div className="welcome-text">
            <h2>Selamat Datang</h2>
            <h3>di IQRAStudent.</h3>
          </div>
        </div>
        <div className="login-form-section">
          <h1 className="login-title">LOGIN</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="remember-me">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
            </div>
            <div className="forgot-password">
              <a href="#">Lupa Kata Sandi?</a>
            </div>
            <button type="submit" className="login-button">
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
