import './Sidenav.css';

import React from 'react';
import Menu from './menu/Menu';
import MenuItem from './menu-item/MenuItem';
import If from '../../../common/operators/If';

function redirectDefault(role) {
  const currentHref = location.hash.substr(2);
  if (currentHref === 'admin') {
    const route = role === 'Admin' ? 'slides' : 'biography';
    location.href = `/#/admin/${route}`;
  }
}

export default props => {
  const { user } = props;
  if (!user) return false;

  redirectDefault(user.role);

  return (
    <div className="sidenav">
      <Menu>
        <If test={ ['Admin'].indexOf(user.role) !== -1 }>
          <div>
            <MenuItem href="admin/slides" name="Slides" icon="images"/>
          </div>
        </If>
        <If test={ ['Compositor'].indexOf(user.role) !== -1 }>
          <div>
            <MenuItem href="admin/biography" name="Biografia" icon="atlas"/>
          </div>
        </If>
        <If test={ ['Admin', 'Compositor'].indexOf(user.role) !== -1 }>
          <div>
            <MenuItem href="admin/musics" name="Músicas" icon="music"/>
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


