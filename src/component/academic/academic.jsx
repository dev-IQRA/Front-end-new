import React from "react";
import "./academic.css";

import Sidebar from "../sidebar/sidebar.jsx";
// import Sidebar from '../sidebar/sidebar.jsx';


// const Sidebar = () => (
//   <aside className="sidebar">
//     <div className="brand">IQRA<span>Student</span></div>
//     <nav className="menu">
//       <button className="menu-item">Dashboard</button>
//       <button className="menu-item active">Academic</button>
//     </nav>
//   </aside>
// );

const Schedule = () => (
  <div className="schedule">
    <h2>Jadwal</h2>
    <table>
      <thead>
        <tr>
          <th>Hari/Tanggal</th>
          <th>Mata Pelajaran</th>
          <th>Ruangan</th>
          <th>Waktu</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Senin, 12 Maret 2025</td>
          <td>Matematika</td>
          <td>MPA X.1</td>
          <td>07:00 - 08:30</td>
        </tr>
        <tr>
          <td></td>
          <td className="highlight">Bahasa Indonesia</td>
          <td>MPA X.1</td>
          <td>08:30 - 10:00</td>
        </tr>
        <tr>
          <td></td>
          <td>Fisika</td>
          <td>MPA X.1</td>
          <td>10:00 - 11:30</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Calendar = () => (
  <div className="calendar">
    <div className="header">
      <div className="user-info">
        <span className="username">Username</span>
        <div className="avatar">NS</div>
      </div>
      <div className="month">Maret 2025</div>
    </div>
    <div className="days">
      {["S", "S", "R", "K", "J", "S", "M"].map((d, i) => (
        <div key={i}>{d}</div>
      ))}
    </div>
    <div className="dates">
      {Array.from({ length: 31 }, (_, i) => (
        <div key={i} className={i === 20 ? "active-date" : ""}>
          {i + 1}
        </div>
      ))}
    </div>
  </div>
);

const SummaryCard = ({ title, subtitle, value }) => (
  <div className="summary-card">
    <div className="subtitle">{subtitle}</div>
    <h3>{title}</h3>
    <div className="value">{value}</div>
    <span className="more">&gt;</span>
  </div>
);

const CourseCard = ({ code, title }) => (
  <div className="course-card">
    <div className="course-visual" />
    <div className="course-info">
      <small>{code}</small>
      <strong>{title}</strong>
    </div>
  </div>
);

const Academic = () => (
  <div className="academic">
    <Sidebar />
    <main className="content">
      <div className="top">
        <Schedule />
        <Calendar />
      </div>
      <div className="summary-section">
        <SummaryCard
          title="100%"
          subtitle="Genap 2024/2025"
          value="Rata-rata kehadiran"
        />
        <SummaryCard
          title="93.2"
          subtitle="Pengetahuan - Genap 2024/2025"
          value="Rata-rata nilai"
        />
        <SummaryCard
          title="93.2"
          subtitle="Keterampilan - Genap 2024/2025"
          value="Rata-rata nilai"
        />
      </div>
      <div className="course-review">
        <div className="header">
          <h3>Course Review</h3>
          <button className="search-btn">Search</button>
        </div>
        <div className="courses">
          <CourseCard code="SEJ1201" title="Sejarah" />
          <CourseCard code="IND1201" title="Indonesia" />
          <CourseCard code="ENG1201" title="English" />
        </div>
      </div>
    </main>
  </div>
);

export default Academic;
