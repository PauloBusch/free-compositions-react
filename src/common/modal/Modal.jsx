import './Modal.css';

import React from 'react';
import Action from './action';
import { BUTTON } from './modal-action-type';

function stopScroll(stop) {
  const body = document.getElementsByTagName('body')[0];
  const isStopped = body.classList.contains('stop-scrolling');
  if (stop === isStopped) return;
  if (stop) body.classList.add('stop-scrolling');
  else body.classList.remove('stop-scrolling');
}

function getStyle(props) {
  const style = { };
  if (props.maxWidth) 
    style.maxWidth = props.maxWidth;
  return style;
}

export default function Modal(props) {
  const { title, show, onClose } = props;
  const actions = props.actions || [{ text: 'Fechar', click: onClose }];
  stopScroll(show);
  
  return (
    <div className={ `block ${ show ? '' : 'hide' }` }>
      <div className="modal" style={ getStyle(props) }>
        <div className="header">
          <h2>{ title }</h2>
          <i title="Fechar" className="fas fa-times" onClick={ () => onClose() }></i>
        </div>
        <div className="body">
          { props.children }
        </div>
        <div className="footer">
          { actions.map(b => <Action { ...b } key={ b.text } type={ b.type || BUTTON } onClick={ b.click } />) }
        </div>
      </div>
    </div>
  );
}
