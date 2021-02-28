import './Music.css';

import React from 'react';

export default props => {
  const { data } = props;

  return (
    <div className="music" style={ 
      {
        backgroundImage: `url('${data.image}')`
      }
    }>
      <div className="detail">
        <i className="far fa-play-circle"></i>
      </div>
    </div>
  );  
}
