import './Artist.css';
import '../../CardBase.css';

import React from 'react';
import { hashHistory } from 'react-router';

function goToArtist(id) {
  hashHistory.push(`/artist/view/${id}`);
}

export default props => { 
  const { data } = props;

  return (
    <div onClick={ () => goToArtist(data.id) } className={ `card artist ${ props.active ? 'active' : '' }` }>
      <div className="img" style={ { backgroundImage: `url('${data.image}')` } }></div>
      <h2>{ data.name }</h2>
    </div>
  );
}
  
