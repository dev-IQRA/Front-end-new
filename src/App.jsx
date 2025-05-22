import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./context/UserContext";
import { MateriProvider } from "./context/MateriContext"; // Import MateriProvider
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <UserProvider>
      <MateriProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MateriProvider>
    </UserProvider>
  );
}

export default App;