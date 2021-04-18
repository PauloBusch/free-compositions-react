import './ArtistsSection.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Section from '../../../../../common/section/Section';
import PlayerArtist from './../../../../common/player/player-artist/PlayerArtist';
import Loading from './../../../../../common/loading/Loading';

const DEFAULT_STATE = { loading: true };

class ArtistsSection extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;
    this.toggleLoading = this.toggleLoading.bind(this);
  }

  componentWillMount() {
    this.toggleLoading(false);
  }

  toggleLoading(loading) {
    this.setState({
      ...this.state,
      loading: loading
    });
  }

  render() {
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
export default connect(mapStateToProps)(ArtistsSection);
