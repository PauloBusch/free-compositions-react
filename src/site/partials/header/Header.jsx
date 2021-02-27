import './Header.css';

import React from 'react';

export default props => (
  <header className="site-header">
    <div className="main">
      <a href="/">
        <img src="images/free-compositions/logo-small.png"/>
        <h1>Composições Livre</h1>
      </a>
    </div>
    <div className="menu">
      <i className="fas fa-bars"></i>
      <span>|</span>
      <a href="#">Inscrever-se</a>
      <a href="#">Entrar</a>
    </div>
  </header>
);
