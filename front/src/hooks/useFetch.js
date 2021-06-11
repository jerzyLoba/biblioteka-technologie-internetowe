import React from "react";
import axios from "axios";

const useFetch = (url, options = {}, effect = []) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios({ url, ...options });
        setResponse(res.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [...effect]);

  return { response, error, setResponse };
};

export { useFetch };
