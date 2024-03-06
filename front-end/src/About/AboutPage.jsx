import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { contributors, tools_used } from "../data/about";

import InstanceCard from '../ModelTemplates/InstanceCard.jsx'

const AboutPage = () => {

  // store state pertaining to contributor data (i.e. commits) + issue info
  const [contributorResults, setContributorResults] = useState([]);
  const [issueResults, setIssueResults] = useState([]);

  const PROJECT_ID = 54614586;
  const GITLAB_TOKEN = 'glpat-FcEHeSx7LEzvmsJuN5zd';

  useEffect(() => {
    // fetch commit data
    axios
      .get(
        `https://gitlab.com/api/v4/projects/${PROJECT_ID}/repository/contributors`,
        {
          headers: {
            "PRIVATE-TOKEN": GITLAB_TOKEN,
          },
        }
      )
      .then((response) => {
        setContributorResults(response.data);
      });

    // fetch issue data
    axios
      .get(`https://gitlab.com/api/v4/projects/${PROJECT_ID}/issues`, {
        headers: {
          "PRIVATE-TOKEN": GITLAB_TOKEN,
        },
      })
      .then((response) => {
        setIssueResults(response.data);
      });
  }, [PROJECT_ID, GITLAB_TOKEN]);

  // consolidate commit data (bc jeronimo + ananth use multiple gitlab accounts)
  let commitData = {};
  let totalCommits = 0;
  contributors.forEach((member) => {
    member.emails.forEach((email) => {
      // `contibutorResults` stores data from API call; `contributors` is local json object
      const contributor = contributorResults.find((c) => c.email === email);
      if (contributor) {
        let key = contributor.name.charAt(0).toLowerCase();
        if (!(key in commitData)) {
          commitData[key] = 0;
        }
        commitData[key] += contributor.commits;
        totalCommits += contributor.commits;
      }
    });
  });

  let totalIssues = 0;
  const data = {
    aboutPage: contributors.map((contributor) => {
      // numCommits
      const num_commits = commitData[contributor.name.charAt(0).toLowerCase()]

      // numIssues
      const num_issues = issueResults.filter(
        (issue) => issue.author.username === contributor.gitlab_username
      ).length;
      totalIssues += num_issues;

      // append new entry into each team member's json object entry
      return {
        ...contributor,
        num_commits,
        num_issues
      };
    })
  };

  // useful for animating total gitlab stats
  const [animatedTotalCommits, setAnimatedTotalCommits] = useState(0);
  const [animatedTotalIssues, setAnimatedTotalIssues] = useState(0);

  const INTERVAL_SPEED = 20;  // larger number == more slow

  useEffect(() => {
    let commits = 0;
    let issues = 0;

    const interval = setInterval(() => {
      // increment commits
      if (commits < totalCommits) {
        commits++;
        setAnimatedTotalCommits(commits);
      }

      // increment issues
      if (issues < totalIssues) {
        issues++;
        setAnimatedTotalIssues(issues);
      }

      // clear interval when all stats reach their final values
      if (commits === totalCommits && issues === totalIssues) {
        clearInterval(interval);
      }
    }, INTERVAL_SPEED);

    return () => clearInterval(interval);
  }, [totalCommits, totalIssues]);
  
  // useful for rending Gitlab totalCommits and totalIssues
  const renderGitlabStat = (label, value) => (
    <>
      <b>{label}: </b>
      <span>{value}</span>
    </>
  );

  // useful for rending 'tools used' cards
  const renderToolsUsed = (tools_used) => {
    return (
      <div className="row row-cols-auto" style={{ display: 'flex', justifyContent: 'center' }}>
        {tools_used.map((tool, index) => (
          <Card key={index} className='card-content mb-4 shadow-sm' style={{ width: 190, padding: 7.5, paddingTop: 20, marginRight: 23 }}>
            <Card.Img variant="top" src={tool.src} style={{ height: 100, objectFit: 'contain', width: '100%', padding: 5 }} />
            <Card.Body>
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4em' }}>
                <b style={{ paddingTop: 7 }}>{tool.name}</b>
              </Card.Title>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }

  const sources = [
    'https://www.volunteermatch.org/search',
    'https://www.volunteertx.org/search/i/',
    'https://data.texas.gov/widgets/ups3-9e8m?mobile_redirect=true',
    'https://rapidapi.com/topapis/api/homeless-shelter',
    'https://developers.google.com/youtube/v3',
    'https://developers.google.com/maps/documentation/geocoding/overview',
  ]

  const HEADER_COLOR = "#1d66b5";

  return (
    <>
      {/* About Us Description */}
      <div className="container text-center">
        <header className="page-header" style={{ fontSize: 30, padding: 30, paddingTop: 50, paddingBottom: 5, fontWeight: 'bold', color: HEADER_COLOR }}>
          Our Mission
        </header>
        <p style={{ fontSize: '1.5em', paddingLeft: 120, paddingRight: 120 }}>
          Join us at Texas Homes Project in our mission to assist homeless individuals in receiving the support they need.
          Our goal is to connect communities across Texas with local homeless shelters, support organizations, and upcoming volunteer opportunities.
          We aim to integrate disparate data sources in hopes of providing a consolidated point of access for those wishing to assist the homeless.
        </p>
      </div>

      {/* Team Member Cards */}
      <header className="container text-center page-header" style={{ fontSize: 30, padding: 30, paddingBottom: 5, fontWeight: 'bold', color: HEADER_COLOR }}>
        Meet the Team
      </header>
      <div className="row row-cols-auto" style={{justifyContent: 'center', paddingTop: 7.5 }}>
        {data.aboutPage.map((item) => (
            <div className="col" key={item.name}>
              {/* create a new instance card for each team member */}
              <InstanceCard item={item} type={"Meet the Team"} />
            </div>
          ))
        }
      </div>

      {/* GitLab Stats */}
      <div className="container text-center" style={{display: 'block'}}>
        <header className="page-header" style={{ fontSize: 30, padding: 30, paddingBottom: 5, fontWeight: 'bold', color: HEADER_COLOR }}>
          GitLab Stats
        </header>
        <p style={{ fontSize: '1.2em', paddingLeft: 100, paddingRight: 100, fontFamily: 'monospace' }}>
          {renderGitlabStat("Total Commits", animatedTotalCommits)}
          <br/>
          {renderGitlabStat("Total Issues", animatedTotalIssues)}
        </p>
      </div>

      {/* Project Resources */}
      <div className="container text-center" style={{display: 'block'}}>
        <header className="page-header" style={{ fontSize: 30, padding: 30,paddingTop: 20, paddingBottom: 5, fontWeight: 'bold', color: HEADER_COLOR }}>
          Project Resources
        </header>
        <div style={{ marginTop: 5 }}> 
          <Link to="https://gitlab.com/shahmir-m/cs373-group-21">
              <Button variant="outline-primary" className='tool-links' style={{ marginRight: 17.5, fontFamily: 'monospace' }}><b>GitLab Repository</b></Button>
          </Link>
          <Link to="https://documenter.getpostman.com/view/23353623/2sA2r545RR#6b31cf1e-1622-4bc1-be25-bda989164be8">
              <Button variant="outline-primary" className='tool-links'><b style={{ fontFamily: 'monospace' }}>API Documentation</b></Button>
          </Link>
        </div>
      </div>

      {/* DATA SOURCES */}
      <div className="container text-center" style={{display: 'block'}}>
        <header className="page-header" style={{ fontSize: 30, padding: 30, paddingTop: 35, paddingBottom: 5, fontWeight: 'bold', color: HEADER_COLOR }}>
          Data Sources
        </header>
        <div style={{ fontSize: '1.2em' }}>
          <a href={sources[0]}>Volunteer Match</a>
          <br />
          <a href={sources[1]}>Volunteer TX</a>
          <br />
          <a href={sources[2]}>Texas Counties</a>
          <br />
          <a href={sources[3]}>Homeless Shelters API</a>
          <br />
          <a href={sources[4]}>YouTube API</a>
          <br />
          <a href={sources[5]}>Geocoding API</a>
        </div>
      </div>

      {/* Tools Used */}
      <div className="container text-center" style={{display: 'block'}}>
        <header className="page-header" style={{ fontSize: 30, padding: 30, paddingBottom: 15, fontWeight: 'bold', color: HEADER_COLOR }}>
          Tools Used
        </header>
        {renderToolsUsed(tools_used)}
      </div>
      <div style={{ marginBottom: 40 }} />
    </>
  );
}

export default AboutPage;