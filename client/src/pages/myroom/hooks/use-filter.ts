import { useState, useCallback, useEffect, FormEvent } from "react";

import { SetterOrUpdater } from "recoil";

import { toast } from "sonner";

interface UseFilterProps<T, S> {
  sortState: S;
  filterState: T;
  searchTermState?: string;
  enabledState: boolean;
  setSortState: SetterOrUpdater<S>;
  setFilterState: SetterOrUpdater<T>;
  setSearchTermState?: SetterOrUpdater<string>;
  setEnabledState: SetterOrUpdater<boolean>;
  resetSearchState?: () => void;
}

export function useFilter<T, S>(props: UseFilterProps<T, S>) {
  const {
    filterState: filter,
    setFilterState: setFilter,
    sortState: sort,
    setSortState: setSort,
    searchTermState: searchTerm,
    setSearchTermState: setSearchTerm,
    resetSearchState,
    setEnabledState: setEnabled,
  } = props;

  const [show, setShow] = useState(false);
  const [sortShow, setSortShow] = useState(false);

  const toggleShow = useCallback(() => setShow((prev) => !prev), []);
  const toggleSortShow = useCallback(() => setSortShow((prev) => !prev), []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm && setSearchTerm(e.target.value);
  }, []);

  const handleSort = useCallback((sort: S) => {
    setSort(sort);
    setShow(false);
  }, []);

  const handleReset = useCallback(() => {
    resetSearchState && resetSearchState();
    setShow(false);
  }, [resetSearchState]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (filter && searchTerm?.trim() === "") {
      toast.message("검색어를 입력해주세요.");
    }

    setEnabled(true);
  };

  useEffect(() => {
    setShow(false);
  }, [filter, sort]);

  useEffect(() => {
    handleReset();
  }, []);

  return {
    show,
    setShow,
    toggleShow,
    sortShow,
    setSortShow,
    toggleSortShow,
    sort,
    setSort,
    handleSort,
    handleSearch,
    handleReset,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    handleSubmit,
  };
}
