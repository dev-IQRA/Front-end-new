// dashboard_guru.jsx
import React from "react";
import "./dashboard_guru.css";

// Sidebar sederhana untuk role guru
const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Dashboard Guru</h2>
      </div>
      <nav className="menu">
        <ul>
          <li><a href="#dashboard" className="active">Dashboard</a></li>
          <li><a href="#kelas">Kelas</a></li>
          <li><a href="#absensi">Absensi</a></li>
          <li><a href="#materi">Materi</a></li>
          <li><a href="#nilai">Nilai</a></li>
          <li><a href="#pengaturan">Pengaturan</a></li>
        </ul>
      </nav>
    </aside>
  );
};

const Announcement = () => (
  <section className="announcement">
    <h2>Pengumuman</h2>
    <p>
      Selamat datang di dashboard guru. Pastikan untuk memperbarui materi dan memantau absensi siswa secara rutin.
    </p>
  </section>
);

const Calendar = () => (
  <section className="calendar">
    <div className="calendar-header">
      <div className="user-info">
        <div className="username-label">Guru: Budi Santoso</div>
        <div className="user-circle">BS</div>
      </div>
      <div className="month-label">Maret 2025</div>
    </div>
    <div className="calendar-days">
      {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
        <span key={day}>{day}</span>
      ))}
    </div>
    <div className="calendar-dates">
      {Array.from({ length: 31 }, (_, i) => (
        <span key={i} className={i === 14 ? "active-date" : ""}>
          {i + 1}
        </span>
      ))}
    </div>
  </section>
);

const AttendanceSummary = () => (
  <section className="card attendance-summary">
    <h3>Rekap Absensi</h3>
    <div>Semester Genap 2024/2025</div>
    <div className="value">98.5%</div>
    <div>Rata-rata kehadiran siswa</div>
  </section>
);

const CourseManagement = () => (
  <section className="card course-management">
    <h3>Manajemen Kelas</h3>
    <ul>
      <li>
        <span>07:00 - Matematika</span>
        <button>Detail</button>
      </li>
      <li>
        <span>08:30 - Bahasa Indonesia</span>
        <button>Detail</button>
      </li>
      <li>
        <span>10:00 - Fisika</span>
        <button>Detail</button>
      </li>
    </ul>
  </section>
);

const StudentPerformance = () => (
  <section className="card student-performance">
    <h3>Nilai Siswa</h3>
    <div>Semester Genap 2024/2025</div>
    <div className="value">Rata-rata: 87.4</div>
  </section>
);

const DashboardGuru = () => {
  return (
    <div className="dashboard-guru">
      <Sidebar />
      <main className="main-content">
        <div className="top-section">
          <Announcement />
          <Calendar />
        </div>
        <div className="info-section">
          <AttendanceSummary />
          <CourseManagement />
          <StudentPerformance />
        </div>
      </main>
    </div>
  );
};

export default DashboardGuru;
