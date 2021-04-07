import './ButtonPrev.css';

import React from 'react';

export default props => (
  <i className={ `fas fa-chevron-left prev-slide ${ props.disabled ? 'disabled' : '' }` } 
    onClick={ props.onClick }></i>
);
