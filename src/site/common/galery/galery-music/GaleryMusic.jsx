import React from 'react';

import Music from './music/Music';
import ButtonPrev from '../../player/actions/button-prev/ButtonPrev';
import ButtonNext from '../../player/actions/button-next/ButtonNext';
import GaleryBase from './../GaleryBase';

export default class GaleryMusic extends GaleryBase {
  galery() {
    return (
      <div className="galery galery-musics">
        <div className="content">
          <div className="musics cards" style={ this.listStyles() }>
            { this.props.cards.map((m, i) => <Music key={ m.id } data={ m }/>) }
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
