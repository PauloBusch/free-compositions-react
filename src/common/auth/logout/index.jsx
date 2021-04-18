import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from './../../../reducers/auth/AuthActions';
import { hashHistory } from 'react-router';

class Logout extends Component {
  componentWillMount(){
    this.props.logout(this.afterLogout.bind(this));
  }

  afterLogout(success) {
    if (success) hashHistory.push('/');
  }

  render() { 
    return false;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);
export default connect(null, mapDispatchToProps)(Logout);
