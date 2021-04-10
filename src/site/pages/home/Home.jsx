import './Home.css';

import React, { Component } from 'react';
import MusicsSection from './sections/musics-section/MusicsSection';
import ArtistsSection from './sections/artists-section/ArtistsSection';
import RankingSection from './sections/ranking-section/RankingSection';
import GalerySection from './sections/galery-section/GalerySection';
import Slider from './../../../common/slider/Slider';
import { connect } from 'react-redux';

class Home extends Component {
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
export default connect(mapStateToProps)(Home);
