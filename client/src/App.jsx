import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'
import Sidebar from './components/Sidebar.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ProfileSetup from './pages/ProfileSetup.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/main' element={<LandingPage />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
    </Routes>
  )
}

export default App
