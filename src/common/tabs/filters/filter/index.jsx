import './tab-filter.css';

import React from 'react';

export default function TabFilter(props) {
  const isActive = props.id === props.current;
  if (!isActive) return false;
  
  return (
    <li className="tab-filter">
      <div className="tab-filter-fields">
        { props.children }
      </div>
      <i title="Fechar" onClick={ props.onClose } className="action fas fa-times"></i>
    </li>
  );
}
