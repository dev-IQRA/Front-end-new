import React from "react";
import "./nilai_siswa.css";
import Sidebar from "../../../../component/sidebar/sidebar_siswa";


const dataPengetahuan = [
  {
    no: 1,
    kode: "MAT2023",
    mapel: "Matematwka",
    semester: 4,
    huruf: "A",
    nilai: 92,
    kelas: "VII",
  },
  {
    no: 2,
    kode: "BIO2023",
    mapel: "Biologi",
    semester: 4,
    huruf: "B",
    nilai: 85,
    kelas: "VII",
  },
  {
    no: 3,
    kode: "FIS2023",
    mapel: "Fisika",
    semester: 4,
    huruf: "B",
    nilai: 87,
    kelas: "VII",
  },
  {
    no: 4,
    kode: "KIM2023",
    mapel: "Kimia",
    semester: 4,
    huruf: "C",
    nilai: 67,
    kelas: "VII",
  },
  {
    no: 5,
    kode: "ENG2023",
    mapel: "Bahasa Inggris",
    semester: 4,
    huruf: "A",
    nilai: 90,
    kelas: "VII",
  },
  {
    no: 1,
    kode: "MAT2023",
    mapel: "Matematika",
    semester: 4,
    huruf: "A",
    nilai: 92,
    kelas: "XII",
  },
  {
    no: 2,
    kode: "BIO2023",
    mapel: "Biologi",
    semester: 4,
    huruf: "B",
    nilai: 85,
    kelas: "XII",
  },
  {
    no: 3,
    kode: "FIS2023",
    mapel: "Fisika",
    semester: 4,
    huruf: "B",
    nilai: 87,
    kelas: "XII",
  },
  {
    no: 4,
    kode: "KIM2023",
    mapel: "Kimia",
    semester: 4,
    huruf: "C",
    nilai: 67,
    kelas: "XII",
  },
  {
    no: 5,
    kode: "ENG2023",
    mapel: "Bahasa Inggris",
    semester: 4,
    huruf: "A",
    nilai: 90,
    kelas: "XII",
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
    kelas: "VII",
  },
  {
    no: 2,
    kode: "BIO2023",
    mapel: "Biologi",
    semester: 4,
    huruf: "B",
    nilai: 85,
    kelas: "VII",
  },
  {
    no: 3,
    kode: "FIS2023",
    mapel: "Fisika",
    semester: 4,
    huruf: "B",
    nilai: 87,
    kelas: "VII",
  },
  {
    no: 4,
    kode: "KIM2023",
    mapel: "Kimia",
    semester: 4,
    huruf: "C",
    nilai: 67,
    kelas: "VII",
  },
  {
    no: 5,
    kode: "ENG2023",
    mapel: "Bahasa Inggris",
    semester: 4,
    huruf: "A",
    nilai: 90,
    kelas: "VII",
  },
  {
    no: 1,
    kode: "MAT2023",
    mapel: "Matematika",
    semester: 4,
    huruf: "A",
    nilai: 92,
    kelas: "XII",
  },
  {
    no: 2,
    kode: "BIO2023",
    mapel: "Biologi",
    semester: 4,
    huruf: "B",
    nilai: 85,
    kelas: "XII",
  },
  {
    no: 3,
    kode: "FIS2023",
    mapel: "Fisika",
    semester: 4,
    huruf: "B",
    nilai: 87,
    kelas: "XII",
  },
  {
    no: 4,
    kode: "KIM2023",
    mapel: "Kimia",
    semester: 4,
    huruf: "C",
    nilai: 67,
    kelas: "XII",
  },
  {
    no: 5,
    kode: "ENG2023",
    mapel: "Bahasa Inggris",
    semester: 4,
    huruf: "A",
    nilai: 90,
    kelas: "XII",
  },
];

const getColorByHuruf = (huruf) => {
  switch (huruf.toLowerCase()) {
    case "a":
      return "#00d0a2";
    case "ab":
      return "#40D27A";
    case "b":
      return "#80D351";
    case "bc":
      return "#BFD529";
    case "c":
      return "#FFD600";
    case "d":
      return "#D4541E";
    case "e":
      return "#dc3545";
    default:
      return "#ccc";
  }
};

