import { useState, } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react'
import './App.css'
import SignUp_page from './Pages/SignUp_page'
import Login_page from './Pages/Login_page';
import Dashboard from './Pages/Dashboard';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login_page />} />
        <Route path="/signup" element={<SignUp_page/>} />
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App