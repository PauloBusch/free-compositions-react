import './card-content.css';

import React from 'react';

export default function CardContent(props) {
  return (
    <div className="page-card-content" style={ { padding: props.padding ? props.padding : '' } }>
      { props.children }
    </div>
  );
}
