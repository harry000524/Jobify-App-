import React, { useEffect } from 'react';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/JobsContainer';
import Loader from './Loader';
import Job from './Job';
import Alert from './Alert';
import PageBtnConatiner from './PageBtnConatiner';

function JobsContainer() {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchType,
    searchStatus,
    sort,
    numOfPages,
    showAlert,
  } = useAppContext();

  useEffect(() => {
    getJobs();
  }, [search, searchType, searchStatus, sort, page]);

  if (isLoading) {
    return <Loader center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      {showAlert && <Alert />}
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnConatiner />}
    </Wrapper>
  );
}

export default JobsContainer;
