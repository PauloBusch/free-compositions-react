import './Home.css';

import React from 'react';
import MainSection from './sections/main-section/MainSection';
import MusicsSection from './sections/musics-section/MusicsSection';
import ArtistsSection from './sections/artists-section/ArtistsSection';

export default props => (
  <div className="home">
    <MainSection />
    <MusicsSection />
    <ArtistsSection />
  </div>
);
