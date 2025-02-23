
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import LandingPage from './components/Landingpage/LandingPage'
import OnboardingForm from './components/onBoard/OnboardingForm'
import MainLayout from './components/Layout/MainLayout'
import LinksPage from './pages/Links/LinksPage'

const App = () => {
  return (
    <>
     
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/onboard' element={<OnboardingForm/>} />
          <Route path='/main' element={<MainLayout/>} />
          <Route path="/links" element={<LinksPage/>} />
        </Routes>
   
    </>
  )
}

export default App
