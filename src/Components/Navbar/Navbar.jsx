import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar({ userData, logOut }) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid">
          <Link className="navbar-brand text-light" to='/'><h3>Noxe</h3></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">

            {/* {userData ? */}

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : " nav-link"} aria-current="page" to='/MoviesDB'>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : " nav-link"} to='movies'>Movies</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : " nav-link"} to='Tvshow'>Tvshow</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : " nav-link"} to='people'>People</NavLink>
              </li>
            </ul>
            {/* //  : ""} */}


            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">

              <li className="nav-item d-flex align-items-center">
                <i className='fab mx-2 fa-facebook'></i>
                <i className='fab mx-2 fa-twitter'></i>
                <i className='fab mx-2 fa-instagram'></i>
                <i className='fab mx-2 fa-soundcloud'></i>
              </li>

              {/* {userData ?  */}
              <li className="nav-item">
                <span className="nav-link">Logout</span>
              </li>
              {/* : */}
              <>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : " nav-link"} to={'register'}>Register</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className={({ isActive }) => isActive ? "nav-link active" : " nav-link"} to={'login'}>Login</NavLink>
                </li>
              </>
              {/* } */}
            </ul>


          </div>
        </div>
      </nav>
    </div>
  )
}
