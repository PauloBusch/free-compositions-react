import './change-password.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { Form, Field, formValueSelector, reduxForm } from 'redux-form';

import Toastr from '../../../common/messages/toastr';
import Input from './../../../common/fields/input/Input';
import SubmitButton from '../../../common/buttons/submit/SubmitButton';
import If from '../../../common/operators/If';
import { validateResetCode, changePasswordWithResetCode } from './../../../reducers/auth/AuthActions';
import password from './../../../common/validators/password';
import required from './../../../common/validators/required';
import Loading from './../../loading/Loading';
import Password from './../../fields/password/index';

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = { validating: true, saving: false };
    this.code = this.props.router.location.query.oobCode;
    this.changePassword = this.changePassword.bind(this);
    this.afterValidateResetCode = this.afterValidateResetCode.bind(this);
    this.afterChangePassword = this.afterChangePassword.bind(this);
  }

  componentWillMount() {
    this.props.validateResetCode(this.code, this.afterValidateResetCode);
  }

  afterValidateResetCode(data) {
    this.setState({
      ...this.state,
      validating: false,
      validCode: data.success,
      email: data.email
    }); 
  }

  isValid() {
    const { newPassword, confirmPassword } = this.props;
    if (!newPassword || !confirmPassword) return false;
    return !password(newPassword) && !this.equalPassword(confirmPassword);
  }

  changePassword(values) {
    this.setState({ ...this.state, saving: true });
    const { changePasswordWithResetCode } = this.props;
    changePasswordWithResetCode(this.code, values.newPassword, this.afterChangePassword);
  }

  afterChangePassword(success) {
    this.setState({
      ...this.state,
      saving: false
    });
    if (success) this.props.router.push('/login');
  }
  
  equalPassword(value) {
    if (!value) return undefined;
    const { newPassword } = this.props;
    if (newPassword !== value) return 'As senhas devem coincidir';
    return undefined;
  }

  render() {
    return (
      <div className="background-change-password">
        { this.form() }
        <Toastr />
      </div>
    );
  }

  form() {
    const { handleSubmit } = this.props;
    const { validCode, validating, saving } = this.state;

    if (validating) return <Loading  style={ { paddingTop: '45vh' } }/>;

    return (
      <div>
        <If test={ validCode }>
          <Form id="form-change-password" onSubmit={ handleSubmit(this.changePassword) }>
            <h2>Redefinir Senha</h2>
            <Field component={ Password } type="password" name="newPassword"
              placeholder="Nova senha" validate={ required, password }/>
            <Field component={ Password } type="password" name="confirmPassword"
              placeholder="Confirmação da senha" validate={ required, this.equalPassword.bind(this) }/>
            <SubmitButton disabled={ !this.isValid() } loading={ saving } fill padding="10px" text="Alterar"/>
          </Form>
        </If>
        <If test={ !validCode }>
          <span className="code-error-message">O link de alteração de senha está expirado!</span>
        </If>
      </div>
    );
  }
}

const changePasswordForm = reduxForm({ form: 'change-password-form' })(withRouter(ChangePasswordForm));
const selector = formValueSelector('change-password-form');
const mapStateToProps = state => ({ 
  newPassword: selector(state, 'newPassword'), 
  confirmPassword: selector(state, 'confirmPassword')
});
const mapDispatchToProps = dispatch => bindActionCreators({ validateResetCode, changePasswordWithResetCode }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(changePasswordForm);
