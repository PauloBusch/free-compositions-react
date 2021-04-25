import React from 'react';
import { Provider } from 'react-redux';
import { hashHistory, IndexRoute, Route, Router } from 'react-router';
import { applyMiddleware, createStore } from 'redux';

import promise from 'redux-promise';
import thunk from 'redux-thunk';

import SiteLayout from './site/SiteLayout';
import About from './site/pages/about/About';
import Home from './site/pages/home/Home';
import Reducers from './reducers/reducers';
import MusicList from './admin/pages/musics/music-list/MusicList';
import MusicForm from './admin/pages/musics/music-form/MusicForm';
import UserList from './admin/pages/users/user-list/UserList';
import UserForm from './admin/pages/users/user-form/UserForm';
import GenreList from './admin/pages/genres/genre-list/GenreList';
import GenreForm from './admin/pages/genres/genre-form/GenreForm';
import StyleList from './admin/pages/styles/style-list/StyleList';
import StyleForm from './admin/pages/styles/style-form/StyleForm';
import PlaylistList from './admin/pages/playlists/playlist-list/PlaylistList';
import PlaylistForm from './admin/pages/playlists/playlist-form/PlaylistForm';
import SlideList from './admin/pages/slides/slide-list/SlideList';
import SlideForm from './admin/pages/slides/slide-form/SlideForm';
import Auth from './common/auth/login/Auth';
import createAccountForm from './site/auth/create-account/index';
import ForgotPasswordForm from './common/auth/forgot-password/ForgotPasswordForm';
import AdminLayout from './admin/AdminLayout';
import Logout from './common/auth/logout/index';
import TypeAccount from './site/auth/type-account';
import biographyForm from './admin/pages/biography';
import ArtistDetail from './site/pages/artist/index';
import GenreDetail from './site/pages/genre/index';

const store = applyMiddleware(thunk, promise)(createStore)(Reducers);
export default () => (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/" component={ SiteLayout }> 
        <IndexRoute component={ Home }/>
        <Route path="about" component={ About }/>
        <Route path="artist/view/:id" component={ ArtistDetail }/>
        <Route path="genre/view/:id" component={ GenreDetail }/>
      </Route>
      <Route exact path="/login" component={ Auth } />
      <Route exact path="/logout" component={ Logout } />
      <Route exact path="/type-account" component={ TypeAccount } />
      <Route exact path="/create-account/:type" component={ createAccountForm } />
      <Route exact path="/forgot-password" component={ ForgotPasswordForm } />
      <Route exact path="/forgot-password/:email" component={ ForgotPasswordForm } />
      <Route exact path="/admin" component={ AdminLayout }>
        <Route path="biography" component={ biographyForm }/>
        <Route path="slides" component={ SlideList }/>
        <Route path="slides/new" component={ SlideForm }/>
        <Route path="slides/edit/:id" component={ SlideForm }/>
        <Route path="musics" component={ MusicList }/>
        <Route path="musics/new" component={ MusicForm }/>
        <Route path="musics/edit/:id" component={ MusicForm }/>
        <Route path="users" component={ UserList }/>
        <Route path="users/new" component={ UserForm }/>
        <Route path="users/edit/:id" component={ UserForm }/>
        <Route path="genres" component={ GenreList }/>
        <Route path="genres/new" component={ GenreForm }/>
        <Route path="genres/edit/:id" component={ GenreForm }/>
        <Route path="styles" component={ StyleList }/>
        <Route path="styles/new" component={ StyleForm }/>
        <Route path="styles/edit/:id" component={ StyleForm }/>
        <Route path="playlists" component={ PlaylistList }/>
        <Route path="playlists/new" component={ PlaylistForm }/>
        <Route path="playlists/edit/:id" component={ PlaylistForm }/>
      </Route>
    </Router>
  </Provider>
);
