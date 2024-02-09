import React from 'react';
import './Card.css'; // Make sure to create a corresponding CSS file for styling

function Card({ image, title, description, buttonText }) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="card-button">{buttonText}</button>
      </div>
    </div>
  );
}

export default Card;
