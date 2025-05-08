// app.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./component/login-page/login-page";
import Dashboard from "./component/dashboard/dashboard";
import Jadwal from "./component/academic/jadwal/jadwal";
import Nilai from "./component/academic/nilai/nilai";
import Kehadiran from "./component/academic/kehadiran/kehadiran";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/academic/jadwal" element={<Jadwal />} />
        <Route path="/academic/nilai" element={<Nilai />} />
        <Route path="/academic/kehadiran" element={<Kehadiran />} />
      </Routes>
    </Router>
  );
}

export default App;
