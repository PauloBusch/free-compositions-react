import './Loading.css';

import React from 'react';

export default function Loading(props) {
  return (
    <div className="loading-spinner" style={ props.style }>
      <i  className="fas fa-spinner"></i>
    </div>
  );
}
