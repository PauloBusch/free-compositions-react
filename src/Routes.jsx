import React from 'react';
import { Provider } from 'react-redux';
import { hashHistory, IndexRoute, Route, Router } from 'react-router';
import { createStore } from 'redux';

import Layout from './site/Layout';
import About from './site/pages/about/About';
import Home from './site/pages/home/Home';
import Reducers from './site/reducers/Reducers';

const store = createStore(Reducers);
export default () => (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ Layout }> 
        <IndexRoute component={ Home }/>
        <Route path="about" component={ About }/>
      </Route> 
    </Router>
  </Provider>
);
