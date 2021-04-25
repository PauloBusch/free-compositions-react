import './playlist.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getById } from '../../../reducers/playlists/PlaylistsActions';
import { getAllByPlaylist } from '../../../reducers/musics/MusicsActions';
import Loading from '../../../common/loading/Loading';
import GaleryMusic from '../../common/galery/galery-music/GaleryMusic';
import Message from '../../../common/table/message/Message';

class PlaylistDetail extends Component {
  constructor(props) {
    super(props);

    this.id = this.getId();
    this.state = { loading: true, artist: null, musics: null };
    this.afterLoad = this.afterLoad.bind(this);
    this.afterLoadGalery = this.afterLoadGalery.bind(this);
    this.getData = this.getData.bind(this);
    this.getGalery = this.getGalery.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    this.props.getById(this.id, this.afterLoad);
  }

  afterLoad(success, data) {
    if (success) {    
      this.setState({ 
        ...this.state, 
        playlist: data
      });
      this.getGalery(data);
    }
  }

  getGalery(artist) {
    this.props.getAllByPlaylist(artist.name, this.afterLoadGalery);
  }

  afterLoadGalery(success, data) {
    if (success) {    
      this.setState({ 
        ...this.state,
        musics: data,
        loading: false
      });
    }
  }

  getId() {
    const { router } = this.props;
    const { pathname } = router.location;
    const regex = /\/view\//;
    const index = pathname.search(regex);
    if (index === -1) return null;
    return pathname.substring(index).replace(regex, '');
  }

  render() {
    return (<div id="artist">{ this.detail() }</div>);
  }

  detail() {
    if (this.state.loading || !this.state.playlist || !this.state.musics) 
      return <Loading style={ { marginTop: '15vh' } }/>;

    const { playlist } = this.state;
    return (
      <div>
        <h2>{ playlist.name }</h2>
        { this.state.musics.length === 0 && 
          <Message message="Nenhuma música da playlist"/>
        }
        { this.state.musics.length > 0 && 
          <GaleryMusic cards={ this.state.musics }/>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getById, getAllByPlaylist }, dispatch);
export default connect(null, mapDispatchToProps)(PlaylistDetail);
