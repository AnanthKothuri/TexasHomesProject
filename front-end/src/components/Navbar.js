import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { logo_info } from "../data/logo";

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
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
        <Navbar.Brand href="/">Texas Homes Project</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Home</Nav.Link> */}
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/shelters">Shelters</Nav.Link>
            <Nav.Link href="/counties">Counties</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
