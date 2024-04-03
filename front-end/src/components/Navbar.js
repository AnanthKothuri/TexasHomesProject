import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { logo_info } from "../data/logo";
import Colors from "../assets/Colors";
import './Navbar.css';

const navbar = {
  backgroundColor: Colors.beige,
  backgroundSize: "0"
};

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="navbarColor" style={{ minHeight: "70px" }}>
      <Container>
        <a href="/">
          <img
            src={logo_info.src}
            alt={logo_info.alt_text}
            height="30"
            className="d-inline-block align-top"
            style={{ marginRight: 3 }}
          />
        </a>
        <Navbar.Brand href="/" style={{fontFamily: 'NotoSans'}}>Texas Homes Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Home</Nav.Link> */}
            <Nav.Link href="/about" style={{fontFamily: 'NotoSans'}}>About</Nav.Link>
            <Nav.Link href="/shelters" style={{fontFamily: 'NotoSans'}}>Shelters</Nav.Link>
            <Nav.Link href="/counties" style={{fontFamily: 'NotoSans'}}>Counties</Nav.Link>
            <Nav.Link href="/events" style={{fontFamily: 'NotoSans'}}>Events</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
