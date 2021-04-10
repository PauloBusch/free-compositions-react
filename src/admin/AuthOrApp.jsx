import React, { Component } from 'react';
import { connect } from 'react-redux';

import firebase from 'firebase';
import 'firebase/auth';
import Auth from './auth/login/Auth';
import AdminLayout from './AdminLayout';
import { listenSessionChanged } from './reducers/auth/AuthActions';
import { bindActionCreators } from 'redux';

class AuthOrApp extends Component {
  componentWillMount() {
    this.props.listenSessionChanged();
  }

  render() {
    const { loading, user } = this.props;
    if (loading) return false;

    return user
      ? <AdminLayout>{ this.props.children }</AdminLayout>
      : <Auth />
  }
}
const mapStateToProps = state => ({ loading: state.auth.loading, user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ listenSessionChanged }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp)
