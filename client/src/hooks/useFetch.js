import { useState, useEffect } from "react";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}${endpoint}`
        );
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  const reFetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}${endpoint}`
      );
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, reFetchData };
};

export default useFetch;
