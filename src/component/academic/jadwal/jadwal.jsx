import React from "react";
import "./jadwal.css";
import Sidebar from "../../sidebar/sidebar.jsx";

const Schedule = () => (
  <div className="bg-white rounded-3xl p-6 mb-8 shadow-sm">
    <h2 className="text-2xl font-semibold mb-4" style={{ color: "#28536b" }}>
      Jadwal
    </h2>

    <div className="grid grid-cols-4 gap-4 mb-4 font-medium text-center">
      <div>Hari/Tanggal</div>
      <div>Mata Pelajaran</div>
      <div>Ruang Kelas</div>
      <div>Waktu</div>
    </div>

    {/* Schedule Items */}
    <div className="divide-y divide-gray-200">
      {" "}
      {/* Adds a divider line */}
      {[
        {
          date: "Senin, 12 Maret 2025",
          subjects: [
            { name: "Matematika", code: "MAT120D", time: "07:00-08:30" },
            { name: "Bahasa Indonesia", code: "IND120D", time: "08:30-10:00" },
            { name: "Fisika", code: "FIS120D", time: "10:30-12:00" },
          ],
        },
        {
          date: "Selasa, 13 Maret 2025",
          subjects: [
            { name: "Kimia", code: "KIM120D", time: "07:00-08:30" },
            { name: "Biologi", code: "BIO120D", time: "08:30-10:00" },
          ],
        },
      ].map((day) => (
        <div key={day.date} className="py-4">
          <div className="font-medium">{day.date}</div>
          {day.subjects.map((subject) => (
            <div className="grid grid-cols-4 gap-4 mb-4" key={subject.code}>
              <div></div>
              <div>
                <div className="text-lg" style={{ color: "#a72608" }}>
                  {subject.name}
                </div>
                <div className="text-xs text-gray-500">{subject.code}</div>
              </div>
              <div className="text-center">MIPA X.1</div>
              <div className="text-center">{subject.time}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
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
      <CourseCard code="FIS120E" name=" Fisika" />
    </div>
  </div>
);

const Dashboard = () => (
  <div className="dashboard">
    <Sidebar />
    <main className="main-content">
      <div className="top-section">
        <Schedule />
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

export default Dashboard;
