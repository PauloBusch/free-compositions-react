import React from 'react';
import PlayerBase from '../PlayerBase';
import Music from './music/Music';
import ButtonPrev from '../actions/button-prev/ButtonPrev';
import ButtonNext from '../actions/button-next/ButtonNext';

export default class PlayerMusic extends PlayerBase {
  player() {
    return (
      <div className="player player-music">
        <div className="content">
          <div className="cards musics" style={ this.listStyles() }>
            { this.props.cards.map((m, i) => <Music key={ m.id } active={ i === this.state.activeIndex } data={ m }/>) }
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
