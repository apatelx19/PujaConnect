import React, { useContext } from 'react'
import { PoojaContext } from './context/PoojaContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import UserDashboard from './pages/UserDashboard'
import PanditDashboard from './pages/PanditDashboard'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function App() {
  const { activeRole } = useContext(PoojaContext)

  const renderActivePage = () => {
    switch (activeRole) {
      case 'landing':
        return <LandingPage />
      case 'user':
        return <UserDashboard />
      case 'pandit':
        return <PanditDashboard />
      case 'admin':
        return <AdminDashboard />
      default:
        return <LandingPage />
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between' }}>
      <div>
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 200px)' }}>
          {renderActivePage()}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default App
