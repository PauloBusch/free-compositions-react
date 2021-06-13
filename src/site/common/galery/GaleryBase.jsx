import './GaleryBase.css';

import React, { Component } from 'react';
import Loading from './../../../common/loading/Loading';
import Message from '../../../common/table/message/Message';

const INITIAL_STATE = {
  activePage: 0,
  cardsTake: 4,
  loading: true,
  runingTransition: false,
  disbledButtons: false
};

export default class GaleryBase extends Component {
  constructor(props) {
    super(props);

    this.length = 0;
    this.state = INITIAL_STATE;
    this.prevCard = this.prevCard.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.afterLoad = this.afterLoad.bind(this);
    window.addEventListener('resize', this.updateTake.bind(this));
  }

  galery() { }
  
  componentWillMount() {
    this.props.getAll(this.afterLoad);
  }

  afterLoad(success, list) {
    if (success) {
      this.setState({
        ...this.state,
        cards: list,
        activePage: 0,
        cardsTake: this.getTake(),
        presentation: this.getPresentation(list, this.state.activePage)
      }, () => {
        this.setState({
          ...this.state,
          disbledButtons: this.disbledButtons(),
          loading: false
        });  
      });
    }
  }

  render() {
    if (this.state.loading) return <Loading style={ { margin: '10vh 0' } }/>;
    if (!this.state.cards || this.state.cards.length === 0)
      return !this.props.hideWithNone && <Message message={ this.props.emptyMessage || 'Nenhum registro na galeria' }/>;
    return this.galery();
  }

  updateTake() {
    const take = this.getTake();
    if (this.state.cardsTake === take) return;
    this.setState({
      ...this.state,
      activePage: 0,
      cardsTake: take,
      disbledButtons: this.disbledButtons()
    });
  }

  getTake() {
    if (window.innerWidth > 1000) return 4;
    if (window.innerWidth > 800) return 3;
    if (window.innerWidth > 580) return 2;
    return 1;
  }

  prevCard() {
    this.goPage(this.state.activePage - 1);
  }

  nextCard() {
    this.goPage(this.state.activePage + 1);
  }

  goPage(page) {
    const disbledButtons = this.disbledButtons();
    if (disbledButtons) return;
    const cards = this.getPresentation(this.state.cards, page);
    const direction = page > this.state.activePage ? 'right' : 'left';
    const presentation = direction === 'right'
      ? [...this.state.presentation, ...cards]
      : [...cards, ...this.state.presentation];
    this.setState({ 
      ...this.state, 
      activePage: page,
      presentation: presentation,
      disbledButtons: disbledButtons
    }, () => {
      const transition = this.getTransition();
      direction === 'right' 
        ? this.runTransitionToRight(transition)
        : this.runTransitionToLeft(transition);
    });
  }

  runTransitionToRight(transition) {
    if (this.state.runingTransition) return;
    setTimeout(() => {
      this.setState({ ...this.state,
        runingTransition: true,
        styles: {
          transition: `${transition}s`,
          marginLeft: '-100%'
        }
      });
    }, 0);
    setTimeout(() => this.afterTransition(), transition * 1000);
  }

  runTransitionToLeft(transition) {
    if (this.state.runingTransition) return;
    this.setState({ ...this.state,
      styles: {
        transition: 'none',
        marginLeft: '-100%'
      }
    });
    setTimeout(() => {
      this.setState({ ...this.state,
        runingTransition: true,
        styles: {
          transition: `${transition}s`,
          marginLeft: '0%'
        }
      });
    }, 0);
    setTimeout(() => this.afterTransition(), transition * 1000);
  }

  afterTransition() {
    const { cards, activePage } = this.state;
    this.setState({ 
      ...this.state, 
      presentation: this.getPresentation(cards, activePage),
      styles: { }
    });    
    setTimeout(() => {
      this.setState({ 
        ...this.state, 
        runingTransition: false
      }); 
    }, 50);
  }

  getPresentation(list, page) {
    const take = this.getTake();
    const index = Math.abs(page) * take;
    const end = index + take;
    const sequence = this.predictSequence(list, end);
    if (page < 0) {
      const start = sequence.length - index;
      return sequence.slice(start, start + take);
    }
    return sequence.slice(index, end);
  }

  predictSequence(list, index) {
    const result = [...list];
    const take = this.getTake();
    if (result.length <= take) return result;
    while(result.length < index) {
      for (const item of list) {
        result.push({ ...item, id: Math.random() });
      }
    }
    return result;
  }

  disbledButtons() {
    const { cards, cardsTake, runingTransition } = this.state;
    if (runingTransition) return true;
    return cards.length <= cardsTake;
  }

  listStyles() {
    const k = 1 / this.state.cardsTake;
    return {
      marginLeft: '0%',
      transition: 'none',
      width: `${this.state.presentation.length * k * 100}%`,
      ...this.state.styles
    };
  }

  getTransition() {
    if (this.state.cardsTake === 4) return 1;
    if (this.state.cardsTake === 3) return 0.8;
    if (this.state.cardsTake === 2) return 0.6;
    if (this.state.cardsTake === 1) return 0.5;
  }
}
