import React from "react";
import "./Visuals.css";
import BarPlot from "./OurVisuals/barplot.jsx";

const VisualizationsPage = () => {
  return (
    <div className="our-visuals">
      <h1>Visualizations</h1>
      <h3>Visual #1 - Number of Shelters by City</h3>
      <div className="graph">
        <BarPlot />
      </div>
    </div>
  );
};

export default VisualizationsPage;
