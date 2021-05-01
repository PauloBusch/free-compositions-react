import './tab-content.css';

import React from 'react';

export default function TabContent(props) {
  const isActive = props.id === props.current;
  if (!isActive) return false;
  
  return (
    <li className="tab-content">
      { props.children }
    </li>
  );
}
