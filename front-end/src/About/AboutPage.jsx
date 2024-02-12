import React from 'react';
import axios from 'axios';
import { contributors } from 'Contributors';

const AboutPage = () => {

  const [contributorRes, setContributorRes] = useState([]);
  const [issueRes, setIssueRes] = useState([]);

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
        setContributorRes(response.data);
        console.log(response.data);
      });

    // detch issue data
    axios
      .get(`https://gitlab.com/api/v4/projects/${projectID}/issues`, {
        headers: {
          "PRIVATE-TOKEN": gitLabToken,
        },
      })
      .then((response) => {
        setIssueRes(response.data);
        console.log(response.data);
      });
  }, [gitLabToken, projectID]);

  console.log(contributors);
  console.log(contributorRes);
  console.log(issueRes);

  return (
    <div>
      <h2>About</h2>
      <p>This is the about page.</p>
    </div>
  );
}

export default AboutPage;