import './ArtistsSection.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Section from '../../../../../common/section/Section';
import PlayerArtist from './../../../../common/player/player-artist/PlayerArtist';

class ArtistsSection extends Component {
  render() {
    return (
    <Section id="artists">
      <h1>Artistas</h1>
      <PlayerArtist cards={ this.props.artists }/>
    </Section>
    );
  }
}

const mapStateToProps = state => ({ artists: state.artists });
export default connect(mapStateToProps)(ArtistsSection);
