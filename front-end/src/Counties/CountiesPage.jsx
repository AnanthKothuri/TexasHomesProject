import PageLayout from '../ModelTemplates/PageLayout';
//import data from '../data/countyData.json';
import useFetchAll from '../hooks/usefetchAll';
import LoadingPage from '../components/LoadingPage';



const CountiesPage = () => {
  const { data: counties, loading, error } = useFetchAll('https://api.texashomesproject.me/counties/');

  if (loading) return <LoadingPage/>;
  if (error) return <div>Error: {error}</div>;

  return <PageLayout data={counties} pageTitle={"Counties"} />;
}

export default CountiesPage;


