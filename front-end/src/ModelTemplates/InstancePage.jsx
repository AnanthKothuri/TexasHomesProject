// InstancePage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";
import useFetchAllIds from "../hooks/useFetchAllIds";
import { useLocation } from "react-router-dom";
import CustomGoogleMap from "../components/GoogleMap";

import "./InstancePage.css";
import InstanceCard from "./InstanceCard";
import LoadingPage from "../components/LoadingPage";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const date_params = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const HorizontalScrollList = ({ items, type }) => {
  // Display all related cards for the given model in a horizontal scrollable view
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

function RelatedModels({ inputData }) {
  const {
    data: relatedCounties,
    loading: l1,
    error: e1,
  } = useFetchAllIds(
    "https://api.texashomesproject.me/counties",
    inputData.related_models.counties
  );
  const {
    data: relatedShelters,
    loading: l2,
    error: e2,
  } = useFetchAllIds(
    "https://api.texashomesproject.me/shelters",
    inputData.related_models.shelters
  );
  const {
    data: relatedEvents,
    loading: l3,
    error: e3,
  } = useFetchAllIds(
    "https://api.texashomesproject.me/events",
    inputData.related_models.events
  );

  // Check if any of the requests is still loading
  if (l1 || l2 || l3) return <LoadingPage />;

  // Check if any of the requests resulted in an error
  if (e1 || e2 || e3) {
    return <div>Error loading related models: {e1 || e2 || e3}</div>;
  }

  return (
    <div
      className="container"
      style={{ marginLeft: "10%", marginRight: "10%", marginTop: 30 }}
    >
      {relatedShelters && relatedShelters.length > 0 && (
        <>
          {/* Header */}
          <Row xs="auto" style={{ alignItems: "center" }}>
            <Col>
              <h2 style={{ fontFamily: "NotoSans-SemiBold", fontSize: 25 }}>
                Related Shelters
              </h2>
            </Col>
            <Col>
              <h3
                style={{
                  color: "lightgray",
                  fontFamily: "NotoSans",
                  fontSize: 25,
                }}
              >
                {relatedShelters.length}
              </h3>
            </Col>
          </Row>
          {/* Cards */}
          <HorizontalScrollList items={relatedShelters} type="Shelters" />
        </>
      )}

      {relatedCounties && relatedCounties.length > 0 && (
        <>
          {/* Header */}
          <Row xs="auto" style={{ alignItems: "center" }}>
            <Col>
              <h2 style={{ fontFamily: "NotoSans-SemiBold", fontSize: 25 }}>
                Related Counties
              </h2>
            </Col>
            <Col>
              <h3
                style={{
                  color: "lightgray",
                  fontFamily: "NotoSans",
                  fontSize: 25,
                }}
              >
                {relatedCounties.length}
              </h3>
            </Col>
          </Row>
          {/* Cards */}
          <HorizontalScrollList items={relatedCounties} type="Counties" />
        </>
      )}

      {relatedEvents && relatedEvents.length > 0 && (
        <>
          {/* Header */}
          <Row xs="auto" style={{ alignItems: "center" }}>
            <Col>
              <h2 style={{ fontFamily: "NotoSans-SemiBold", fontSize: 25 }}>
                Related Events
              </h2>
            </Col>
            <Col>
              <h3
                style={{
                  color: "lightgray",
                  fontFamily: "NotoSans",
                  fontSize: 25,
                }}
              >
                {relatedEvents.length}
              </h3>
            </Col>
          </Row>
          {/* Cards */}
          <HorizontalScrollList items={relatedEvents} type="Events" />
        </>
      )}
    </div>
  );
}

const InstancePage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const location = useLocation();
  const { item } = location.state;

  let { type, _ } = useParams(); // Assuming the route is something like '/:type/:id'
  const backHref = `/${type}`;

  // Extract info from `item`
  let title = "";
  let image = "";
  let description = item.description || "";
  let contact_info = [];
  let detail_lists = [];

  switch (type) {
    case "shelters":
      contact_info = [
        ["Phone", item.phone_number],
        ["Email", item.email_address],
        ["Website", item.official_website],
        ["Facebook", item.facebook],
        ["Instagram", item.instagram],
        ["Twitter", item.twitter],
      ];
      title = item.name;
      image = item.photo_urls[0];
      break;
    case "counties":
      contact_info = [
        ["Website", item.website_url],
        ["Population", item.population.toLocaleString()],
        ["Housing Units", item.housing_units.toLocaleString()],
        ["Lat", item.lat],
        ["Long", item.long],
      ];
      title = item.name;
      image = "http://" + item.image_url;
      break;
    case "events":
      contact_info = [
        ["Organization", item.organization],
        ["Date Posted", item.date_posted],
        ["Address", item.address],
        ["Lat", item.lat],
        ["Long", item.long],
      ];
      title = item.title;
      image = item.image_url;
      detail_lists = [
        ["Cause Areas", item.cause_areas],
        ["Skills", item.skills],
        ["Good For", item.good_for],
        ["Requirements", item.requirements],
      ];
      break;
    default:
      break;
  }

  const MAX_CHARS_THRESHOLD = 450;
  useEffect(() => {
    if (description.length <= MAX_CHARS_THRESHOLD) {
      setIsExpanded(true);
    }
  }, [description]);

  if (!item) {
    // i don't think this is currently checking anything...
    return <p>item is missing</p>;
  }

  return (
    <>
      {/* main-instance-page includes everything except for related_model cards */}
      <div className="main-instance-page">
        {/* back button */}
        <div style={{ fontSize: 20, margin: 25 }}>
          <a href={backHref} className="back-button">
            Back to {type.charAt(0).toUpperCase() + type.slice(1)}
          </a>
        </div>

        {/* image + name */}
        <div className="image-container">
          <img className="background-image" src={image} alt={title} />
          <div className="overlay" />
          <div className="title">{title}</div>
        </div>

        {/* Description */}
        <div style={{ margin: 20, marginTop: 40 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Header */}
            <p style={{ fontFamily: "NotoSans-SemiBold", fontSize: 25 }}>
              Description
            </p>
            {description.length > MAX_CHARS_THRESHOLD && (
              // Only display toggle button if the description is being truncated
              <button className="toggle-button" onClick={toggleExpand}>
                {isExpanded ? (
                  <FaChevronUp className="toggle-icon" />
                ) : (
                  <FaChevronDown className="toggle-icon" />
                )}
              </button>
            )}
          </div>
          {/* Container/Content */}
          <div
            className={`${
              isExpanded ? "description-expanded" : "description-truncated"
            }`}
          >
            <p
              className="description-container"
              style={{
                maxHeight: isExpanded ? "400px" : "none",
              }}
            >
              {description.trim()}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <Row>
          <Col style={{ margin: 20 }}>
            {/* Header */}
            <p style={{ fontFamily: "NotoSans-SemiBold", fontSize: 25 }}>
              Contact Info
            </p>
            {/* Content */}
            {contact_info.map((contact, index) => (
              <div key={index}>
                <div style={{ flexDirection: "row", display: "flex" }}>
                  <p className="contact-type">{contact[0]}: </p>
                  {/* Protocol for displaying contact info:
                        - hyperlink
                        - mailto
                        - plain text
                  */}
                  {["Website", "Facebook", "Instagram", "Twitter"].includes(
                    contact[0]
                  ) ? (
                    // HYPERLINK
                    <a
                      href={contact[1]}
                      target="_blank" // open link in a new tab
                      rel="noopener noreferrer" // recommended security measure for external links
                      style={{
                        fontFamily: "NotoSans-Light",
                        fontSize: 18,
                      }}
                    >
                      {contact[1]}
                    </a>
                  ) : contact[0] === "Email" ? (
                    // MAILTO
                    <a
                      href={`mailto:${contact[1]}`} // use  `mailto:` protocol for email
                      style={{
                        fontFamily: "NotoSans-Light",
                        fontSize: 18,
                      }}
                    >
                      {contact[1]}
                    </a>
                  ) : (
                    // PLAIN TEXT
                    <p style={{ fontFamily: "NotoSans-Light", fontSize: 18 }}>
                      {contact[1]}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Extra Info for Events Only */}
            {detail_lists.length !== 0 &&
              detail_lists.map((list, index) => (
                // ITERATE THROUGH: Cause Areas, Skills, Good For, Requirements
                <div key={index}>
                  <div className="row">
                    {/* Only display lists which have actual elements */}
                    {list[1].length !== 0 && (
                      <>
                        <p
                          style={{
                            fontFamily: "NotoSans",
                            fontSize: 18,
                            marginRight: 20,
                            fontWeight: "bold",
                            marginBottom: 0,
                          }}
                        >
                          {/* List Name */}
                          {list[0]}:
                        </p>
                        <div>
                          <ul>
                            {list[1].map((item, innerIndex) => (
                              <li key={innerIndex}>
                                <p
                                  style={{
                                    fontFamily: "NotoSans-Light",
                                    fontSize: 18,
                                    margin: 0,
                                  }}
                                >
                                  {/* List Content */}
                                  {item}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </Col>

          {/* Google Map */}
          <Col style={{ marginTop: 30 }}>
            <CustomGoogleMap latitude={item.lat} longitude={item.long} />
          </Col>
        </Row>
      </div>

      {/* Related Models */}
      <RelatedModels inputData={item} />
    </>
  );
};

export default InstancePage;

function EventInstancePage({ item }) {
  return (
    <Container
      className="centered-container"
      style={{ flex: 1, flexDirection: "column" }}
    >
      <Card className="text-center" style={{ margin: 40, width: "50rem" }}>
        <Card.Header>Event</Card.Header>
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.organization}</Card.Text>
          <a href="/events" className="btn btn-primary">
            Back to Events
          </a>
        </Card.Body>
        <Card.Footer className="text-body-secondary">
          {item.location}
        </Card.Footer>
      </Card>

      <Row style={{ maxWidth: "50rem" }}>
        <Col md={4}>
          <img
            src={item.image_url}
            className="img-fluid rounded-start"
            alt={item.name}
          />
        </Col>
        <Col>
          <div className="embed-responsive embed-responsive-16by9">
            {/* <iframe className="embed-responsive-item" src={item.video_url} allowfullscreen title={item.name}></iframe> */}
          </div>
        </Col>
        {item.map_url !== "" ? (
          <Col md={4}>
            <img
              src={item.map_url}
              className="img-fluid rounded-start"
              alt={item.name}
            />
          </Col>
        ) : (
          <CustomGoogleMap latitude={item.lat} longitude={item.long} />
        )}
      </Row>

      <Col md={8} style={{ margin: 20, maxWidth: "50rem" }}>
        <Card.Body>
          <Card.Title>Description</Card.Title>
          <Card.Text>
            <small className="text-body-secondary">
              {new Date(item.date_posted).toLocaleString("en-US", date_params)}
            </small>
          </Card.Text>

          <Card.Text>{item.description}</Card.Text>
        </Card.Body>
      </Col>

      <Col md={8} style={{ margin: 20, maxWidth: "50rem" }}>
        <Card.Body>
          <Card.Text className="row-attribute">
            <p style={{ fontWeight: "bold", paddingRight: 10 }}>Organization</p>
            <p>{item.organization}</p>
          </Card.Text>

          <Card.Text className="row-attribute">
            <p style={{ fontWeight: "bold", paddingRight: 10 }}>Date Posted</p>
            <p>
              {new Date(item.date_posted).toLocaleString("en-US", date_params)}
            </p>
          </Card.Text>

          <Card.Text className="row-attribute">
            <p style={{ fontWeight: "bold", paddingRight: 10 }}>Address</p>
            <p>{item.address}</p>
          </Card.Text>

          <Card.Text className="row-attribute">
            <p style={{ fontWeight: "bold", paddingRight: 10 }}>Lat</p>
            <p>{item.lat}</p>
            <p
              style={{ fontWeight: "bold", paddingRight: 10, paddingLeft: 20 }}
            >
              Long
            </p>
            <p>{item.long}</p>
          </Card.Text>

          <Card.Subtitle>Cause Areas</Card.Subtitle>
          <div className="row row-cols-auto">
            {item.cause_areas.length === 0 ? (
              <div>None</div>
            ) : (
              item.cause_areas.map((item, index) => (
                <p className="cause-item">{item}</p>
              ))
            )}
          </div>

          {item.skills.length > 0 && (
            <>
              <Card.Subtitle>Skills</Card.Subtitle>
              <div className="row row-cols-auto">
                {item.skills.length === 0 ? (
                  <div>None</div>
                ) : (
                  item.skills.map((item, index) => (
                    <p className="skills-item">{item}</p>
                  ))
                )}
              </div>
            </>
          )}

          {item.good_for.length > 0 && (
            <>
              <Card.Subtitle>Good For</Card.Subtitle>
              <div className="row row-cols-auto">
                {item.good_for.length === 0 ? (
                  <div>None</div>
                ) : (
                  item.skills.map((item, index) => (
                    <p className="good-for-item">{item}</p>
                  ))
                )}
              </div>
            </>
          )}

          {item.requirements.length > 0 && (
            <>
              <Card.Subtitle>Requirements</Card.Subtitle>
              <div className="row row-cols-auto">
                {item.requirements.length === 0 ? (
                  <div>None</div>
                ) : (
                  item.skills.map((item, index) => (
                    <p className="requirements-item">{item}</p>
                  ))
                )}
              </div>
            </>
          )}
        </Card.Body>
      </Col>
    </Container>
  );
}
