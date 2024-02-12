import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { contributors } from './Contributors';
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
    <PageLayout data={data.aboutPage} pageTitle={"About Us"}/>
  );
}

export default AboutPage;