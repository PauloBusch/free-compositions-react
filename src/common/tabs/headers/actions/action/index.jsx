import './action.css';

import React from 'react';

export default function TabAction(props) {
  return (
    <i 
      className={ `tab-action fas fa-${props.icon}` } 
      title={ props.title } onClick={ props.onClick } 
      style={ { color: props.color } }
    ></i>
  );  
}
