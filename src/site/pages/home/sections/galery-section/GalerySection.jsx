import './GalerySection.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Section from '../../../../../common/section/Section';
import GaleryGenre from './../../../../common/galery/galery-genre/GaleryGenre';

class GalerySection extends Component {
  render() {
    return (
    <Section id="galery">
      <div className="head">
        <h2>Músicas por gênero</h2>
        <i className="fas fa-chevron-right"></i>
      </div>
      <GaleryGenre cards={ this.props.genres }/>
    </Section>
    );
  }
}

const mapStateToProps = state => ({ genres: state.genres, playlists: state.playlists });
export default connect(mapStateToProps)(GalerySection);
