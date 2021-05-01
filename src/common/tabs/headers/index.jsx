import './tabs-header.css';

import React from 'react';

export default function TabsHeader(props) {
  return (
    <ul className="tabs-header">
      { props.children }
    </ul>
  );
}
