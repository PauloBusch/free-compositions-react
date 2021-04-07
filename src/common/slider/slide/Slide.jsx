import './Slide.css';

import React from 'react';

export default props => (
  <li className={ `slide ${ props.active ? 'active' : '' }` }>
    <div className="image" style={
        { 
          backgroundImage: `url('${ props.image }')`,
          backgroundPosition: props.position || 'top center'
        }
      }>
    </div>
    { props.template ? props.template() : false }
  </li>
);
