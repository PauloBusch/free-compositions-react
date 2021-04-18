import '../../CardBase.css';
import './Music.css';

import React from 'react';

function getYoutubeID(url) {
  const param = 'v=';
  return url.substr(url.indexOf(param) + param.length, 11);
}

export default props => { 
  const { data } = props;
  const youtubeId = getYoutubeID(data.url);

  return (
    <div className={ `card music ${ props.active ? 'active' : '' }` }>
      <iframe className="img" src={ `https://www.youtube.com/embed/${youtubeId}` }/>
      <h2>{ data.compositor }</h2>
      <h3>{ data.name }</h3>
    </div>
  );
}
  
