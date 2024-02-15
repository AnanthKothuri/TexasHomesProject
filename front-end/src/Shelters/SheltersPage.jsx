import React from 'react';
import PageLayout from '../ModelTemplates/PageLayout';
import data from '../data/shelterData.json';

const SheltersPage = () => {
  return <PageLayout data={data.shelters} pageTitle={"Shelters"} />;
}

export default SheltersPage;


