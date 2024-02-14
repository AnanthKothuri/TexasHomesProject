import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
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
    // minHeight: '100vh',
    // padding: '45px 150px',
  };
  

  return (
    <div style={pageContainerStyle}>
      <Container fluid style={{ position: 'relative', textAlign: 'center' }}>
        <HomePageCarousel style={{ zIndex: 1 }} />
      </Container>

      <Row md='auto' style={{margin: 80, justifyContent: 'center'}}>
        <Col>
          <p style={{width: 550}}>As of 2023, nearly 67,000 people in the state of Texas alone fell into homelessness. Of those that are homeless, around 20% are unsheltered, meaning they have no place to go our
          sleep through the night. These are enormous numbers and are things we sometimes overlook as we go about 
          our daily lives.</p>
          <p style={{width: 550}}>Texas Homes Project hopes to assist individuals experiencing homelessness in Texas. 
              We hope to provide an internet platform that can connect people in need to homeless shelters, raise awareness for organizations working to assist homeless populations, 
              and highlight local volunteer opportunities to aid homeless individuals.</p>
        </Col>

        <Col>
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
        </Col>
      </Row>

    </div>
  );
}

export default HomePage;
