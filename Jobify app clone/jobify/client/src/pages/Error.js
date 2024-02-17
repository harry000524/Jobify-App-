import React from 'react';
import Wrapper from '../assets/wrappers/ErrorPage';
import errImg from '../assets/images/not-found.svg';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={errImg} alt="errImg" />
        <h3>Page not found</h3>
        <Link to="/">Back to Home</Link>
      </div>
    </Wrapper>
  );
}

export default Error;
