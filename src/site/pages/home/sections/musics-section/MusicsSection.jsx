import './MusicsSection.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Section from '../../../../../common/section/Section';
import PlayerMusic from '../../../../common/player/player-music/PlayerMusic';

class MusicsSection extends Component {
  render() {
    return (
    <Section id="musics">
      <h1>Músicas</h1>
      <PlayerMusic cards={ this.props.musics }/>
    </Section>
    );
  }
}

const mapStateToProps = state => ({ musics: state.musics });
export default connect(mapStateToProps)(MusicsSection);
