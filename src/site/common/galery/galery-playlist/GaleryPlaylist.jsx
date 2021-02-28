import React from 'react';

import Playlist from './playlist/Playlist';
import ButtonPrev from '../../player/actions/button-prev/ButtonPrev';
import ButtonNext from '../../player/actions/button-next/ButtonNext';
import GaleryBase from './../GaleryBase';

export default class GaleryPlaylist extends GaleryBase {
  render() {
    return (
      <div className="galery galery-playlist">
        <div className="content">
          <div className="playlists cards" style={ this.listStyles() }>
            { this.props.cards.map((m, i) => <Playlist key={ m.id } data={ m }/>) }
          </div>
        </div>
        <div className="actions">
            <ButtonPrev disabled={ this.state.prevDisabled } onClick={ this.prevCard } />
            <ButtonNext disabled={ this.state.nextDisabled } onClick={ this.nextCard } />
        </div>
      </div>
    );
  }
}
