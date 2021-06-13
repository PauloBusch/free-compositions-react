import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Playlist from './playlist/Playlist';
import ButtonPrev from '../../player/actions/button-prev/ButtonPrev';
import ButtonNext from '../../player/actions/button-next/ButtonNext';
import GaleryBase from './../GaleryBase';
import { getAll } from '../../../../reducers/playlists/PlaylistsActions';

class GaleryPlaylist extends GaleryBase {
  galery() {
    return (
      <div className="galery galery-playlist">
        <div className="content">
          <div className="playlists cards" style={ this.listStyles() }>
            { this.state.presentation.map(m => <Playlist key={ m.id } data={ m } enableTransition={ !this.state.runingTransition }/>) }
          </div>
        </div>
        <div className="actions">
          <ButtonPrev disabled={ this.state.disbledButtons } onClick={ this.prevCard } />
          <ButtonNext disabled={ this.state.disbledButtons } onClick={ this.nextCard } />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAll }, dispatch);
export default connect(null, mapDispatchToProps)(GaleryPlaylist);
