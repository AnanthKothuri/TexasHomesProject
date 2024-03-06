import PageLayout from '../ModelTemplates/PageLayout';
import LoadingPage from '../components/LoadingPage';
//import data from '../data/countyData.json';
import useFetchAll from '../hooks/usefetchAll';

const SheltersPage = () => {
  const { data: shelters, loading, error } = useFetchAll('https://api.texashomesproject.me/shelters/');

  if (loading) return <LoadingPage/>;
  if (error) return <div>Error: {error}</div>;

  return <PageLayout data={shelters} pageTitle={"Shelters"} />;
}

export default SheltersPage;


