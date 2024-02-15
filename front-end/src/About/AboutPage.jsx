import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { contributors } from "../data/about";
import PageLayout from '../ModelTemplates/PageLayout';

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

  const data = {
    aboutPage: contributors.map((contributor) => {
      // teamMemberData only includes data for 1 team member (based on email)
      const teamMemberData = contributorResults.find(
        (contributorFromAPI) => contributorFromAPI.email === contributor.email
      );
      
      // numCommits
      const num_commits = teamMemberData ? teamMemberData.commits : 0;

      // numIssues
      const num_issues = issueResults.filter(
        (issue) => issue.author.username === contributor.gitlab_username
      ).length;

      // append new entry for each team member
      return {
        ...contributor,
        num_commits,
        num_issues
      };
    })
  };

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
          word about upcoming volunteer opportunities.
        </p>
      </div>
      <PageLayout data={data.aboutPage} pageTitle={"Meet the Team"}/>
    </>
  );
}

export default AboutPage;