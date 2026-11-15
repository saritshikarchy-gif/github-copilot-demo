import { useEffect, useState } from 'react';

function useFetch(url) {
  const [state, setState] = useState({ data: [], loading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        if (!cancelled) {
          // DRF returns a plain list, or { results: [...] } when pagination is enabled
          setState({ data: Array.isArray(json) ? json : json.results || [], loading: false, error: null });
        }
      })
      .catch(error => {
        if (!cancelled) {
          setState({ data: [], loading: false, error: error.message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}

export default useFetch;
