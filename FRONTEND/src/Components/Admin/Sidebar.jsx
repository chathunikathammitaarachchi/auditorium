import React from 'react'
import {  BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, 
BsPeopleFill, BsListCheck, BsMenuButtonWideFill, BsFillGearFill } from 'react-icons/bs'
import { AiOutlineUser } from "react-icons/ai";

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

function Sidebar({openSidebarToggle,OpenSidebar}) {
    const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(res =>  {
      if (res.data.status){
        navigate('/login')
      }
    }).catch(err => {
      console.log(err)
    })
  }
    
  

  return (

    <aside id='sidebar' className={openSidebarToggle ? "sidebar-responsive": ""}>

        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <AiOutlineUser className='icon_header'/>PROFILE
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>
        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="./signup">
                    <BsGrid1X2Fill className='icon'/> Admin signup
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillArchiveFill className='icon'/> Services
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsFillGrid3X3GapFill className='icon'/>  Penalties
                </a>
            </li>
            <li className='sidebar-list-item'>
                <Link to="./usersignup" >
                    <BsPeopleFill className='icon'/> Users
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsListCheck className='icon'/> Booking Inventory
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="">
                    <BsMenuButtonWideFill className='icon'/> Approval Forms
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href="/">
                    <BsFillGearFill className='icon'/> Setting
                </a>
            </li>
           
            <button onClick={handleLogout}>Logout</button>
        </ul>
       
    </aside>
  )
}

export default Sidebar
