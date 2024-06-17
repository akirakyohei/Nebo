import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function useSimpleFilters(limit = 10) {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState(query);
  const [page, setPage] = useState(1);
  const changePage = (_page: number) => {
    setPage(_page);
  };

  const changeQuery = (_query: string) => {
    setQuery(_query);
    setDebounceQuery(_query);
    setPage(1);
  };

  const changeDebounceQuery = (_query: string) => {
    setQuery(_query);
  };

  const handleDebounceQuery = useDebouncedCallback((_query: string) => {
    setDebounceQuery(_query);
    setPage(1);
  }, 500);

  useEffect(() => {
    if (query !== debounceQuery) {
      handleDebounceQuery.cancel();
      handleDebounceQuery(query);
    }
  }, [debounceQuery, handleDebounceQuery, query]);

  const loadMore = () => {
    setPage((_page) => _page + 1);
  };
  return {
    query,
    debounceQuery,
    page,
    limit,
    changePage,
    changeQuery,
    changeDebounceQuery,
    loadMore,
  };
}
