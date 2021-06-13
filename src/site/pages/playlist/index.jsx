import './playlist.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getById } from '../../../reducers/playlists/PlaylistsActions';
import Loading from '../../../common/loading/Loading';
import GaleryMusic from '../../common/galery/galery-music/GaleryMusic';

class PlaylistDetail extends Component {
  constructor(props) {
    super(props);

    this.id = this.getId();
    this.state = { loading: true, artist: null, musics: null };
    this.afterLoad = this.afterLoad.bind(this);
    this.getData = this.getData.bind(this);
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
        loading: false, 
        playlist: data
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
    if (this.state.loading) 
      return <Loading style={ { marginTop: '15vh' } }/>;

    const { playlist } = this.state;
    return (
      <div>
        <h2>{ playlist.name }</h2>
        <GaleryMusic playlistName={ playlist.name } emptyMessage="Nenhuma música da playlist"/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getById }, dispatch);
export default connect(null, mapDispatchToProps)(PlaylistDetail);
