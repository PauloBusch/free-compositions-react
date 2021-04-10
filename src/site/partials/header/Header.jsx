import './Header.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WEBSITE_NAME } from '../../../consts';

const INITIAL_STATE = { show: false };

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ 
      ...this.state, 
      show: !this.state.show 
    });
  }

  render() {
    return (
      <header className="site-header">
        <div className="main">
          <a href="/">
            <img src="images/free-compositions/logo-small.png"/>
            <h2>{ WEBSITE_NAME || 'Website' }</h2>
          </a>
          <i id="toggle-mobile" onClick={ this.toggleMenu } className="fas fa-bars"></i>
        </div>
        <div className="menu-desktop">
          <i className="fas fa-bars"></i>
          <span>|</span>
          <a href="#">Inscrever-se</a>
          <a href="#">Entrar</a>
        </div>
        <div className={ `menu-mobile ${this.state.show ? 'show' : ''}` }>
          <a href="#">Inscrever-se</a>
          <a href="#">Entrar</a>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({ ...state.contact });
export default connect(mapStateToProps)(Header);
