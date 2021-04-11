import './Sidenav.css';

import React, { Component, Fragment } from 'react';
import Menu from './menu/Menu';
import MenuItem from './menu-item/MenuItem';
import { connect } from 'react-redux';
import If from '../../../common/operators/If';

class Sidenav extends Component {
  componentWillMount() {
    this.redirectDefault();
  }

  redirectDefault() {
    const currentHref = location.hash.substr(2);
    if (currentHref === 'admin')
      location.href = '/#/admin/slides';
  }

  render() {
    const { user } = this.props;
    if (!user) return false;
    return (
      <div className="sidenav">
        <Menu>
          <If test={ ['Admin'].indexOf(user.role) !== -1 }>
            <div>
              <MenuItem href="admin/slides" name="Slides" icon="images"/>
            </div>
          </If>
          <If test={ ['Admin', 'Compositor'].indexOf(user.role) !== -1 }>
            <div>
              <MenuItem href="admin/musics" name="Músicas" icon="music"/>
              <MenuItem href="admin/letters" name="Letras" icon="align-justify"/>
            </div>
          </If>
          <If test={ ['Admin'].indexOf(user.role) !== -1 }>
            <div>
              <MenuItem href="admin/users" name="Usuários" icon="user"/>
              <MenuItem href="admin/genres" name="Gêneros" icon="microphone"/>
              <MenuItem href="admin/styles" name="Estilos" icon="guitar"/>
              <MenuItem href="admin/playlists" name="Playlists" icon="play-circle"/>
            </div>
          </If>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => ({ user: state.auth.user });
export default connect(mapStateToProps)(Sidenav);

