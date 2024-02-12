import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { contributors } from './Contributors';

const AboutPage = () => {

  const [contributorResults, setContributorResults] = useState([]);
  const [issueResults, setIssueResults] = useState([]);

  const projectID = 54614586;
  const gitLabToken = 'glpat-FcEHeSx7LEzvmsJuN5zd';

  useEffect(() => {
    // fetch commit data
    axios
      .get(
        `https://gitlab.com/api/v4/projects/${projectID}/repository/contributors`,
        {
          headers: {
            "PRIVATE-TOKEN": gitLabToken,
          },
        }
      )
      .then((response) => {
        setContributorResults(response.data);
        console.log(response.data);
      });

    // fetch issue data
    axios
      .get(`https://gitlab.com/api/v4/projects/${projectID}/issues`, {
        headers: {
          "PRIVATE-TOKEN": gitLabToken,
        },
      })
      .then((response) => {
        setIssueResults(response.data);
        console.log(response.data);
      });
  }, [gitLabToken, projectID]);

  // console.log(contributors);
  console.log('contributerResults:')
  console.log(contributorResults);
  
  console.log('issueResults:')
  console.log(issueResults);

  return (
    <div>
      <h2>About</h2>
      <p>This is the about page.</p>
    </div>
  );
}

export default AboutPage;