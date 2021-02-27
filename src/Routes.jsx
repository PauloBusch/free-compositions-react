import React from 'react';
import { hashHistory, IndexRoute, Route, Router } from 'react-router';

import Home from './site/pages/home/Home';

export default () => (
  <Router history={ hashHistory }>
    <Route path="/"> 
      <IndexRoute component={ Home }/>
    </Route> 
  </Router>
);
