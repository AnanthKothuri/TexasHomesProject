import { useState, useEffect } from 'react';

// Modify the hook to accept a base URL and an options object
const useFetchAll = (baseUrl, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Construct the query string based on options
        const queryString = new URLSearchParams(options).toString();
        const urlWithParams = `${baseUrl}?${queryString}`;
        const response = await fetch(urlWithParams);
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Include stringified options in the dependency array to refetch when options change
    fetchData();
  }, [baseUrl, JSON.stringify(options)]);

  return { data, loading, error };
};

export default useFetchAll;