import './RankingSection.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Section from '../../../../../common/section/Section';
import GaleryMusic from './../../../../common/galery/galery-music/GaleryMusic';

class RankingSection extends Component {
  render() {
    return (
    <Section id="ranking">
      <div className="head">
        <h2>Mais ouvidas</h2>
        <i className="fas fa-chevron-right"></i>
      </div>
      <GaleryMusic cards={ this.props.ranking }/>
    </Section>
    );
  }
}

const mapStateToProps = state => ({ ranking: state.ranking });
export default connect(mapStateToProps)(RankingSection);
