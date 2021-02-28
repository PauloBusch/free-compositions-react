import './PlayerMusic.css';

import React, { Component } from 'react';
import Music from './music/Music';
import ButtonPrev from './actions/button-prev/ButtonPrev';
import ButtonNext from './actions/button-next/ButtonNext';

const INITIAL_STATE = {
  activeIndex: 0,
  prevDisabled: true,
  nextDisabled: false
}; 

export default class PlayerMusic extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.init();
    this.prevMusic = this.prevMusic.bind(this);
    this.nextMusic = this.nextMusic.bind(this);
  }

  init() {
    const index = this.props.musics.length >= 3 ? 1 : 0;
    const { isFirst, isLast } = this.stateButtons(index); 
    this.state = { 
      ...this.state, 
      activeIndex: index,
      prevDisabled: isFirst,
      nextDisabled: isLast
    };
  }

  prevMusic() {
    const { isFirst } = this.stateButtons(this.state.activeIndex);
    if (isFirst) return;

    this.goMusic(this.state.activeIndex - 1);
  }

  nextMusic() {
    const { isLast } = this.stateButtons(this.state.activeIndex);
    if (isLast) return;

    this.goMusic(this.state.activeIndex + 1);
  }

  goMusic(index) {
    const { isFirst, isLast } = this.stateButtons(index);    
    this.setState({ 
      ...this.state, 
      activeIndex: index,
      prevDisabled: isFirst,
      nextDisabled: isLast
    });
  }

  stateButtons(index) {
    const isFirst = index === 0;
    const isLast = index === (this.props.musics.length - 1);
    return { isFirst, isLast };
  }

  render() {
    const k = 1 / 3;
    return (
      <div className="player-music">
        <div className="content">
          <div className="musics" style={ 
            { 
              width: `${ this.props.musics.length * k * 100 }%`,
              marginLeft: `${ this.state.activeIndex * k * -100 + k * 100 }%`
            } 
          }>
            { this.props.musics.map((m, i) => <Music key={ m.id } active={ i === this.state.activeIndex } data={ m }/>) }
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
