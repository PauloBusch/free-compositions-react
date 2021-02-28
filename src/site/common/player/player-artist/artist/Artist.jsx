import './Artist.css';
import '../../CardBase.css';

import React from 'react';

export default props => { 
  const { data } = props;

  return (
    <div className={ `card artist ${ props.active ? 'active' : '' }` }>
      <div className="img" style={ { backgroundImage: `url('${data.image}')` } }></div>
      <h2>{ data.name }</h2>
      <div className="actions">
        <i className="fas fa-random"></i>
        <div>
          <i className="fas fa-chevron-left"></i>
          <i className="far fa-play-circle"></i>
          <i className="fas fa-chevron-right"></i>
        </div>
        <i className="fas fa-redo-alt"></i>
      </div>
    </div>
  );
}
  
