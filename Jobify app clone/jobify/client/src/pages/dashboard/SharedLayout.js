import React from 'react';
import Wrapper from '../../assets/wrappers/SharedLayout';
import { Link, Outlet } from 'react-router-dom';
import { Navbar, BigSideBar, SmallSideBar } from '../../components';

function SharedLayout() {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSideBar />
        <BigSideBar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
}

export default SharedLayout;
