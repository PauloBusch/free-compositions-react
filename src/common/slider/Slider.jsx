import './Slider.css';

import React, { Component } from 'react';

import { PREV, NEXT } from './Direction';
import Slide from './slide/Slide';
import Indicator from './indicator/Indicator';
import ButtonPrev from './actions/button-prev/ButtonPrev';
import ButtonNext from './actions/button-next/ButtonNext';
import If from '../operators/If';

const INITIAL_STATE = {
  activeIndex: 0,
  direction: NEXT,
  prevDisabled: true,
  nextDisabled: false
}; 

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.state.activeIndex = this.slideIndex(props.current);
    this.configureAnimation();
  }

  componentWillUnmount() {
    if (this.animationId) clearInterval(this.animationId);
  }

  configureAnimation() {
    if (this.animationId) clearInterval(this.animationId);
    this.animationId = setInterval(this.updateAnimation.bind(this), this.props.timeTransition || 5000);
  }

  updateAnimation() {
    if (this.state.direction === NEXT) return this.nextSlide();
    if (this.state.direction === PREV) return this.prevSlide();
  }

  goSlide(index, manual) {
    const { isFirst, isLast } = this.stateButtons(index);
    this.setState({ 
      ...this.state, 
      activeIndex: index,
      prevDisabled: isFirst,
      nextDisabled: isLast,
      direction: this.direction(index)
    });
    if (manual) this.configureAnimation();
  }

  prevSlide(manual) {
    const { isFirst } = this.stateButtons(this.state.activeIndex);
    if (isFirst) return;

    this.goSlide(this.state.activeIndex - 1, manual);
  }

  nextSlide(manual) {
    const { isLast } = this.stateButtons(this.state.activeIndex);
    if (isLast) return;

    this.goSlide(this.state.activeIndex + 1, manual);
  }

  stateButtons(index) {
    const isFirst = index === 0;
    const isLast = index === (this.props.slides.length - 1);
    return { isFirst, isLast };
  }

  direction(index) {
    const { isFirst, isLast } = this.stateButtons(index);
    if (isFirst) return NEXT;
    if (isLast) return PREV;
    return this.state.direction
  }

  slideIndex(image) {
    const slide = this.props.slides.find(s => s.image === image);
    if (!slide) return 0;
    return this.props.slides.indexOf(slide);
  }
  
  render() {
    const { activeIndex } = this.state;
    const { slides } = this.props;

    return (
      <div className="slider">
        <ul className="slides" style={ 
            { 
              width: `${ slides.length * 100 }%`,
              marginLeft: `-${ activeIndex * 100 }%`,
              display: slides.length > 0 ? 'flex' : 'none'
            } 
          }>
          { slides.map((s, i) => <Slide key={ i } active={ i === activeIndex } template={ s.template } { ...s }/>) }
        </ul>
        <If test={ slides.length > 1 }>
          <div>
            <ol className="indicators">
              { slides.map((s, i) => <Indicator key={ i } active={ i === activeIndex } onClick={ () => this.goSlide(i, true) }/>) }
            </ol>
            <div className="actions">
              <ButtonPrev disabled={ this.state.prevDisabled } onClick={ () => this.prevSlide(true) } />
              <ButtonNext disabled={ this.state.nextDisabled } onClick={ () => this.nextSlide(true) } />
            </div>
          </div>
        </If>
      </div>
    );
  }
}

