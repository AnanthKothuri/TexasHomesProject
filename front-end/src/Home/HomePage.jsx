import React from 'react';
import { Link } from 'react-router-dom';
import {Row, Col} from 'react-bootstrap'

import { MdNightShelter } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa"; // Adjusted import for consistency
import { FaLandmarkFlag } from "react-icons/fa6"; // Adjusted import for consistency
import Feature from '../components/Feature';
import HomePageCarousel from '../components/HomePageCarousel'; // Ensure this component is set up correctly to display the carousel
import graphImage from "../assets/home-page/graph.png"
import Colors from '../assets/Colors';

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
      fontFamily: "NotoSans-SemiBold"
    }
  };
  

  return (
    <div style={pageContainerStyle}>
      <HomePageCarousel style={{ zIndex: -1 }} />
      <div style={{flexDirection: 'row', display: 'flex', height: 20, backgroundColor: Colors.beige}}></div>

      <div style={{ display: 'flex', flexDirection: 'column'}}>
        {/* <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <hr style={{ width: '50%', margin: '10px auto', borderColor: 'gray', borderWidth: '2px' }} />
        </div> */}


        <Row xs='1' md='2' className="justify-content-md-center" style={{ marginTop: 50, marginLeft: '10%', marginRight: '10%', marginBottom: 100,}}>
          <Col  style={{marginBottom: 30, fontSize: 26}}>

            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <div style={{width: 10, height: 80, backgroundColor: Colors.beige, marginRight: 30}}></div>
              <p style={{fontSize: 60, fontWeight: 'bold', marginTop: 20, fontFamily: 'NotoSans-SemiBold'}}>Overview</p>
            </div>
            <hr style={{ width: '100%', marginBottom: 30, borderColor: 'gray', borderWidth: '2px' }} />
            
            <p style={{fontSize: 20, fontFamily: 'NotoSans'}}>
              As of 2023, nearly 67,000 people in the state of Texas alone fell into homelessness. 
              Of those that are homeless, around 20% are unsheltered, meaning they have no place to
              go our sleep through the night. These are enormous numbers and are things we sometimes
              overlook as we go about our daily lives.
            </p>
            <p style={{fontSize: 20, fontFamily: 'NotoSans'}}>
              Texas Homes Project hopes to assist individuals experiencing homelessness in Texas. 
              We hope to provide an internet platform that can connect people in need to homeless
              shelters, raise awareness for organizations working to assist homeless populations, 
              and highlight local volunteer opportunities to aid homeless individuals.
            </p>
          </Col>
          <Col className="text-center" style={{marginBottom: 30}}>
            <img src={graphImage} alt="Homelessness graph" width={'100%'}/>

            <iframe
              width="100%"
              height={300}
              src={"https://www.youtube.com/embed/29X_Kmd6Ewg?si=lyNTQo-A4NPDniDd"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded YouTube video"
            />

          </Col>
        </Row>
      </div>

      <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'column', backgroundColor: Colors.beige}}>
        <div style={{justifyContent: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {/* <hr style={{ width: '5%', borderColor: Colors.black, borderWidth: '2px' }} /> */}
          <p style={{fontSize: 30, fontWeight: 'bold', marginTop: 60, marginBottom: 20, textAlign: 'center', fontFamily: 'NotoSans-SemiBold'}}>Details</p>
          {/* <hr style={{ width: '5%', borderColor: Colors.black, borderWidth: '2px' }} /> */}
        </div>

        <hr style={{ width: '40%', margin: '10px auto', borderColor: Colors.gray, borderWidth: '2px'}} />

        <Row className="justify-content-md-center" style={{marginTop: 30, marginLeft: 40, marginRight: 40, marginBottom: 100}}>
          <Col className="text-center" style={{maxWidth: 250, marginBottom: 30}}>
            <div style ={{backgroundColor: Colors.semiBlue, padding: 20, borderRadius: 15}}>
              <p style={{fontSize: 18, fontFamily: 'NotoSans-SemiBold'}}>Shelters</p>
              <p style={{fontFamily: "NotoSans", fontSize: 15}}>&#8226; Homeless shelters located throughout Texas<br/>&#8226; Contains information on contact, websites, descriptions, etc.</p>
              
              <Link to="/shelters">
                <button style={getbuttonStyle(Colors.lightBlue)}>View Shelters</button>
              </Link>
              
            </div>
          </Col>

          <Col className="text-center" style={{maxWidth: 250, marginBottom: 30}}>
            <div style ={{backgroundColor: Colors.semiYellow, padding: 20, borderRadius: 15}}>
              <p style={{fontSize: 18, fontFamily: "NotoSans-SemiBold"}}>Counties</p>
              <p style={{fontFamily: "NotoSans"}}>&#8226; Texas counties and their data about homelessness<br/>&#8226; Contains information on county desciptions, housing units, population, and more.</p>

              <Link to="/counties">
                <button style={getbuttonStyle(Colors.lightYellow)}>View Counties</button>
              </Link>
            </div>
          </Col>

          <Col className="text-center" style={{maxWidth: 250, marginBottom: 30}}>
            <div style ={{backgroundColor: Colors.semiRed, padding: 20, borderRadius: 15}}>
              <p style={{fontSize: 18, fontFamily: "NotoSans-SemiBold"}}>Events</p>
              <p style={{fontFamily: "NotoSans"}}>&#8226; Volunteering events in Texas for homelessness<br/>&#8226; Contains about locations, dates, details, and requirements.</p>

              <Link to="/events">
                <button style={getbuttonStyle(Colors.lightRed)}>View Events</button>
              </Link>
            </div>
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
