import '../../CardBase.css';
import './Music.css';

import React from 'react';
import { getYoutubeLink } from '../../../../../common/api/youtube';

export default props => { 
  const { data } = props;

  return (
    <div className={ `card music ${ props.active ? 'active' : '' }` }>
      <iframe className="img" src={ getYoutubeLink(data.url) }/>
      <h2>{ data.compositor }</h2>
      <h3>{ data.name }</h3>
      <div className="actions">
        <i onClick={ () => props.readLetter(data.letter) } title="Ver Letra" className="fab fa-readme"></i>
      </div>
    </div>
  );
}
  
