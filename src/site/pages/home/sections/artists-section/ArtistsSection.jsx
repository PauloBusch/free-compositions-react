import './ArtistsSection.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Section from '../../../../../common/section/Section';
import PlayerArtist from './../../../../common/player/player-artist/PlayerArtist';
import Loading from './../../../../../common/loading/Loading';
import { getAll } from './../../../../reducers/artists/ArtistsActions';
import { bindActionCreators } from 'redux';

const DEFAULT_STATE = { loading: true };

class ArtistsSection extends Component {
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
    if (!this.state.loading && this.props.artists.length === 0) return false;

    return (
      <Section id="artists">
        <h1>Artistas</h1>
        { this.artists() }
      </Section>
    );
  }

  artists() {
    if (this.state.loading) return <Loading style={ { marginTop: '30vh' } }/>;
    return <PlayerArtist cards={ this.props.artists }/>;
  }
}

const mapStateToProps = state => ({ artists: state.artists });
const mapDispatchToProps = dispatch => bindActionCreators({ getAll }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ArtistsSection);
