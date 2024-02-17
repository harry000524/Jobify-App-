import React from 'react';
import logo from '../assets/images/logo.svg';

function Logo() {
  return (
    <nav>
      <img src={logo} alt="logo" className="logo" />
    </nav>
  );
}

export default Logo;
