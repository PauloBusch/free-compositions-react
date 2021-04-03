import './MenuItem.css';

import React from 'react';
import { Link } from 'react-router';        

function isActive(props) {
  const currentHref = location.hash.substr(2);
  if (props.exact) return props.href === currentHref;
  return currentHref.startsWith(props.href);
}

export default props => {
  return (
    <li className="menu-item">
      <Link to={ props.href } className={ `${ isActive(props) ? 'active' : '' }` }>
        <i className={ `fas fa-${props.icon}` }></i>
        { props.name }
      </Link>
    </li>
  );
}
