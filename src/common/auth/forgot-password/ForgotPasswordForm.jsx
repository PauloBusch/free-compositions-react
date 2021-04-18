import './ForgotPasswordForm.css';

import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { Form, Field, formValueSelector, reduxForm } from 'redux-form';

import Toastr from '../../../common/messages/toastr';
import Input from '../../../common/fields/input/Input';
import SubmitButton from '../../../common/buttons/submit/SubmitButton';
import email from '../../../common/validators/email';
import If from '../../../common/operators/If';
import { forgotPassword } from '../../../reducers/auth/AuthActions';

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);

    this.props.initialize({ email: this.getEmail() });
  }

  isValid() {
    const emailError = email(this.props.email);
    return this.props.email && !emailError; 
  }

  getEmail() {
    const { router } = this.props;
    const { pathname } = router.location;
    const regex = /\/forgot-password\//;
    const index = pathname.search(regex);
    if (index === -1) return null;
    return decodeURIComponent(pathname.substring(index).replace(regex, ''));
  }

  render() {
    const { handleSubmit, forgotPassword, forgotPasswordEmailSended, forgotPasswordEmailLoading } = this.props;

    return (
      <div className="background-forgot-password">
        <If test={ !forgotPasswordEmailSended }>
          <Form id="form-forgot-password" onSubmit={ handleSubmit(forgotPassword) }>
            <h2>Redefinir Senha</h2>
            <Field component={ Input } type="email" name="email"
              placeholder="E-mail" icon="user"/>
            <SubmitButton loading={ forgotPasswordEmailLoading } disabled={ !this.isValid() } fill padding="10px" text="Enviar Email"/>
          </Form>
        </If>
        <If test={ forgotPasswordEmailSended }>
          <span className="success-message">Acesse sua caixa de entrada para obter o link de redefinição!</span>
        </If>
        <Toastr />
      </div>
    );
  }
}

const forgotPasswordForm = reduxForm({ form: 'forgot-password-form' })(withRouter(ForgotPasswordForm));
const selector = formValueSelector('forgot-password-form');
const mapStateToProps = state => ({ email: selector(state, 'email'), ...state.auth });
const mapDispatchToProps = dispatch => bindActionCreators({ forgotPassword }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(forgotPasswordForm);
