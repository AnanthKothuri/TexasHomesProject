// useFetchAll.js
import { useState, useEffect } from 'react';


const useFetchAllIds = (url, ids) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Your asynchronous logic to fetch data based on ids
        const responses = await Promise.all(ids.map(id => fetch(`${url}/${id}`).then(response => response.json())));
        setData(responses);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, ids]);

  return { data, loading, error };
};

export default useFetchAllIds;
