import React from "react";
import "./Visuals.css";
import BarPlot from "./OurVisuals/barplot.jsx";
import Histogram from "./OurVisuals/histogram.jsx";
import LollipopChart from "./OurVisuals/lollipop.jsx";  // Assuming the component is in this path

const VisualizationsPage = () => {
  return (
    <div className="our-visuals">
      <h1>Visualizations</h1>
      <h3>Number of Shelters by City</h3>
      <div className="graph">
        <BarPlot />
      </div>
      <h3>County Population vs. Total Housing Units</h3>
      <div className="graph">
        <Histogram />
      </div>
      <h3>Lollipop Chart of Counties per Zip Code</h3>
      <div className="graph">
        <LollipopChart />
      </div>
    </div>
  );
};

export default VisualizationsPage;
