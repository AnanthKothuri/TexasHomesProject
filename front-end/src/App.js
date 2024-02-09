import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './Home/HomePage';
import AboutPage from './About/AboutPage';
import SheltersPage from './Shelters/SheltersPage';
import CountiesPage from './Counties/CountiesPage';
import EventsPage from './Events/EventsPage';
import NavBar from './Navbar';

function App() {
  return (
    <Router>
      <div>
        <NavBar/>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shelters" element={<SheltersPage />} />
          <Route path="/counties" element={<CountiesPage />} />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
