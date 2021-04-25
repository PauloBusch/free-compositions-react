import React from 'react';
import PlayerBase from '../PlayerBase';
import Music from './music/Music';
import ButtonPrev from '../actions/button-prev/ButtonPrev';
import ButtonNext from '../actions/button-next/ButtonNext';
import Modal from '../../../../common/modal/Modal';

export default class PlayerMusic extends PlayerBase {
  constructor(props) {
    super(props);

    this.state = { showLetter: false, letter: null };    
    this.closeModal = this.closeModal.bind(this);
    this.readLetter = this.readLetter.bind(this);
  }

  readLetter(letter) {
    this.setState({ ...this.state, 
      showLetter: true,
      letter: letter 
    });
  }

  closeModal() {
    this.setState({ ...this.state, showLetter: false });
  }

  player() {
    return (
      <div className="player player-music">
        <div className="content">
          <div className="cards musics" style={ this.listStyles() }>
            { this.props.cards.map((m, i) => <Music key={ m.id } readLetter={ this.readLetter } active={ i === this.state.activeIndex } data={ m }/>) }
          </div>
        </div>
        <div className="actions">
          <ButtonPrev disabled={ this.state.prevDisabled } onClick={ this.prevCard } />
          <ButtonNext disabled={ this.state.nextDisabled } onClick={ this.nextCard } />
        </div>
        <Modal title="Letra da Música" show={ this.state.showLetter } 
          onClose={ this.closeModal }>
          <pre>
            { this.state.letter }
          </pre>
        </Modal>
      </div>
    );
  }
}
