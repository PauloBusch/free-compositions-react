import React, { Component } from 'react';

import Footer from './partials/footer/Footer';
import Header from './partials/header/Header';
import { listenSessionChanged } from '../reducers/auth/AuthActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toastr from '../common/messages/toastr';

class SiteLayout extends Component {
  componentWillMount() {
    this.props.listenSessionChanged(false);
  }

  render() {
    if (this.props.loading) return false;

    return (
      <div>
        <Header />
        { this.props.children }
        <Footer />
        <Toastr />
      </div>
    );
  }
}

const mapStateToProps = state => ({ loading: state.auth.loading });
const mapDispatchToProps = dispatch => bindActionCreators({ listenSessionChanged }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SiteLayout) 
