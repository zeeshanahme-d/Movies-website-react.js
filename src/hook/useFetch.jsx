import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Drop responses for a url we've already moved away from.
        let ignore = false;
        setLoading(true);
        setData(null);
        setError(null);

        fetchDataFromApi(url)
            .then((res) => !ignore && setData(res))
            .catch(() => !ignore && setError("Something went wrong!"))
            .finally(() => !ignore && setLoading(false));

        return () => {
            ignore = true;
        };
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
