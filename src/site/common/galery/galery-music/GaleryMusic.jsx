import './GaleryMusic.css';

import React, { Component } from 'react';

import Music from './music/Music';
import ButtonPrev from '../../player/actions/button-prev/ButtonPrev';
import ButtonNext from '../../player/actions/button-next/ButtonNext';

const INITIAL_STATE = {
  activePage: 0,
  musicsPage: 4,
  prevDisabled: true,
  nextDisabled: false
}; 

export default class GaleryMusic extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.init();
    this.prevMusic = this.prevMusic.bind(this);
    this.nextMusic = this.nextMusic.bind(this);
  }

  init() {
    const page = 0;
    const { isFirst, isLast } = this.stateButtons(page); 
    this.state = { 
      ...this.state, 
      activePage: page,
      prevDisabled: isFirst,
      nextDisabled: isLast
    };
  }

  prevMusic() {
    const { isFirst } = this.stateButtons(this.state.activePage);
    if (isFirst) return;

    this.goPage(this.state.activePage - 1);
  }

  nextMusic() {
    const { isLast } = this.stateButtons(this.state.activePage);
    if (isLast) return;

    this.goPage(this.state.activePage + 1);
  }

  goPage(page) {
    const { isFirst, isLast } = this.stateButtons(page);    
    this.setState({ 
      ...this.state, 
      activePage: page,
      prevDisabled: isFirst,
      nextDisabled: isLast
    });
  }

  stateButtons(page) {
    const isFirst = page === 0;
    const isLast = page === (Math.ceil(this.props.musics.length / this.state.musicsPage) - 1);
    return { isFirst, isLast };
  }

  listStyles() {
    const k = 1 / this.state.musicsPage;
    return {
      width: `${ this.props.musics.length * k * 100 }%`,
      marginLeft: `${ this.state.activePage * -100 }%`
    };
  }

  render() {
    return (
      <div className="galery">
        <div className="content">
          <div className="musics" style={ this.listStyles() }>
            { this.props.musics.map((m, i) => <Music key={ m.id } data={ m }/>) }
          </div>
        </div>
        <div className="actions">
            <ButtonPrev disabled={ this.state.prevDisabled } onClick={ this.prevMusic } />
            <ButtonNext disabled={ this.state.nextDisabled } onClick={ this.nextMusic } />
        </div>
      </div>
    );
  }
}
