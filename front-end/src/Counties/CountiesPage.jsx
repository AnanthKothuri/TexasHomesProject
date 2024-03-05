import PageLayout from '../ModelTemplates/PageLayout';
//import data from '../data/countyData.json';
import useFetchAll from '../hooks/usefetchAll';



const CountiesPage = () => {
  const { data: counties, loading, error } = useFetchAll('http://api.texashomesproject.me/counties/');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <PageLayout data={counties} pageTitle={"Counties"} />;
}

export default CountiesPage;


