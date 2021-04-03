import React from 'react';

import Footer from './partials/footer/Footer';
import Header from './partials/header/Header';

export default props => (
  <div>
    <Header />
    { props.children }
    <Footer />
  </div>
);
