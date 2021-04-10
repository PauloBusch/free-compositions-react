import './Header.css';

import React from 'react';

import { WEBSITE_NAME } from '../../../consts';

export default function Header() {
  return (
    <header className="header-admin">
      <div className="title">
        <i className="fas fa-user-cog"></i>
        <h2>Painel Administrativo - { WEBSITE_NAME || 'Website' }</h2>
      </div>
    </header>
  );
}
