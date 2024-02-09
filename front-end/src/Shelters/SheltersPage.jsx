import React from 'react';
import PageLayout from '../Layouts/PageLayout/PageLayout.js';
import data from './data.json'; // Your data file or an array of data

const SheltersPage = () => {
  return <PageLayout data={data.shelters} />;
}

export default SheltersPage;




