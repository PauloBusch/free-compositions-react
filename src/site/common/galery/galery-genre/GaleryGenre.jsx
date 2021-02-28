import React from 'react';

import Genre from './genre/Genre';
import ButtonPrev from '../../player/actions/button-prev/ButtonPrev';
import ButtonNext from '../../player/actions/button-next/ButtonNext';
import GaleryBase from './../GaleryBase';

export default class GaleryGenre extends GaleryBase {
  render() {
    return (
      <div className="galery galery-genres">
        <div className="content">
          <div className="genres cards" style={ this.listStyles() }>
            { this.props.cards.map((m, i) => <Genre key={ m.id } data={ m }/>) }
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
