import './type-account.css'; 

import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import SubmitButton from '../../../common/buttons/submit/SubmitButton';
import Row from './../../../common/row/Row';

const INITIAL_STATE = { type: null };

class TypeAccount extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
    this.next = this.next.bind(this);
  }

  next() {
    const type = encodeURIComponent(this.state.type);
    hashHistory.push(`/create-account/${type}`);
  }

  render() {
    return (
      <div className="background-type">
        <div className="select-type">
          <h2>Selecione o tipo de conta</h2>
          <div className="account-types">
            <div className={ `account-type user ${this.state.type === 'Usuário' ? 'active' : ''}` } 
              onClick={ () => this.setState({ type: 'Usuário' }) }>
              <h4>Usuário</h4>
              <div>Desejo comprar uma música</div>
            </div>
            <div className={ `account-type compositor ${this.state.type === 'Compositor' ? 'active' : ''}` } 
              onClick={ () => this.setState({ type: 'Compositor' }) }>
              <h4>Compositor</h4>
              <div>Quero postar letra de músicas para venda</div>
            </div>
          </div>
          <Row>
            <Link className="link-login" to="/login">Já tenho uma conta</Link>
            <SubmitButton disabled={ !this.state.type } onClick={ this.next } text="Próximo"/>
          </Row>
        </div>
      </div>
    );
  }
}

export default TypeAccount;
