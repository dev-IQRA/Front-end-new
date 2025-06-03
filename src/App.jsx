import React, { useContext } from "react";
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./context/UserContext.jsx";
import { UserContext } from "./context/UserContext.js";
import { MateriProvider } from "./context/MateriContext";
import AppRoutes from "./routes/AppRoutes";

const AppContent = () => {
  const { loading } = useContext(UserContext);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return <AppRoutes />;
};

function App() {
  return (
    <UserProvider>
      <MateriProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </MateriProvider>
    </UserProvider>
  );
}

export default App;