import './Auth.css';

import React, { Component } from 'react';
import { reduxForm, Form, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Toastr from '../../messages/toastr';
import { login } from '../../../reducers/auth/AuthActions';
import Input from '../../fields/input/Input';
import SubmitButton from '../../buttons/submit/SubmitButton';
import email from '../../validators/email';
import { hashHistory } from 'react-router';
import { Link, Redirect } from 'react-router';
import { listenSessionChanged } from './../../../reducers/auth/AuthActions';

class Auth extends Component {
  componentWillMount() {
    this.props.listenSessionChanged(true);
  }

  isValid() {
    const emailError = email(this.props.email);
    return this.props.email && !emailError && this.props.password;
  }

  render() {
    const { handleSubmit, user, loading, login, email } = this.props;
    if (loading) return false;

    if (user) {
      if (user.role === 'Usuário')
        hashHistory.push('/');
      if (user.role === 'Admin')
        hashHistory.push('/admin/slides');
      if (user.role === 'Compositor')
        hashHistory.push('/admin/musics');
      return false;
    }

    return (
      <div className="background-login">
        <Form id="form-login" onSubmit={ handleSubmit(login) }>
          <h2>Login</h2>
          <Field component={ Input } type="email" name="email"
            placeholder="E-mail" icon="user"/>
          <Field component={ Input } type="password" name="password"
            placeholder="Senha" icon="envelope"/>
            <Link className="link-forgot-password" to={ (`/forgot-password/${email ? encodeURIComponent(email) : ''}`) }>Esqueci minha senha</Link>
          <SubmitButton disabled={ !this.isValid() } fill padding="10px" text="Entrar"/>
        </Form>
        <Toastr />
      </div>
    );
  }
}

const authForm = reduxForm({ form: 'login-form' })(Auth);
const selector = formValueSelector('login-form');
const mapStateToProps = state => ({ 
  email: selector(state, 'email'), 
  password: selector(state, 'password'),
  loading: state.auth.loading, 
  user: state.auth.user
});
const mapDispatchToProps = dispatch => bindActionCreators({ login, listenSessionChanged }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(authForm);