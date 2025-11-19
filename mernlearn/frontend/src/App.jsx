import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
import NoteDetailPage from "./pages/NoteDetailPage"
import Navbar from "./components/navbar"
import toast from "react-hot-toast"

const App = () => {
  return (
    <div data-theme="forest">  {/* the theme is from the daisyui in tailwind.config.js */}
      {/* 
      <button onClick={()=>{toast.success("congrats")}} className="text-red-500 p-4 bg-pink-300">Click me</button>
      <button onClick={()=>{toast.error("bruh")}}>Dont Click me</button> 
      */}
      {/* <button className="btn btn-outline">Click me</button> */}
      {/* https://v4.daisyui.com/components/button/ see such components in documentation, copy jsx code and use */}
      {/* https://v4.daisyui.com/docs/themes/ check out, 
      go to tailwind.congif.js and below plugins add the code from documentation and include your theme */}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  )
}

export default App
