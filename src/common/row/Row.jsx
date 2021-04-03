import './Row.css';

import React from 'react';

export default props => (
  <div className="grid-row" style={ { justifyContent: props.justify ? props.justify : '' } }>
    { props.children }
  </div>
);
