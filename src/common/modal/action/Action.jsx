import './Action.css';

import React from 'react';

function getStyle(props) {
  const { pallet } = props;
  if (!pallet) return { };
  return {  
    backgroundColor: pallet.fill,
    color: pallet.text,
  };
}

export default props => (
  <button className="modal-action"
    onClick={ props.onClick } 
    style={ getStyle(props) }
  >
    { props.text }
  </button>
);
