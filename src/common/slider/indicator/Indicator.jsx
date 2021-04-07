import './Indicator.css';

import React from 'react';

export default props => (
  <li className={ `indicator ${ props.active ? 'active' : '' }` } onClick={ props.onClick }></li>
);
