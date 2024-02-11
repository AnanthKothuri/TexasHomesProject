import React from 'react';
import mainImage from "../assets/homemainimage.jpg";
import slide1 from "../assets/homess1.jpg"; // Imported slide 1
import slide2 from "../assets/homess3.jpg"; // Imported slide 2
import { MdNightShelter } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa";
import { FaLandmarkFlag } from "react-icons/fa6"; // Check this import
import Slideshow from '../components/Slideshow';
import Feature from '../components/Feature'; // Assuming Feature component is correctly imported

const HomePage = () => {
  const slides = [slide1, slide2]; // Updated slides array

  const pageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
    padding: '45px 150px',
  };

  const contentAndImageContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const textAndFeatureContainerStyle = {
    maxWidth: '600px',
    textAlign: 'left',
  };

  const imageStyle = {
    marginLeft: '20px',
    width: '80%',
    height: 'auto',
  };

  return (
    <div style={pageContainerStyle}>
      <div style={contentAndImageContainerStyle}>
        <div style={textAndFeatureContainerStyle}>
          <h2 style={{ marginBottom: '20px' }}>Texas Homes Project</h2>
          <p>Texas Homes Project hopes to assist individuals experiencing homelessness in Texas...</p>
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
            icon={<FaHandsHelping />}
            iconBg="#FFFFFF"
            text="Events"
            smalltext="There are X upcoming volunteer events."
          />
        </div>
        <img src={mainImage} alt="Descriptive Alt Text" style={imageStyle} />
      </div>
      <Slideshow slides={slides} interval={5000} />
    </div>
  );
}

export default HomePage;
