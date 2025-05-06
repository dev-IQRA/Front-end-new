import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './component/login-page/login-page'
import Dashboard from './component/dashboard/dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
