import React from 'react';

const AboutPage = () => {

  console.log('hi');

  // Parse the secrets JSON string
  let env = process.env;
  console.log(env);
  let secrets = process.env.secrets;
  if (secrets) {
    try {
      secrets = JSON.parse(secrets);
      console.log(secrets);
      console.log('made it here');
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