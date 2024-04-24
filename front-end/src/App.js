import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./Home/HomePage";
import AboutPage from "./About/AboutPage";
import SheltersPage from "./Shelters/SheltersPage";
import CountiesPage from "./Counties/CountiesPage";
import EventsPage from "./Events/EventsPage";
import NavBar from "./components/Navbar";
import VisualizationsPage from "./Visualizations/VisualizationsPage";
import ProviderVisualizationsPage from "./Visualizations/ProviderVisualizationsPage";
import InstancePage from "./ModelTemplates/InstancePage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shelters" element={<SheltersPage />} />=
          <Route path="/counties" element={<CountiesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/visualizations" element={<VisualizationsPage />} />
          <Route
            path="/provider-visualizations"
            element={<ProviderVisualizationsPage />}
          />
          <Route path="/:type/:id" element={<InstancePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
