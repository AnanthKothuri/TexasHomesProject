import React from 'react';

const AboutPage = () => {

  // Parse the secrets JSON string
  let secrets = process.env.secrets;
  if (secrets) {
    try {
      secrets = JSON.parse(secrets);
      console.log(secrets);
    } catch (error) {
      console.error('Error parsing secrets JSON:', error);
    }
  }

  return (
    <div>
      <h2>About</h2>
      <p>This is the about page.</p>
    </div>
  );
}

export default AboutPage;