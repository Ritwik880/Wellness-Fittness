import React from 'react'
import './App.css'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Cards from './Components/Cards'
import Footer from './Components/Footer'
const App = () => {
  return (
    <>
      <Navbar/>
      <Home/>
      <Cards/>
      <Footer/>
    </>
  )
}

export default App