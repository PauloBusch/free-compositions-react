import './SubmitButton.css';

import React from 'react';
import If from '../../operators/If';

export default props => (
  <div className="submit-button submit-container" >
    <If test={ props.loading }>
      <div className="container-spinner">
        <i  className="spinner fas fa-spinner"></i>
      </div>
    </If>
    <button type="submit" disabled={ props.disabled } onClick={ props.onClick } style={ 
      { 
        width: props.fill ? '100%' : 'auto',
        padding: props.padding ? props.padding : ''
      } 
    }>{ props.text }</button>
  </div>
);
