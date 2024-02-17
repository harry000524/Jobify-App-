import React from 'react';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import NavLinks from './NavLinks';

function BigSidebar() {
  const { showSideBar, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div
        className={
          !showSideBar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
}

export default BigSidebar;
