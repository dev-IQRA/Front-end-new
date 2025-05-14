import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/login-page.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route untuk halaman login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirect root path ke /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Tambahkan route lain di sini jika ada, misal dashboard */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
