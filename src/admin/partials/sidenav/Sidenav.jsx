import './Sidenav.css';

import React from 'react';
import Menu from './menu/Menu';
import MenuItem from './menu-item/MenuItem';

export default props => (
  <div className="sidenav">
    <Menu>
      <MenuItem href="admin/musics" name="Músicas" icon="fa-images"/>
      <MenuItem href="admin/letters" name="Letras" icon="fa-house-user"/>
      <MenuItem href="admin/users" name="Usuários" icon="fa-house-user"/>
      <MenuItem href="admin/genres" name="Gêneros" icon="fa-house-user"/>
      <MenuItem href="admin/styles" name="Estilos" icon="fa-house-user"/>
      <MenuItem href="admin/playlists" name="Playlists" icon="fa-house-user"/>
    </Menu>
  </div>
);
