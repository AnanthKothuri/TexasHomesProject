import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap'
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

  let totalCommits = 0;
  let totalIssues = 0;

  const data = {
    aboutPage: contributors.map((contributor) => {
      // teamMemberData only includes data for 1 team member (based on email)
      const teamMemberData = contributorResults.find(
        (contributorFromAPI) => contributorFromAPI.email === contributor.email
      );
      
      // numCommits
      const num_commits = teamMemberData ? teamMemberData.commits : 0;
      totalCommits += num_commits;

      // numIssues
      const num_issues = issueResults.filter(
        (issue) => issue.author.username === contributor.gitlab_username
      ).length;
      totalIssues += num_issues;

      // append new entry for each team member
      return {
        ...contributor,
        num_commits,
        num_issues
      };
    })
  };
  
  // useful for rending totalCommits + totalIssues
  const renderGitlabStat = (label, value) => (
    <>
      <b>{label}: </b>
      <span style={{ color: "#2e5e9e" }}>{value}</span>
    </>
  );

  const renderToolsUsed = (tools_used) => {
    return (
      <div className="row row-cols-auto" style={{ display: 'flex', justifyContent: 'center' }}>
        {tools_used.map((tool, index) => (
          <Card key={index} className='card-content mb-4 shadow-sm' style={{ width: 200, padding: 7.5, paddingTop: 20, marginRight: 23 }}>
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

  return (
    <>
      {/* About Us Description */}
      <div className="container text-center">
        <header className="page-header" style={{ fontSize: 30, padding: 30, paddingBottom: 15 }}>
          About Us
        </header>
        <p style={{ fontSize: '1.5em', paddingLeft: 120, paddingRight: 120 }}>
          We're on a mission to make it easier for people experiencing homelessness to receive the
          help they need. Texas Homes Project is your go-to online resource for anyone
          looking to support Texas homeless populations. Our goal is to connect communities with
          nearby homeless shelters, support organizations that aid the homeless, and spread the
          word about upcoming volunteer opportunities. We hope the result of integrating this
          disparate data will encourage users to feel more confidence in being able to quickly access 
          resources when presented with an opportunity of helping someone suffering from homeslessness.
        </p>
      </div>

      {/* Team Member Cards */}
      <header className="container text-center page-header" style={{fontSize: 30, padding: 30}}>
        Meet the Team
      </header>
      <div className="row row-cols-auto" style={{justifyContent: 'center'}}>
        {data.aboutPage.map((item) => (
            <div className="col" key={item.name}>
              <InstanceCard item={item} type={"Meet the Team"} />
            </div>
          ))
        }
      </div>

      {/* Total Stats */}
      <div className="container text-center" style={{display: 'block'}}>
        <header className="page-header" style={{ fontSize: 30, padding: 30, paddingBottom: 15 }}>
          Total Stats
        </header>
        <p style={{ fontSize: '1.2em', paddingLeft: 120, paddingRight: 120, fontFamily: 'monospace' }}>
          {renderGitlabStat("Total commits", totalCommits)}
          <br/>
          {renderGitlabStat("Total issues", totalIssues)}
        </p>
      </div>

      {/* Tools Used */}
      <div className="container text-center" style={{display: 'block'}}>
        <header className="page-header" style={{ fontSize: 30, padding: 30, paddingBottom: 15 }}>
          Tools Used
        </header>
        {renderToolsUsed(tools_used)}
      </div>

      {/* Footer */}
      <div className="container text-center" style={{padding: 30, paddingBottom: 50}}>
        {data.aboutPage.length} out of {data.aboutPage.length} • {"About Us"}
      </div>
    </>
  );
}

export default AboutPage;