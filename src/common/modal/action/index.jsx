import './action.css';

import React from 'react';
import If from '../../operators/If';
import { LINK } from '../modal-action-type';
import { LEFT } from '../modal-action-pull';

function getStyle(props) {
  const { pallet } = props;
  if (!pallet) return { };
  return {  
    backgroundColor: pallet.fill,
    color: pallet.text,
  };
}

export default function Action(props) {
  const { loading, text, href, type, pull, onClick } = props;

  if (type === LINK) return (
    <a href={ href } target="_blank" className={ `action-link${ pull === LEFT ? ' pull-left' : '' }` }>{ text }</a>
  );

  return (
    <div className={ `action-button action-container${ pull === LEFT ? ' pull-left' : '' }` } >
      <If test={ loading }>
        <div className="container-spinner">
          <i  className="spinner fas fa-spinner"></i>
        </div>
      </If>
  
      <button type="button" className="modal-action"
        onClick={ onClick } 
        style={ getStyle(props) }
      >
        { text }
      </button>
    </div>
  );  
}
