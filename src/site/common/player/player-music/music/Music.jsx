import '../../CardBase.css';
import './Music.css';

import React from 'react';

import { getYoutubeLink } from '../../../../../common/api/youtube';
import { generateSendMessageLink } from '../../../../../common/api/whatsapp';
import { PURCHASE_PHONE } from '../../../../../consts';

export default props => { 
  const { data } = props;

  return (
    <div className={ `card music ${ props.active ? 'active' : '' }` }>
      <iframe className="img" src={ getYoutubeLink(data.url) }/>
      <h2>{ data.compositor }</h2>
      <h3>{ data.name }</h3>
      <div className="actions">
        <i onClick={ () => props.readLetter(data.letter) } title="Ver Letra" className="fab fa-readme"></i>
        <a href={ generateSendMessageLink(PURCHASE_PHONE) } target="_blank">
          <i title="Comprar" className="fas fa-cart-arrow-down"></i>
        </a>
      </div>
    </div>
  );
}
  
