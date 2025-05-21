import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// Import halaman auth
import Login from "../pages/auth/login-page";
import NotFound from "../pages/NotFound";

// Halaman Siswa
import Dashboard from "../pages/siswa/dashboard_siswa";
import Academic from "../pages/siswa/academic/academic_siswa";
import Jadwal from "../pages/siswa/academic/jadwal/jadwal_siswa";
import Nilai from "../pages/siswa/academic/nilai/nilai_siswa";
import Kehadiran from "../pages/siswa/academic/kehadiran/kehadiran_siswa";

// Halaman Guru
import DashboardGuru from "../pages/guru/dashboard_guru";
import AcademicGuru from "../pages/guru/academic_guru";

// Halaman Admin
import AdminDashboard from "../pages/admin/dashboard_admin";

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
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/siswa/academic"
        element={
          <PrivateRoute allowedRoles={["siswa"]}>
            <Academic />  {/* Pastikan komponen Academic sudah dibuat */}
          </PrivateRoute>
        }
      />

      <Route
        path="/siswa/academic/jadwal"
        element={
          <PrivateRoute allowedRoles={["siswa"]}>
            <Jadwal />
          </PrivateRoute>
        }
      />
      <Route 
        path="/siswa/academic/nilai"
        element={
          <PrivateRoute allowedRoles={["siswa"]}>
            <Nilai />
          </PrivateRoute>
        }
        />
        <Route 
          path="/siswa/academic/kehadiran"
          element={
            <PrivateRoute allowedRoles={["siswa"]}>
              <Kehadiran />
            </PrivateRoute>
          }
        />

      {/* Route Guru */}
      <Route
        path="/guru/dashboard"
        element={
          <PrivateRoute allowedRoles={["guru"]}>
            <DashboardGuru />
          </PrivateRoute>
        }
      />

      <Route
        path="/guru/academic"
        element={
          <PrivateRoute allowedRoles={["guru"]}>
            <AcademicGuru />
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
      


      {/* Halaman 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;