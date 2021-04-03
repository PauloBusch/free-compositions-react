import './Sidenav.css';

import React from 'react';
import Menu from './menu/Menu';
import MenuItem from './menu-item/MenuItem';

function redirectDefault() {
  const currentHref = location.hash.substr(2);
  if (currentHref === 'admin')
    location.href = '/#/admin/musics';
}

export default props => {
  redirectDefault();

  return (
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
} 


