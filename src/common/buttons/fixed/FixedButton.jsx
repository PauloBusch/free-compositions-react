import './FixedButton.css';

import React from 'react';

export default props => (
  <i className={ `fixed-button fas fa-${props.icon}` } 
    title={ props.title } onClick={ props.onClick } 
    style={ { backgroundColor: props.color } }
  >
  </i>
);
