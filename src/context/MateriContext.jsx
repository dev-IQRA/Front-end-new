import React, { createContext, useState } from "react";

// Membuat context
const MateriContext = createContext();
export {MateriContext};

// Provider untuk membungkus App
export const MateriProvider = ({ children }) => {
  const [materiList, setMateriList] = useState([]);

  // Fungsi untuk menambah materi baru
  const addMateri = (materi) => {
    setMateriList((prev) => [...prev, materi]);
  };

  return (
    <MateriContext.Provider value={{ materiList, addMateri }}>
      {children}
    </MateriContext.Provider>
  );
};