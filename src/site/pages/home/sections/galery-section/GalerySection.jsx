import './GalerySection.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Section from '../../../../../common/section/Section';
import GaleryGenre from './../../../../common/galery/galery-genre/GaleryGenre';
import GaleryPlaylist from './../../../../common/galery/galery-playlist/GaleryPlaylist';
import { getAll as getGendersAll } from '../../../../../reducers/genres/GenresActions';
import { getAll as getPlaylistsAll } from '../../../../../reducers/playlists/PlaylistsActions';

const DEFAULT_STATE = { genresLoading: false, playlistsLoading: false };

class GalerySection extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;
    this.afterLoadGenres = this.afterLoadGenres.bind(this);
    this.afterLoadPlaylists = this.afterLoadPlaylists.bind(this);
    this.toggleLoadingGenres = this.toggleLoadingGenres.bind(this);
    this.toggleLoadingPlaylists = this.toggleLoadingPlaylists.bind(this);
  }

  componentWillMount() {
    this.setState({
      ...this.state,
      genresLoading: true,
      playlistsLoading: true
    });
    this.props.getGendersAll(this.afterLoadGenres);
    this.props.getPlaylistsAll(this.afterLoadPlaylists);
  }

  afterLoadGenres(success) {
    if (success) this.toggleLoadingGenres(false);
  }

  afterLoadPlaylists(success) {
    if (success) this.toggleLoadingPlaylists(false);
  }

  toggleLoadingGenres(loading) {
    this.setState({
      ...this.state,
      genresLoading: loading
    });
  }

  toggleLoadingPlaylists(loading) {
    this.setState({
      ...this.state,
      playlistsLoading: loading
    });
  }

  render() {
    return (
      <Section id="galery">
        <div className="head">
          <h2>Músicas por gênero</h2>
          <i className="fas fa-chevron-right"></i>
        </div>
        <GaleryGenre loading={ this.state.genresLoading } cards={ this.props.genres }/>
        
        <div className="head">
          <h2>Playlists populares</h2>
          <i className="fas fa-chevron-right"></i>
        </div>
        <GaleryPlaylist loading={ this.state.playlistsLoading } cards={ this.props.playlists }/>
      </Section>
    );
  }
}

const mapStateToProps = state => ({ genres: state.genres, playlists: state.playlists });
const mapDispatchToProps = dispatch => bindActionCreators({ getGendersAll, getPlaylistsAll }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GalerySection);
