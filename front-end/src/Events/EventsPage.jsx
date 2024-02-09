import React from 'react';
import PageLayout from '../ModelTemplates/PageLayout';
import data from './eventData.json';

const EventsPage = () => {
  return <PageLayout data={data.events} pageTitle={"Events"} />;
}

export default EventsPage;


