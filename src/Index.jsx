import 'modules/@fortawesome/fontawesome-free/css/all.css';
import './Index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import 'moment/locale/pt-br';

import Routes from './Routes';

ReactDOM.render(
  <Routes />,
  document.getElementById('app')
);
