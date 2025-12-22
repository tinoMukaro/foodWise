import Homepage from "./pages/Homepage.jsx"
import { Routes, Route } from 'react-router-dom'
import AuthPage from "./components/Auth.jsx"
import UserDashboard from "./pages/UserDashboard.jsx"

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/userDashboard" element={<UserDashboard />} />

    </Routes>
  )
}

export default App
