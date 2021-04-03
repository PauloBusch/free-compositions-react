import React from 'react';
import { Provider } from 'react-redux';
import { hashHistory, IndexRoute, Redirect, Route, Router } from 'react-router';
import { applyMiddleware, createStore } from 'redux';

import thunk from 'redux-thunk';

import SiteLayout from './site/SiteLayout';
import About from './site/pages/about/About';
import Home from './site/pages/home/Home';
import Reducers from './reducers/reducers';
import AdminLayout from './admin/AdminLayout';
import MusicList from './admin/pages/musics/music-list/MusicList';

const store = applyMiddleware(thunk)(createStore)(Reducers);
export default () => (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ SiteLayout }> 
        <IndexRoute component={ Home }/>
        <Route path="about" component={ About }/>
      </Route> 
      <Route exact path="/admin" component={ AdminLayout }>
        <Route path="musics" component={ MusicList }/>
        <Redirect exact from='*' to="/admin/musics" />
      </Route>
    </Router>
  </Provider>
);
