import React from 'react';
import { hashHistory, IndexRoute, Route, Router } from 'react-router';
import Layout from './site/Layout';

import Home from './site/pages/home/Home';

export default () => (
  <Router history={ hashHistory }>
    <Route path="/" component={ Layout }> 
      <IndexRoute component={ Home }/>
    </Route> 
  </Router>
);
