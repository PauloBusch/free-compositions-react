import './ChangePassword.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { Form, Field, formValueSelector, reduxForm } from 'redux-form';

import Toastr from '../../../common/messages/toastr';
import Input from './../../../common/fields/input/Input';
import SubmitButton from '../../../common/buttons/submit/SubmitButton';
import email from '../../../common/validators/email';
import If from '../../../common/operators/If';
import { changePasswordWithToken, validateToken } from './../../reducers/auth/AuthActions';
import password from './../../../common/validators/password';
import required from './../../../common/validators/required';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.token = this.getToken();
    this.props.validateToken(this.token);
    this.changePassword = this.changePassword.bind(this);
  }

  isValid() {
    const { newPassword, confirmPassword } = this.props;
    if (!newPassword || !confirmPassword) return false;
    return !password(newPassword) && !this.equalPassword(confirmPassword);
  }

  getToken() {
    const { router } = this.props;
    const { query } = router.location;
    if (!query) return null;
    return query.token;
  }

  changePassword(values) {
    const { changePasswordWithToken } = this.props;
    values.token = this.token;
    changePasswordWithToken(values);
  }  
  
  equalPassword(value) {
    if (!value) return undefined;
    const { newPassword } = this.props;
    if (newPassword !== value) return 'As senhas devem coincidir';
    return undefined;
  }

  render() {
    const { handleSubmit, validToken, validatedToken } = this.props;

    return (
      <div className="background-change-password">
        <If test={ validToken && validatedToken }>
          <Form id="form-change-password" onSubmit={ handleSubmit(this.changePassword) }>
            <h2>Redefinir Senha</h2>
            <Field component={ Input } type="password" name="newPassword"
              placeholder="Nova senha" validate={ required, password }/>
            <Field component={ Input } type="password" name="confirmPassword"
              placeholder="Confirmação da senha" validate={ required, this.equalPassword.bind(this) }/>
            <SubmitButton disabled={ !this.isValid() } fill padding="10px" text="Alterar"/>
          </Form>
        </If>
        <If test={ !validToken && validatedToken }>
          <span className="token-error-message">O link de alteração de senha está expirado!</span>
        </If>
        <Toastr />
      </div>
    );
  }
}

const changePasswordForm = reduxForm({ form: 'change-password-form' })(withRouter(ChangePassword));
const selector = formValueSelector('change-password-form');
const mapStateToProps = state => ({ 
  newPassword: selector(state, 'newPassword'), 
  confirmPassword: selector(state, 'confirmPassword'),
  ...state.auth 
});
const mapDispatchToProps = dispatch => bindActionCreators({ changePasswordWithToken, validateToken }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(changePasswordForm);
