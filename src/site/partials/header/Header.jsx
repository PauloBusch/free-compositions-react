import './Header.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <header className="site-header">
        <div className="main">
          <a href="/">
            <img src="images/free-compositions/logo-small.png"/>
            <h1>{ this.props.name }</h1>
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
  }
}

const mapStateToProps = state => ({ ...state.contact });
export default connect(mapStateToProps)(Header);
