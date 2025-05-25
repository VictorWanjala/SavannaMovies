import { useEffect, useRef } from "react";
import axios from "axios";

function useSearch(props) {
  const {
    search,
    searchUrl,
    baseUrl = "/api/",
    setDocs = () => {},
    setIsLoading = () => {},
    setShowPagination = () => {},
    setIsFiltered,
  } = props;

  const abortControllerRef = useRef(null);

  useEffect(() => {
    handleSearch();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [search]);
  const handleSearch = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      if (typeof search !== "string" || search.length < 3 || !searchUrl) {
        return;
      }

      let res = await axios(baseUrl + searchUrl, {
        method: "GET",
        params: {
          search: search,
        },
        signal: abortControllerRef.current.signal,
        show_error: false,
        show_loading: false,
        loadingFunc: setIsLoading,
      });

      if (res === "error") {
        return;
      }
      setShowPagination(false);
      setIsFiltered(true);
      setDocs(res?.data?.docs || []);
    } catch (e) {
      if (axios.isCancel(e)) {
        // Don't log anything if the request was canceled
        return;
      }
      console.error("Error doing search", e);
    }
  };
}

export default useSearch;
