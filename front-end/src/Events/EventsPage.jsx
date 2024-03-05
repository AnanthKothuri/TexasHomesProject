import PageLayout from '../ModelTemplates/PageLayout';
//import data from '../data/countyData.json';
import useFetchAll from '../hooks/usefetchAll';

const EventsPage = () => {
  const { data: events, loading, error } = useFetchAll('http://api.texashomesproject.me/events/');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <PageLayout data={events} pageTitle={"Events"} />;
}

export default EventsPage;


