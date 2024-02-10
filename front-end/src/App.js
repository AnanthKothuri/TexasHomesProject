import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './Home/HomePage';
import AboutPage from './About/AboutPage';
import SheltersPage from './Shelters/SheltersPage';
import CountiesPage from './Counties/CountiesPage';
import EventsPage from './Events/EventsPage';
import NavBar from './Navbar';
import InstancePage from './ModelTemplates/InstancePage';

function App() {
  return (
    <Router>
      <div>
        <NavBar/>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shelters" element={<SheltersPage />} />
          <Route path="/:type/:id" element={<InstancePage />} />
          <Route path="/counties" element={<CountiesPage />} />
          <Route path="/:type/:id" element={<InstancePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/:type/:id" element={<InstancePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
