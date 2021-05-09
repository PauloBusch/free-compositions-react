import React from 'react';

import Music from './music/Music';
import ButtonPrev from '../../player/actions/button-prev/ButtonPrev';
import ButtonNext from '../../player/actions/button-next/ButtonNext';
import GaleryBase from './../GaleryBase';
import Modal from '../../../../common/modal/Modal';

export default class GaleryMusic extends GaleryBase {  
  constructor(props) {
    super(props);
    this.state = { showLetter: false, letter: null };    
    this.closeModal = this.closeModal.bind(this);
    this.readLetter = this.readLetter.bind(this);
  }

  readLetter(letter) {
    this.setState({ ...this.state, 
      showLetter: true,
      letter: this.treatHtml(letter)
    });
  }

  treatHtml(text) {
    if (!text) return '';
    return text
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace(/(<? *script)/gi, 'illegalscript');
  }

  closeModal() {
    this.setState({ ...this.state, showLetter: false });
  }

  galery() {
    return (
      <div className="galery galery-musics">
        <div className="content">
          <div className="musics cards" style={ this.listStyles() }>
            { this.props.cards.map((m, i) => <Music key={ m.id } readLetter={ this.readLetter } data={ m }/>) }
          </div>
        </div>
        <div className="actions">
            <ButtonPrev disabled={ this.state.prevDisabled } onClick={ this.prevCard } />
            <ButtonNext disabled={ this.state.nextDisabled } onClick={ this.nextCard } />
        </div>
        <Modal title="Letra da Música" show={ this.state.showLetter } 
          onClose={ this.closeModal }>
          <div style={ { whiteSpace: 'pre-line' } } 
            dangerouslySetInnerHTML={ { __html: this.state.letter } }>
          </div>
        </Modal>
      </div>
    );
  }
}
