import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import mainImage from "../assets/home-page/homemainimage.jpg";
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
          <p style={{width: 550}}>
            As of 2023, nearly 67,000 people in the state of Texas alone fell into homelessness. 
            Of those that are homeless, around 20% are unsheltered, meaning they have no place to
            go our sleep through the night. These are enormous numbers and are things we sometimes
            overlook as we go about our daily lives.
          </p>
          <p style={{width: 550}}>
            Texas Homes Project hopes to assist individuals experiencing homelessness in Texas. 
            We hope to provide an internet platform that can connect people in need to homeless
            shelters, raise awareness for organizations working to assist homeless populations, 
            and highlight local volunteer opportunities to aid homeless individuals.
          </p>
        </Col>

        <Col style={{ fontSize: '1.2em' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ marginBottom: 5, fontSize: 25 }}>
              At a glance,
            </p>
          </div>
          {/* Display info for "Shelters", "Counties", "Events" with icons */}
          <Feature
            icon={<MdNightShelter style={{ color: "#0b2b68", fontSize: '1.5em' }}/>}
            text="Shelters"
            smalltext="There are X homeless shelters in Texas."
          />
          <Feature
            icon={<FaLandmarkFlag style={{ color: "#c91e40", fontSize: '1.2em' }}/>}
            text="Counties"
            smalltext="There are X counties in Texas."
          />
          <Feature
            icon={<FaHandsHelping style={{ color: "#1d66b5", fontSize: '1.3em' }}/>}
            text="Events"
            smalltext="There are X upcoming volunteer events."
          />
        </Col>
      </Row>

    </div>
  );
}

export default HomePage;
