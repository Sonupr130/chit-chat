import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'
import Sidebar from './components/Sidebar.jsx'
import LandingPage from './pages/LandingPage.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/main' element={<LandingPage />} />
    </Routes>
  )
}

export default App
