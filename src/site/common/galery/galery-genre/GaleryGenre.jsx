import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Genre from './genre/Genre';
import ButtonPrev from '../../player/actions/button-prev/ButtonPrev';
import ButtonNext from '../../player/actions/button-next/ButtonNext';
import GaleryBase from './../GaleryBase';
import { getAll } from '../../../../reducers/genres/GenresActions';

class GaleryGenre extends GaleryBase {
  galery() {
    return (
      <div className="galery galery-genres">
        <div className="content">
          <div className="genres cards" style={ this.listStyles() }>
            { this.state.presentation.map(m => <Genre key={ m.id } data={ m } enableTransition={ !this.state.runingTransition }/>) }
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
export default connect(null, mapDispatchToProps)(GaleryGenre);
