import './Modal.css';

import React from 'react';
import Action from './action/Action';

function stopScroll(stop) {
  const body = document.getElementsByTagName('body')[0];
  const isStopped = body.classList.contains('stop-scrolling');
  if (stop === isStopped) return;
  if (stop) body.classList.add('stop-scrolling');
  else body.classList.remove('stop-scrolling');
}

export default props => {
    const { title, show, actions, onClose } = props;
    const buttons = actions || [{ text: 'Fechar', click: onClose }];
    stopScroll(show);
    return (
      <div className={ `block ${ show ? '' : 'hide' }` }>
        <div className="modal">
          <div className="header">
            <h2>{ title }</h2>
            <i title="Fechar" className="fas fa-times" onClick={ () => onClose() }></i>
          </div>
          <div className="body">
            { props.children }
          </div>
          <div className="footer">
            { buttons.map(b => 
              <Action key={ b.text } 
                onClick={ b.click } 
                loading={ b.loading } 
                pallet={ b.pallet } 
                text={ b.text }
              />
            ) }
          </div>
        </div>
      </div>
    );
}
