import React from 'react';
import {Container, Row, Col, Button, ListGroup, ListGroupItem} from 'react-bootstrap'
// Assuming slide1 and slide2 are correctly imported if they are to be used in the HomePageCarousel component
import { MdNightShelter } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa"; // Adjusted import for consistency
import { FaLandmarkFlag } from "react-icons/fa6"; // Adjusted import for consistency
import Feature from '../components/Feature';
import HomePageCarousel from '../components/HomePageCarousel'; // Ensure this component is set up correctly to display the carousel
import graphImage from "../assets/home-page/graph.png"
import Colors from '../assets/Colors';

import './HomePage.css'

const HomePage = () => {
  const pageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  function getbuttonStyle(col) {
    return {
      backgroundColor: col, // Set your custom color here
      color: Colors.white, // Text color
      padding: '10px 10px', // Padding
      border: 'none', // Remove border
      borderRadius: '5px', // Rounded corners
      cursor: 'pointer', // Show pointer on hover
    }
  };
  

  return (
    <div style={pageContainerStyle}>
      <HomePageCarousel style={{ zIndex: -1 }} />

      <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
        <p style={{fontSize: 22, marginTop: 40, marginBottom: 20, textAlign: 'center'}}>Overview</p>
        <hr style={{ width: '40%', margin: '10px auto', borderColor: Colors.gray, borderWidth: '2px'}} />

        <Row xs='auto' md='auto' className="justify-content-md-center" style={{marginTop: 30, marginLeft: 40, marginRight: 40, marginBottom: 100}}>
          <Col className="text-center" style={{maxWidth: 400, textAlign: 'center', marginBottom: 30}}>
            <p>
              As of 2023, nearly 67,000 people in the state of Texas alone fell into homelessness. 
              Of those that are homeless, around 20% are unsheltered, meaning they have no place to
              go our sleep through the night. These are enormous numbers and are things we sometimes
              overlook as we go about our daily lives.
            </p>
            <p>
              Texas Homes Project hopes to assist individuals experiencing homelessness in Texas. 
              We hope to provide an internet platform that can connect people in need to homeless
              shelters, raise awareness for organizations working to assist homeless populations, 
              and highlight local volunteer opportunities to aid homeless individuals.
            </p>
          </Col>
          <Col className="text-center" style={{maxWidth: 400, marginBottom: 30}}>
            <img src={graphImage} alt="Homelessness graph" width={'100%'}/>
          </Col>
        </Row>
      </div>

      <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', backgroundColor: Colors.beige}}>
        <p style={{fontSize: 22, marginTop: 60, marginBottom: 20, textAlign: 'center'}}>Details</p>
        <hr style={{ width: '40%', margin: '10px auto', borderColor: Colors.gray, borderWidth: '2px'}} />

        <Row className="justify-content-md-center" style={{marginTop: 30, marginLeft: 40, marginRight: 40, marginBottom: 100}}>
          <Col className="text-center" style={{maxWidth: 300, marginBottom: 30}}>
            <p style={{fontSize: 18}}>Shelters</p>
            <p>&#8226; Homeless shelters located throughout Texas<br/>&#8226; Contains information on contact, websites, descriptions, etc.</p>

            <button style={getbuttonStyle(Colors.lightBlue)}>View Shelters</button>
          </Col>

          <Col className="text-center" style={{maxWidth: 300, marginBottom: 30}}>
            <p style={{fontSize: 18}}>Counties</p>
            <p>&#8226; Texas counties and their data about homelessness<br/>&#8226; Contains information on county desciptions, housing units, population, and more.</p>

            <button style={getbuttonStyle(Colors.lightYellow)}>View Counties</button>
          </Col>

          <Col className="text-center" style={{maxWidth: 300, marginBottom: 30}}>
            <p style={{fontSize: 18}}>Events</p>
            <p>&#8226; Volunteering events in Texas for homelessness<br/>&#8226; Contains about locations, dates, details, and requirements.</p>

            <button style={getbuttonStyle(Colors.lightRed)}>View Events</button>
          </Col>

        </Row>
      </div>

      {/* <Row xs='auto' md='auto' className="justify-content-md-center" style={{paddingTop: 30, paddingBottom: 100}}>
        <Col style={{backgroundColor: Colors.darkGray,}}>
          <p>Resouces</p>
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </Col>

        <Col style={{backgroundColor: Colors.white}}>
          <p>Resouces</p>
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </Col>
      </Row> */}
    </div>
  );
}

export default HomePage;
