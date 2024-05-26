import React from 'react';
import {useNavigate} from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import "./Header.css"
const Header = () => {
  const navigate = useNavigate()
  const userName = localStorage.getItem("user_name")
  const logoutHandler = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    navigate("/")
  }
  return (
    <div className='headerContainer'>
      <div className='logo-container'>
        <h1>TM</h1>
      </div>
      <div className='content-container'>
      <CiLogout onClick={() => logoutHandler()} className='logoutButton' />
        <div className='user-icon'>
        {userName.slice(0,1 )}
        </div>
      </div>
    </div>
  )
}

export default Header
