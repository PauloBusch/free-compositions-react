import './GalerySection.css';

import React, { Component } from 'react';

import Section from '../../../../../common/section/Section';
import GaleryGenre from './../../../../common/galery/galery-genre/GaleryGenre';
import GaleryPlaylist from './../../../../common/galery/galery-playlist/GaleryPlaylist';

export default class GalerySection extends Component {
  render() {
    return (
      <Section id="galery">
        <div className="head">
          <h2>Músicas por gênero</h2>
          <i className="fas fa-chevron-right"></i>
        </div>
        <GaleryGenre/>
        
        <div className="head">
          <h2>Playlists populares</h2>
          <i className="fas fa-chevron-right"></i>
        </div>
        <GaleryPlaylist/>
      </Section>
    );
  }
}
