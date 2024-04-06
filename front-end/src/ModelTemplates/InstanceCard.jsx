import React, { useState, useEffect } from "react";
import "./InstanceCard.css";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Colors from "../assets/Colors";

const date_params = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const WIDTH = 400;

function InstanceCard({ item, type }) {
  return (
    <div>
      {type === "Shelters" ? (
        <ShelterInstanceCard item={item} />
      ) : type === "Counties" ? (
        <CountyInstanceCard item={item} />
      ) : type === "Meet the Team" ? (
        <DeveloperInstanceCard item={item} />
      ) : (
        <EventInstanceCard item={item} />
      )}
    </div>
  );
}

export default InstanceCard;

function DeveloperInstanceCard({ item }) {
  // used when animating the commit, issue, test stats
  const [animatedCommits, setAnimatedCommits] = useState(0);
  const [animatedIssues, setAnimatedIssues] = useState(0);
  const [animatedTests, setAnimatedTests] = useState(0);

  const INTERVAL_SPEED = 30.5; // larger number == more slow

  useEffect(() => {
    let commits = 0;
    let issues = 0;
    let tests = 0;

    const interval = setInterval(() => {
      // increment commits
      if (commits < item.num_commits) {
        commits++;
        setAnimatedCommits(commits);
      }

      // increment issues
      if (issues < item.num_issues) {
        issues++;
        setAnimatedIssues(issues);
      }

      // increment tests
      if (tests < item.num_tests) {
        tests++;
        setAnimatedTests(tests);
      }

      // clear interval when all stats reach their final values
      if (
        commits === item.num_commits &&
        issues === item.num_issues &&
        tests === item.num_tests
      ) {
        clearInterval(interval);
      }
    }, INTERVAL_SPEED);

    return () => clearInterval(interval);
  }, [item.num_commits, item.num_issues, item.num_tests]);

  // define styling for 'backend' and 'frontend' labels
  const roleStyle = (color) => {
    return {
      fontSize: "0.7em",
      color: "#fff",
      fontWeight: 600,
      backgroundColor: color,
      borderRadius: "7px",
      padding: "2px 6px",
      marginLeft: "10px",
      letterSpacing: 0.5,
    };
  };

  // define styling for member gitlab info labels
  const statStyle = {
    backgroundColor: "#f5f5f5",
    borderRadius: "7px",
    padding: "4px 8px",
    margin: "0px 2px",
  };

  const renderGitlabStat = (label, value) => (
    <span style={statStyle}>
      <b>{label}: </b>
      <span style={{ color: "#6b6b6b" }}>{value}</span>
    </span>
  );

  return (
    <Card className="card-content mb-4 shadow dev-hover-card" style={{ width: 400 }}>
      <Card.Img
        variant="top"
        src={item.img_src}
        style={{ height: 300, objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <b>{item.name}</b>
          <span style={roleStyle(item.role_color)}>{item.role}</span>
        </Card.Title>
        <Card.Text className="description-text">{item.description}</Card.Text>
        <Card.Text
          className="row-attribute"
          style={{
            fontFamily: "monospace",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card.Text style={{ textAlign: "center" }}>
            {renderGitlabStat("commits", animatedCommits)}{" "}
            {renderGitlabStat("issues", animatedIssues)}{" "}
            {renderGitlabStat("tests", animatedTests)}
          </Card.Text>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

function ShelterInstanceCard({ item }) {
  let navigate = useNavigate();

  function navigateToShelter() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/shelters/${item.id}`, { state: { item } });
  }
  return (
    <div className="instance-card">
      <Card
        className="card-content mb-4"
        style={{
          width: WIDTH,
          borderWidth: 0,
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1)",
        }}
      >
        <Card.Img
          variant="top"
          src={item.photo_urls?.[0] ?? ""}
          style={{ height: 250, objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title className="card-title hide-overflow">
            {item.name}
          </Card.Title>
          <Card.Text
            className="description-text hide-overflow"
            style={{
              fontFamily: "NotoSans",
              fontSize: 15,
            }}
          >
            {item.description}
          </Card.Text>
          <div className="row-attribute">
            <p style={{ fontFamily: "NotoSans-Bold", paddingRight: 10 }}>
              City
            </p>
            <p style={{ fontFamily: "NotoSans-Light" }}>{item.city}</p>
          </div>
          <div className="row-attribute">
            <p style={{ fontFamily: "NotoSans-Bold", paddingRight: 10 }}>
              Address
            </p>
            <p
              className="hide-overflow"
              style={{ fontFamily: "NotoSans-Light" }}
            >
              {item.address}
            </p>
          </div>
          <div className="row-attribute">
            <p style={{ fontFamily: "NotoSans-Bold", paddingRight: 10 }}>
              Website
            </p>
            <a
              className="hide-overflow"
              href={item.official_website}
              style={{ fontFamily: "NotoSans" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
          </div>
          <Button
            variant="primary"
            onClick={navigateToShelter}
            style={{
              backgroundColor: Colors.lightBlue,
              borderWidth: 0,
              width: "100%",
              fontFamily: "NotoSans-SemiBold",
            }}
          >
            Learn More
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

function CountyInstanceCard({ item }) {
  let navigate = useNavigate();

  function navigateToCounty() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/counties/${item.id}`, { state: { item } });
  }
  return (
    <div className="instance-card">
      <Card
        className="card-content mb-4"
        style={{
          width: WIDTH,
          borderWidth: 0,
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1)",
        }}
      >
        <Card.Img
          variant="top"
          src={"http://" + item.image_url}
          style={{ height: 250, objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title style={{ fontFamily: "NotoSans-SemiBold", fontSize: 18 }}>
            {item.name}
          </Card.Title>
          <Card.Text
            className="description-text hide-overflow"
            style={{ fontFamily: "NotoSans", fontSize: 15, maxWidth: WIDTH }}
          >
            {item.description}
          </Card.Text>
          <div className="row-attribute">
            <p style={{ fontFamily: "NotoSans-Bold", paddingRight: 10 }}>
              Population
            </p>
            <p style={{ fontFamily: "NotoSans-Light" }}>
              {item.population.toLocaleString()}
            </p>
          </div>
          <div className="row-attribute">
            <p style={{ fontFamily: "NotoSans-Bold", paddingRight: 10 }}>
              Housing Units
            </p>
            <p style={{ fontFamily: "NotoSans-Light" }}>
              {item.housing_units.toLocaleString()}
            </p>
          </div>
          <div className="row-attribute">
            <p style={{ fontFamily: "NotoSans-Bold", paddingRight: 10 }}>
              Website
            </p>
            <a
              className="description-text"
              href={item.website_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
          </div>
          <div className="row-attribute">
            <p style={{ fontFamily: "NotoSans-Bold", paddingRight: 10 }}>Lat</p>
            <p style={{ fontFamily: "NotoSans-Light" }}>{item.lat}</p>
            <p
              style={{
                fontFamily: "NotoSans-Bold",
                paddingRight: 10,
                paddingLeft: 20,
              }}
            >
              Long
            </p>
            <p style={{ fontFamily: "NotoSans-Light" }}>{item.long}</p>
          </div>
          <Button
            variant="primary"
            onClick={navigateToCounty}
            style={{
              backgroundColor: Colors.lightYellow,
              borderWidth: 0,
              width: "100%",
              fontFamily: "NotoSans-SemiBold",
              color: Colors.white,
            }}
          >
            Explore County
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

function EventInstanceCard({ item }) {
  let navigate = useNavigate();

  function navigateToEvent() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/events/${item.id}`, { state: { item } });
  }

  return (
    <div className="instance-card">
      <Card
        className="card-content mb-4"
        style={{
          width: WIDTH,
          borderWidth: 0,
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.1)",
        }}
      >
        {/* <Card.Header>Event</Card.Header> */}
        <Card.Img
          variant="top"
          src={item.image_url}
          style={{ height: 250, objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title
            className="hide-overflow"
            style={{ fontFamily: "NotoSans-SemiBold", fontSize: 18 }}
          >
            {item.title}
          </Card.Title>
          <Card.Text
            className="description-text hide-overflow"
            style={{
              fontFamily: "NotoSans",
              fontSize: 15,
            }}
          >
            {item.description}
          </Card.Text>
          <div className="row-attribute">
            <p style={{ fontFamily: "NotoSans-Bold", paddingRight: 10 }}>
              Organization
            </p>
            <p
              className="hide-overflow"
              style={{ fontFamily: "NotoSans-Light" }}
            >
              {item.organization}
            </p>
          </div>
          <div className="row-attribute">
            <p style={{ fontFamily: "NotoSans-Bold", paddingRight: 10 }}>
              Date Posted
            </p>
            <p style={{ fontFamily: "NotoSans-Light" }}>
              {new Date(item.date_posted).toLocaleString("en-US", date_params)}
            </p>
          </div>
          <div className="row-attribute">
            <p style={{ fontFamily: "NotoSans-Bold", paddingRight: 10 }}>
              Location
            </p>
            <p
              className="description-text"
              style={{ fontFamily: "NotoSans-Light" }}
            >
              {item.address}
            </p>
          </div>
          <div className="row-attribute">
            <p style={{ fontFamily: "NotoSans-Bold", paddingRight: 10 }}>Lat</p>
            <p style={{ fontFamily: "NotoSans-Light" }}>{item.lat}</p>
            <p
              style={{
                fontFamily: "NotoSans-Bold",
                paddingRight: 10,
                paddingLeft: 20,
              }}
            >
              Long
            </p>
            <p style={{ fontFamily: "NotoSans-Light" }}>{item.long}</p>
          </div>
          {/* <Card.Text className='row-attribute'>
                    <p style={{fontWeight: 'bold', paddingRight: 10}}>Causes</p>
                    <div className="row row-cols-auto">
                        {item.cause_areas.length === 0 ? (
                        <div>No items found.</div>
                        ) : (
                            item.cause_areas.map((item, index) => (
                                <p className="cause-item">{item}</p>
                            ))
                        )}
                    </div>
                </Card.Text> */}
          <Button
            variant="primary"
            onClick={navigateToEvent}
            style={{
              backgroundColor: Colors.lightRed,
              borderWidth: 0,
              width: "100%",
              fontFamily: "NotoSans-SemiBold",
              color: Colors.white,
            }}
          >
            View Event
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
