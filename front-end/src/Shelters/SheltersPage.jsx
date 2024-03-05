import PageLayout from '../ModelTemplates/PageLayout';
//import data from '../data/countyData.json';
import useFetchAll from '../hooks/usefetchAll';

const SheltersPage = () => {
  const { data: shelters, loading, error } = useFetchAll('http://api.texashomesproject.me/shelters/');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <PageLayout data={shelters} pageTitle={"Shelters"} />;
}

export default SheltersPage;


