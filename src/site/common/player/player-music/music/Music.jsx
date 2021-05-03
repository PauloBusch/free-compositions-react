import '../../CardBase.css';
import './Music.css';

import React from 'react';

import { getYoutubeLink } from '../../../../../common/api/youtube';
import { PURCHASE_PHONE } from '../../../../../consts';
import { generateSendMessageLink } from './../../../../../common/api/whatsapp';

function getPriceContent(price) {
  if (!price) return <h2>GRÁTIS</h2>;
  return <h2>R$ { parseFloat(price).toLocaleString() }</h2>;
}

export default props => { 
  const { data } = props;
  const buyMessage = `Olá! Quero comprar a música "${data.name}" do compositor "${data.compositor}". Poderia me ajudar?`;

  return (
    <div className={ `card music ${ props.active ? 'active' : '' }` }>
      <iframe className="img" src={ getYoutubeLink(data.url) }/>
      <h2>{ data.compositor }</h2>
      <h3>{ data.name }</h3>
      { getPriceContent(data.price) }
      <div className="actions">
        <i onClick={ () => props.readLetter(data.letter) } title="Ver Letra" className="fab fa-readme"></i>
        <a href={ generateSendMessageLink(PURCHASE_PHONE, buyMessage) } target="_blank">
          <i title="Comprar" className="fas fa-cart-arrow-down"></i>
        </a>
      </div>
    </div>
  );
}
  
