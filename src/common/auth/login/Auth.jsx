import './Auth.css';

import React, { Component } from 'react';
import { reduxForm, Form, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Toastr from '../../messages/toastr';
import Input from '../../fields/input/Input';
import SubmitButton from '../../buttons/submit/SubmitButton';
import email from '../../validators/email';
import Password from './../../fields/password/index';
import Row from './../../row/Row';
import { login } from '../../../reducers/auth/AuthActions';
import { register } from '../../../reducers/history/HistoryActions';
import { hashHistory } from 'react-router';
import { Link } from 'react-router';
import { listenSessionChanged } from './../../../reducers/auth/AuthActions';
import { HISTORY_TYPE_LOGIN } from './../../../reducers/history/HistoryTypes';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = { loginLoading: false };
    this.afterLogin = this.afterLogin.bind(this);
    this.toggleLoadingLogin = this.toggleLoadingLogin.bind(this);
    this.submit = this.submit.bind(this);
  }
  
  componentWillMount() {
    this.props.listenSessionChanged(true);
  }

  isValid() {
    const emailError = email(this.props.email);
    return this.props.email && !emailError && this.props.password;
  }

  submit(values) {
    const { login } = this.props;
    this.toggleLoadingLogin(true);
    login(values, this.afterLogin);
  }

  afterLogin(success, user) {
    this.toggleLoadingLogin(false);
    if (success) this.props.register({ email: user.email }, user.name, HISTORY_TYPE_LOGIN);
  }

  redirectUser() {
    const { router } = this.props;
    const redirect = router.location.query.redirect || this.getRedirectRoute();
    setTimeout(() => hashHistory.push(`/${redirect}`), 0);
  }

  getRedirectRoute() {
    const { user } = this.props;
    if (user.role === 'Usuário') return '';
    if (user.role === 'Admin') return 'admin/slides';
    if (user.role === 'Compositor') return 'admin/biography';
    return '';
  }

  toggleLoadingLogin(loading) {
    this.setState({
      ...this.state,
      loginLoading: loading
    });
  }

  render() {
    const { handleSubmit, user, loading, email } = this.props;
    if (loading) return false;
    if (user) {
      this.redirectUser();
      return false;
    }

    return (
      <div className="background-login">
        <Form id="form-login" onSubmit={ handleSubmit(this.submit) }>
          <h2>Login</h2>
          <Field component={ Input } type="email" name="email"
            placeholder="E-mail" icon="user"/>
          <Field component={ Password } name="password"
            placeholder="Senha" icon="envelope"/>
          <Row>
            <Link className="link" to={ (`/forgot-password/${email ? encodeURIComponent(email) : ''}`) }>Esqueci minha senha</Link>
            <Link className="link" to="/type-account">Criar nova conta</Link>
          </Row>
          <SubmitButton disabled={ !this.isValid() } loading={ this.state.loginLoading } fill padding="10px" text="Entrar"/>
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
const mapDispatchToProps = dispatch => bindActionCreators({ login, register, listenSessionChanged }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(authForm);
