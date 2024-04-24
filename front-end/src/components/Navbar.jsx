import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Dialog, DialogContent, DialogTrigger } from "./Dialog"; // search popup
import InstanceCard from "../ModelTemplates/InstanceCard";
import SearchBar from "./Searchbar";
import Colors from "../assets/Colors";
import { logo_info } from "../data/logo";
import useFetchAll from "../hooks/usefetchAll";
import "./Navbar.css";

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

const HorizontalScrollList = ({ items, type, search }) => {
  // Display cards in a horizontal scrollable view
  return (
    <div className="row row-cols-auto" style={{ justifyContent: "center" }}>
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
          <InstanceCard item={item} type={type} searchQuery={search} />
        </div>
      ))}
    </div>
  );
};

/* "Global Search" button -> searchbar pop-up ('dialog') */
function DialogComponent({ searchTerm, setSearchTerm }) {
  const location = useLocation();
  const [displayType, setDisplayType] = useState("Shelters");

  // query all model instances, we'll filter them down by searchTerm later
  const {
    data: shelters,
    loading: loading1,
    error: error1,
  } = useFetchAll("https://api.texashomesproject.me/shelters/");

  const {
    data: counties,
    loading: loading2,
    error: error2,
  } = useFetchAll("https://api.texashomesproject.me/counties/");

  const {
    data: events,
    loading: loading3,
    error: error3,
  } = useFetchAll("https://api.texashomesproject.me/events/");

  if (loading1 || loading2 || loading3) return <div>Loading...</div>;
  if (error1 || error2 || error3)
    return <div>Error: {error1 || error2 || error3}</div>;

  const filter = (items) => {
    if (!items) return items;
    if (!searchTerm) {
      // if no search has been made, return everything
      return items;
    }
    const searchLower = searchTerm.toLowerCase();
    return items.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchLower)
      )
    );
  };

  // const [filteredShelters, setFilteredShelters] = useState([])
  // const [filteredCounties, setFilteredCounties] = useState([])
  // const [filteredEvents, setFilteredEvents] = useState([])
  const filteredShelters = filter(shelters);
  const filteredCounties = filter(counties);
  const filteredEvents = filter(events);

  /* Additional dialog-specific styling can be found/altered at "./DialogStyles.js" */
  const searchButtonStyle = {
    backgroundColor: "#e3e3e3",
    borderRadius: 15,
    fontFamily: "NotoSans",
  };

  return (
    <div>
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
          {/* <DialogContent style={{ overflowY: "auto" }}> */}
          <DialogContent>
            {/* the actual popup */}
            <div style={{ fontFamily: "NotoSans", overflowY: "scroll" }}>
              <h1 style={{ marginTop: "0.2rem" }}>Global Search</h1>

              {/* tab row */}
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <h3
                  style={{
                    marginTop: 20,
                    cursor: "pointer",
                    opacity: displayType !== "Shelters" ? 0.5 : 1,
                  }}
                  onClick={() => {
                    setDisplayType("Shelters");
                  }}
                >
                  Shelters - {filteredShelters.length}
                </h3>

                <h3
                  style={{
                    marginTop: 20,
                    cursor: "pointer",
                    opacity: displayType !== "Counties" ? 0.5 : 1,
                  }}
                  onClick={() => {
                    setDisplayType("Counties");
                  }}
                >
                  Counties - {filteredCounties.length}
                </h3>

                <h3
                  style={{
                    marginTop: 20,
                    cursor: "pointer",
                    opacity: displayType !== "Events" ? 0.5 : 1,
                  }}
                  onClick={() => {
                    setDisplayType("Events");
                  }}
                >
                  Events - {filteredEvents.length}
                </h3>
              </div>

              <SearchBar
                searchQuery={searchTerm}
                setSearchQuery={setSearchTerm}
                placeholder={"Global Search"}
              />

              {filteredShelters && displayType === "Shelters" && (
                <HorizontalScrollList
                  items={filteredShelters}
                  type="Shelters"
                  search={searchTerm}
                />
              )}
              {filteredCounties && displayType === "Counties" && (
                <HorizontalScrollList
                  items={filteredCounties}
                  type="Counties"
                  search={searchTerm}
                />
              )}
              {filteredEvents && displayType === "Events" && (
                <HorizontalScrollList
                  items={filteredEvents}
                  type="Events"
                  search={searchTerm}
                />
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
  const location = useLocation();

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
            <Nav.Link href="/visualizations">Visualizations</Nav.Link>
            <Nav.Link href="/provider-visualizations">
              Provider Visualizations
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {/* Search Button -> when clicked becomes search popup ("dialog") */}
        {location.pathname === "/" && (
          <DialogComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            debounced={debounced}
          />
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
