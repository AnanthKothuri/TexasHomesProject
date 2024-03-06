import PageLayout from '../ModelTemplates/PageLayout';
import LoadingPage from '../components/LoadingPage';
//import data from '../data/countyData.json';
import useFetchAll from '../hooks/usefetchAll';

const EventsPage = () => {
  const { data: events, loading, error } = useFetchAll('https://api.texashomesproject.me/events/');

  if (loading) return <LoadingPage/>;
  if (error) return <div>Error: {error}</div>;

  return <PageLayout data={events} pageTitle={"Events"} />;
}

export default EventsPage;


