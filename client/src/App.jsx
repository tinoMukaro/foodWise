import Homepage from "./components/Homepage"
import { Routes, Route } from 'react-router-dom'
import AuthPage from "./components/Auth.jsx"
function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default App
