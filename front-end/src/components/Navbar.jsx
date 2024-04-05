import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Dialog, DialogContent, DialogTrigger } from "./Dialog"; // search popup
import InstanceCard from "../ModelTemplates/InstanceCard";
import Colors from "../assets/Colors";
import { logo_info } from "../data/logo";
import "./Navbar.css";

/*


ctrl f and search "todo" for things that still need to be done for global search functionality




*/

/**
 * Debounces a state value (`searchTerm`), delaying its update until a certain amount of time
 * has passed. Useful when searching b/c we want to delay reacting to frequent state changes,
 * allowing users enough time to type out their query
 *
 * @param {*} value The state value to debounce.
 * @param {number} delay The delay (in milliseconds) before updating the debounced value.
 * @returns {*} The debounced state value.
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // updates the debounced value whenever the original value changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value); // update the value after the specified delay
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // ee-run the effect if the value or delay changes

  return debouncedValue;
}

const HorizontalScrollList = ({ items, type }) => {
  // Display cards in a horizontal scrollable view
  return (
    <div style={{ overflowX: "auto", whiteSpace: "nowrap", padding: "10px" }}>
      {items.map((item) => (
        // render each individual card
        <div
          key={item.id}
          style={{
            display: "inline-block",
            margin: 10,
            padding: 10,
          }}
        >
          <InstanceCard item={item} type={type} />
        </div>
      ))}
    </div>
  );
};

/* "Global Search" button -> searchbar pop-up ('dialog') */
function DialogComponent({
  searchTerm,
  setSearchTerm,
  debounced,
  shelters,
  counties,
  events,
}) {
  const location = useLocation();

  // todo- now we need to filter only those model instances that actually match the searchTerm
  const filter = (items, debounced) => {
    /* 
    
    i'm not entirely sure how `debounced` is supposed to be used here

    */
    return items;
  };

  const filteredShelters = filter(shelters, debounced);
  const filteredCounties = filter(counties, debounced);
  const filteredEvents = filter(events, debounced);

  /* Additional dialog-specific styling can be found/altered at "./DialogStyles.js" */
  const searchButtonStyle = {
    backgroundColor: "#e3e3e3",
    borderRadius: 15,
    fontFamily: "NotoSans",
  };

  return (
    <div className="flex flex-row items-center justify-between gap-2 md:gap-4">
      {location.pathname === "/" && (
        // Only renders search button if we're on the home page
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="light" style={searchButtonStyle}>
              <FaSearch style={{ marginLeft: 2, marginRight: 8 }} />
              <span
                style={{
                  fontSize: "0.9em",
                  fontWeight: "bold",
                  marginRight: 2,
                }}
              >
                Global Search
              </span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            {/* the actual popup */}
            <div style={{ fontFamily: "NotoSans" }}>
              <h1 style={{ marginTop: "0.2rem" }}>Global Search</h1>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginTop: 10, width: "100%" }}
              />
              {/* todo- change these to not be hardcoded 0 values */}
              <h3 style={{ marginTop: 20 }}>Shelters - 0</h3>
              {filteredShelters && (
                <HorizontalScrollList
                  items={filteredShelters}
                  type="Shelters"
                />
              )}
              <h3>Counties - 0</h3>
              {filteredCounties && (
                <HorizontalScrollList
                  items={filteredCounties}
                  type="Counties"
                />
              )}
              <h3>Events - 0</h3>
              {filteredEvents && (
                <HorizontalScrollList items={filteredEvents} type="Events" />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const debounced = useDebounce(searchTerm.toLowerCase(), 500);

  // todo- make API request/query for all model instances, we'll filter them down by searchTerm later
  const {
    data: { shelters, counties, events },
  } = { data: { shelters: null, counties: null, events: null } };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <a href="/">
          {/* Favicon (clickable) */}
          <img
            src={logo_info.src}
            alt={logo_info.alt_text}
            height="30"
            className="d-inline-block align-top"
            style={{ marginRight: 3 }}
          />
        </a>
        <Navbar.Brand href="/" style={{ fontFamily: "NotoSans" }}>
          Texas Homes Project
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* If screen size gets small enough, place these pages into a toggle view */}
          <Nav className="me-auto" style={{ fontFamily: "NotoSans" }}>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/shelters">Shelters</Nav.Link>
            <Nav.Link href="/counties">Counties</Nav.Link>
            <Nav.Link href="/events">Events</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* !!!! NEW !!!! */}
        {/* Search Button -> when clicked becomes search popup ("dialog") */}
        <DialogComponent
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          debounced={debounced}
          shelters={shelters}
          counties={counties}
          events={events}
        />
      </Container>
    </Navbar>
  );
}

export default NavBar;
