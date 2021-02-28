import React from 'react';
import PlayerBase from '../PlayerBase';
import Artist from './artist/Artist';
import ButtonPrev from '../actions/button-prev/ButtonPrev';
import ButtonNext from '../actions/button-next/ButtonNext';

export default class PlayerArtist extends PlayerBase {
  render() {
    return (
      <div className="player player-artist">
        <div className="content">
          <div className="cards artists" style={ this.listStyles() }>
            { this.props.cards.map((m, i) => <Artist key={ m.id } active={ i === this.state.activeIndex } data={ m }/>) }
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
