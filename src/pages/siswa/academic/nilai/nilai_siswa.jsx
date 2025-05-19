"use client"

import { useState, useMemo } from "react"
import Sidebar from "../../../../component/sidebar/sidebar_siswa"
import UserInfo from "../../../../component/user-info/user-info.jsx"
import "./nilai_siswa.css"

const dataPengetahuan = [
  {
    no: 1,
    kode: "MAT2023",
    mapel: "Matematika",
    semester: 4,
    huruf: "A",
    nilai: 92,
    kelas: "VIII",
  },
  {
    no: 2,
    kode: "BIO2023",
    mapel: "Biologi",
    semester: 4,
    huruf: "B",
    nilai: 85,
    kelas: "VIII",
  },
  {
    no: 3,
    kode: "KIM2023",
    mapel: "Kimia",
    semester: 4,
    huruf: "B",
    nilai: 87,
    kelas: "VIII",
  },
  {
    no: 4,
    kode: "FIS2023",
    mapel: "Fisika",
    semester: 4,
    huruf: "C",
    nilai: 67,
    kelas: "VIII",
  },
  {
    no: 5,
    kode: "MTP2023",
    mapel: "Fisika",
    semester: 4,
    huruf: "BC",
    nilai: 73,
    kelas: "VIII",
  },
]

const dataKeterampilan = [
  {
    no: 1,
    kode: "MAT2023",
    mapel: "Matematika",
    semester: 4,
    huruf: "A",
    nilai: 92,
    kelas: "VIII",
  },
  {
    no: 2,
    kode: "BIO2023",
    mapel: "Biologi",
    semester: 4,
    huruf: "B",
    nilai: 85,
    kelas: "VIII",
  },
  {
    no: 3,
    kode: "KIM2023",
    mapel: "Kimia",
    semester: 4,
    huruf: "B",
    nilai: 82,
    kelas: "VIII",
  },
]

const getColorByHuruf = (huruf) => {
  switch (huruf.toLowerCase()) {
    case "a":
      return "#00d0a2"
    case "ab":
      return "#40D27A"
    case "b":
      return "#80D351"
    case "bc":
      return "#FFD600"
    case "c":
      return "#FFD600"
    case "d":
      return "#D4541E"
    case "e":
      return "#dc3545"
    default:
      return "#ccc"
  }
}

const NilaiLingkaran = ({ huruf }) => {
  const bgColor = getColorByHuruf(huruf)

  return (
    <div className="nilai-pill" style={{ backgroundColor: bgColor }}>
      {huruf}
    </div>
  )
}

const NilaiSiswa = () => {
  const kelasTersedia = useMemo(() => {
    return [...new Set([...dataPengetahuan, ...dataKeterampilan].map((d) => d.kelas))]
  }, [])

  const [kelasAktif, setKelasAktif] = useState(kelasTersedia[0])

  const dataPengetahuanKelas = useMemo(() => {
    return dataPengetahuan.filter((d) => d.kelas === kelasAktif)
  }, [kelasAktif])

  const dataKeterampilanKelas = useMemo(() => {
    return dataKeterampilan.filter((d) => d.kelas === kelasAktif)
  }, [kelasAktif])

  const calculateAverageGrade = useMemo(() => {
    const totalData = [...dataPengetahuanKelas, ...dataKeterampilanKelas].filter(
      (item) => typeof item.nilai === "number",
    )
    const totalNilai = totalData.reduce((acc, item) => acc + item.nilai, 0)
    const rataRata = totalNilai / totalData.length
    return Math.round(rataRata)
  }, [dataPengetahuanKelas, dataKeterampilanKelas])

  const getAchievementStatus = (nilai) => {
    if (nilai >= 80) return "Sangat Memuaskan"
    else if (nilai >= 70) return "Memuaskan"
    else if (nilai >= 60) return "Cukup Memuaskan"
    else if (nilai > 50) return "Kurang Memuaskan"
    else return "Tidak Memuaskan"
  }

  const getStudyContinuation = (nilai) => {
    if (nilai >= 70) return "Naik tanpa bersyarat"
    else if (nilai >= 50) return "Naik dengan bersyarat"
    else return "Tinggal kelas"
  }

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="dashboard-content">
        <div className="nilai-page">
          <div className="page-header">
            <div>
              <h1 className="page-title">Nilai Saya</h1>
              <h2 className="kelas-title">KELAS {kelasAktif}</h2>
            </div>
            <UserInfo username="Username" nim="NIS" />
          </div>

          <div className="nilai-card">
            <h2 className="card-title">Rekap Nilai Semester 2</h2>

            <table className="nilai-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kode</th>
                  <th>Mata Pelajaran</th>
                  <th>Semester</th>
                  <th>Huruf Mutu</th>
                  <th>Nilai Mutu</th>
                </tr>
              </thead>
            </table>

            <div className="nilai-section">
              <h3 className="section-title">2023/2024 Ganjil - Pengetahuan</h3>

              <table className="nilai-table">
                <tbody>
                  {dataPengetahuanKelas.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.no}</td>
                      <td>{subject.kode}</td>
                      <td>{subject.mapel}</td>
                      <td>{subject.semester}</td>
                      <td>
                        <NilaiLingkaran huruf={subject.huruf} />
                      </td>
                      <td>{subject.nilai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="nilai-summary">
                <div className="summary-text">
                  <div className="summary-item">
                    <span className="summary-label">Pencapaian:</span> {getAchievementStatus(calculateAverageGrade)}
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Kelanjutan studi:</span>{" "}
                    {getStudyContinuation(calculateAverageGrade)}
                  </div>
                </div>
                <div className="average-grade">{calculateAverageGrade}</div>
              </div>
            </div>

            <div className="nilai-section">
              <h3 className="section-title">2023/2024 Ganjil - Keterampilan</h3>

              <table className="nilai-table">
                <tbody>
                  {dataKeterampilanKelas.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.no}</td>
                      <td>{subject.kode}</td>
                      <td>{subject.mapel}</td>
                      <td>{subject.semester}</td>
                      <td>
                        <NilaiLingkaran huruf={subject.huruf} />
                      </td>
                      <td>{subject.nilai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NilaiSiswa
