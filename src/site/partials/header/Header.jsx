import './Header.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WEBSITE_NAME } from '../../../consts';
import { Link } from 'react-router';
import { Fragment } from 'babel-plugin-react-html-attrs';

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
    const { user } = this.props;

    const menus = <div>
      <Link to="/create-account">Inscrever-se</Link>
      <Link to={ user ? '/logout' : '/login' }>{ user ? 'Sair' : 'Entrar' }</Link>
    </div>;

    return (
      <header className="site-header">
        <div className="main">
          <a href="/">
            <img src="images/free-compositions/logo-small.png"/>
            <h2>{ WEBSITE_NAME || 'Website' }</h2>
          </a>
          <i id="toggle-mobile" onClick={ this.toggleMenu } className="fas fa-bars"></i>
        </div>
        <div className="menu-desktop">{ menus }</div>
        <div className={ `menu-mobile ${this.state.show ? 'show' : ''}` }>{ menus }</div>
      </header>
    );
  }
}

const mapStateToProps = state => ({ ...state.contact, user: state.auth.user });
export default connect(mapStateToProps)(Header);
