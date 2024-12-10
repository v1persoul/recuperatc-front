import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'
import NavBar from "./components/NavBar"
import Start from "./Start"
import './App.css'

function App() {
  return (
    <><NavBar />
      <Routes>
        <Route path="/signup" element={<SignUp />}/>

        <Route path="/inicio" element={<Start />}/>

        <Route path="/" element={<Login />}/>
      </Routes>
    </>

  )
}
export default App