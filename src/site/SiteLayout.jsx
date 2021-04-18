import React, { Component } from 'react';

import Footer from './partials/footer/Footer';
import Header from './partials/header/Header';
import { listenSessionChanged } from '../reducers/auth/AuthActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SiteLayout extends Component {
  componentWillMount() {
    this.props.listenSessionChanged(false);
  }

  render() {
    return (
      <div>
        <Header />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ listenSessionChanged }, dispatch);
export default connect(null, mapDispatchToProps)(SiteLayout) 
