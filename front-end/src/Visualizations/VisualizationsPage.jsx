import React from "react";
import "./Visuals.css";
import BarPlot from "./OurVisuals/barplot.jsx";
import Histogram from "./OurVisuals/histogram.jsx";
import LollipopChart from "./OurVisuals/lollipop.jsx";  // Assuming the component is in this path

const VisualizationsPage = () => {
  const critiques = [
    [
      "What did we do well?",
      "We exceeded in managing our time, communicating with one another, and delegating tasks among each member of the team. We clearly established our roles within the team, allowing us to develop a dynamic, well-polished website to help support the Texas homeless population.",
    ],
    [
      "What did we learn?",
      "None of us had any prior experience with web development, so this semester-long project taught us the fundamentals of what it takes to build a website from scratch. Not only did we learn technical skills such as React.js, AWS, and Flask, but we also learned about this underserved community.",
    ],
    [
      "What did we teach each other?",
      "As we divided our team into two subteams (frontend and backend), these subteams allowed us to develop strong communication skills between those peers focusing on the same skills as we are, and across to debugging our code with the neighboring subteam.",
    ],
    [
      "What can we do better?",
      "For future progress, we would like to improve our site for optimizing performance. Particularly, we'd like to improve the efficiency of our filter/search algorithms to have less latency.",
    ],
    [
      "What effect did the peer reviews have?",
      "The peers reviews were fundamental in establishing healthy team member responsibility. These held us accountable to make sure we each pulled our weight on this project.",
    ],
    [
      "What puzzles us?",
      "Currently, the greatest thing puzzling us is figuring out what we'd like to do next with this project, especially since we are nearing the end of this semester. What's next? That's what puzzles us.",
    ],
  ];

  return (
    <div className="our-visuals">
      <h1>Visualizations</h1>
      <h3>Number of Shelters by City</h3>
      <div className="graph">
        <BarPlot/>
      </div>
      <h3>County Population vs. Total Housing Units</h3>
      <div className="graph">
        <Histogram/>
      </div>
      <h3>Shelters per Zip Code</h3>
      <h5>*zip codes not listed only have 1 shelter*</h5>
      <div className="graph">
        <LollipopChart/>
      </div>
      {/* Critiques */}
      <div className="our-critiques">
        <h1>Self Critique</h1>
        {critiques.map((item, index) => (
          <div className="critique-item-wrapper">
            <div className="critique-question" key={index}>
              {item[0]}
            </div>
            <div className="critique-answer" key={index}>
              {item[1]}
            </div>
          </div>
        ))}
      </div>
      <div style={{ paddingBottom: 20 }} />
    </div>
  );
};

export default VisualizationsPage;
