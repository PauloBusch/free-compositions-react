import './RankingSection.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Section from '../../../../../common/section/Section';
import GaleryMusic from './../../../../common/galery/galery-music/GaleryMusic';
import Loading from './../../../../../common/loading/Loading';

const DEFAULT_STATE = { loading: true };

class RankingSection extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  componentWillMount() {
    this.toggleLoading(false);
  }

  toggleLoading(loading) {
    this.setState({
      ...this.state,
      loading: loading
    });
  }

  render() {
    return (
      <Section id="ranking">
        <div className="head">
          <h2>Mais ouvidas</h2>
          <i className="fas fa-chevron-right"></i>
        </div>
        { this.ranking() }
      </Section>
    );
  }

  ranking() {
    if (this.state.loading) return <Loading style={ { margin: '10vh 0' } }/>;
    return <GaleryMusic cards={ this.props.ranking }/>;
  }
}

const mapStateToProps = state => ({ ranking: state.ranking });
export default connect(mapStateToProps)(RankingSection);
