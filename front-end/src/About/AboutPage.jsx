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
        // console.log('contributorResults:')
        // console.log(response.data);
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
        // console.log('issueResults:')
        // console.log(response.data);
      });
  }, [PROJECT_ID, GITLAB_TOKEN]);

  const data = {
    aboutPage: contributors.map((contributor) => {
      // teamMemberData only includes data for 1 team member (based on email)
      const teamMemberData = contributorResults.find(
        (contributorFromAPI) => contributorFromAPI.email === contributor.email
      );
      
      // numCommits
      const numCommits = teamMemberData ? teamMemberData.commits : 0;

      // numIssues
      const numIssues = issueResults.filter(
        (issue) => issue.author.username === contributor.gitlab_username
      ).length;

      // Create object for the team member
      return {
        ...contributor,
        numCommits,
        numIssues
      };
    })
  };

  console.log(data);

  return (
    // <PageLayout data={data.aboutPage} pageTitle={"About Us"}/>
    <div>
      <h1>About Page</h1>
    </div>
  );
}

export default AboutPage;