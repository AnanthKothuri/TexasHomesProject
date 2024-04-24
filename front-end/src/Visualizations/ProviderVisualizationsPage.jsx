import React from "react";
import "./Visuals.css";
import ScatterPlot from "./ProviderVisuals/scatterplot.jsx";
import BarGraph from "./ProviderVisuals/bargraph.jsx";
import PieChart from "./ProviderVisuals/piechart.jsx";
// Import D3 visualizations similar to this:

// import Visual1 from "./ProviderVisuals/Visual1.js";
// import Visual2 from "./ProviderVisuals/Visual2.js";
// import Visual3 from "./ProviderVisuals/Visual3.js";

const ProviderVisualizationsaPage = () => {
  return (
    <div className="provider-visuals">
      <h1>Provider Visualizations</h1>

      <h3>Number of Homes In Counties Per Population</h3>
      <div className="graph">
        <ScatterPlot />
      </div>

      <h3>Most Common Types of Organizations</h3>
      <div className="graph">
        <BarGraph />
      </div>

      <h3>Amounts Of Different Types Of Resources</h3>
      <div className="graph">
        <PieChart />
      </div>

      {/* Critiques */}

      <div className="other-critiques">
        <h1>Other Critique</h1>
        
      </div>
    </div>
  );
};

export default ProviderVisualizationsaPage;
