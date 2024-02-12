// InstancePage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import shelterData from '../Shelters/shelterData.json'
import countyData from '../Counties/countyData.json'
import eventData from '../Events/eventData.json'

import './InstancePage.css'; // Make sure to create a corresponding CSS file

const InstancePage = () => {
  let { type, id } = useParams(); // Assuming the route is something like '/:type/:id'
  let instanceData;

  switch (type) {
    case 'shelters':
      instanceData = shelterData.shelters.find(item => item.id.toString() === id);
      break;
    case 'counties':
      instanceData = countyData.counties.find(item => item.id.toString() === id);
      break;
    case 'events':
      instanceData = eventData.events.find(item => item.id.toString() === id);
      break;
    default:
      return <div className="instance-not-found">Page type not recognized{type}yuh</div>;
  }

  if (!instanceData) {
    return <div className="instance-not-found">Instance not found</div>;
  }

  // Rendering logic can be further customized based on the type
  return (
    <div className="instance-page">
      <h1 className="instance-title">{instanceData.title}</h1>
      {instanceData.image && (
        <div className="instance-image-container">
          <img src={instanceData.image} alt={instanceData.title} className="instance-image"/>
        </div>
      )}
      <div className="instance-description">{instanceData.description}</div>
      
      {/* Additional details based on type */}
      {type === 'counties' && (
        <div className="instance-stats">
          <h2>Statistics</h2>
          <p>Total Population: {instanceData.total_population.toLocaleString()}</p>
          <p>Homeless Population: {instanceData.homeless_population.toLocaleString()}</p>
        </div>
      )}
      {type === 'events' && (
        <div className="instance-details">
          <h2>Event Details</h2>
          <p>Date: {instanceData.date}</p>
          <p>Time: {instanceData.time}</p>
        </div>
      )}
      {/* Map only makes sense for counties, so it's conditional on being a county page */}
      {type === 'counties' && instanceData.map && (
        <div className="instance-map-container">
          <h2>County Map</h2>
          <img src={instanceData.map} alt={`${instanceData.title} Map`} className="instance-map"/>
        </div>
      )}
    </div>
  );
};

export default InstancePage;
