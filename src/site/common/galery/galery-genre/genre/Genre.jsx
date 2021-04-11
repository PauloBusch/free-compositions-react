import '../../CardBase.css';
import './Genre.css';

import React from 'react';

export default props => {
  const { data } = props;

  return (
    <div className="card genre" style={ 
      { backgroundColor: data.backgroundColor }
    }>
      <div className="play-hover">
        <i className="far fa-play-circle"></i>
      </div>
      <div className="detail">
        <h1 style={ { color: data.contrastColor } }>{ data.name }</h1>
      </div>
    </div>
  );  
}
