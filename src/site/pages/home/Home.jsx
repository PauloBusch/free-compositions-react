import './Home.css';

import React from 'react';
import MainSection from './sections/main-section/MainSection';
import MusicsSection from './sections/musics-section/MusicsSection';
import ArtistsSection from './sections/artists-section/ArtistsSection';
import RankingSection from './sections/ranking-section/RankingSection';
import GalerySection from './sections/galery-section/GalerySection';

export default props => (
  <div className="home">
    <MainSection />
    <MusicsSection />
    <ArtistsSection />
    <GalerySection />
    <RankingSection />
  </div>
);
