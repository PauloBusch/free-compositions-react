import '../../CardBase.css';
import './Genre.css';

import React from 'react';

export default props => {
  const { data } = props;

  return (
    <div className="card genre" style={ 
      { backgroundColor: data.color }
    }>
      <div className="detail">
        <h1>{ data.name }</h1>
      </div>
      <div className="play-hover">
        <i className="far fa-play-circle"></i>
      </div>
    </div>
  );  
}
