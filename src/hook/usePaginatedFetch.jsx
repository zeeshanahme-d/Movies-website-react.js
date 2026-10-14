import { useCallback, useEffect, useRef, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

// TMDB rejects page > 500.
const MAX_PAGES = 500;

const itemKey = (item) => `${item.media_type}-${item.id}`;

// Remount the caller (via `key`) to start over with a new url/query.
const usePaginatedFetch = (url, query) => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const busy = useRef(false);

    const fetchPage = useCallback((pageNum) => {
        if (busy.current) return;
        busy.current = true;
        setLoading(true);

        fetchDataFromApi(url, { query, page: pageNum })
            .then((res) => {
                // Rankings shift between requests, so a title can show up on two pages.
                setItems((prev) => {
                    const seen = new Set(prev.map(itemKey));
                    return [...prev, ...res.results.filter((item) => !seen.has(itemKey(item)))];
                });
                setPage(res.page);
                setTotalPages(Math.min(res.total_pages, MAX_PAGES));
                setTotalResults(res.total_results);
            })
            .catch(() => setError("Something went wrong!"))
            .finally(() => {
                busy.current = false;
                setLoading(false);
            });
    }, [url, query]);

    useEffect(() => {
        fetchPage(1);
    }, [fetchPage]);

    const loadMore = () => {
        if (page < totalPages) fetchPage(page + 1);
    };

    return { items, totalResults, loading, error, loadMore };
};

export default usePaginatedFetch;
