import './Home.css';

import React from 'react';
import MusicsSection from './sections/musics-section/MusicsSection';
import ArtistsSection from './sections/artists-section/ArtistsSection';
import RankingSection from './sections/ranking-section/RankingSection';
import GalerySection from './sections/galery-section/GalerySection';
import Slider from './../../../common/slider/Slider';

export default props => {
  const slides = [
    { image: 'images/slides/slide-1.jpeg', position: 'right center' },
    { image: 'images/slides/slide-2.jpeg', position: 'right center' },
    { image: 'images/slides/slide-3.jpeg', position: 'right center' }
  ];

  return (
    <div className="home">
      <div className="slides-container">
        <Slider slides={ slides } timeTransition={ 10000 }/>
      </div>
      <MusicsSection />
      <ArtistsSection />
      <GalerySection />
      <RankingSection />
    </div>
  );
}
