import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Layout({ userData, setUserDate }) {
  let navigate = useNavigate()

  function logOut() {
    localStorage.removeItem('userToken')
    setUserDate(null);
    navigate('/login')
  }
  return <>
    <Navbar logOut={logOut} userData={userData} />
    <div className="container">
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}
