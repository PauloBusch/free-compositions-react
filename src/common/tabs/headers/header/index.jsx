import './tab-header.css';

import React from 'react';

export default function TabHeader(props) {
  const isActive = props.target === props.current;

  return (
    <li onClick={ () => props.onClick(props.target) } 
      className={ `tab-header${isActive ? ' active' : ''}` }>
      <h2>{ props.title }</h2>
    </li>
  );
}
