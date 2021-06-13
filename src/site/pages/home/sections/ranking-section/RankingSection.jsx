import './RankingSection.css';

import React, { Component } from 'react';

import Section from '../../../../../common/section/Section';
import GaleryMusic from './../../../../common/galery/galery-music/GaleryMusic';

export default class RankingSection extends Component {
  render() {
    return (
      <Section id="ranking">
        <div className="head">
          <h2>Mais ouvidas</h2>
          <i className="fas fa-chevron-right"></i>
        </div>
        <GaleryMusic ranking/>
      </Section>
    );
  }
}
