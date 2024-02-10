import React from 'react';
import mainImage from "../assets/homemainimage.jpg";
import { MdNightShelter } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa";
import { FaLandmarkFlag } from "react-icons/fa6";

const Feature = ({ smalltext, text, icon, iconBg }) => {
  const stackStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const flexStyle = {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: iconBg,
  };

  const textStyle = {
    fontWeight: 600,
  };

  const smallTextStyle = {
    fontWeight: 200,
  };

  return (
    <div style={stackStyle}>
      <div style={flexStyle}>{icon}</div>
      <span style={textStyle}>{text}</span>
      <span style={smallTextStyle}>{smalltext}</span>
    </div>
  );
};

const HomePage = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '45px 150px 100px 150px',
    boxSizing: 'border-box',
    height: '100vh',
  };

  const textAndFeatureContainerStyle = {
    maxWidth: '600px', // Adjust based on your content's needs
    textAlign: 'left',
  };

  const imageStyle = {
    marginLeft: '20px',
    width: '50%',
    height: 'auto',
  };

  return (
    <div style={containerStyle}>
      <div style={textAndFeatureContainerStyle}>
        <h2 style={{ marginBottom: '20px' }}>Texas Homes Project</h2>
        <p>Texas Homes Project hopes to assist individuals experiencing homelessness in Texas. We hope to provide an internet platform that can connect people in need to homeless shelters, raise awareness for organizations working to assist homeless populations, and highlight local volunteer opportunities to aid homeless individuals.</p>
        <Feature
          icon={<MdNightShelter />}
          iconBg="#FFFFFF"
          text="Shelters"
          smalltext="There are X homeless shelters in the state of Texas."
        />
        <Feature
          icon={<FaLandmarkFlag />}
          iconBg="#FFFFFF"
          text="Counties"
          smalltext="There are X counties in the state of Texas."
        />
        <Feature
          icon={<FaHandsHelping/>}
          iconBg="#FFFFFF"
          text="Events"
          smalltext="There are X upcoming volunteer events."
        />
      </div>
      <img src={mainImage} alt="Descriptive Alt Text" style={imageStyle} />
    </div>
  );
}

export default HomePage;
