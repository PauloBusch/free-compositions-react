import './MusicsSection.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Section from '../../../../../common/section/Section';
import PlayerMusic from '../../../../common/player/player-music/PlayerMusic';
import { getAll } from '../../../../../reducers/musics/MusicsActions';

class MusicsSection extends Component {
  componentWillMount() {
    this.props.getAll();
  }

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
const mapDispatchToProps = dispatch => bindActionCreators({ getAll }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MusicsSection);
