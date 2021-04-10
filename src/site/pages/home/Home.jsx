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

class Home extends Component {
  componentWillMount() {
    this.props.getAllSlides();
  }

  render() {
    const { slides } = this.props;
    return (
      <div className="home">
        <div className="slides-container">
          <Slider slides={ slides.map(s => ({ image: s.image, position: `${s.positionX} ${s.positionY}` })) } timeTransition={ 10000 }/>
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
