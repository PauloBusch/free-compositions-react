import './AdminLayout.css';

import React from 'react';

import Header from './partials/header/Header';
import Sidenav from './partials/sidenav/Sidenav';
import Content from './partials/content/Content';
import Toastr from '../common/messages/toastr';

export default function AdminLayout(props) {
  return (
    <div className="container-admin">
      <Header/>
      <div className="row-admin">
        <Sidenav />
        <Content>
          { props.children }
        </Content>
        <Toastr />
      </div>
    </div>
  );
}
