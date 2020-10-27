import React from 'react'
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  // let links = (
  //   <>
  //   <li className="nav-item">
  //     <NavLink exact to="/" className="nav-link">Home</NavLink>
  //   </li>
  //   <li className="nav-item">
  //     <NavLink to="/profile" className="nav-link">Profile</NavLink>
  //   </li>
  //   </>
  // )
  // if(
  //   !localStorage.getItem('access_token') ||
  //   !localStorage.getItem('refresh_token')
  // ) {
  //   links = (
  //     <li className="nav-item">
  //       <NavLink exact to="/" className="nav-link">Home</NavLink>
  //     </li>
  //   )
  // }

  return (
    <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
      <ul className="navbar-nav">
        {/* { links } */}
        <li className="nav-item">
          <NavLink exact to="/" className="nav-link">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/profile" className="nav-link">Profile</NavLink>
        </li>
      </ul>
    </nav>
  )
}