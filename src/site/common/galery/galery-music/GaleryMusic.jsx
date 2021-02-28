import './GaleryMusic.css';

import React, { Component } from 'react';

import Music from './music/Music';
import ButtonPrev from '../../player/actions/button-prev/ButtonPrev';
import ButtonNext from '../../player/actions/button-next/ButtonNext';

const INITIAL_STATE = {
  activePage: 0,
  musicsTake: 4,
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
    window.addEventListener('resize', this.updateTake.bind(this));
  }

  init() {
    const page = 0;
    const { isFirst, isLast } = this.stateButtons(page); 
    this.state = { 
      ...this.state, 
      musicsTake: this.getTake(),
      activePage: page,
      prevDisabled: isFirst,
      nextDisabled: isLast
    };
  }

  updateTake() {
    const page = 0;
    const take = this.getTake();
    if (this.state.musicsTake === take) return;
    const { isFirst, isLast } = this.stateButtons(page); 
    this.setState({
      ...this.state,
      activePage: page,
      musicsTake: take,
      prevDisabled: isFirst,
      nextDisabled: isLast
    });
  }

  getTake() {
    if (window.innerWidth > 1000) return 4;
    if (window.innerWidth > 800) return 3;
    if (window.innerWidth > 580) return 2;
    return 1;
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
    const isLast = page === (Math.ceil(this.props.musics.length / this.state.musicsTake) - 1);
    return { isFirst, isLast };
  }

  listStyles() {
    const k = 1 / this.state.musicsTake;
    return {
      transition: `${this.getTransition()}s`,
      width: `${ this.props.musics.length * k * 100 }%`,
      marginLeft: `${ this.state.activePage * -100 }%`
    };
  }

  getTransition() {
    if (this.state.musicsTake === 4) return 1;
    if (this.state.musicsTake === 3) return 0.8;
    if (this.state.musicsTake === 2) return 0.6;
    if (this.state.musicsTake === 1) return 0.5;
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
