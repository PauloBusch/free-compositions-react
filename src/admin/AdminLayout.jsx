import './AdminLayout.css';

import React, { Component } from 'react';

import Header from './partials/header/Header';
import Sidenav from './partials/sidenav/Sidenav';
import Content from './partials/content/Content';
import Toastr from '../common/messages/toastr';
import { logout } from './reducers/auth/AuthActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AdminLayout extends Component {
  render() {
    return (
      <div className="container-admin">
        <Header logout={ this.props.logout }/>
        <div className="row-admin">
          <Sidenav />
          <Content>
            { this.props.children }
          </Content>
          <Toastr />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);
export default connect(null, mapDispatchToProps)(AdminLayout);
