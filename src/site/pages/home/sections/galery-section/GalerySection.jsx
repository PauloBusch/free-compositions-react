import './GalerySection.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Section from '../../../../../common/section/Section';
import GaleryGenre from './../../../../common/galery/galery-genre/GaleryGenre';
import GaleryPlaylist from './../../../../common/galery/galery-playlist/GaleryPlaylist';
import { getAll as getGendersAll } from '../../../../../reducers/genres/GenresActions';
import { getAll as getPlaylistsAll } from '../../../../../reducers/playlists/PlaylistsActions';
import * as _ from 'lodash';

class GalerySection extends Component {
  componentWillMount() {
    this.props.getGendersAll();
    this.props.getPlaylistsAll();
  }

  getPlaylists() {
    const { musics } = this.props;
    const groupByPlaylist = _.groupBy(musics, 'playlist');
    return Object.keys(groupByPlaylist).map(playlist => {
      return { name: playlist, image: groupByPlaylist[playlist][0].image };
    });
  }

  render() {
    return (
      <Section id="galery">
        <div className="head">
          <h2>Músicas por gênero</h2>
          <i className="fas fa-chevron-right"></i>
        </div>
        <GaleryGenre cards={ this.props.genres }/>
        
        <div className="head">
          <h2>Playlists populares</h2>
          <i className="fas fa-chevron-right"></i>
        </div>
        <GaleryPlaylist cards={ this.getPlaylists() }/>
      </Section>
    );
  }
}

const mapStateToProps = state => ({ genres: state.genres, playlists: state.playlists, musics: state.musics });
const mapDispatchToProps = dispatch => bindActionCreators({ getGendersAll, getPlaylistsAll }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(GalerySection);
