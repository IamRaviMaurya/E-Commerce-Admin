import React from 'react'
import './Navbar.css'
import nav_log from '../../assets/nav-logo.svg'
import nav_profile from '../../assets/nav-profile.svg'


const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={nav_log} alt="" className='nav-logo'/>
      <img src={nav_profile} alt="" className='nav-profile' />
    </div>
  )
}

export default Navbar
