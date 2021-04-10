import './Action.css';

import React from 'react';
import If from '../../operators/If';

function getStyle(props) {
  const { pallet } = props;
  if (!pallet) return { };
  return {  
    backgroundColor: pallet.fill,
    color: pallet.text,
  };
}

export default props => (
  <div className="action-button action-container" >
    <If test={ props.loading }>
      <div className="container-spinner">
        <i  className="spinner fas fa-spinner"></i>
      </div>
    </If>

    <button className="modal-action"
      onClick={ props.onClick } 
      style={ getStyle(props) }
    >
      { props.text }
    </button>
  </div>
);
