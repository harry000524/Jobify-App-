import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { FormRow, FormRowSelect } from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useAppContext } from '../context/appContext';

function SearchContainer() {
  const [localSearch, setLocalSearch] = useState('');
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilter,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilter();
  };

  const handleSearch = (e) => {
    if (isLoading) {
      return;
    }
    handleChange({
      name: e.target.name,
      value: e.target.value,
    });
  };

  const debounce = () => {
    console.log('in debounce');
    let timeoutId;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleChange({
          name: e.target.name,
          value: e.target.value,
        });
      }, 1000);
    };
  };

  const optimisedDebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className="form">
        <h4>Search Jobs</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            labelText="Search"
            handleChange={optimisedDebounce}
          />
          <FormRowSelect
            labelText="Job Status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          <FormRowSelect
            labelText="Job Type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          <FormRowSelect
            labelText="Sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear Filter
          </button>
        </div>
      </form>
    </Wrapper>
  );
}

export default SearchContainer;
