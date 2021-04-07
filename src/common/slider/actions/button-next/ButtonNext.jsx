import './ButtonNext.css';

import React from 'react';

export default props => (
  <i className={ `fas fa-chevron-right next-slide ${ props.disabled ? 'disabled' : '' }` } 
    onClick={ props.onClick }></i>
);
