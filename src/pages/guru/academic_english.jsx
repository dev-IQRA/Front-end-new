import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MateriContext } from "../../context/MateriContext";
import SidebarGuru from "../../component/sidebar/sidebar_guru";
import UserInfo from "../../component/user-info/user-info";
import CollapsibleSection from "../../component/common/CollapsibleSection";
import "./academic_english.css";

// Komponen FileItem yang sudah clickable jika ada file
const FileItem = ({ name, size, date, file }) => {
  const fileUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div className="file-item">
      <div className="file-icon" />
      <div className="file-info">
        {fileUrl ? (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="file-name"
            download={name}
          >
            {name}
          </a>
        ) : (
          <span className="file-name">{name}</span>
        )}
        <span className="file-meta">
          {size} File, {date ? date : "Tanggal Upload (Optional)"}
        </span>
      </div>
      <button className="mark-done-button">Mark As Done</button>
    </div>
  );
};

const AcademicEnglish = () => {
  const { materiList } = useContext(MateriContext);
  const navigate = useNavigate();

  return (
    <div className="academic-sejarah-container">
      <SidebarGuru activePage="academic" />

      <div className="academic-content">
        <div className="top-bar">
          <UserInfo username="Username" role="NIS" />
        </div>

        <div className="main-content">
          <h5 className="subtitle">Matematika dan Ilmu Pengetahuan Alam</h5>
          <h1 className="title">ENGLISH</h1>

          <div className="tabs">
            <button className="tab-button active">Course</button>
            <button className="tab-button">Participants</button>
            <button className="tab-button">Grades</button>
            <button className="tab-button">Competencies</button>
          </div>

          <div className="add-material-button-container">
            <button
              className="add-material-button"
              onClick={() => navigate("/guru/academic/tambah-materi")}
            >
              + Tambah Materi
            </button>
          </div>

          <CollapsibleSection title="General">
            <FileItem name="Nama File" size="Size" date="Tanggal Upload (Optional)" />
            <FileItem name="Nama File" size="Size" date="Tanggal Upload (Optional)" />
          </CollapsibleSection>

          <div className="collapse-all">Collapse All</div>

          <CollapsibleSection title="Judul Bab">
            {materiList.map((materi, idx) => (
              <FileItem
                key={idx}
                name={materi.judul}
                size={materi.file ? `${materi.file.size} bytes` : ""}
                date={new Date().toLocaleDateString()}
                file={materi.file} // <-- agar bisa di-click dan open
              />
            ))}
          </CollapsibleSection>

          <div className="collapse-all">Collapse All</div>
        </div>
      </div>
    </div>
  );
};

export default AcademicEnglish;