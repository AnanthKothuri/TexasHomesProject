import React from 'react';
import PageLayout from '../ModelTemplates/PageLayout';
import data from '../data/countyData.json';

const CountiesPage = () => {
  return <PageLayout data={data.counties} pageTitle={"Counties"} />;
}

export default CountiesPage;


