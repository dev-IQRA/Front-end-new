import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./login-page.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const users = {
      siswa: {username: "siswa", password: "siswa123", role: "siswa"},
      guru: {username: "guru", password: "guru123", role: "guru"},
      admin: {username: "admin", password: "admin123", role: "admin"},
    };

    const user = Object.values(users).find(
      user => user.username === username && user.password === password
    );

    if(user) {
      setUser(user);

      if(rememberMe) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("username", user.username);
      }

      switch(user.role) {
        case "siswa":
          navigate("/siswa/dashboard");
          break;
        case "guru":
          navigate("/guru/dashboard");
          break;
        case "admin":
          navigate("/admin/dashboard");
          break;
        default:
          navigate("/login");
      }
    } else {
      setError("Username atau password salah!");
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