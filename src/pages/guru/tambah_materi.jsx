import React, { useState } from "react"
import { useContext } from "react";
import { MateriContext } from "../../context/MateriContext";
import { useNavigate } from "react-router-dom";
import SidebarGuru from "../../component/sidebar/sidebar_guru"
import UserInfo from "../../component/user-info/user-info"
import "./tambah_materi.css"

const TambahMateri = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [judulMateri, setJudulMateri] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [file, setFile] = useState(null)
  const { addMateri } = useContext(MateriContext);
  const navigate = useNavigate();



  const toggleOpen = () => setIsOpen(!isOpen)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleCancel = () => {
    setJudulMateri("")
    setDeskripsi("")
    setFile(null)
  }

  const handleDone = () => {
    addMateri({
      judul: judulMateri,
      deskripsi,
      file,
    });
    navigate("/guru/academic/sejarah");
  };

  return (
    <div className="tambah-materi-container">
      <SidebarGuru activePage="academic" />

      <div className="content-area">
        <div className="top-bar">
          <UserInfo username="Username" role="NIS" />
        </div>

        <div className="breadcrumb">
          Matematika dan Ilmu Pengetahuan Alam / Matematika / Tambah Materi
        </div>

        <div className="collapsible-section">
          <button className="collapsible-header" onClick={toggleOpen}>
            <span className={`arrow ${isOpen ? "open" : ""}`}>&#9660;</span>
            <strong>Add Materi</strong>
          </button>
          {isOpen && (
            <form className="materi-form" onSubmit={(e) => e.preventDefault()}>
              <table>
                <tbody>
                  <tr>
                    <td><label htmlFor="judulMateri">Judul Materi</label></td>
                    <td>
                      <input
                        type="text"
                        id="judulMateri"
                        value={judulMateri}
                        onChange={(e) => setJudulMateri(e.target.value)}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor="deskripsi">Deskripsi</label></td>
                    <td>
                      <textarea
                        id="deskripsi"
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        rows={5}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <label htmlFor="fileUpload" className="file-upload-label">
                        {file ? file.name : "Upload File or Drop"}
                      </label>
                      <input
                        type="file"
                        id="fileUpload"
                        onChange={handleFileChange}
                        className="file-upload-input"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="form-buttons">
                <button type="button" className="cancel-button" onClick={handleCancel}>
                  CANCEL
                </button>
                <button type="submit" className="done-button" onClick={handleDone}>
                  DONE
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default TambahMateri
