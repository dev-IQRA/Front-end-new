import {useState, useEffect, useContext} from "react";
import {Search} from "lucide-react"
import Sidebar from "../../component/sidebar/sidebar_siswa.jsx"
import Calendar from "../../component/common/calender.jsx";
import {UserContext} from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import "./dashboard_siswa.css"

const DashboardSiswa = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2)) // March 2025
    const [announcementText, setAnnouncementText] = useState([]);
    const [jadwalHariIni, setJadwalHariIni] = useState([]);
    const [allJadwal, setAllJadwal] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const {user} = useContext(UserContext);

    // Sample announcement text
    // Sample course data (fallback jika tidak ada jadwal)
    const courses = [
        {code: "MAT120D", name: "Matematika", color: "#e67e22"},
        {code: "KIM120E", name: "Kimia", color: "#e67e22"},
        {code: "BIO120E", name: "Biologi", color: "#e67e22"},
        {code: "FIS120E", name: "Fisika", color: "#e67e22"},
    ]

    // Fetch jadwal siswa dari backend
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axiosInstance.get("/api/announcement");
                setAnnouncementText(response.data || []);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            }
        };
        fetchAnnouncements().then();
    }, []);

    useEffect(() => {
        const fetchJadwalSiswa = async () => {
            try {
                setLoading(true);

                // Fetch jadwal hari ini untuk presensi
                const responseHariIni = await axiosInstance.get("/api/jadwal/siswa/hari-ini");
                setJadwalHariIni(responseHariIni.data.jadwal || []);

                // Fetch semua jadwal untuk course review
                const responseAll = await axiosInstance.get("/api/jadwal/siswa");
                setAllJadwal(responseAll.data.jadwal || []);

            } catch (error) {
                console.error("Error fetching jadwal:", error);
                setError(`Gagal memuat jadwal. ${error.response.data.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (user && user.role === 'siswa') {
            fetchJadwalSiswa();
        }
    }, [user]);

    // Generate unique courses from jadwal for course review
    const uniqueCourses = allJadwal.reduce((acc, jadwal) => {
        const existing = acc.find(course => course.code === jadwal.mapel.id);
        if (!existing) {
            acc.push({
                code: jadwal.mapel.id,
                name: jadwal.mapel.nama_mapel,
                color: "#e67e22" // Default color, bisa disesuaikan
            });
        }
        return acc;
    }, []);

    // Use fallback courses if no jadwal available
    const displayCourses = uniqueCourses.length > 0 ? uniqueCourses : courses;

    return (
        <div className="dashboard-container">
            <Sidebar/>

            <main className="dashboard-content">
                {/* Announcement Section */}
                <div className="announcements-section">
                    <h2>Pengumuman</h2>
                    <div className="announcement-box">
                        <div className="announcement-content">
                            {Array.isArray(announcementText)
                                ? announcementText.map((announcement) => (
                                    <div key={announcement.id} className="announcement-item">
                                        <h4>{announcement.title}</h4>
                                        <p>{announcement.body}</p>
                                    </div>
                                ))
                                : <p>{announcementText}</p>
                            }
                        </div>
                    </div>
                </div>

                {/* Info Cards Section */}
                <div className="info-cards-section">
                    {/* Attendance Card */}
                    <div className="info-card">
                        <h3>Kehadiran</h3>
                        <div className="info-card-content">
                            <div className="semester-info">
                                <span>Semester</span>
                                <span className="semester-value">Genap 2024/2025</span>
                            </div>
                            <div className="attendance-value">100 %</div>
                            <div className="attendance-label">Rata-rata kehadiran</div>
                        </div>
                    </div>
                    {/* Presence Card */}
                    <div className="info-card">
                        <h3>Presensi</h3>
                        <div className="info-card-content">
                            {loading ? (
                                <div className="loading-text">Memuat jadwal...</div>
                            ) : error ? (
                                <div className="error-text">{error}</div>
                            ) : jadwalHariIni.length > 0 ? (<div className="schedule-list">
                                    {jadwalHariIni.map((jadwal, index) => (
                                        <div key={index} className="schedule-item">
                                            <div className="schedule-time">
                                                <div className="time-start">{jadwal.jam_mulai}</div>
                                                <div className="time-separator">-</div>
                                                <div className="time-end">{jadwal.jam_selesai}</div>
                                            </div>
                                            <div className="schedule-details">
                                                <div className="schedule-subject">{jadwal.mapel.nama_mapel}</div>
                                                <div className="schedule-code">{jadwal.mapel.id}</div>
                                                {jadwal.guru && (
                                                    <div
                                                        className="schedule-teacher">Guru: {jadwal.guru.full_name}</div>
                                                )}
                                            </div>
                                            <button className="presence-btn">Presensi</button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-schedule">
                                    <p>Tidak ada jadwal hari ini</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Grades Card */}
                    <div className="info-card">
                        <h3>Nilai</h3>
                        <div className="info-card-content">
                            <div className="semester-info">
                                <span className="semester-value">Genap 2024/2025</span>
                            </div>
                            <div className="grade-value">93.2</div>
                            <div className="grade-label">Rata-rata nilai</div>
                        </div>
                    </div>
                </div>
                <div className="calendar-widget">
                    <Calendar
                        selectedDate={currentMonth}
                        onDateChange={(newDate) => setCurrentMonth(newDate)}
                    />
                </div>
                {/* Course Review Section */}
                <div className="course-review-section">
                    <div className="section-header">
                        <h3>Course Review</h3>
                        <div className="search-container">
                            <input type="text" placeholder="Search" className="search-input"/>
                            <Search size={16} className="search-icon"/>
                        </div>
                    </div>
                    <div className="course-cards">
                        {displayCourses.map((course, index) => (
                            <div key={index} className="course-card">
                                <div className="course-card-header" style={{backgroundColor: course.color}}></div>
                                <div className="course-card-content">
                                    <div className="course-code">{course.code}</div>
                                    <div className="course-name">{course.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DashboardSiswa
