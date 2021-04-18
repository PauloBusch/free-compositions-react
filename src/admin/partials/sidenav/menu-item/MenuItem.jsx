import './MenuItem.css';

import React, { Component } from 'react';
import { Link } from 'react-router';        
import { hashHistory } from 'react-router';

export default class MenuItem extends Component {
  constructor(props) {
    super(props);

    this.state = { active: this.isActive() };
    this.routeChanged = this.routeChanged.bind(this);
    window.addEventListener('popstate', this.routeChanged);
  }

  routeChanged() {
    const currentHref = location.hash.substr(2);
    if (currentHref === 'admin')
      return hashHistory.push('/admin/slides');
    this.setState({ ...this.state, active: this.isActive() });
  }

  isActive() {
    const { exact, href } = this.props;
    const currentHref = location.hash.substr(2);
    if (exact) return href === currentHref;
    return currentHref.startsWith(href);
  }
 
  render() {
    const { name, icon, href } = this.props;
    return (
      <li className="menu-item">
        <Link to={ href } className={ `${ this.isActive() ? 'active' : '' }` }>
          <i className={ `fas fa-${icon}` }></i>
          { name }
        </Link>
      </li>
    );
  }
}
