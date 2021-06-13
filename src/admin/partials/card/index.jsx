import './card.css';

import React from 'react';

export default function Card(props) {
  return (
    <div className="page-card">
      { props.children }
    </div>
  );
}
