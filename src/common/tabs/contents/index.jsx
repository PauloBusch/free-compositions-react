import './tabs-content.css';

import React from 'react';

export default function TabsContent(props) {
  return (
    <ul className="tabs-content">
      { props.children }
    </ul>
  );
}
