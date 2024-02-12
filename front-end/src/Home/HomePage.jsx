import React from 'react';
import mainImage from "../assets/homemainimage.jpg";
// Assuming slide1 and slide2 are correctly imported if they are to be used in the HomePageCarousel component
import { MdNightShelter } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa"; // Adjusted import for consistency
import { FaLandmarkFlag } from "react-icons/fa6"; // Adjusted import for consistency
import Feature from '../components/Feature';
import HomePageCarousel from '../components/HomePageCarousel'; // Ensure this component is set up correctly to display the carousel

const HomePage = () => {
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
          <p>Texas Homes Project hopes to assist individuals experiencing homelessness in Texas. 
            We hope to provide an internet platform that can connect people in need to homeless shelters, raise awareness for organizations working to assist homeless populations, 
            and highlight local volunteer opportunities to aid homeless individuals.</p>
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
        <HomePageCarousel />
      </div>
      {/* Carousel goes here, below the text/features and image but within the page container */}

    </div>
  );
}

export default HomePage;
