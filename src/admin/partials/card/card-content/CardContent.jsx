import './CardContent.css';

import React from 'react';

export default props => (
  <div className="page-card-content" style={ { padding: props.padding ? props.padding : '' } }>
    { props.children }
  </div>
);
