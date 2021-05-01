import './tabs.css';

import React from 'react';

export default function Tabs(props) {
  return (
    <div className="tabs">
      { props.children }
    </div>
  );
}  
