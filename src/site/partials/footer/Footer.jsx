import './Footer.css';

import React from 'react';
import { Link } from 'react-router'; 

export default props => (
  <footer>
    <div className="details">
      <a href="/">
        <img src="images/free-compositions/logo-strong.png"/>
      </a>
      <div className="card">
        <h2>Empresa</h2>
        <ul>
          <li><Link to="about">Quem somos</Link></li>
          <li><a href="#">Ajuda</a></li>
        </ul>
      </div>
      <div className="card">
        <h2>Comunidade</h2>
        <ul>
          <li><a href="#">Todos os canais</a></li>
          <li><a href="#">Mais ouvidas</a></li>
          <li><a href="#">Novos lançamentos</a></li>
        </ul>
      </div>
      <div className="card">
        <h2>Links úteis</h2>
        <ul>
          <li><a href="#">Aviso legal</a></li>
          <li><a href="#">Termos e condições de uso</a></li>
          <li><a href="#">Política de privacidade</a></li>
        </ul>
      </div>
    </div>
    <div className="social">
      <div className="icons">
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-youtube"></i></a>
      </div>
      <a href="https://gritealto.com/" target="_blank">
        Powered by GriteAlto
      </a>
    </div>
  </footer>
);
