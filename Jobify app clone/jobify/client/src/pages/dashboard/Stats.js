import React, { useEffect } from 'react';
import {
  ChartsContainerComponent,
  Loader,
  StatsContainerComponent,
} from '../../components';
import { useAppContext } from '../../context/appContext';

function Stats() {
  const { stats, isLoading, monthlyApplications, showStats } = useAppContext();

  useEffect(() => {
    console.log('in stats');
    showStats();
  }, []);

  if (isLoading) {
    return <Loader center />;
  }

  return (
    <>
      <StatsContainerComponent />
      {monthlyApplications.length !== 0 && <ChartsContainerComponent />}
    </>
  );
}

export default Stats;
