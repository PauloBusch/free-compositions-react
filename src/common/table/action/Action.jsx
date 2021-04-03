import './Action.css';

import React from 'react';

export default props => (
  <i 
    className={ `table-action fas fa-${props.icon}` } 
    title={ props.title } onClick={ props.onClick } 
    style={ { color: props.color } }
  ></i>
);
