import './Modal.css';

import React from 'react';
import Action from './action/Action';

export default props => {
    const { title, show, actions, onClose } = props;
    const buttons = actions || [{ text: 'Fechar', click: onClose }];
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
                pallet={ b.pallet } 
                text={ b.text }
              />
            ) }
          </div>
        </div>
      </div>
    );
}
