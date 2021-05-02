import './Home.css';

import React, { Component } from 'react';
import MusicsSection from './sections/musics-section/MusicsSection';
import ArtistsSection from './sections/artists-section/ArtistsSection';
import RankingSection from './sections/ranking-section/RankingSection';
import GalerySection from './sections/galery-section/GalerySection';
import Slider from './../../../common/slider/Slider';
import { getAll as getAllSlides } from '../../.../../../reducers/slides/SlidesActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OverlaySlide from './overlay-slide/index';

class Home extends Component {
  componentWillMount() {
    this.props.getAllSlides();
  }

  mapSlideData(slide) {
    const { image, positionX, positionY, overlaySlide } = slide;
    return { 
      image: image, 
      position: `${positionX} ${positionY}`,
      template: overlaySlide ? OverlaySlide(slide) : false
    };
  }

  render() {
    return (
      <div className="home">
        <div className="slides-container">
          <Slider slides={ this.props.slides.map(s => this.mapSlideData(s)) } timeTransition={ 10000 }/>
        </div>
        <MusicsSection />
        <ArtistsSection />
        <GalerySection />
        <RankingSection />
      </div>
    );
  }
}

const mapStateToProps = state => ({ slides: state.slides });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllSlides }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);
