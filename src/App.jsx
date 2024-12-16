import React from "react"
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'
import NavBar from "./components/NavBar"
import Start from "./Start"
import MapaCurricular from "./MapaCurricular"
import Profile from "./Profile"
import ProtectedRoute from "./ProtectedRoute"
import './App.css'

function App() {
  return (
    <><NavBar />
      <Routes>
        <Route path="/signup" element={<SignUp />}/>

        <Route path="/inicio" element={
          <ProtectedRoute>
          <Start />
          </ProtectedRoute>
          }/>

        <Route path="/" element={<Login />}/>

        <Route path="/mapa" element={<MapaCurricular />}/>

        <Route path="/perfil" element={<Profile/>}/>
      </Routes>
    </>

  )
}
export default App