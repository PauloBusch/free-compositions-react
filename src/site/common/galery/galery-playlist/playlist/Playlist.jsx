import '../../CardBase.css';
import './Playlist.css';

import React from 'react';

export default props => {
  const { data } = props;

  return (
    <div className="card playlist" style={ 
      {
        backgroundImage: `url('${data.image}')`
      }
    }>
      <div className="detail">
        <h1>{ data.name }</h1>
      </div>
      <div className="actions">
        <i className="far fa-play-circle"></i>
        <i className="far fa-heart"></i>
        <i className="fas fa-ellipsis-v"></i>
      </div>
    </div>
  );  
}
