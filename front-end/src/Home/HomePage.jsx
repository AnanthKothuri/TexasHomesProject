import React from 'react';
import mainImage from"../assets/homemainimage.jpg";
const HomePage = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: '20px', 
  };

  const textStyle = {
    flex: 1,
    marginRight: '20px', 
  };

  const imageStyle = {
    width: '50%', // Sets the image width to 50% of the container
    height: 'auto', 
  };

  return (
    <div style={containerStyle}>
      <div style={textStyle}>
        <h2>Texas Homes Project</h2>
        <p>Test.</p>
      </div>
      <img src={mainImage} alt="test" style={imageStyle} />
    </div>
  );
}

export default HomePage;