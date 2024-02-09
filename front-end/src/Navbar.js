import './App.css'
import React from 'react';
import { useLocation } from 'react-router-dom';

function NavBar() {
    const location = useLocation();

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ padding: '15px' }}>
        <a className="navbar-brand" href="/">Texas Homes Project</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">

            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} style={{ borderRadius: '7px' }}>
                <a className="nav-link" href="/" style={{ padding: '10px'}}>Home</a>
            </li>
            <li className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`} style={{ borderRadius: '7px' }}>
                <a className="nav-link" href="/about" style={{ padding: '10px'}}>About</a>
            </li>
            <li className={`nav-item ${location.pathname === '/shelters' ? 'active' : ''}`} style={{ borderRadius: '7px' }}>
                <a className="nav-link" href="/shelters" style={{ padding: '10px'}}>Shelters</a>
            </li>
            <li className={`nav-item ${location.pathname === '/counties' ? 'active' : ''}`} style={{ borderRadius: '7px' }}>
                <a className="nav-link" href="/counties" style={{ padding: '10px'}}>Counties</a>
            </li>
            <li className={`nav-item ${location.pathname === '/events' ? 'active' : ''}`} style={{ borderRadius: '7px' }}>
                <a className="nav-link" href="/events" style={{ padding: '10px'}}>Events</a>
            </li>

          </ul>
        </div>
      </nav>
    );
  }
  

export default NavBar;