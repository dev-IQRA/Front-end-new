import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// Import halaman
import Login from "../pages/Auth/Login";
import NotFound from "../pages/NotFound";

// Halaman Siswa
import SiswaDashboard from "../pages/Siswa/Dashboard";
import SiswaAcademic from "../pages/Siswa/Academic";

// Halaman Guru
import GuruDashboard from "../pages/Guru/Dashboard";
import GuruAcademic from "../pages/Guru/Academic";

// Halaman Admin
import AdminDashboard from "../pages/Admin/Dashboard";
import AdminKelolaAkun from "../pages/Admin/KelolaAkun";

// Komponen PrivateRoute untuk proteksi route
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    // Jika belum login, redirect ke login
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Jika role tidak sesuai, redirect ke dashboard sesuai role
    switch (user.role) {
      case "siswa":
        return <Navigate to="/siswa/dashboard" replace />;
      case "guru":
        return <Navigate to="/guru/dashboard" replace />;
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  // Jika sudah login dan role sesuai, render komponen anak
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Route Publik */}
      <Route path="/login" element={<Login />} />

      {/* Route Siswa */}
      <Route
        path="/siswa/dashboard"
        element={
          <PrivateRoute allowedRoles={["siswa"]}>
            <SiswaDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/siswa/academic"
        element={
          <PrivateRoute allowedRoles={["siswa"]}>
            <SiswaAcademic />
          </PrivateRoute>
        }
      />

      {/* Route Guru */}
      <Route
        path="/guru/dashboard"
        element={
          <PrivateRoute allowedRoles={["guru"]}>
            <GuruDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/guru/academic"
        element={
          <PrivateRoute allowedRoles={["guru"]}>
            <GuruAcademic />
          </PrivateRoute>
        }
      />

      {/* Route Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/kelola-akun"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminKelolaAkun />
          </PrivateRoute>
        }
      />

      {/* Redirect root ke login atau dashboard sesuai kebutuhan */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Halaman 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
