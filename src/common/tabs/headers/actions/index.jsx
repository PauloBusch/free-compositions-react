import './actions.css';

import React from 'react';

export default function TabActions(props) {
  return (
    <li className="tab-actions">
      { props.children }
    </li>
  );
}
