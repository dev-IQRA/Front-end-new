import React from "react";
import "./nilai.css";
import Sidebar from "../../sidebar/sidebar.jsx";

const dataPengetahuan = [
  {
    no: 1,
    kode: "MAT2023",
    mapel: "Matematika",
    semester: 4,
    huruf: "A",
    nilai: 92,
  },
  {
    no: 2,
    kode: "BIO2023",
    mapel: "Biologi",
    semester: 4,
    huruf: "B",
    nilai: 85,
  },
  {
    no: 3,
    kode: "FIS2023",
    mapel: "Fisika",
    semester: 4,
    huruf: "B",
    nilai: 87,
  },
  {
    no: 4,
    kode: "KIM2023",
    mapel: "Kimia",
    semester: 4,
    huruf: "C",
    nilai: 67,
  },
  {
    no: 5,
    kode: "ENG2023",
    mapel: "Bahasa Inggris",
    semester: 4,
    huruf: "A",
    nilai: 90,
  },
  {
    no: 5,
    kode: "ENG2023",
    mapel: "Bahasa Inggris",
    semester: 4,
    huruf: "A",
    nilai: 90,
  },
  {
    no: 5,
    kode: "ENG2023",
    mapel: "Bahasa Inggris",
    semester: 4,
    huruf: "A",
    nilai: 90,
  },
];

const dataKeterampilan = [
  {
    no: 1,
    kode: "MAT2023",
    mapel: "Matematika",
    semester: 4,
    huruf: "A",
    nilai: 92,
  },
  {
    no: 2,
    kode: "BIO2023",
    mapel: "Biologi",
    semester: 4,
    huruf: "B",
    nilai: 85,
  },
  {
    no: 3,
    kode: "FIS2023",
    mapel: "Fisika",
    semester: 4,
    huruf: "B",
    nilai: 87,
  },
  {
    no: 4,
    kode: "KIM2023",
    mapel: "Kimia",
    semester: 4,
    huruf: "C",
    nilai: 67,
  },
  {
    no: 5,
    kode: "ENG2023",
    mapel: "Bahasa Inggris",
    semester: 4,
    huruf: "A",
    nilai: 90,
  },
];

const Nilai = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <div className="nilai-page">
          <h1 className="page-title">Nilai Saya</h1>
          <h2 className="Kelas">Kelas VII</h2>

          <div className="nilai-container">
            <div className="scrollable-container">
              <h2 className="section-title">Pengetahuan</h2>
              <table className="nilai-table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Mapel</th>
                    <th>Kode</th>
                    <th>Semester</th>
                    <th>Nilai Huruf</th>
                    <th>Nilai Angka</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPengetahuan.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.no}</td>
                      <td>{subject.mapel}</td>
                      <td>{subject.kode}</td>
                      <td>{subject.semester}</td>
                      <td>{subject.huruf}</td>
                      <td>{subject.nilai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h5 className="Pencapaian">Pencapaian : Sangat Memuaskan</h5>
              <h5 className="Kelanjutan-Studi">
                Kelanjutan Studi: Naik tanpa syarat
              </h5>
              <h3 className="Rata-rata">
                {(() => {
                  const totalData = [...dataPengetahuan, ...dataKeterampilan];
                  const totalNilai = totalData.reduce(
                    (acc, item) => acc + item.nilai,
                    0
                  );
                  const rataRata = totalNilai / totalData.length;
                  return Math.round(rataRata);
                })()}
              </h3>
              <h2 className="section-title">Keterampilan</h2>
              <div className="scrollable-container">
                <table className="nilai-table">
                  <thead>
                    <tr> </tr>
                  </thead>
                  <tbody>
                    {dataKeterampilan.map((subject, index) => (
                      <tr key={index}>
                        <td>{subject.no}</td>
                        <td>{subject.mapel}</td>
                        <td>{subject.kode}</td>
                        <td>{subject.semester}</td>
                        <td>{subject.huruf}</td>
                        <td>{subject.nilai}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Nilai;
