import React from 'react'
import Navbar from "../components/Navbar";
const Home = () => {
  return (
    <div className='min-h-screen bg-slate-500 flex flex-col ' >
      
      <Navbar />
      <h1 className='m-8 font-serif text-3xl text-center text-white p-6'>NOTES MANAGEMENT APP</h1>
    </div>
  )
}

export default Home
