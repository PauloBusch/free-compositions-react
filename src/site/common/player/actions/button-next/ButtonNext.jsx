import './ButtonNext.css';

import React from 'react';

export default props => (
  <i className={ `fas fa-chevron-right next ${ props.disabled ? 'disabled' : '' }` } 
    onClick={ props.onClick }></i>
);
