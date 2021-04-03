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
import MusicForm from './admin/pages/musics/music-form/MusicForm';
import LetterList from './admin/pages/letters/letter-list/LetterList';
import LetterForm from './admin/pages/letters/letter-form/LetterForm';
import UserList from './admin/pages/users/user-list/UserList';

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
        <Route path="musics/new" component={ MusicForm }/>
        <Route path="musics/edit/:id" component={ MusicForm }/>
        <Route path="letters" component={ LetterList }/>
        <Route path="letters/new" component={ LetterForm }/>
        <Route path="letters/edit/:id" component={ LetterForm }/>
        <Route path="users" component={ UserList }/>
        <Redirect exact from='*' to="/admin/musics" />
      </Route>
    </Router>
  </Provider>
);
