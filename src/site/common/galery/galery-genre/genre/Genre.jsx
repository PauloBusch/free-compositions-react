import '../../CardBase.css';
import './Genre.css';

import React from 'react';
import { hashHistory } from 'react-router';

function goToGenre(id) {
  hashHistory.push(`/genre/view/${id}`);
}

export default props => {
  const { data } = props;

  return (
    <div onClick={ () => goToGenre(data.id) } className="card genre" style={ 
      { backgroundColor: data.backgroundColor }
    }>
      <div className="detail">
        <h1>{ data.name }</h1>
      </div>
    </div>
  );  
}
