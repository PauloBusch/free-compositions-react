import './tabs-filter.css';

import React from 'react';

export default function TabsFilter(props) {
  return (
    <ul className="tabs-filter" style={ { display: props.show ? 'block' : 'none' } }>
      { props.children }
    </ul>
  );
}
