import './Music.css';

import React from 'react';

export default props => { 
  const { data } = props;

  return (
    <div className={ `music ${ props.active ? 'active' : '' }` }>
      <div className="img" style={ { backgroundImage: `url('${data.image}')` } }></div>
      <h2>{ data.author }</h2>
      <h3>{ data.name }</h3>
      <div className="actions">
        <div>
          <i className="far fa-heart"></i>
          <i className="far fa-thumbs-up"></i>
        </div>
        <i className="far fa-play-circle"></i>
        <div>
          <i className="fas fa-ellipsis-v"></i>
          <i className="fas fa-share"></i>
        </div>
      </div>
    </div>
  );
}
  
