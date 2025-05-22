import React, { useState } from "react"
import SidebarGuru from "../../component/sidebar/sidebar_guru"
import UserInfo from "../../component/user-info/user-info"
import "./academic_sejarah.css"

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="collapsible-section">
      <button className="collapsible-header" onClick={() => setIsOpen(!isOpen)}>
        <span className={`arrow ${isOpen ? "open" : ""}`}>&#9660;</span>
        <strong>{title}</strong>
      </button>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  )
}

const FileItem = ({ name, size, date }) => {
  return (
    <div className="file-item">
      <div className="file-icon" />
      <div className="file-info">
        <span className="file-name">{name}</span>
        <span className="file-meta">{size} File, {date ? date : "Tanggal Upload (Optional)"}</span>
      </div>
      <button className="mark-done-button">Mark As Done</button>
    </div>
  )
}

const AcademicSejarah = () => {
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
          <h1 className="title">MATEMATIKA</h1>

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
                + Tambah Materi</button>
          </div>

          <CollapsibleSection title="General">
            <FileItem name="Nama File" size="Size" date="Tanggal Upload (Optional)" />
            <FileItem name="Nama File" size="Size" date="Tanggal Upload (Optional)" />
          </CollapsibleSection>

          <div className="collapse-all">Collapse All</div>

          <CollapsibleSection title="Judul Bab">
            <FileItem name="Nama File" size="Size" date="Tanggal Upload (Optional)" />
            <FileItem name="Nama File" size="Size" date="Tanggal Upload (Optional)" />
          </CollapsibleSection>

          <div className="collapse-all">Collapse All</div>
        </div>
      </div>
    </div>
  )
}

export default AcademicSejarah
