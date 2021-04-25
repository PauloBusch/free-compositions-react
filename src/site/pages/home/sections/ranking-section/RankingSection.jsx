import './RankingSection.css';

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Section from '../../../../../common/section/Section';
import GaleryMusic from './../../../../common/galery/galery-music/GaleryMusic';
import Loading from './../../../../../common/loading/Loading';
import { getAllByRanking } from '../../../../../reducers/musics/MusicsActions';

class RankingSection extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: true, musics: null };
    this.afterLoad = this.afterLoad.bind(this);
  }

  componentWillMount() {
    this.props.getAllByRanking(this.afterLoad);
  }

  afterLoad(success, data) {
    if (success) {    
      this.setState({ 
        ...this.state, 
        musics: data,
        loading: false
      });
    }
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
    return <GaleryMusic cards={ this.state.musics }/>;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAllByRanking }, dispatch);
export default connect(null, mapDispatchToProps)(RankingSection);
