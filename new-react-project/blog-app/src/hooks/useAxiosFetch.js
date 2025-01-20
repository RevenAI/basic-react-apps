import { useState, useEffect, useRef } from "react";
import axios from "axios";

const useAxiosFetch = (apiURL) => {
    const [data, setData] = useState([]);
    const [fetchErr, setFetchErr] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const isMounted = useRef(true);

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            try {
                const response = await axios.get(url, { cancelToken: source.token });
                if (isMounted.current) {
                    setData(response.data);
                    setFetchErr(null);
                }
            } catch (err) {
                if (isMounted.current) {
                    if (axios.isCancel(err)) {
                        console.log("Fetch cancelled", err.message);
                    } else {
                        setFetchErr(err.message || "An error occurred while fetching data");
                        setData([]);
                    }
                }
            } finally {
                if (isMounted.current) {
                    setIsLoading(false);
                }
            }
        };

        fetchData(apiURL);

        return () => {
            isMounted.current = false; 
            source.cancel("Operation cancelled.");
        };
    }, [apiURL]);

    return { data, fetchErr, isLoading };
};

export default useAxiosFetch;


