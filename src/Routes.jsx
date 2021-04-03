import React from 'react';
import { Provider } from 'react-redux';
import { hashHistory, IndexRoute, Route, Router } from 'react-router';
import { createStore } from 'redux';

import SiteLayout from './site/SiteLayout';
import About from './site/pages/about/About';
import Home from './site/pages/home/Home';
import Reducers from './reducers/reducers';
import AdminLayout from './admin/AdminLayout';
import MusicList from './admin/pages/musics/music-list/MusicList';

const store = createStore(Reducers);
export default () => (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ SiteLayout }> 
        <IndexRoute component={ Home }/>
        <Route path="about" component={ About }/>
      </Route> 
      <Route exact path="/admin" component={ AdminLayout }>
        <IndexRoute component={ MusicList }/>
      </Route>
    </Router>
  </Provider>
);
