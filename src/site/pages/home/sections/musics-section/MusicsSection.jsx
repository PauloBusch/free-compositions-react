import './MusicsSection.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Section from '../../../../../common/section/Section';
import PlayerMusic from '../../../../common/player/player-music/PlayerMusic';
import { getAll } from '../../../../../reducers/musics/MusicsActions';

const DEFAULT_STATE = { loading: false };

class MusicsSection extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;
    this.afterLoad = this.afterLoad.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  componentWillMount() {
    this.toggleLoading(true);
    this.props.getAll(this.afterLoad);
  }

  afterLoad(success) {
    if (success) this.toggleLoading(false);
  }

  toggleLoading(loading) {
    this.setState({
      ...this.state,
      loading: loading
    });
  }

  render() {
    return (
      <Section id="musics">
        <h1>Músicas</h1>
        <PlayerMusic loading={ this.state.loading } cards={ this.props.musics }/>
      </Section>
    );
  }
}

const mapStateToProps = state => ({ musics: state.musics });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MusicsSection);
