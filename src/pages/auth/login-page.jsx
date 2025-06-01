import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import "./login-page.css";

const LoginPage = () => {  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/api/auth/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { user, token } = response.data;
        
        // Simpan ke localStorage (selalu simpan untuk persistence)
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("username", user.username);

        // Set user context
        setUser({
          username: user.username,
          role: user.role,
          id: user.id,
          email: user.email,
          full_name: user.full_name
        });

        // Redirect berdasarkan role
        switch (user.role) {
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "guru":
            navigate("/guru/dashboard");
            break;
          case "siswa":
            navigate("/siswa/dashboard");
            break;
          default:
            navigate("/login");
        }
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Username atau password salah");
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
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
          {error && <div className="error-message">{error}</div>}
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
            </div>            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;