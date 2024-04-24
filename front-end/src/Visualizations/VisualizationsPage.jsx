import React from "react";
import "./Visuals.css";

// Import D3 visualizations similar to this:

// import Visual1 from "./OurVisuals/Visual1.js";
// import Visual2 from "./OurVisuals/Visual2.js";
// import Visual3 from "./OurVisuals/Visual3.js";

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
      <h3>Visual #1</h3>
      <div className="graph">
        <></>
      </div>
      <h3>Visual #2</h3>
      <div className="graph">
        <></>
      </div>
      <h3>Visual #3</h3>
      <div className="graph">
        <></>
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
