import './Section.css';

import React from 'react';

export default props => (
  <section id={ props.id } className={ props.className }>
    { props.children }
  </section>
);
