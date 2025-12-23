import Homepage from "./pages/Homepage.jsx"
import { Routes, Route } from 'react-router-dom'
import AuthPage from "./components/Auth.jsx"
import UserDashboard from "./pages/UserDashboard.jsx"
import BusinessAuthDashboard from "./pages/BusinessAuthDashboard.jsx"

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/userDashboard" element={<UserDashboard />} />
      <Route path="/business" element={<BusinessAuthDashboard />} />

    </Routes>
  )
}

export default App
