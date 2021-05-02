import '../../CardBase.css';
import './Music.css';

import React from 'react';
import { getYoutubeLink } from '../../../../../common/api/youtube';
import { generateSendMessageLink } from '../../../../../common/api/whatsapp';
import { PURCHASE_PHONE } from '../../../../../consts';

function getPriceFormatted(price) {
  if (!price) return 'Grátis';
  return `R$ ${parseFloat(price).toLocaleString()}`;
}

export default props => {
  const { data } = props;

  return (
    <div className="card music">
      <iframe className="img" src={ getYoutubeLink(data.url) }/>
      <div className="actions">
        <i onClick={ () => props.readLetter(data.letter) } title="Ver Letra" className="fab fa-readme"></i>
        <a href={ generateSendMessageLink(PURCHASE_PHONE) } target="_blank">
          <i title={ `Comparar ${getPriceFormatted(data.price)}` } className="fas fa-cart-arrow-down"></i>
        </a>
      </div>
    </div>
  );  
}
