import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { contributors } from './Contributors';

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

  {contributors.map((contributor, index) => {
    // teamMember only includes data for 1 team member (based on email)
    const teamMember = contributorResults.filter(
      (contributorFromAPI) => contributorFromAPI.email === contributor.email
    );
    // get numCommits
    let numCommits = 0;
    if (teamMember.length > 0) {
      numCommits = teamMember[0].commits;
    }
    // get numIssues
    const numIssues = issueResults.filter(
      (issue) => issue.author.username === contributor.gitlab_username
    ).length;

    console.log(contributor.name);
    console.log(numCommits);
    console.log(numIssues);
    console.log('');
  })}

  return (
    <div>
      <h2>About</h2>
      <p>This is the about page.</p>
    </div>
  );
}

export default AboutPage;