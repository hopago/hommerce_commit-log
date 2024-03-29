import { useState, useCallback, useEffect, FormEvent } from "react";

import { SetterOrUpdater } from "recoil";

import { toast } from "sonner";

interface UseFilterProps<T> {
  sortState: "최신순" | "오래된순";
  filterState: T;
  searchTermState: string;
  enabledState: boolean;
  setSortState: SetterOrUpdater<"최신순" | "오래된순">;
  setFilterState: SetterOrUpdater<T>;
  setSearchTermState: SetterOrUpdater<string>;
  setEnabledState: SetterOrUpdater<boolean>;
  resetSearchState: () => void;
}

export function useFilter<T>(props: UseFilterProps<T>) {
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

  const toggleShow = useCallback(() => setShow((prev) => !prev), []);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSort = useCallback((sort: "최신순" | "오래된순") => {
    setSort(sort);
    setEnabled(true);
    setShow(false);
  }, []);

  const handleReset = useCallback(() => {
    resetSearchState();
    setShow(false);
  }, [resetSearchState]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (filter && searchTerm.trim() === "") {
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
    sort,
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
