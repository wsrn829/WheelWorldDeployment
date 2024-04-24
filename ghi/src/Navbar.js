import React, { useState, useContext } from 'react';
import AuthContext from './AuthContext';
import { NavLink, Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
  const {isLoggedIn, setIsLoggedIn, handleLogin, handleLogout} = useContext(AuthContext);


  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">WHEELWORLD</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <NavLink className="nav-link active" to="/">HOME</NavLink>
              </li>


          <li className="nav-item dropdown">
            <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              INVENTORY
            </NavLink>
            <ul className="dropdown-menu">
              <li><NavLink className="dropdown-item" to="/manufacturers/create">Add Manufacturer</NavLink></li>
              <li><NavLink className="dropdown-item" to="/manufacturers">Manufacturers</NavLink></li>
              <li><hr className="dropdown-divider" /></li>
              <li><NavLink className="dropdown-item" to="/models/create">Add Car Model</NavLink></li>
              <li><NavLink className="dropdown-item" to="/models">Car Models</NavLink></li>
              <li><hr className="dropdown-divider" /></li>
              <li><NavLink className="dropdown-item" to="/automobiles/create">Add Automobile</NavLink></li>
              <li><NavLink className="dropdown-item" to="/automobiles">Automobiles</NavLink></li>
            </ul>
          </li>

            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                SERVICES
              </NavLink>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/technicians/create">Add Technician</NavLink></li>
                <li><NavLink className="dropdown-item" to="/technicians">Technicians</NavLink></li>
                <li><hr className="dropdown-divider" /></li>
                <li><NavLink className="dropdown-item" to="/appointments/create">Add Service Appointment</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments">Service Appointments</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/history">Service History</NavLink></li>
              </ul>
            </li>

          <li className="nav-item dropdown">
            <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              SALES
            </NavLink>
            <ul className="dropdown-menu">
              <li><NavLink className="dropdown-item" to="/salespeople/create">Add Salesperson</NavLink></li>
              <li><NavLink className="dropdown-item" to="/salespeople">Salespeople</NavLink></li>
              <li><hr className="dropdown-divider" /></li>
              <li><NavLink className="dropdown-item" to="/customers/create">Add Customer</NavLink></li>
              <li><NavLink className="dropdown-item" to="/customers">Customers</NavLink></li>
              <li><hr className="dropdown-divider" /></li>
              <li><NavLink className="dropdown-item" to="/sales/create">Add Sale</NavLink></li>
              <li><NavLink className="dropdown-item" to="/sales/">Sales</NavLink></li>
              <li><NavLink className="dropdown-item" to="/sales/history">Salesperson History</NavLink></li>
            </ul>
          </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" style={{ color: 'white' }}>LOGIN</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link" style={{ color: 'white' }}>REGISTER</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/logout" className="nav-link" style={{ color: 'white' }} onClick={handleLogout}>LOGOUT</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;