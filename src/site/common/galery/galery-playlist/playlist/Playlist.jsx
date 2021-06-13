import '../../CardBase.css';
import './Playlist.css';

import React from 'react';
import { hashHistory } from 'react-router';

function goToPlaylist(id) {
  hashHistory.push(`/playlist/view/${id}`);
}

export default props => {
  const { data } = props;

  return (
    <div onClick={ () => goToPlaylist(data.id) } className="card playlist" style={ 
      { 
        transition: props.enableTransition ? '.2s' : 'none',
        backgroundImage: `url('${data.image}')` 
      }
    }>
      <div className="detail">
        <h1>{ data.name }</h1>
      </div>
    </div>
  );  
}
