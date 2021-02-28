import './PlayerBase.css';

import React, { Component } from 'react';

const INITIAL_STATE = {
  activeIndex: 0,
  prevDisabled: true,
  nextDisabled: false
}; 

export default class PlayerBase extends Component {

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.init();
    this.prevCard = this.prevCard.bind(this);
    this.nextCard = this.nextCard.bind(this);
  }

  init() {
    const index = this.props.cards.length >= 3 ? 1 : 0;
    const { isFirst, isLast } = this.stateButtons(index); 
    this.state = { 
      ...this.state, 
      activeIndex: index,
      prevDisabled: isFirst,
      nextDisabled: isLast
    };
  }

  prevCard() {
    const { isFirst } = this.stateButtons(this.state.activeIndex);
    if (isFirst) return;

    this.goCard(this.state.activeIndex - 1);
  }

  nextCard() {
    const { isLast } = this.stateButtons(this.state.activeIndex);
    if (isLast) return;

    this.goCard(this.state.activeIndex + 1);
  }

  goCard(index) {
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
    const isLast = index === (this.props.cards.length - 1);
    return { isFirst, isLast };
  }

  listStyles() {
    const k = 1 / 3;
    return { 
      width: `${ this.props.cards.length * k * 100 }%`,
      marginLeft: `${ this.state.activeIndex * k * -100 + k * 100 }%`
    };
  }
}
