import './Header.css';

import React from 'react';
import { hashHistory } from 'react-router';

import { WEBSITE_NAME } from '../../../consts';

export default function Header() {
  return (
    <header className="header-admin">
      <div className="title">
        <i className="fas fa-user-cog"></i>
        <h2>Painel Administrativo - { WEBSITE_NAME || 'Website' }</h2>
      </div>
        <div className="actions">
          <i id="icon-logout" title="Sair" className="fas fa-sign-out-alt" onClick={ () => hashHistory.push('/logout') }></i>
        </div>
    </header>
  );
}
