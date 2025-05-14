// dashboard.jsx

import React from "react";
import "./dashboard_siswa.css";
// import Sidebar from ".../sidebar/sidebar.jsx";

const Announcement = () => (
  <div className="announcement">
    <h2>Pengumuman</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean placerat
      magna quis eros consequat porttitor...
    </p>
  </div>
);

const Calendar = () => (
  <div className="calendar">
    <div className="user-info">
      <div className="username-label">Username</div>
      <div className="user-circle">NS</div>
    </div>
    <div className="month-label">Maret 2025</div>
    <div className="calendar-days">
      <span>Sun</span>
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
    </div>
    <div className="calendar-dates">
      {Array.from({ length: 31 }, (_, i) => (
        <span key={i} className={i === 20 ? "active-date" : ""}>
          {i + 1}
        </span>
      ))}
    </div>
  </div>
);

const Attendance = () => (
  <div className="card attendance">
    <h3>Kehadiran</h3>
    <div>
      Semester
      <br />
      <strong>Genap 2024/2025</strong>
    </div>
    <div className="value">100%</div>
    <div>Rata-rata kehadiran</div>
  </div>
);

const Presence = () => (
  <div className="card presence">
    <h3>Presensi</h3>
    <ul>
      <li>
        <span>07:00 - Matematika</span>
        <button>Presensi</button>
      </li>
      <li>
        <span>08:30 - Bahasa Indonesia</span>
        <button>Presensi</button>
      </li>
    </ul>
  </div>
);

const Grade = () => (
  <div className="card grade">
    <h3>Nilai</h3>
    <div>Genap 2024/2025</div>
    <div className="value">93.2</div>
    <div>Rata-rata nilai</div>
  </div>
);

const CourseCard = ({ code, name }) => (
  <div className="course-card">
    <div className="course-graphic"></div>
    <div className="course-info">
      <span className="course-code">{code}</span>
      <div className="course-name">{name}</div>
    </div>
  </div>
);

const CourseReview = () => (
  <div className="course-review">
    <h3>Course Review</h3>
    <div className="courses">
      <CourseCard code="MAT120D" name="Matematika" />
      <CourseCard code="KIM120E" name="Kimia" />
      <CourseCard code="BIO120E" name="Biologi" />
      <CourseCard code="FIS120E" name="Fisika" />
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <div className="top-section">
          <Announcement />
          <Calendar />
        </div>
        <div className="info-section">
          <Attendance />
          <Presence />
          <Grade />
        </div>
        <CourseReview />
      </main>
    </div>
  );
};

export default Dashboard;