const NilaiLingkaran = ({ huruf }) => {
  const bgColor = getColorByHuruf(huruf);

  return (
    <div
      style={{
        backgroundColor: bgColor,
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: "bold",
        lineHeight: "40px",
        textAlign: "center",
      }}
    >
      {huruf}
    </div>
  );
};

// Fungsi untuk menghitung rata-rata nilai
const Nilai = () => {
  const kelasTersedia = [
    ...new Set([...dataPengetahuan, ...dataKeterampilan].map((d) => d.kelas)),
  ];
  const [kelasAktif, setKelasAktif] = React.useState(kelasTersedia[0]);

  const dataPengetahuanKelas = dataPengetahuan.filter(
    (d) => d.kelas === kelasAktif
  );
  const dataKeterampilanKelas = dataKeterampilan.filter(
    (d) => d.kelas === kelasAktif
  );

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <div className="nilai-page">
          <h1 className="page-title">Nilai Saya</h1>
          {/* filter kelas */}
          <div className="filter-kelas" style={{ marginBottom: "20px" }}>
            {kelasTersedia.map((kelas) => (
              <button
                key={kelas}
                onClick={() => setKelasAktif(kelas)}
                style={{
                  marginRight: "10px",
                  padding: "6px 12px",
                  border: "1px solid #a86e7a",
                  borderRadius: "4px",
                  backgroundColor: kelasAktif === kelas ? "#a86e7a" : "#fff",
                  color: kelasAktif === kelas ? "#fff" : "#a86e7a",
                  cursor: "pointer",
                }}
              >
                Kelas {kelas}
              </button>
            ))}
          </div>

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
                    <th>Huruf Mutu</th>
                    <th>Nilai Mutu</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPengetahuanKelas.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.no}</td>
                      <td>{subject.mapel}</td>
                      <td>{subject.kode}</td>
                      <td>{subject.semester}</td>
                      <td>
                        <NilaiLingkaran huruf={subject.huruf} />{" "}
                      </td>
                      <td>{subject.nilai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h5 className="Pencapaian">
                Pencapaian:{" "}
                {(() => {
                  const totalData = [
                    ...dataPengetahuan,
                    ...dataKeterampilan,
                  ].filter((item) => typeof item.nilai === "number");
                  const totalNilai = totalData.reduce(
                    (acc, item) => acc + item.nilai,
                    0
                  );
                  const rataRata = totalNilai / totalData.length;
                  const nilai = Math.round(rataRata);

                  if (nilai >= 80) return "Sangat Memuaskan";
                  else if (nilai >= 70) return "Memuaskan";
                  else if (nilai >= 60) return "Cukup Memuaskan";
                  else if (nilai > 50) return "Kurang Memuaskan";
                  else return "Tidak Memuaskan";
                })()}
              </h5>
              <h5 className="KelanjutanStudi">
                Kelanjutan Studi:{" "}
                {(() => {
                  const totalData = [
                    ...dataPengetahuan,
                    ...dataKeterampilan,
                  ].filter((item) => typeof item.nilai === "number");
                  const totalNilai = totalData.reduce(
                    (acc, item) => acc + item.nilai,
                    0
                  );
                  const rataRata = totalNilai / totalData.length;
                  const nilai = Math.round(rataRata);

                  if (nilai >= 70) return "Naik kelas tanpa syarat";
                  else if (nilai >= 50) return "Naik kelas dengan syarat";
                  else return "Tinggal kelas";
                })()}
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

              <table className="nilai-table">
                <tbody>
                  {dataKeterampilanKelas.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.no}</td>
                      <td>{subject.mapel}</td>
                      <td>{subject.kode}</td>
                      <td>{subject.semester}</td>
                      <td>
                        <NilaiLingkaran huruf={subject.huruf} />{" "}
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
  );
};

export default Nilai;