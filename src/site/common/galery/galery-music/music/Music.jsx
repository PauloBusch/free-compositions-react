import '../../CardBase.css';
import './Music.css';

import React from 'react';

export default props => {
  const { data } = props;

  return (
    <div className="card music" style={ 
      {
        backgroundImage: `url('${data.image}')`
      }
    }>
      <div className="play-hover">
        <i className="far fa-play-circle"></i>
      </div>
    </div>
  );  
}