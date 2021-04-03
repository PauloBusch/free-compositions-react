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
        <MenuItem href="admin/musics" name="Músicas" icon="music"/>
        <MenuItem href="admin/letters" name="Letras" icon="align-justify"/>
        <MenuItem href="admin/users" name="Usuários" icon="user"/>
        <MenuItem href="admin/genres" name="Gêneros" icon="microphone"/>
        <MenuItem href="admin/styles" name="Estilos" icon="guitar"/>
        <MenuItem href="admin/playlists" name="Playlists" icon="play-circle"/>
      </Menu>
    </div>
  );
} 


