import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/Home'
import Signin from './pages/Signin'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import CompleteAction from './pages/CompleteAction'
import Dashboard from './pages/CourseDashboard'

function AppContent() {
  const { user, logout } = useAuth()
  const location = useLocation()

  // Don't show navbar on auth pages
  const showNavbar = !['/signin', '/register', '/forgot-password', '/reset-password', '/verify-email', '/complete-action', '/dashboard'].includes(location.pathname)

  return (
    <div className="min-h-screen bg-gray-100">
      {showNavbar && <Navbar user={user} handleLogout={logout} />}

      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/complete-action" element={<CompleteAction />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App