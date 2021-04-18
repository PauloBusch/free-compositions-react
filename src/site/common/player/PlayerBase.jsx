import './PlayerBase.css';

import React, { Component } from 'react';
import { DESKTOP, MOBILE } from './../consts/AppMode';
import Loading from './../../../common/loading/Loading';

const INITIAL_STATE = {
  mode: DESKTOP,
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
    window.addEventListener('resize', this.updateMode.bind(this));
  }

  player() { }

  render() {
    if (this.props.loading) return <Loading style={ { marginTop: '30vh' } }/>;
    return this.player();
  }

  init() {
    const index = this.initialIndex();
    const { isFirst, isLast } = this.stateButtons(index); 
    this.state = { 
      ...this.state, 
      mode: this.getMode(),
      activeIndex: index,
      prevDisabled: isFirst,
      nextDisabled: isLast
    };
  }

  initialIndex() {
    if (this.getMode() === MOBILE) return 0;
    if (this.props.cards.length >= 3) return 1;
    return 0;
  }

  updateMode() {
    const mode = this.getMode();
    if (this.state.mode === mode) return;
    this.setState({
      ...this.state,
      mode: mode
    });
  }

  getMode() {
    return window.innerWidth < 950 ? MOBILE : DESKTOP;
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
    const isMobile = this.state.mode === MOBILE;
    const k = isMobile ? 1 : 1 / 3;
    return {
      width: `${ this.props.cards.length * k * 100 }%`,
      marginLeft: `${ this.state.activeIndex * k * -100 + (isMobile ? 0 : k * 100) }%`
    };
  }
}
