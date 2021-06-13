import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Music from './music/Music';
import ButtonPrev from '../../player/actions/button-prev/ButtonPrev';
import ButtonNext from '../../player/actions/button-next/ButtonNext';
import GaleryBase from './../GaleryBase';
import Modal from '../../../../common/modal/Modal';
import { getAllByRanking, getAllByGenre, getAllByPlaylist, getAllByCompositor } from '../../../../reducers/musics/MusicsActions';

class GaleryMusic extends GaleryBase {  
  constructor(props) {
    super(props);
    this.state = { ...this.state, showLetter: false, letter: null };    
    this.closeModal = this.closeModal.bind(this);
    this.readLetter = this.readLetter.bind(this);
  }
  
  componentWillMount() {
    if (this.props.ranking)
      return this.props.getAllByRanking(this.afterLoad);
    if (this.props.genreName)
      return this.props.getAllByGenre(this.props.genreName, this.afterLoad);
    if (this.props.playlistName)
      return this.props.getAllByPlaylist(this.props.playlistName, this.afterLoad);
    if (this.props.compositorName)
      return this.props.getAllByCompositor(this.props.compositorName, this.afterLoad);
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
            { this.state.presentation.map(m => <Music key={ m.id } readLetter={ this.readLetter } data={ m } enableTransition={ !this.state.runingTransition }/>) }
          </div>
        </div>
        <div className="actions">
          <ButtonPrev disabled={ this.state.disbledButtons } onClick={ this.prevCard } />
          <ButtonNext disabled={ this.state.disbledButtons } onClick={ this.nextCard } />
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

const mapDispatchToProps = dispatch => bindActionCreators({ getAllByRanking, getAllByGenre, getAllByPlaylist, getAllByCompositor }, dispatch);
export default connect(null, mapDispatchToProps)(GaleryMusic);
