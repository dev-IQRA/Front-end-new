import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
        }}>
            <h1>404</h1>
            <h2>Halaman Tidak Ditemukan</h2>
            <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>
            <Link to="/login" style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: "5px",
            }}> 
                kembali ke Halaman Login
            </Link>
        </div>
    );
};

export default NotFound;