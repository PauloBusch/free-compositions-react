import './card-header.css';

import React from 'react';

export default function CardHeader(props) {
  return (
    <div className="page-card-header">
      { props.children }
    </div>
  );
}
