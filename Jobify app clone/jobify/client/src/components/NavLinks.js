import React from 'react';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';

function NavLinks({ toggleSidebar }) {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, path, text, icon } = link;
        return (
          <NavLink
            key={id}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to={path}
            onClick={toggleSidebar}
            end
          >
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
