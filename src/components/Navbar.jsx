import React from 'react'
import {AiFillYoutube} from 'react-icons/ai'
import Search from './Search'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
const navigate = useNavigate();
const baseURL = import.meta.env.BASE_URL

  const handleClick = () => {
    
    navigate(`${baseURL}`);
  }
  return (
    <div className='navbar'>
      <button onClick={handleClick}>Home</button>
      <div>Navbar Playlist Shuffle <AiFillYoutube /></div>
    </div>
  )
}

export default Navbar