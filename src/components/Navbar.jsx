import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-black text-white font-serif '>
      <nav className='border border-spacing-2 mt-3 rounded ' >
        <ul className='flex justify-between items-center p-6 m-2'>
            <li className='hover:bg-green-600 px-3'><Link to={'/'}>Home</Link></li>
            <li className='hover:bg-green-600 px-3'><Link to={'/signup'}>Signup</Link></li>
            <li className='hover:bg-green-600 px-3'><Link to={'/login'}>Login</Link></li>
            <li className='hover:bg-green-600 px-3'><Link to={'/notes'}>Notes</Link></li>
            <li className='hover:bg-green-600 px-3'><Link to={'/create'}>Create</Link></li>
            
            
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
