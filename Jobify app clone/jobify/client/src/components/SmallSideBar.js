import React from 'react';
import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import { useAppContext } from '../context/appContext';
import NavLinks from './NavLinks';

function SmallSidebar() {
  const { showSideBar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSideBar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
            <NavLinks toggleSidebar={toggleSidebar} />
          </header>
        </div>
      </div>
    </Wrapper>
  );
}

export default SmallSidebar;
