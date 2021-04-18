import './GaleryBase.css';

import React, { Component } from 'react';
import Loading from './../../../common/loading/Loading';

const INITIAL_STATE = {
  activePage: 0,
  cardsTake: 4,
  prevDisabled: true,
  nextDisabled: false
}; 

export default class GaleryBase extends Component {
  
  constructor(props) {
    super(props);

    this.length = 0;
    this.state = INITIAL_STATE;
    this.prevCard = this.prevCard.bind(this);
    this.nextCard = this.nextCard.bind(this);
    window.addEventListener('resize', this.updateTake.bind(this));
  }

  galery() { }

  render() {
    if (this.props.loading) return <Loading style={ { margin: '10vh 0' } }/>;
    this.init();
    return this.galery();
  }

  init() {
    if (this.initialized) return;
    const page = 0;
    const { isFirst, isLast } = this.stateButtons(page); 
    this.state = { 
      ...this.state, 
      cardsTake: this.getTake(),
      activePage: page,
      prevDisabled: isFirst,
      nextDisabled: isLast
    };
    this.initialized = true;
  }

  updateTake() {
    const page = 0;
    const take = this.getTake();
    if (this.state.cardsTake === take) return;
    const { isFirst, isLast } = this.stateButtons(page); 
    this.setState({
      ...this.state,
      activePage: page,
      cardsTake: take,
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

  prevCard() {
    const { isFirst } = this.stateButtons(this.state.activePage);
    if (isFirst) return;

    this.goPage(this.state.activePage - 1);
  }

  nextCard() {
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
    const isLast = page === (Math.ceil(this.props.cards.length / this.state.cardsTake) - 1);
    return { isFirst, isLast };
  }

  listStyles() {
    const k = 1 / this.state.cardsTake;
    return {
      transition: `${this.getTransition()}s`,
      width: `${ this.props.cards.length * k * 100 }%`,
      marginLeft: `${ this.state.activePage * -100 }%`
    };
  }

  getTransition() {
    if (this.state.cardsTake === 4) return 1;
    if (this.state.cardsTake === 3) return 0.8;
    if (this.state.cardsTake === 2) return 0.6;
    if (this.state.cardsTake === 1) return 0.5;
  }
}
