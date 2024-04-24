import React from "react";
import "./Visuals.css";
import ScatterPlot from "./ProviderVisuals/scatterplot.jsx";
import BarGraph from "./ProviderVisuals/bargraph.jsx";
import PieChart from "./ProviderVisuals/piechart.jsx";

const critiques = [
  [
    "What did they do well?",
    "This group created a very clean, professional website that highlights all the resources and opportunities to help foster children. They consistently finished the user stories we gave them and communicated when it was needed, and overall they functioned well as a team and with us.",
  ],
  [
    "How effective was their RESTful API?",
    "Their API was extremely helpful and clear, making it very easy for us to display our visuals. They provided example calls to their API which also helped, and there was no confusion or errors when we utilized their API in this proejct.",
  ],
  [
    "How well did they implement your use stories?",
    "User stories were never a problem, and they would implement them to the best of their abilities each time. Even when our group was running behind and sent our stories later than usual, they would still do a great job with completing them or asking us questions if there was any confusion.",
  ],
  [
    "What did we learn from their website?",
    "Their website was about foster children and through it we were able to learn about the various organizations and resources that support them. Their visualizations were also helpful in displaying the number of foster homes per county as well as the organization ratings.",
  ],
  [
    "What can they do better?",
    "From us as their customer team, there weren't many significant problems we faced that we thought they should improve. Their website is very polished and clean, and they communicated to us very well.",
  ],
  [
    "What puzzles us about their website?",
    "Honestly, nothing puzzles us about their website. They finished completed every part required, their navigation is smooth and easy to understand, and their UI wasn't distracting. Maybe the only thing thats a little puzzling is their color schemes, but that's more of personal preference than an actual problem.",
  ],
];

const ProviderVisualizationsaPage = () => {
  return (
    <div className="provider-visuals">
      <h1 style={{fontFamily: 'NotoSans-Bold'}}>Provider Visualizations</h1>

      <h3 style={{fontFamily: 'NotoSans'}}>Number of Homes In Counties Per Population</h3>
      <div className="graph">
        <ScatterPlot />
      </div>

      <h3 style={{fontFamily: 'NotoSans'}}>Most Common Types of Organizations</h3>
      <div className="graph">
        <BarGraph />
      </div>

      <h3 style={{fontFamily: 'NotoSans'}}>Amounts Of Different Types Of Resources</h3>
      <div className="graph">
        <PieChart />
      </div>

      {/* Critiques */}
      <div className="our-critiques">
        <h1 style={{fontFamily: 'NotoSans-Bold'}}>Critique</h1>
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
      <div style={{ paddingBottom: 80 }} />
    </div>
  );
};

export default ProviderVisualizationsaPage;
